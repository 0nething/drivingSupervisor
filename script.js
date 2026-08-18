// Récupération de références vers les éléments de l'interface
const alertBox             = document.getElementById("alertBox");
const alertText            = document.getElementById("alertMessage");
const speedText            = document.getElementById("speedValue");
const gearText             = document.getElementById("driveSelector");
const adasText             = document.getElementById("ADASState")
const lowBeamLight         = document.getElementById("lowBeams");
const highBeamLight        = document.getElementById("highBeams");
const brakeLight           = document.getElementById("brakeLight");
const autosteerLight       = document.getElementById("autosteerLight");
const vehicleVisualisation = document.getElementById("carVisualisation");
const adasVisualisation    = document.getElementById("adasVisualisation");
const leftBlinkerLight     = document.getElementById("leftBlinker");
const rightBlinkerLight    = document.getElementById("rightBlinker");

// Données
geoDatas = {
  loc: {lat: null, lon: null, acc: null},
  orientation: null,
  speed: null,
};

vehicleFeaturesDatas = {
    light: 0,      // off, croisement, route
    blinker: 0,    // off, left, right, hasard
    gear: 0,       // park, reverse, neutral, drive
    brake: 2,      // off, hold, park
    autosteer: 0,  // off, available, on
    sensor: 0,     //off, far, medium, close
}


// Fonction génériques d'affichage des informations

// Affichage message d'alerte (et disparition)
function displayMessage(message, type){
    alertText.innerText = message;
    alertBox.style.opacity=1;
    if(type!=1){
        setTimeout(function(){
            alertBox.style.opacity=0;
        }, 5000);
    }
}

function clearMessage(){
    alertBox.style.opacity=0;
}

// Actualisation affichage voyants
function refreshLights(){
    switch(vehicleFeaturesDatas.light){
        case 0:
            lowBeamLight.style.opacity=0;
            highBeamLight.style.opacity=0;
            break;
        case 1:
            lowBeamLight.style.opacity=1;
            highBeamLight.style.opacity=0;
            break;
        case 2:
            lowBeamLight.style.opacity=1;
            highBeamLight.style.opacity=2;
            break;
        default:
            lowBeamLight.style.opacity=0;
            highBeamLight.style.opacity=1;
            highBeamLight.src="sources/images/lights/auto_high_beams.png";
            break;
    };
    switch(vehicleFeaturesDatas.blinker){
        case 0:
            leftBlinkerLight.style.opacity=0;
            rightBlinkerLight.style.opacity=0;
            break;
        case 1:
            leftBlinkerLight.style.opacity=1;
            rightBlinkerLight.style.opacity=0;
            break;
        case 2:
            leftBlinkerLight.style.opacity=0;
            rightBlinkerLight.style.opacity=1;
            break;
        case 3:
            leftBlinkerLight.style.opacity=1;
            rightBlinkerLight.style.opacity=1;
            break;
        default:
            leftBlinkerLight.style.opacity=0;
            rightBlinkerLight.style.opacity=0;
            break;
    };
    switch(vehicleFeaturesDatas.gear){
        case 0:
            gearText.innerHTML = "<span class=\"currentGear\" id=\"park\">P</span><span id=\"reverse\">R</span><span id=\"neutral\">N</span><span id=\"drive\">D</span>";
            break;
        case 1:
            gearText.innerHTML = "<span id=\"park\">P</span><span class=\"currentGear\" id=\"reverse\">R</span><span id=\"neutral\">N</span><span id=\"drive\">D</span>";
            break;
        case 2:
            gearText.innerHTML = "<span id=\"park\">P</span><span id=\"reverse\">R</span><span class=\"currentGear\" id=\"neutral\">N</span><span id=\"drive\">D</span>";
            break;
        case 3:
            gearText.innerHTML = "<span id=\"park\">P</span><span id=\"reverse\">R</span><span id=\"neutral\">N</span><span class=\"currentGear\" id=\"drive\">D</span>";
            break;
        default:
            gearText.innerHTML = "<span class=\"currentGear\" id=\"park\">P</span><span id=\"reverse\">R</span><span id=\"neutral\">N</span><span id=\"drive\">D</span>";
            break;
    };
    switch(vehicleFeaturesDatas.brake){
        case 0:
            brakeLight.style.opacity=0;
            break;
        case 1:
            brakeLight.style.opacity=1;
            brakeLight.src="sources/images/lights/autohold_brake.png";
            break;
        case 2:
            brakeLight.style.opacity=1;
            brakeLight.src = "sources/images/lights/parking_brake.png";
            break;
        default:
            brakeLight.style.opacity=1;
            brakeLight.src = "sources/images/lights/parking_brake.png";
            break;
    };
    switch(vehicleFeaturesDatas.autosteer){
        case 0:
            autosteerLight.style.opacity=0;
            break;
        case 1:
            autosteerLight.style.opacity=1;
            autosteerLight.src="sources/images/adas/gray_steering_wheel.png";
            break;
        case 2:
            autosteerLight.style.opacity=1;
            autosteerLight.src = "sources/images/adas/blue_steering_wheel.png";
            break;
        default:
            autosteerLight.style.opacity=1;
            autosteerLight.src = "sources/images/adas/gray_steering_wheel.png";
            break;
    };
    switch(speedText.innerText){
      case null:
        speedText.innerText = '--';
        break;
      default:
        speedText.innerText = (geoDatas.speed)*3.6;
    }
}
// Actualisation affichage véhicule et ADAS
function refreshADASVisualisation(){
    switch(vehicleFeaturesDatas.autosteer){
        case 0:
            adasVisualisation.style.opacity=0;
            adasText.innerText = 'Désactivé';
            break;
        case 1:
            adasVisualisation.style.opacity=1;
            adasVisualisation.src="sources/images/adas/gray_lanes.png";
            adasText.innerText = 'Autopilot disponible';
            break;
        case 2:
            adasVisualisation.style.opacity=1;
            adasVisualisation.src = "sources/images/adas/blue_lanes.png";
            adasText.innerText = 'Autopilot';
            break;
        default:
            adasVisualisation.style.opacity=1;
            adasVisualisation.src = "sources/images/adas/no_adas.png";
            adasText.innerText = 'Désactivé';
            break;
    };
    switch(vehicleFeaturesDatas.sensor){
        case 0:
            adasVisualisation.style.opacity=0;
            break;
        case 1:
            adasVisualisation.style.opacity=1;
            adasVisualisation.src="sources/images/adas/sensor_far.png";
            break;
        case 2:
            adasVisualisation.style.opacity=1;
            adasVisualisation.src = "sources/images/adas/sensor_medium.png";
            break;
        case 3:
            adasVisualisation.style.opacity=1;
            adasVisualisation.src = "sources/images/adas/sensor_close.png";
            break;
        default:
            adasVisualisation.style.opacity=1;
            adasVisualisation.src = "sources/images/adas/no_adas.png";
            break;
    };
    if(geoDatas.speed <= 2.7){
        vehicleVisualisation.src = "sources/images/adas/up_view_car.png";
    }
    else{
        vehicleVisualisation.src = "sources/images/adas/3rd_person_view_car.png"
    }
}
// Interprétation données

let datasToRefresh = true;
let firstValue = null;
let signalProvided = false;
// Traitement de la position GPS
geoObserver = navigator.geolocation.watchPosition(
  (position) => {
    geoDatas.loc = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
      acc: position.coords.accuracy,
    };
    geoDatas.speed = position.coords.speed;
    geoDatas.orientation = position.coords.heading;
    if(datasToRefresh && geoDatas.loc.lat != null){
        firstValue = geoDatas.loc.lat;
        datasToRefresh = false;
    }
    if(geoDatas.loc.lat!=firstValue && !signalProvided){
        displayMessage('Acquisition des données GPS effective');
        signalProvided = true;
    }
    //alertText.innerText = 'Nouvelles données reçues : ' + geoDatas.loc.lat + ';' + geoDatas.loc.lon;
  },
  (err) => {
    if(err.message=='Timeout expired' || err.message=='Position acquisition timed out'){
        displayMessage('Utilisation de données non actualisées', 1);
    }
    else if(err.message=='User denied geolocation prompt'){
        displayMessage('Localisation inactive ou accès non accordé', 1);
    }
    else{
        displayMessage('Erreurs dans la récupération des données : ' + err.message, 1);
    }
  },
  {
    enableHighAccuracy: true,
    maximumAge:500,
    timeout:1000,
  }
);


// Initialisation 
displayMessage('Initialisation en cours', 1);
// Init voyants
vehicleFeaturesDatas.light=0;
vehicleFeaturesDatas.blinker=0;
vehicleFeaturesDatas.gear=0;
vehicleFeaturesDatas.brake=2;
vehicleFeaturesDatas.autosteer=0;
vehicleFeaturesDatas.sensor=0;
refreshLights();
// Init ADAS
refreshADASVisualisation();
displayMessage('Monitoring actif');
// Attente du premier renouvellement de données
displayMessage('Attente du renouvellement des données GPS...', 1);

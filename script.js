// Récupération de références vers les éléments de l'interface
const alertText = document.getElementById("alertMessage");

// Données
geoDatas = {
  loc: {lat: null, lon: null, acc: null},
  orientation: null,
  speed: null
};

// Traitement
geoObserver = navigator.geolocation.watchPosition(
  (position) => {
    
    geoDatas.loc = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
      acc: position.coords.accuracy,
    },
    geoDatas.speed = position.coords.speed;
    geoDatas.orientation = position.coords.heading;
    alertText.innerText = 'Nouvelles données reçues : ' + geoDatas.loc.lat + ';' + geoDatas.loc.lon;
  },
  (err) => {
    alertText.innerText = 'Erreurs dans la récupération des données' + err.message;
  }
);
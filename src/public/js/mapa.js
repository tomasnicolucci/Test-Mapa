// const dataEstaciones = require('../../../data/estaciones');
// const coord = await dataEstaciones.getCoord();
// const lat = coord.map(e => e.coordenadas.lat);
// const long = coord.map(e => e.coordenadas.long);
// console.log(lat);


var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

L.marker([51.505, -0.09]).bindPopup('Hola').addTo(map);
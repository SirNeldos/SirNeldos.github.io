
// Map info
var mapFile = './aviltar.png';
var mapDim = { "width": 5200, "height": 5200 };
var zoomLevel = -2;

// Create a Leaflet map
var map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -2,
  maxZoom: 4,
  zoomSnap: 0.1,
}).setView([mapDim.height / 2, mapDim.width / 2], zoomLevel);

// Define the URL of the image file
var imageUrl = mapFile;
// Define the geographic bounds of the image overlay
var imageBounds = [[0, 0], [mapDim.height, mapDim.width]];

// Create the image overlay and add it to the map
L.imageOverlay(imageUrl, imageBounds).addTo(map);


// ============ SAVE / LOAD PINS ============== //
loadPins();

function loadPins() {
  fetch('./data.json')
    .then(response => response.json())
    .then(data => {

      // Do something with the loaded data, such as adding markers to the map
      data.forEach(pin => {

        var icon = L.divIcon({
          html: "<div class='my-icon-label'>" + pin.text + "</div>",
          className: 'my-div-icon',
          iconAnchor: [10, 30]
        });

        L.marker(pin.coord, { icon: icon }).addTo(map);
      });
    })
    .catch (error => {
      console.error('Error loading data:', error);
    })
}


// =========== BUTTONS ========== //
// Center Map Button
function centerMap() {
  map.setView([mapDim.height / 2, mapDim.width / 2], zoomLevel);
}

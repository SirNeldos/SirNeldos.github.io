
// Create an array to store pins
var pins = [];
var canPin = false;
var canDeletePin = false;

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

// // load the pins from Local Storage
// function loadPins() {
//   if (localStorage.getItem('pins')) {
//     pins = JSON.parse(localStorage.getItem('pins'));

//     for (let i = 0; i < pins.length; i++) {
//       const pin = pins[i];

//       var icon = L.divIcon({
//         html: "<div class='my-icon-label'>" + pin.text + "</div>",
//         className: 'my-div-icon',
//         iconAnchor: [10, 30]
//       });

//       var marker = L.marker(pin.coord, { icon: icon }).addTo(map);

//       marker.on("click", function () {
//         deleteMarker(i);
//       });
//     }
//   }
// }

function loadPins() {
  fetch('./data.json')
    .then(response => response.json())
    .then(data => {

      console.log('data:', data);

      //pins = JSON.parse(data);

      //console.log('pins:', pins);

      // Do something with the loaded data, such as adding markers to the map
      data.forEach(pin => {
        console.log(pin);

        var icon = L.divIcon({
          html: "<div class='my-icon-label'>" + pin.text + "</div>",
          className: 'my-div-icon',
          iconAnchor: [10, 30]
        });

        var marker = L.marker(pin.coord, { icon: icon }).addTo(map);

        marker.on("click", function () {
          deleteMarker(i);
        });
      });
    })
    .catch (error => {
      console.error('Error loading data:', error);
    })
}



// save the pins to Local Storage
function savePins() {
  localStorage.setItem('pins', JSON.stringify(pins));
}


// =========== BUTTONS ========== //
// Center Map Button
function centerMap() {
  map.setView([mapDim.height / 2, mapDim.width / 2], zoomLevel);
}

// define a function to add a new pin to the map
function addPin() {
  canPin = true;
}

// Delete Pins
function deletePin() {
  canDeletePin = true;
}

// Download JSON File containing Pins
function downloadJSON() {
  // Convert data to JSON string
  const jsonData = JSON.stringify(pins);

  // Save data to a file
  const fileName = 'data.json';
  const fileContent = jsonData;
  const file = new Blob([fileContent], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

// Log pins in console
function logPins() {
  console.log(pins);
}


// ========= ADD PIN ============ //
map.on('click', function (e) {

  if (canPin) {
    // prompt the user to enter text for the popup
    var text = prompt("Enter text for the popup:");

    // create a new pin with a popup
    var icon = L.divIcon({
      html: "<div class='my-icon-label'>" + text + "</div>",
      className: 'my-div-icon',
      iconAnchor: [10, 30]
    });

    L.marker(e.latlng, { icon: icon }).addTo(map);

    var pin = { coord: e.latlng, text: text };
    pins.push(pin);
    savePins();

    for (let id in map._layers) {
      map.removeLayer(map._layers[id]);
    }

    // load in pins from save
    loadPins();

    // Load map
    L.imageOverlay(imageUrl, imageBounds).addTo(map);
  }

  canPin = false;
});



// =========== Delete Pin ========== //

function deleteMarker(index) {

  if (canDeletePin) {

    for (let id in map._layers) {
      map.removeLayer(map._layers[id]);
    }

    // Remove pin from the saved pins
    pins.splice(index, 1);
    savePins();

    // load in pins from save
    loadPins();

    // Lod map
    L.imageOverlay(imageUrl, imageBounds).addTo(map);
  }

  canDeletePin = false;
}

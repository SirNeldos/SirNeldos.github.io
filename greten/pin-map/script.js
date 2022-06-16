// Keep a record of Placed Pins
let PinsList = [];
establishPinListeners();

// If Pin Button is pressed
const pinButton = document.getElementById('pin-button');
pinButton.addEventListener('click', () => {

    // If no Pin is active
    if (document.getElementById('pin') == null) {

        // Build Pin image element
        let pin = document.createElement('div');
        pin.setAttribute('id', 'pin');
        pin.innerHTML = '<img src="../imgs/pin.png" alt="pin" width="30px" height="30px">';
        document.body.appendChild(pin);

        // Have Pin follow mouse
        document.addEventListener('mousemove', movePin);

        function movePin(e) {
            let pos, x, y;
        
            // Prevent other actions that may occur when moving over image
            e.preventDefault();
        
            // Get cursor X and Y positions
            pos = getCursorPos(e);
        
            // Calc position of Pin
            x = pos.x - (pin.offsetWidth / 2);
            y = pos.y - (pin.offsetHeight / 2);
        
            // Set position of the Lens
            pin.style.left = x + 'px';
            pin.style.top = y + 'px';
        
            pin.addEventListener('click', dropPin);
        }

        function dropPin() {
            pStyle = getComputedStyle(pin);
            pin.setAttribute('id', pStyle.left+'|'+pStyle.top);
            pin.setAttribute('class', 'pin-placed');
            pin.removeEventListener('click', dropPin);

            // Add new Pin
            pinsPlacedList(pStyle);

            document.removeEventListener('mousemove', movePin);
            pin = null;
        }
    }
});


// Get Position of the Cursor
function getCursorPos(e) {
    let x = 0, y = 0;
    e = e || window.event;

    // Calc cursor X and Y coordinates relative to image
    x = e.pageX;
    y = e.pageY;

    // Consider page scrolling
    x = x - window.scrollX;
    y = y - window.scrollY;
    return { x: x, y: y };
}

// Add pin to Pins List along with Coordinates
function pinsPlacedList(pin) {
    let map = getComputedStyle(document.getElementById('map'));
    let middle = pxToInt(pin.left) + (pxToInt(pin.width)/2);
    let bottom = pxToInt(pin.top) + (pxToInt(pin.height));

    // Convert pin position into a % of the map image as displayed
    let xPos = Math.round((middle / pxToInt(map.width))*100)/100;
    let yPos = Math.round((bottom / pxToInt(map.height))*100)/100;

    PinsList.push({'name':pin.left+'|'+pin.top, x:xPos, y:yPos});
    establishPinListeners();
    
    console.log(PinsList);
}

// Return String of px as Int
function pxToInt(str) { return parseInt(str.replace('px','')); }

// Establish event Listeners for placed Pins
function establishPinListeners() {
    PinsList.forEach(i => {
        let element = document.getElementById(i.name);
        element.addEventListener('mouseenter', e => {
            pinHovered(i, element)
        });
        element.addEventListener('mouseleave', e => {
            pinLeft(i, element)
        });
        element.addEventListener('click', pinClicked);
    });
}

// Zoom Hovered Pin-Placed
function pinHovered(id, element) {
    let map = getComputedStyle(document.getElementById('map'));
    eStyle = getComputedStyle(element);
    element.style.left = Math.round(id.x*pxToInt(map.width))-5 + 'px';
    element.style.top = Math.round(id.y*pxToInt(map.height))-15 + 'px';
}

// UnZoom UnHovered Pin-Placed
function pinLeft(id, element) {
    let map = getComputedStyle(document.getElementById('map'));
    eStyle = getComputedStyle(element);
    element.style.left = Math.round(id.x*pxToInt(map.width))-eStyle.height+'px';
    element.style.top = Math.round(id.y*pxToInt(map.height))-15+'px';
}

// Pin Edit on click
function pinClicked() {
    console.log('pin clicked');
}
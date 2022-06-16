

let img, lens, result, cx, cy;
img = document.getElementById('map');
result = document.getElementById('map-zoom');

// Create the Lens
lens = document.createElement('div');
lens.setAttribute('class', 'map-zoom-lens');

// Insert the Lens
img.parentElement.insertBefore(lens, img);

// Calc Ratio between Zoomed Map (result) and the Lens
cx = result.offsetWidth / lens.offsetWidth;
cy = result.offsetHeight / lens.offsetHeight;

// Set Background properties for the Zoomed Map (result)
result.style.backgroundImage = "url('" + img.src + "')";
result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";

// Add event listeners when mouse moved over image or lens
lens.addEventListener('mousemove', moveLens);
img.addEventListener('mousemove', moveLens);
lens.addEventListener('touchmove', moveLens);   // For touchscreens
img.addEventListener('touchmove', moveLens);    // For touchscreens

function moveLens(e) {
    let pos, x, y;

    // Prevent other actions that may occur when moving over image
    e.preventDefault();

    // Get cursor X and Y positions
    pos = getCursorPos(e);

    // Calc position of Lens
    x = pos.x - (lens.offsetWidth / 2);
    y = pos.y - (lens.offsetHeight / 2);

    // Prevent Lens from positioning outside the image
    if (x > img.width - lens.offsetWidth) x = img.width - lens.offsetWidth;
    if (x < 0) x = 0;
    if (y > img.height - lens.offsetHeight) y = img.height - lens.offsetHeight;
    if (y < 0) y = 0;

    // Set position of the Lens
    lens.style.left = `calc(${getComputedStyle(img).left} + ${x}px)`;
    lens.style.top = y + "px";

    // Display what the Lens sees
    result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
}

function getCursorPos(e) {
    let a, x = 0, y = 0;
    e = e || window.event;

    // Get X and Y position of the Map
    a = img.getBoundingClientRect();

    // Calc cursor X and Y coordinates relative to image
    x = e.pageX - a.left;
    y = e.pageY - a.top;

    // Consider page scrolling
    x = x - window.scrollX;
    y = y - window.scrollY;
    return { x: x, y: y };
}


// ========= Save Prepared Constructs =========

function clicked(element) {
    if (element.parentElement.classList.contains("prepared")) {
        element.parentElement.classList.remove("prepared");
    } else { element.parentElement.classList.add("prepared"); }
}

// localStorage.removeItem('aPrepared');

// Retrieve saved data on prepared constructs
prepared = localStorage.getItem('aPrepared')

// If there is no save
if (prepared === null) {
    localStorage.setItem('aPrepared', []); // Create a save file
    prepared = []; // Create an empty array for data to be stored
} // If there is a save file already
else {
    prepared = prepared.split(",") // Load the existing array
}

// Create an array containing all elements defined as clickable
let selector = document.querySelectorAll(".clickable");

// Loop through all elements defined as clickable
selector.forEach(function (div) {
    // Add an event listener to all these elements
    div.addEventListener("click", function () {
        // If event listener is triggered:

        localStorage.removeItem('aPrepared');   // Delete old cache data
        prepared = [];  // Empty array too
        selector.forEach(function (elementById) {
            if (elementById.classList.contains("prepared")) prepared.push(elementById.id);
        });

        // Save new array to cache
        localStorage.setItem('aPrepared', prepared);
    });

    if (prepared.indexOf(div.id) != -1) {
        div.classList.add("prepared");
    }

});



// ========= Collapsable =========

// Create an array containing all elements defined as collapsible
let coll = document.querySelectorAll(".collapsible");
console.log(coll);

coll.forEach(function(div) {
    div.addEventListener("clickReady", function() {
        this.classList.toggle("activated");
        let content = this.nextElementSibling;
        if (content.style.maxHeight != null) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});
// ========= Load Prepared Constructs =========

// Retrieve saved data on prepared constructs
prepared = localStorage.getItem('aPrepared')

// If there is no save
if (prepared === null) {
    localStorage.setItem('aPrepared', []); // Create a save file
    prepared = []; // Create an empty array for data to be stored
}

// If there is a save file already
else {
    prepared = prepared.split(",") // Load the existing array
}

console.log(prepared);


// ========= Collapsable =========

// Create an array containing all elements defined as collapsible
let collapsible = document.querySelectorAll(".collapsible");

// For each collapsible element:
collapsible.forEach(function (element) {
    element.addEventListener("click", function () {
        // If clicked on, toggle active status
        this.classList.toggle("activated");

        let content = this.nextElementSibling;

        if (content.style.maxHeight != 0) {
            content.style.maxHeight = null;
            content.style.paddingBottom = null;
            content.style.borderBottom = '0px';
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            content.style.border = null;
            content.style.paddingBottom = '15px';
        }
    });
});



// ========== Prepared Constructs ===========
collapsible.forEach(function (my) {
    let wand = my.nextElementSibling.querySelector('.preparable');
    wand.addEventListener("click", function () {
        // Update styles to reflect the Construct is prepared
        my.classList.toggle("prepared-top");
        my.nextElementSibling.classList.toggle("prepared-bottom");

        // Delete old cache data
        localStorage.removeItem('aPrepared');
        prepared = [];

        // Repopulate array w/ new data
        collapsible.forEach(function (m) {
            if (m.classList.contains("prepared-top")) { prepared.push(m.textContent); }
        });

        // Save new array to cache
        localStorage.setItem('aPrepared', prepared);
    });

    // Ensure all prepared items show on page-load
    if (prepared.indexOf(my.textContent) != -1) {
        my.classList.add("prepared-top");
        my.nextElementSibling.classList.add("prepared-bottom");
        my.nextElementSibling.style.borderBottom = '0px';
    }
});



// ========== Show Spell ===========
collapsible.forEach(function (my) {
    let eye = my.nextElementSibling.querySelector('.view-spell');
    eye.addEventListener("click", function () {

        // Toggle hidden content
        my.nextElementSibling.querySelector('.construct-info').classList.toggle('hidden');
        my.nextElementSibling.querySelector('.spell-info').classList.toggle('hidden');
        // Resize element to suit new content
        my.nextElementSibling.style.maxHeight = my.nextElementSibling.scrollHeight + "px"
    });
});








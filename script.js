// ========= Load Prepared Constructs =========

// Retrieve saved data on prepared constructs
prepared = localStorage.getItem('aPrepared');

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


// ============= Insert SVGS ===================

// Create an array containing all elements defined as options
let options = document.querySelectorAll(".options");

// Loop through all instances of the Options Class (every construct)
options.forEach(function (my) {

    // Find the <object> child of the two children: 'preparable' & 'view-spell'
    let preparable = my.querySelector('.preparable').querySelector('object');
    let viewSpell = my.querySelector('.view-spell').querySelector('object');

    preparable.innerHTML = `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M4.38 5h1V4h1V3h-1V2h-1v1h-1v1h1v1zm8 4h-1v1h-1v1h1v1h1v-1h1v-1h-1V9zM14 2V1h-1v1h-1v1h1v1h1V3h1V2h-1zm-2.947 2.442a1.49 1.49 0 0 0-2.12 0l-7.49 7.49a1.49 1.49 0 0 0 0 2.12c.59.59 1.54.59 2.12 0l7.49-7.49c.58-.58.58-1.53 0-2.12zm-8.2 8.9c-.2.2-.51.2-.71 0-.2-.2-.2-.51 0-.71l6.46-6.46.71.71-6.46 6.46zm7.49-7.49l-.32.32-.71-.71.32-.32c.2-.2.51-.2.71 0 .19.2.19.52 0 .71z" /></svg>`
    viewSpell.innerHTML = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 512 512"><g><g><path fill="currentColor" d="m251.6,185.7c-36.9,0-67,31.5-67,70.3 0,38.7 30,70.3 67,70.3 36.9,0 67-31.5 67-70.3 0-38.7-30.1-70.3-67-70.3z" /><path fill="currentColor" d="m251.6,367.1c-59.4,0-107.8-49.8-107.8-111.1 0-61.3 48.4-111.1 107.8-111.1s107.8,49.8 107.8,111.1c0,61.3-48.4,111.1-107.8,111.1zm246.3-121.9c-63.8-102.4-149.8-158.8-241.9-158.8-92.1,0-178.1,56.4-241.9,158.8-4.1,6.6-4.1,15 0,21.6 63.8,102.4 149.8,158.8 241.9,158.8 92.1,0 178-56.4 241.9-158.8 4.1-6.6 4.1-15 0-21.6z" /></g></g></svg>`
});





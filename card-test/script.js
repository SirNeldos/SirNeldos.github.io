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
let preparedAbove = document.getElementById('prepared-above');

collapsible.forEach(function(my) {
    let wand = my.nextElementSibling.querySelector('.preparable');
    wand.addEventListener("click", function() {
        my.classList.toggle("prepared-top");
        my.nextElementSibling.classList.toggle("prepared-bottom");

        document.body.insertBefore(my.parentElement, preparedAbove);
    });
});



// ========== Show Spell ===========
collapsible.forEach(function(my) {
    let eye = my.nextElementSibling.querySelector('.view-spell');
    eye.addEventListener("click", function() {
        
        // Toggle hidden content
        my.nextElementSibling.querySelector('.construct-info').classList.toggle('hidden');
        my.nextElementSibling.querySelector('.spell-info').classList.toggle('hidden');
        // Resize element to suit new content
        my.nextElementSibling.style.maxHeight = my.nextElementSibling.scrollHeight + "px"
    });
});
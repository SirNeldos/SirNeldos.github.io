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



// ========== Border Prepared ===========
collapsible.forEach(function(my) {
    let eye = my.nextElementSibling.querySelector('.preparable');
    eye.addEventListener("click", function() {
        my.classList.toggle("prepared-top");
        my.nextElementSibling.classList.toggle("prepared-bottom");
    });
});
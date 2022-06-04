
const heldIngredients = document.querySelector('.selectable').querySelectorAll("li");

var selected = [];

// ============ Cauldron: Listen for ingredients to be clicked =============
heldIngredients.forEach(function (li) {

    li.addEventListener('click', function () {

        if (li.classList.contains('selected')) {
            li.classList.remove('selected');
            if (selected.length > 0) {
                selected.splice(selected.indexOf(li.innerHTML), 1);
            }
        } else {
            if (selected.length < 3) {
                li.classList.add('selected');
                selected.push(li.innerHTML);
            }
        }

        console.log(selected);

        if (selected.length >= 3) displayConstruct();
        else hideConstruct();

    });

});


// ============== Populate Construct ====================
const constructData = document.querySelector('#construct-data');

function displayConstruct() {

    let html = `<ul>`;

    for (const x of selected) {
        html += `<li>${x}</li>`;
    }

    html += `</ul>`;

    constructData.innerHTML = html;
}

function hideConstruct() {
    constructData.innerHTML = '';
}


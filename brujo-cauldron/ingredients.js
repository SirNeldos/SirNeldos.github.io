

// ========= Load Prepared Constructs =========

// Retrieve saved data on prepared constructs
let myIngredients = localStorage.getItem('myIngredients');

// If there is no save
if (myIngredients === null) {
    localStorage.setItem('myIngredients', []); // Create a save file
    myIngredients = []; // Create an empty array for data to be stored
}

// If there is a save file already
else {
    // Load the existing array
    if (myIngredients.length >= 1) myIngredients = JSON.parse(myIngredients);
}

myIngredients.sort(function (a, b) { return a.name.localeCompare(b.name) });



// ================= Ingredient Builder: Amorphous Options ===============
// Get a list of SELECT Tags in ingredient builder
const selectList = Array.from(document.querySelectorAll("#ingredients-table select"));

// Creat event listener for each select element
selectList.forEach(selectElement => {

    // == Populate lists on page load == 
    // Iterate over every Select dropdown after this one
    for (let i = 1; i < selectList.length; i++) {

        // Init the variable that will hold the default option for dropDown
        let defaultValue = 'err';

        // Create an array of options fer each dropDown menu
        const optionList = Array.from(selectList[i].querySelectorAll('option'));

        // Iterate through each option for each dropDown menu
        optionList.forEach(optionElement => {

            // Remove 'hide' class from all dropDowns below
            optionElement.classList.remove('hide');

            // Set the default variable for this dropdown
            if (optionElement.classList.contains('default')) {
                defaultValue = optionElement.value;
            }

            // Hide element if has class == 'common'
            if (optionElement.classList.contains('common')) {
                optionElement.classList.add('hide');
            }
        });

        // Set the dropdown value with the stored default value
        selectList[i].value = defaultValue;
    }


    selectElement.addEventListener('change', () => {

        let valueList = [];

        // Get values from all dropDowns above and including this one
        for (let i = 0; i <= selectList.indexOf(selectElement); i++) {
            valueList.push(selectList[i].value);
        }

        // Iterate over every Select dropdown after this one
        for (let i = selectList.indexOf(selectElement) + 1; i < selectList.length; i++) {

            // Init the variable that will hold the default option for dropDown
            let defaultValue = 'err';

            // Create an array of options fer each dropDown menu
            const optionList = Array.from(selectList[i].querySelectorAll('option'));

            // Iterate through each option for each dropDown menu
            optionList.forEach(optionElement => {

                // Remove 'hide' class from all dropDowns below
                optionElement.classList.remove('hide');

                // Set the default variable for this dropdown
                if (optionElement.classList.contains('default')) {
                    defaultValue = optionElement.value;
                }

                // Hide element if has class == to any in valueList
                for (let j = 0; j < valueList.length; j++) {

                    if (optionElement.classList.contains(valueList[j])) {
                        optionElement.classList.add('hide');
                    }
                }
            });

            // Set the dropdown value with the stored default value
            selectList[i].value = defaultValue;
        }
    });
});





// =============== Save Ingredient ===================

const saveButton = document.getElementById('save-button');
const replaceButton = document.getElementById('replace-button');

saveButton.addEventListener('click', () => {

    let obj = buildObjectToSave();

    // What if there's an ingredient with same name
    let noCopy = true;
    myIngredients.forEach(i => {
        // Ask to replace Ingredient if it exists
        if (i.name == obj.name) {
            replaceButton.parentNode.parentNode.classList.remove('hide');
            noCopy = false;
        }
    });

    if (noCopy) saveIngredient(obj);
});

replaceButton.addEventListener('click', e => {

    let obj = buildObjectToSave();

    myIngredients.forEach(i => {
        // Replace Ingredient in Bag w/ same name
        if (i.name == obj.name) {
            myIngredients.splice(myIngredients.indexOf(i), 1);
        }
    });

    saveIngredient(obj);
});

function buildObjectToSave() {
    let obj = {};

    obj.name = document.getElementById('name').value;
    obj.alive = document.getElementById('alive').checked;
    if (isNaN(parseInt(document.getElementById('quantity').value))) obj.quantity = 1;
    else obj.quantity = parseInt(document.getElementById('quantity').value);
    obj.school = document.getElementById('school').value;
    obj.effect = document.getElementById('effect').value;
    obj.condition = document.getElementById('condition').value;
    obj.type = document.getElementById('type').value;
    obj.area = document.getElementById('area').value;
    obj.speed = document.getElementById('speed').value;
    obj.duration = document.getElementById('duration').value;
    obj.range = document.getElementById('range').value;
    obj.radius = document.getElementById('radius').value;
    obj.rarity = document.getElementById('rarity').value;
    obj.special = document.getElementById('special').value;

    return obj;
}

function saveIngredient(obj) {
    // Save new array to cache
    myIngredients.push(obj);
    localStorage.setItem('myIngredients', JSON.stringify(myIngredients));

    // Clear Form by Refreshing Page
    location.reload();
}



// =========== Populate the backpack =================
const backpack = document.getElementById('backpack');
let bagText = '';

myIngredients.forEach(i => {

    bagText += '<div class="flex-elements">'
    bagText += `<input type="checkbox" name="${i.name}" id="add-${kebabCase(i.name)}" class="cauldron-check">`
    bagText += `<h3 class="dropdown" id="${kebabCase(i.name)}">${i.name}</h3></div>`;
    bagText += '<table class="hidden"><tr><td id="center-align" colspan="2"><div style="justify-content: center;" class="flex-elements">';
    bagText += `<button class="sml-button" id="minus-${kebabCase(i.name)}">-</button>`
    bagText += `<p>${i.quantity}</p>`;
    bagText += `<button class="sml-button" id="plus-${kebabCase(i.name)}">+</button></div></td></tr>`;
    let tempString = '';
    if (i.alive) tempString = 'Has Soul';
    else tempString = 'Soulless';
    bagText += `<tr><td id="center-align" colspan="2">${tempString}</td></tr>`;
    bagText += `<tr><td>School:</td><td>${schoolSwitch(i.school)}</td></tr>`;
    bagText += `<tr><td>Effect:</td><td>${effectSwitch(i.effect)}</td></tr>`;
    bagText += `<tr><td>Condition:</td><td>${i.condition}</td></tr>`;
    bagText += `<tr><td>Elemental Type:</td><td>${i.type}</td></tr>`;
    bagText += `<tr><td>Area Style:</td><td>${i.area}</td></tr>`;
    bagText += `<tr><td>Casting Time:</td><td>${i.speed}</td></tr>`;
    bagText += `<tr><td>Effect Duration:</td><td>${i.duration}</td></tr>`;
    bagText += `<tr><td>Casting Range:</td><td>${i.range}</td></tr>`;
    bagText += `<tr><td>Area of Effect:</td><td>${i.radius}</td></tr>`;
    bagText += `<tr><td>Rarity:</td><td>${i.rarity}</td></tr>`;
    if (i.special != '') bagText += `<tr><td>Special / Note:</td><td>${i.special}</td></tr>`;
    bagText += `<tr><td id="center-align" colspan="2"><button type="button" id="edit-${kebabCase(i.name)}-button">edit</button></td></tr>`;
    bagText += `<tr><td id="center-align" colspan="2"><button type="button" id="remove-${kebabCase(i.name)}-button">remove</button></td></tr>`;
    bagText += '</table>';
});

backpack.innerHTML += bagText;



// ============= Ingredient Quantity ===========
myIngredients.forEach(i => {

    // Add Minus Event Listener
    const minusButton = document.getElementById(`minus-${kebabCase(i.name)}`);
    minusButton.addEventListener('click', () => {
        if (i.quantity > 0) {
            i.quantity--;
            localStorage.setItem('myIngredients', JSON.stringify(myIngredients));
            minusButton.parentElement.children[1].innerHTML = i.quantity;
        }
    });

    // Add Minus Event Listener
    const plusButton = document.getElementById(`plus-${kebabCase(i.name)}`);
    plusButton.addEventListener('click', () => {
        i.quantity++;
        localStorage.setItem('myIngredients', JSON.stringify(myIngredients));
        plusButton.parentElement.children[1].innerHTML = i.quantity;
    });

});


// ============= Remove Ingredients ============
myIngredients.forEach(i => {

    // Add button Event Listeners
    document.getElementById(`remove-${kebabCase(i.name)}-button`).addEventListener('click', () => {
        myIngredients.splice(myIngredients.indexOf(i), 1);
        localStorage.setItem('myIngredients', JSON.stringify(myIngredients));

        // Refresh Page
        location.reload();
    });
});



// ============= Edit Ingredients ============
myIngredients.forEach(i => {

    // Add button Event Listeners
    document.getElementById(`edit-${kebabCase(i.name)}-button`).addEventListener('click', () => {

        // Populate Ingredient Builder
        document.getElementById('name').value = i.name;
        document.getElementById('alive').checked = i.alive;
        document.getElementById('quantity').value = i.quantity;
        document.getElementById('rarity').value = i.rarity;
        document.getElementById('school').value = i.school;
        document.getElementById('effect').value = i.effect;
        document.getElementById('condition').value = i.condition;
        document.getElementById('type').value = i.type;
        document.getElementById('area').value = i.area;
        document.getElementById('speed').value = i.speed;
        document.getElementById('duration').value = i.duration;
        document.getElementById('range').value = i.range;
        document.getElementById('radius').value = i.range;
        document.getElementById('special').value = i.special;

        // Unhide Ingredient Builder if Hidden
        const dd = document.getElementById('ingredient-block');
        dd.children[0].classList.add('selected');
        dd.children[1].classList.remove('hidden');
    });
});



// ============ Select Ingredients =============

// Initialise the list of selected Cauldron Ingredients
const ingredients = document.querySelectorAll('.cauldron-check');

let selectedI = [];
let iLimit = 4;
let alive = 0;

// Add a Listener for if an Ingredient Checkbox is checked
ingredients.forEach(e => {
    e.addEventListener('change', () => {

        // Are we removing or adding it?
        // == Adding
        if (e.checked) {
            if (selectedI.length < iLimit) {
                selectedI.push(e.name);
                document.getElementById(kebabCase(e.name)).classList.add('highlight');
                updateCauldron();
            } else e.checked = false;
        } else { // == Removing    
            selectedI.splice(selectedI.indexOf(e.name), 1);
            document.getElementById(kebabCase(e.name)).classList.remove('highlight');
            updateCauldron();
        }
    });
});


function updateCauldron() {
    let alive = 0;
    let quantity = 0;
    let amount = selectedI.length;
    let specialText = '';

    // Populate a list of ingredient objects based on the list selected ingredients
    let cauldronI = [];
    selectedI.forEach(i => {
        myIngredients.forEach(j => {
            if (i == j.name) cauldronI.push(j);
        });
    });

    // Sort cauldron ingredients alphabetically
    cauldronI.sort(function (a, b) { return a.name.localeCompare(b.name) });

    // Empty Cauldron before repopulating
    clearCauldron();

    // Display Ingredients from selectedI list
    cauldronI.forEach(i => {
        let tempText = '';

        document.getElementById("display-name").innerHTML += `<td>${i.name}</td>`;

        // Increment Soul Count
        if (i.alive) alive++;

        // Get Soul Status Text
        if (i.alive == true) tempText = 'Has Soul';
        else tempText = 'Soulless'
        document.getElementById("display-alive").innerHTML += `<td>${tempText}</td>`;

        // Check if each has at least 1 quantity
        if (i.quantity > 0) quantity ++;
        document.getElementById("display-quantity").innerHTML += `<td>x${i.quantity}</td>`;
        document.getElementById("display-rarity").innerHTML += `<td>${i.rarity}</td>`;
        document.getElementById("display-school").innerHTML += `<td>${schoolSwitch(i.school)}</td>`;
        document.getElementById("display-effect").innerHTML += `<td>${effectSwitch(i.effect)}</td>`;
        document.getElementById("display-condition").innerHTML += `<td>${i.condition}</td>`;
        document.getElementById("display-type").innerHTML += `<td>${i.type}</td>`;
        document.getElementById("display-area").innerHTML += `<td>${i.area}</td>`;
        document.getElementById("display-speed").innerHTML += `<td>${i.speed}</td>`;
        document.getElementById("display-duration").innerHTML += `<td>${i.duration}</td>`;
        document.getElementById("display-range").innerHTML += `<td>${i.range}</td>`;
        document.getElementById("display-radius").innerHTML += `<td>${i.radius}</td>`;

        // Check if Ingredients have special attribute
        if (i.special != '') specialText++;
        document.getElementById("display-special").innerHTML += `<td>${i.special}</td>`;
    });

    // If there is no special info, don't display the row
    if (specialText <= 0) document.getElementById("display-special").innerHTML = '';

    // Display Construct Button
    if (amount >= 4 && alive > 0 && quantity >= 4) {
        let cb = document.getElementById("construct-button");
        cb.innerHTML = '<td colspan="4"><button>Grow Construct</button></td>';

        // Add EVent Listener
        cb.querySelector('button').addEventListener('click', () => {
            document.getElementById('construct-block').classList.remove('hidden');
            myIngredients.forEach(i => {
                cauldronI.forEach(j => {
                    if (i == j) {
                        i.quantity--;
                        document.getElementById(`minus-${kebabCase(i.name)}`).parentElement.children[1].innerHTML = i.quantity;
                        console.log('decrement occurring');
                    }
                });
            });

            localStorage.setItem('myIngredients', JSON.stringify(myIngredients));
            document.querySelectorAll('#display-quantity td').forEach(i => {
                i.innerHTML = `x${parseInt(i.innerHTML.slice(1))-1}`;
            })

            growConstruct(cauldronI);
        });
    } else {
        document.getElementById("construct-button").innerHTML = '';
        document.getElementById('construct-block').classList.add('hidden');
        document.getElementById('construct-block').innerHTML = '<h2>Construct</h2>';
    }
}

// Clear previous Cauldron Data
function clearCauldron() {
    document.getElementById("display-name").innerHTML = '';
    document.getElementById("display-alive").innerHTML = '';
    document.getElementById("display-quantity").innerHTML = '';
    document.getElementById("display-rarity").innerHTML = '';
    document.getElementById("display-school").innerHTML = '';
    document.getElementById("display-effect").innerHTML = '';
    document.getElementById("display-condition").innerHTML = '';
    document.getElementById("display-type").innerHTML = '';
    document.getElementById("display-area").innerHTML = '';
    document.getElementById("display-speed").innerHTML = '';
    document.getElementById("display-duration").innerHTML = '';
    document.getElementById("display-range").innerHTML = '';
    document.getElementById("display-radius").innerHTML = '';
    document.getElementById("display-special").innerHTML = '';
}



// ========== Grow Construct =============
function growConstruct(cauldronList) {
    const cb = document.getElementById('construct-block');

    let text = '<p><p>';
    let names = [], rarities = [], schools = [], effects = [],
        types = [], areas = [], speeds = [], durations = [],
        ranges = [], radii = [], specials = [], conditions = [];

    cauldronList.forEach(e => {
        names.push(e.name);             // Done
        rarities.push(e.rarity);        // Done
        schools.push(e.school);         // Done
        types.push(e.type);             // Done
        areas.push(e.area);             // Done
        speeds.push(e.speed);           // Done
        durations.push(e.duration);     // Done
        ranges.push(e.range);           // Done
        radii.push(e.radius);           // Done
    });

    text += '<span class="italics">';

    // Get Level of Construct
    text += levelByRarity(rarities);

    // Get School of Construct
    let mySchool = modeRandom(schools);
    text += `${schoolSwitch(mySchool)} spell</span><br>`;

    // Limit effects List to School
    cauldronList.forEach(e => {
        if (e.school == mySchool) effects.push(e.effect);       // Done
        if (e.school == mySchool) specials.push(e.special);     // Done
    });


    // Write Ingredients
    names = names.sort(function (a, b) { return a.localeCompare(b) });
    text += '<span class="bold">Ingredients:</span> ';
    for (let i = 0; i < names.length; i++) text += `${names[i]}, `;
    text = text.slice(0, -2);
    text += '<br>'

    // Get Casting Time info
    text += `<span class="bold">Casting Time:</span> ${averageSpeeds(speeds)}<br>`;

    // Duration
    text += `<span class="bold">Duration:</span> ${averageDurations(durations)}<br>`;

    // Get Range info
    let myRange = averageRanges(ranges);
    if (myRange != 'dont show') {
        text += `<span class="bold">Casting Range:</span> ${myRange}<br>`;
    }

    // Get Area Style
    let myArea = modeRandom(areas);
    text += `<span class="bold">Area Style:</span> ${areasResponse(myArea)}<br>`;

    // Get Effect Radius
    if (!(myArea == 'self' || myArea == 'target')) {
        text += `<span class="bold">Effect Radius:</span> ${averageRadii(radii)}<br>`;
    }

    // Elemental Type
    text += `<span class="bold">Elemental Type:</span> ${modeRandom(types)}<br>`;

    // Effect & Condition
    let myEffect = modeRandom(effects);
    
    // Limit Condition List to Effect
    cauldronList.forEach(e => {
        if (e.effect == myEffect) conditions.push(e.condition);    // Done
    });
    
    text += `<span class="bold">Effect:</span> ${modeRandom(conditions)} ${effectResponse(myEffect)}<br>`;

    // Dice
    let mySouls = 0;
    cauldronList.forEach(e => { if (e.alive) mySouls++; });
    text += `<span class="bold">Dice:</span> ${rarityText(rarities, mySouls)}<br>`;

    // Print any special info
    if (specials[0] != '') text += '<span class="bold italics">Special:</span>';
    specials.forEach(e => { if (e != '') text += `<br><span class="italics"> - ${e}</span>`; });

    cb.innerHTML += text + '</p></p>';
}



// ============ Random Functions ==============
function kebabCase(str) {
    return str.split(' ').map(function (word) {
        // lowercase all the chars.
        return word.toLowerCase();
    }).join('-');
};


// ======================= Math Type Functions ========================
// == Find Mode or Random of Array ==
function modeRandom(a) {

    // Remove all occurrences of 'none' in array
    for (let i = a.length - 1; i >= 0; i--) {
        if (a[i] == 'none') a.splice(i, 1);
    }

    // If Array is Empty
    if (a.length == 0) return '';

    // Create an array to count duplicates
    let count = [];
    for (let i = 0; i < a.length; i++) count.push(0);

    // Populate the count array
    for (let i = 0; i < a.length; i++) {
        let testing = a[i];

        for (let j = 0; j < a.length; j++) if (a[j] == testing) count[i]++;
    }

    // Compare the count array and further categorize
    let doubles = 0
    let singles = 0
    for (let i = 0; i < count.length; i++) {
        if (count[i] >= 3) return a[i]; // Return clear winner
        if (count[i] == 2) doubles++;
        if (count[i] == 1) singles++;
    }

    // Return the value
    if (doubles == 2) return a[count.indexOf(2)];
    if (doubles == count.length || singles == count.length) {
        return a[randomRange(count.length) - 1];
    }

    return "couldn't find one";
}

// == Find Mode or RoundUp(Average) Array ==
function modeAvUp(a) {
    if (a.length == 0) return 'Empty Array';

    let count = [0, 0, 0, 0];

    for (let i = 0; i < a.length; i++) {
        let testing = a[i];

        for (let j = 0; j < a.length; j++) if (a[j] == testing) count[i]++;
    }

    let doubles = 0
    let singles = 0
    for (let i = 0; i < count.length; i++) {
        if (count[i] >= 3) return a[i];
        if (count[i] == 2) doubles++;
        if (count[i] == 1) singles++;
    }

    if (doubles == 2 && singles == 2) return a[count.indexOf(2)];
    if (doubles == 4 || singles == 4) return a[Math.ceil((parseInt(a[0]) + parseInt(a[1]) + parseInt(a[2]) + parseInt(a[3])) / 4)]

    return "couldn't find one";


}

// == Find Average of Array ==
function average(a) {
    return sum(a) / 4;
}

// == Average of Speeds ==
function averageSpeeds(list) {
    let total = 0;

    list.forEach(i => {

        switch (i) {
            case 'reaction':
                total += 1;
                break;
            case 'bonus action':
                total += 2;
                break;
            case 'action':
                total += 3;
                break;
            case '1 round':
                total += 5;
                break;
            case '1 minute':
                total += 10;
                break;
            case '1 hour':
                total += 20;
                break;

            default:
                console.log(i);
                return 'Err: Invalid Casting Time => Check Console';
        }
    })

    let average = total / list.length;
    let closest = Math.abs(20 - average);
    let text = '1 Hour';

    if (Math.abs(10 - average) < closest) {
        closest = Math.ceil(Math.abs(10 - average));
        text = '1 Minute';
    }
    if (Math.abs(5 - average) < closest) {
        closest = Math.ceil(Math.abs(5 - average));
        text = '1 Round';
    }
    if (Math.abs(3 - average) < closest) {
        closest = Math.ceil(Math.abs(3 - average));
        text = '1 Action';
    }
    if (Math.abs(2 - average) < closest) {
        closest = Math.ceil(Math.abs(2 - average));
        text = '1 Bonus Action';
    }
    if (Math.abs(1 - average) < closest) {
        closest = Math.ceil(Math.abs(1 - average));
        text = '1 Reaction';
    }

    return text;
}

// == Average of Durations ==
function averageDurations(list) {
    let total = 0;

    list.forEach(i => {

        switch (i) {
            case 'instantaneous':
                total += 1;
                break;
            case '1 round':
                total += 3;
                break;
            case '1 minute':
                total += 6;
                break;
            case '10 minutes':
                total += 10;
                break;
            case '1 hour':
                total += 20;
                break;
            case '8 hours':
                total += 30;
                break;
            case '24 hours':
                total += 40;
                break;
            case 'from - until':
                total += 50;
                break;
            case 'permanent':
                total += 200;
                break;

            default:
                console.log(i);
                return 'Err: Invalid Duration => Check Console';
        }
    })

    let average = total / list.length;
    let closest = Math.abs(200 - average);
    let text = 'Permanent';

    if (Math.abs(50 - average) < closest) {
        closest = Math.ceil(Math.abs(50 - average));
        text = 'From _______ Until _______';
    }
    if (Math.abs(40 - average) < closest) {
        closest = Math.ceil(Math.abs(40 - average));
        text = '24 Hours';
    }
    if (Math.abs(30 - average) < closest) {
        closest = Math.ceil(Math.abs(30 - average));
        text = '8 Hours';
    }
    if (Math.abs(20 - average) < closest) {
        closest = Math.ceil(Math.abs(20 - average));
        text = '1 Hour';
    }
    if (Math.abs(10 - average) < closest) {
        closest = Math.ceil(Math.abs(10 - average));
        text = '10 Minutes';
    }
    if (Math.abs(6 - average) < closest) {
        closest = Math.ceil(Math.abs(6 - average));
        text = '1 Minute';
    }
    if (Math.abs(3 - average) < closest) {
        closest = Math.ceil(Math.abs(3 - average));
        text = '1 Round';
    }
    if (Math.abs(1 - average) < closest) {
        closest = Math.ceil(Math.abs(1 - average));
        text = 'Instantaneous';
    }

    return text;
}

// == Average of Ranges ==
function averageRanges(list) {
    let total = 0;

    list.forEach(i => {

        switch (i) {
            case '5ft.':
                total += 1;
                break;
            case '15ft.':
                total += 3;
                break;
            case '30ft.':
                total += 6;
                break;
            case '60ft.':
                total += 10;
                break;
            case '120ft.':
                total += 20;
                break;
            case '1km':
                total += 30;
                break;
            case '5km':
                total += 40;
                break;
            case '20km':
                total += 50;
                break;
            case '100km':
                total += 60;
                break;
            case 'anywhere':
                total += 100;
                break;

            default:
                console.log(i);
                return 'Err: Invalid Duration => Check Console';
        }
    })

    let average = total / list.length;
    let closest = Math.abs(100 - average);
    let text = 'Anywhere';

    if (Math.abs(60 - average) < closest) {
        closest = Math.ceil(Math.abs(60 - average));
        text = '100km';
    }
    if (Math.abs(50 - average) < closest) {
        closest = Math.ceil(Math.abs(50 - average));
        text = '20km';
    }
    if (Math.abs(40 - average) < closest) {
        closest = Math.ceil(Math.abs(40 - average));
        text = '5km';
    }
    if (Math.abs(30 - average) < closest) {
        closest = Math.ceil(Math.abs(30 - average));
        text = '1km';
    }
    if (Math.abs(20 - average) < closest) {
        closest = Math.ceil(Math.abs(20 - average));
        text = '120ft.';
    }
    if (Math.abs(10 - average) < closest) {
        closest = Math.ceil(Math.abs(10 - average));
        text = '60ft.';
    }
    if (Math.abs(6 - average) < closest) {
        closest = Math.ceil(Math.abs(6 - average));
        text = '30ft.';
    }
    if (Math.abs(3 - average) < closest) {
        closest = Math.ceil(Math.abs(3 - average));
        text = '15ft.';
    }
    if (Math.abs(1 - average) < closest) {
        closest = Math.ceil(Math.abs(1 - average));
        text = 'dont show';
    }

    return text;
}

// == Average of Durations ==
function averageDurations(list) {
    let total = 0;

    list.forEach(i => {

        switch (i) {
            case 'instantaneous':
                total += 1;
                break;
            case '1 round':
                total += 3;
                break;
            case '1 minute':
                total += 6;
                break;
            case '10 minutes':
                total += 10;
                break;
            case '1 hour':
                total += 20;
                break;
            case '8 hours':
                total += 30;
                break;
            case '24 hours':
                total += 40;
                break;
            case 'from - until':
                total += 50;
                break;
            case 'permanent':
                total += 200;
                break;

            default:
                console.log(i);
                return 'Err: Invalid Duration => Check Console';
        }
    })

    let average = total / list.length;
    let closest = Math.abs(200 - average);
    let text = 'Permanent';

    if (Math.abs(50 - average) < closest) {
        closest = Math.ceil(Math.abs(50 - average));
        text = 'From _______ Until _______';
    }
    if (Math.abs(40 - average) < closest) {
        closest = Math.ceil(Math.abs(40 - average));
        text = '24 Hours';
    }
    if (Math.abs(30 - average) < closest) {
        closest = Math.ceil(Math.abs(30 - average));
        text = '8 Hours';
    }
    if (Math.abs(20 - average) < closest) {
        closest = Math.ceil(Math.abs(20 - average));
        text = '1 Hour';
    }
    if (Math.abs(10 - average) < closest) {
        closest = Math.ceil(Math.abs(10 - average));
        text = '10 Minutes';
    }
    if (Math.abs(6 - average) < closest) {
        closest = Math.ceil(Math.abs(6 - average));
        text = '1 Minute';
    }
    if (Math.abs(3 - average) < closest) {
        closest = Math.ceil(Math.abs(3 - average));
        text = '1 Round';
    }
    if (Math.abs(1 - average) < closest) {
        closest = Math.ceil(Math.abs(1 - average));
        text = 'Instantaneous';
    }

    return text;
}

// == Average of Ranges ==
function averageRadii(list) {
    let total = 0;

    list.forEach(i => {

        switch (i) {
            case '5ft.':
                total += 5;
                break;
            case '10ft.':
                total += 10;
                break;
            case '15ft.':
                total += 15;
                break;
            case '20ft.':
                total += 20;
                break;
            case '25ft.':
                total += 25;
                break;
            case '30ft.':
                total += 30;
                break;
            case '35ft.':
                total += 35;
                break;

            default:
                console.log(i);
                return 'Err: Invalid Radii => Check Console';
        }
    })

    let average = Math.ceil((total / list.length)/5)*5;
    return `${average}ft.`;
}

// == Average of Ranges ==
function rarityText(list, souls) {
    let total = 0;

    list.forEach(i => {

        switch (i) {
            case 'common':
                total += 1;
                break;
            case 'uncommon':
                total += 2;
                break;
            case 'rare':
                total += 3;
                break;
            case 'epic':
                total += 4;
                break;
            case 'unheard':
                total += 5;
                break;

            default:
                console.log(i);
                return 'Err: Invalid Rarity => Check Console';
        }
    })

    let prof = Math.ceil(document.getElementById('brujo-level').value / 4) + 1;
    let herbSkill = document.getElementById('herbalism-skill').value * prof;

    // Mutation Chance
    let mChance = (herbSkill + total + (souls*2.5)) * 0.01;
    let rand = Math.random();
    let mutation = 0;

    total = Math.ceil(total / 2);

    let text = '';

    if (rand < mChance) {
        mutation = 1;
        text += '<span class="italics">Mutation Occurred</span> - '
    }

    text += `${total + mutation}d${Math.floor((herbSkill + total) / 2) * 2}<br>`;

    text += `<span class="bold">Augmentation Pool:</span> Spend dice to upgrade Construct at Exponential Cost.`

    return text;
}

// == Text for Area
function areasResponse(response) {

    switch (response) {
        case 'target':
            return 'A target you can touch.';
        case 'self':
            return 'Area is Self.';
        case 'cone':
            return 'A Cone.';
        case 'cube':
            return 'A Cube.';
        case 'line':
            return 'A Line.';
        case 'sphere':
            return 'A Sphere.';

        default:
            console.log(response);
            return 'Err: Invalid Area => Check Console';
    }
}

// == Text for Effect
function effectResponse(response) {

    switch (response) {
        case 'buf':
            return 'Buff.';
        case 'dam':
            return 'Damage.';
        case 'deb':
            return 'Debuff.';
        case 'hea':
            return 'Healing.';
        case 'res':
            return 'Resistance.';
        case 'shi':
            return 'Shielding.';

        default:
            console.log(response);
            return 'Err: Invalid Effect => Check Console';
    }
}

// == Find the SUM of an Array ==
function sum(a) {
    let p = 0;
    for (let i = 0; i < a.length; i++) p += parseInt(a[i]);
    return p;
}

// == Random Range ==
function randomRange(i) {
    return Math.floor(Math.random() * i) + 1;
}

// Return the Spell level based on Ingredient Rarity
function levelByRarity(rarityList) {
    let tempSum = 0;
    rarityList.forEach(i => {

        switch (i) {
            case 'common':
                tempSum += 1;
                break;
            case 'uncommon':
                tempSum += 2;
                break;
            case 'rare':
                tempSum += 3;
                break;
            case 'epic':
                tempSum += 4;
                break;
            case 'unheard':
                tempSum += 5;
                break;

            default:
                console.log(i);
                return 'Err: Invalid Rarity => Check Console';
        }
    });

    if (tempSum < 6) return '1st-level ';
    else if (tempSum < 9) return '2nd-level ';
    else if (tempSum < 11) return '3rd-level ';
    else if (tempSum < 13) return '4th-level ';
    else if (tempSum < 15) return '5th-level ';
    else if (tempSum < 16) return '6th-level ';
    else if (tempSum < 17) return '7th-level ';
    else if (tempSum < 18) return '8th-level ';
    else return '9th-level ';
}

// Get full text for School
function schoolSwitch(item) {

    switch (item) {
        case 'none':
            return 'No School';
        case 'abj':
            return 'Abjuration';
        case 'con':
            return 'Conjuration';
        case 'div':
            return 'Divination';
        case 'enc':
            return 'Enchantment';
        case 'evo':
            return 'Evocation';
        case 'ill':
            return 'Illusion';
        case 'nec':
            return 'Necromancy';
        case 'tra':
            return 'Transmutation';

        default:
            console.log(item);
            return 'Err: Invalid School => Check Console';
    }
}

// Get Full text for Effects
function effectSwitch(item) {
    switch (item) {
        case 'none':
            return 'No Effect';
        case 'buf':
            return 'Buffs';
        case 'dam':
            return 'Damages';
        case 'deb':
            return 'Debuffs';
        case 'hea':
            return 'Heals';
        case 'res':
            return 'Resistance';
        case 'shi':
            return 'Shields';
        default:
            console.log(item);
            return 'err: Invalid Effect => Check Console';
    }
}


// ================ Dropdown Menus ===================
document.querySelectorAll('.dropdown').forEach(e => {
    e.addEventListener('click', () => {

        // If we're in the backpack
        if (e.parentElement.classList.contains('flex-elements')) {

            // Iterate over every 'dropdown' element
            document.querySelectorAll('.dropdown').forEach(el => {

                // if the clicked element is this element:
                if (e == el) {
                    // Simply toggle its current dropdown situation
                    e.classList.toggle('selected');
                    e.parentElement.nextElementSibling.classList.toggle('hidden');
                } else {
                    // Once again; check were in backpack
                    if (el.parentElement.classList.contains('flex-elements')) {
                        // If so: Hide all Dropdown elements (except clicked ;))
                        el.classList.remove('selected');
                        el.parentElement.nextElementSibling.classList.add('hidden');
                    }
                }
            });
        } else { // If its a 'Block' Dropdown Element
            e.classList.toggle('selected');
            e.nextElementSibling.classList.toggle('hidden');
        }

    })
});
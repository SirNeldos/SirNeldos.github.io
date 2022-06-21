// ====== SKILLS LIST ====== //
const skillsList = ['Acrobatics (Dex)', 'Animal Handling (Wis)', 'Arcana (Int)', 'Athletics (Str)', 'Deception (Cha)', 'History (Int)', 'Insight (Wis)', 'Intimidation (Cha)', 'Investigation (Int)', 'Medicine (Wis)', 'Nature (Int)', 'Perception (Wis)', 'Performance (Cha)', 'Persuasion (Cha)', 'Religion (Int)', 'Sleight of Hand (Dex)', 'Stealth (Dex)', 'Survival (Wis)']
const proficientList = ['Athletics (Str)', 'Investigation (Int)', 'Stealth (Dex)', 'Insight (Wis)', 'Intimidation (Cha)'];
const expertiseList = [];

// ====== ABILITY SCORES INPUT ====== //
let Abilities = {};
constructAbilities();
function constructAbilities() {
    document.querySelectorAll('#menu input').forEach(i => {
        if (i.id != 'level-input') Abilities[i.name] = { 'score': parseInt(i.value), 'mod': Math.floor(i.value / 2) - 5 };
    });
}

// ====== DARK MODE ====== //
let dark = false;
document.querySelector('#dark-mode').addEventListener('click', () => {
    let theme = {
        'light': {
            'bg': '#ececd8',
            'shadow': '#1e2d2fe0',
            'font': '#1e2d2f'
        }, 'dark': {
            'bg': '#1e2d2f',
            'shadow': '#ececd8e0',
            'font': '#ececd8'
        }
    };
    let r = document.querySelector(':root');
    let b = document.querySelector('body');

    switch (dark) {
        case false:
            r.style.setProperty('--c-background', theme.dark.bg);
            r.style.setProperty('--c-shadow', theme.dark.shadow);
            r.style.setProperty('--c-font', theme.dark.font);
            b.style.background = 'url(bg-dark.png) repeat';
            dark = true;
            break;

        case true:
            r.style.setProperty('--c-background', theme.light.bg);
            r.style.setProperty('--c-shadow', theme.light.shadow);
            r.style.setProperty('--c-font', theme.light.font);
            b.style.background = 'url(bg-light.png) repeat';
            dark = false;
            break;
    }
});


// ====== SETTINGS MENU ======= //
document.getElementById('menu-button').addEventListener('click', () => {
    document.getElementById('menu').classList.toggle('hide');
});


// ====== FORM NAV-BAR SETTINGS ====== //
const formList = [document.getElementById('humanoidB'), document.getElementById('bearB'), document.getElementById('hybridB')]
formList.forEach(i => {
    i.addEventListener('click', () => {
        formList.forEach(j => {
            j.classList.remove('current-form');
            document.getElementById(j.id.slice(0, -1) + '-form').classList.add('hide');
        });
        i.classList.add('current-form');
        document.getElementById(i.id.slice(0, -1) + '-form').classList.remove('hide');

        // UPDATE STAT BLOCKS
        updateStatBlocks(i);
    });
});


// ====== IMPLEMENT TAPERS ====== //
document.querySelectorAll('.taper').forEach(e => {
    e.innerHTML = '<svg preserveAspectRatio="none" viewBox="0 0 100 5"><polygon points="0,5 100,5 0,0" /></svg>'
});


// ====== UPDATE STAT BLOCKS ====== //
const levelInput = document.getElementById('level-input');
let PB = Math.ceil(levelInput.value / 4) + 1;
levelInput.addEventListener('change', () => {
    if (levelInput.value <= 0) levelInput.value = 1;
    if (levelInput.value > 20) levelInput.value = 20;
    updateStatBlocks(document.querySelector('.current-form'));
});

function updateStatBlocks(currentForm) {
    // Make Abilities Object to modify for each form and trickle-down information
    let TempA = JSON.parse(JSON.stringify(Abilities));
    switch (currentForm.id) {
        case 'bearB':
            TempA.str.score = Abilities.str.score + (2*PB);
            TempA.str.mod = Math.floor(TempA.str.score / 2) - 5;
            TempA.con.score = Abilities.con.score + (2*PB);
            TempA.con.mod = Math.floor(TempA.con.score / 2) - 5;
            break;
        case 'hybridB':
            TempA.str.score = Abilities.str.score + PB;
            TempA.str.mod = Math.floor(TempA.str.score / 2) - 5;
            TempA.dex.score = Abilities.dex.score + PB;
            TempA.dex.mod = Math.floor(TempA.dex.score / 2) - 5;
            TempA.con.score = Abilities.con.score + PB;
            TempA.con.mod = Math.floor(TempA.con.score / 2) - 5;
            break;
        default:
            break
    }

    // Display Available Forms
    if (levelInput.value >= 4) document.getElementById('hybridB').parentElement.classList.remove('hide');
    else document.getElementById('hybridB').parentElement.classList.add('hide');

    // Update Proficiency Bonus variable
    PB = Math.ceil(levelInput.value / 4) + 1;

    // Update Form Description
    let fd = document.getElementById('form-description');
    switch (currentForm.id) {
        case 'humanoidB':
            fd.innerHTML = '<h1>Bernard: Humanoid</h1><p>As a humanoid, Bernard is indistinguishable from any other human.</p>';
            break;
        case 'bearB':
            fd.innerHTML = '<h1>Bernard: Bear</h1>As a bear, Bernard is indistinguishable from any other bear.';
            break;
        case 'hybridB':
            fd.innerHTML = '<h1>Bernard: Hybrid</h1>In hybrid form, Bernard is obviously a Shapechanger, or Ursilborn for those with such knowledge.';
            break;
    }

    // Update Level
    document.getElementById('stat-level').innerHTML = '<span class="bold">Level</span>' + levelInput.value;

    // Update Proficiency Bonus
    document.getElementById('stat-prof').innerHTML = '<span class="bold">Proficiency Bonus</span>' + PB;

    // Update Armour Class
    document.getElementById('stat-ac').innerHTML = `<span class="bold">Armour Class</span> ${(10 + TempA.con.mod)}`;

    // Update HP
    let tempText = `<span class="bold">Hit Points</span>${4 + (levelInput.value * (5 + TempA.con.mod))} (${levelInput.value}d8 + ${levelInput.value * TempA.con.mod})`;
    document.getElementById('stat-hp').innerHTML = tempText;

    // Update Speed
    tempText = '<span class="bold">Speed</span>';
    switch (currentForm.id) {
        case 'humanoidB':
            tempText += '30ft.';
            break;
        case 'bearB':
            tempText += '40ft. & Climb 30ft.';
            break;
        case 'hybridB':
            tempText += '50ft.';
            break;
    }
    document.getElementById('stat-speed').innerHTML = tempText;


    // Update Abilities
    document.querySelector('.str').innerHTML = `<span>STR</span><br><div class="attr-num">${TempA.str.score} (${mySign(TempA.str.mod)})</div>`;
    document.querySelector('.dex').innerHTML = `<span>DEX</span><br><div class="attr-num">${TempA.dex.score} (${mySign(TempA.dex.mod)})</div>`;
    document.querySelector('.con').innerHTML = `<span>CON</span><br><div class="attr-num">${TempA.con.score} (${mySign(TempA.con.mod)})</div>`;
    document.querySelector('.int').innerHTML = `<span>INT</span><br><div class="attr-num">${TempA.int.score} (${mySign(TempA.int.mod)})</div>`;
    document.querySelector('.wis').innerHTML = `<span>WIS</span><br><div class="attr-num">${TempA.wis.score} (${mySign(TempA.wis.mod)})</div>`;
    document.querySelector('.cha').innerHTML = `<span>CHA</span><br><div class="attr-num">${TempA.cha.score} (${mySign(TempA.cha.mod)})</div>`;


    // Update Saves
    document.getElementById('stat-saves').innerHTML = `<span class="bold">Saves</span>Strength +${TempA.str.mod + PB}, Constitution +${TempA.con.mod + PB}`;


    // Update Skills
    tempText = '<span class="bold">Skills</span>(click to show)<table id="skills-table" class="hide">';
    skillsList.forEach(i => {
        let spl = i.slice(0, -1);
        spl = spl.slice(spl.indexOf('(') + 1);
        spl = spl.toLocaleLowerCase();

        let pass = false;

        // Am I proficient?
        proficientList.forEach(j => {
            if (i == j) {
                tempText += `<tr><td>${i}</td><td class="bold">${mySign(TempA[spl].mod + PB)}</td><tr>`;
                pass = true;
            }
        });
        // Do I have expertise?
        expertiseList.forEach(j => {
            if (i == j) {
                tempText += `<tr><td>${i}</td><td class="bold">${mySign(TempA[spl].mod + (2 * PB))}</td><tr>`;
                pass = true;
            }
        })
        if (!pass) tempText += `<tr><td>${i}</td><td>${mySign(TempA[spl].mod)}</td><tr>`;
    });
    document.getElementById('stat-skills').innerHTML = tempText + '</table>';

    // Update Senses
    let statSenses = document.getElementById('stat-senses');
    switch (currentForm.id) {
        case 'humanoidB':
            statSenses.innerHTML = `<span class="bold">Senses</span>Passive Perception ${TempA.wis.mod + 10}`;;
            break;
        default:
            statSenses.innerHTML = `<span class="bold">Senses</span>Passive Perception ${TempA.wis.mod + PB + 10}`;
            break;
    }

    // Update Language
    let statLanguage = document.getElementById('stat-languages');
    switch (currentForm.id) {
        case 'humanoidB':
            statLanguage.innerHTML = `<span class="bold">Languages</span>Speaks, Reads and Writes Common and Elvish`;;
            break;
        case 'bearB':
            statLanguage.innerHTML = `<span class="bold">Languages</span>Understands Common and Elvish`;
            break;
        case 'hybridB':
            statLanguage.innerHTML = `<span class="bold">Languages</span>Speaks Common and Elvish`;
            break;
    }


    // Update Calc Spans
    calcSpans(TempA, PB);
}



// ====== CALCULATE CALC_SPANS ====== //
function calcSpans(TempA, PB) {
    let calcList = document.querySelectorAll('.calculate');
    calcList.forEach(i => {

        let text = '';
        switch (i.id) {
            case 'STRESS':
                text = TempA.wis.mod + PB;
                break;
            case 'KI':
                text = levelInput.value;
                break;
            case 'KI_SAVE':
                text = 8 + PB + TempA.wis.mod;
                break;
            case 'BLESSING_SAVE':
                text = 8 + PB + TempA.int.mod;
                break;
            case 'STR_ATK':
                text = TempA.str.mod + PB;
                break;
            case 'STR':
                text = TempA.str.mod;
                break;
            case 'DEX_ATK':
                text = TempA.dex.mod + PB;
                break;
            case 'DEX':
                text = TempA.dex.mod;
                break;
            case 'CON_ATK':
                text = TempA.con.mod + PB;
                break;
            case 'CON':
                text = TempA.con.mod;
                break;
            case 'INT_ATK':
                text = TempA.int.mod + PB;
                break;
            case 'INT':
                text = TempA.int.mod;
                break;
            case 'WIS_ATK':
                text = TempA.wis.mod + PB;
                break;
            case 'WIS':
                text = TempA.wis.mod;
                break;
            case 'CHA_ATK':
                text = TempA.cha.mod + PB;
                break;
            case 'CHA':
                text = TempA.cha.mod;
                break;
            case 'DAMAGE_DIE_1':
                text = '1d' + (Math.ceil(Math.round(3+(levelInput.value/3))/2)*2);
                break;
            case 'DAMAGE_DIE_2':
                text = '2d' + (Math.ceil(Math.round(3+(levelInput.value/3))/2)*2);
                break;
            case 'DAMAGE_DIE_3':
                text = '3d' + (Math.ceil(Math.round(3+(levelInput.value/3))/2)*2);
                break;

            default:
                text = 'Invalid Function: "' + i.innerHTML + '"';
                console.log(text);
                break;
        }

        i.innerHTML = text;
    });
}

// ====== DISPLAY SKILLS ====== //
document.getElementById('stat-skills').addEventListener('click', () => {
    document.getElementById('skills-table').classList.toggle('hide');
});


// My Sign : Return the value with its sign (+ | -)
function mySign(num) {
    if (num >= 0) return '+' + num;
    else return num;
}


// After everything has Initialised
updateStatBlocks(document.querySelector('.current-form'));
document.querySelectorAll('#menu input').forEach(i => {
    if (i.id != 'level-input') {
        i.addEventListener('change', () => {
            constructAbilities();
            updateStatBlocks(document.querySelector('.current-form'));
        });
    }
});
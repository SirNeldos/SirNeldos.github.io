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
document.getElementById('dark-mode').addEventListener('click', () => {
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
            b.style.background = 'url(imgs/bg-dark.png) repeat';
            dark = true;
            break;

        case true:
            r.style.setProperty('--c-background', theme.light.bg);
            r.style.setProperty('--c-shadow', theme.light.shadow);
            r.style.setProperty('--c-font', theme.light.font);
            b.style.background = 'url(imgs/bg-light.png) repeat';
            dark = false;
            break;
    }
});


// ====== DISPLAY PROFILE PICTURE ====== //
const photoButton = document.getElementById('photo-button');
const photo = document.getElementById('profile-picture');

photoButton.addEventListener('click', () => {
    photo.classList.remove('hide');
});
photo.addEventListener('click', () => {
    photo.classList.add('hide');
});


// ====== SETTINGS MENU ======= //
document.getElementById('menu-button').addEventListener('click', () => {
    document.getElementById('menu').classList.toggle('hide');
});


// ====== FORM NAV-BAR SETTINGS ====== //
const formList = [document.getElementById('humanoidB'), document.getElementById('bearB'), document.getElementById('hybridB')]
let currentForm = document.getElementById('humanoidB');
formList.forEach(i => {
    i.addEventListener('click', () => {
        currentForm = i;
        updateStatBlocks();
    });
});


// ====== IMPLEMENT TAPERS ====== //
document.querySelectorAll('.taper').forEach(e => {
    e.innerHTML = '<svg preserveAspectRatio="none" viewBox="0 0 100 5"><polygon points="0,5 100,5 0,0" /></svg>'
});

// ====== IMPLEMENT STRESS ICONS ====== //
document.querySelectorAll('.stress-icon').forEach(e => {
    e.innerHTML = '<svg viewBox="0 0 48 48"><path d="M24 44q-4.15 0-7.8-1.575-3.65-1.575-6.35-4.3-2.7-2.725-4.275-6.375Q4 28.1 4 24q0-4.15 1.575-7.8Q7.15 12.55 9.85 9.85q2.7-2.7 6.35-4.275Q19.85 4 24 4t7.775 1.575Q35.4 7.15 38.125 9.85q2.725 2.7 4.3 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.3 6.375-2.725 2.725-6.35 4.3Q28.15 44 24 44Zm0-3q7.05 0 12.025-4.975Q41 31.05 41 24q0-7.1-4.975-12.05Q31.05 7 24 7q-7.1 0-12.05 4.95Q7 16.9 7 24q0 7.05 4.95 12.025Q16.9 41 24 41Zm3.65-19.55.7-.4q.15 1 .9 1.65.75.65 1.75.65 1.15 0 1.925-.775.775-.775.775-1.925 0-.65-.275-1.2-.275-.55-.775-.95l1.35-.75L33 16l-6.35 3.65Zm-7.3 0 1-1.8L15 16l-1 1.75 1.35.75q-.5.4-.775.95-.275.55-.275 1.2 0 1.15.775 1.925.775.775 1.925.775 1 0 1.75-.65t.9-1.65Zm3.65 4.7q-3.45 0-6.05 2.275-2.6 2.275-3.9 5.575h19.9q-1.35-3.25-3.925-5.55-2.575-2.3-6.025-2.3ZM24 24Z"/></svg>';
});

// ====== IMPLEMENT KI ICONS ====== //
document.querySelectorAll('.ki-icon').forEach(e => {
    e.innerHTML = '<svg viewBox="0 0 48 48"><path d="M2 25.5v-3h11.6v3Zm13.55-7.85-4-4 2.1-2.1 4 4Zm6.95-4.05V2h3v11.6Zm9.95 4.05-2.1-2.1 4-4 2.1 2.1Zm1.95 7.85v-3H46v3ZM24 29.1q-2.1 0-3.6-1.5T18.9 24q0-2.15 1.5-3.625T24 18.9q2.15 0 3.625 1.475T29.1 24q0 2.1-1.475 3.6T24 29.1Zm10.6 7.6-4.25-4.25 2.1-2.1 4.25 4.25Zm-21.2 0-2.1-2.1 4.25-4.25 2.1 2.1Zm9.1 9.3V34.4h3V46Z"/></svg>';
});

// ====== UPDATE MENU BARS WHEN SCROLLING ====== //
let lastScrollTop = 0;

window.addEventListener("scroll", () => {
    var st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
        document.getElementById('form-select').style.top = '-60px';
        document.getElementById('tracker').style.top = '0';
        document.getElementById('menu').classList.add('hide');
    } else {
        document.getElementById('form-select').style.top = '0';
        document.getElementById('tracker').style.top = '60px';
        document.getElementById('menu').classList.add('hide');
    }
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
}, false);


// ====== TRACK STRESS & KI ====== //
let currentStressPoints = 0;
let currentKiPoints = 0;


// ====== UPDATE STAT BLOCKS ====== //
let myLevel = document.getElementById('level-input').innerHTML;
let PB = Math.ceil(myLevel / 4) + 1;
document.getElementById('level-up').addEventListener('click', () => {
    if (myLevel > 20) myLevel = 20;
    else myLevel++;
    document.getElementById('level-input').innerHTML = myLevel;
    updateStatBlocks(document.querySelector('.current-form'));
});
document.getElementById('level-down').addEventListener('click', () => {
    if (myLevel <= 0) myLevel = 1;
    else myLevel--;
    document.getElementById('level-input').innerHTML = myLevel;
    updateStatBlocks(document.querySelector('.current-form'));
});

function updateStatBlocks() {

    // Update Proficiency Bonus variable
    PB = Math.ceil(myLevel / 4) + 1;

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
    if (myLevel >= 4) document.getElementById('hybridB').parentElement.classList.remove('hide');
    else document.getElementById('hybridB').parentElement.classList.add('hide');

    // Update Stress & KI Points Menu 
    let stressCount = TempA.wis.mod + PB;
    let kiCount = myLevel;
    let tempText = '';

    // Update Stress
    tempText = '<td><span class="bold">Stress Points</span></td><td>';
    for (let i = 1; i <= stressCount; i++) {
        if (i <= currentStressPoints) tempText += '<input class="stressCheck" type="checkbox" checked></input>';
        else tempText += '<input class="stressCheck" type="checkbox"></input>';
    }
    document.getElementById('stress').innerHTML = tempText + '</td>';

    // Update Ki
    tempText = '<td><span class="bold">Ki Points</span></td><td>';
    for (let i = 1; i <= kiCount; i++) {
        if (i <= currentKiPoints) tempText += '<input class="kiCheck" type="checkbox" checked></input>';
        else tempText += '<input class="kiCheck" type="checkbox"></input>';
    }
    document.getElementById('ki').innerHTML = tempText + '</td>';

    // Event Handlers for Stress & Ki
    document.querySelectorAll('.stressCheck').forEach(i => {
        i.addEventListener('change', e => {
            if (e.target.checked) currentStressPoints++;
            else currentStressPoints--;
        });
    });
    document.querySelectorAll('.kiCheck').forEach(i => {
        i.addEventListener('change', e => {
            if (e.target.checked) currentKiPoints++;
            else currentKiPoints--;
        });
    });

    // Update Form Description
    let fd = document.getElementById('form-description');
    switch (currentForm.id) {
        case 'humanoidB':
            fd.innerHTML = '<h1>Bernard: Humanoid</h1>As a humanoid, Bernard is indistinguishable from any other human.';
            break;
        case 'bearB':
            fd.innerHTML = '<h1>Bernard: Bear</h1>As a bear, Bernard is indistinguishable from any other bear.';
            break;
        case 'hybridB':
            fd.innerHTML = '<h1>Bernard: Hybrid</h1>In hybrid form, Bernard is obviously a Shapechanger, or Ursilborn.';
            break;
    }

    // Update Level
    document.getElementById('stat-level').innerHTML = '<span class="bold">Level</span>' + myLevel;

    // Update Proficiency Bonus
    document.getElementById('stat-prof').innerHTML = '<span class="bold">Proficiency Bonus</span>' + PB;

    // Update Armour Class
    document.getElementById('stat-ac').innerHTML = `<span class="bold">Armour Class</span> ${(10 + TempA.con.mod)}`;

    // Update HP
    tempText = `<span class="bold">Hit Points</span>${3 + (myLevel * (5 + TempA.con.mod))} (${myLevel}d8 + ${myLevel * TempA.con.mod})`;
    document.getElementById('stat-hp').innerHTML = tempText;

    // Update Speed
    switch (currentForm.id) {
        case 'humanoidB':
            document.getElementById('stat-speed').innerHTML = '<span class="bold">Speed</span>30ft.';
            break;
        case 'bearB':
            document.getElementById('stat-speed').innerHTML = '<span class="bold">Speed</span>40ft. & Climb 30ft.';
            break;
        case 'hybridB':
            document.getElementById('stat-speed').innerHTML = '<span class="bold">Speed</span>50ft.';
            break;
    }

    // Update Size
    switch (currentForm.id) {
        case 'bearB':
            document.getElementById('stat-size').innerHTML = '<span class="bold">Size</span>Large';
            break;
        default:
            document.getElementById('stat-size').innerHTML = '<span class="bold">Size</span>Medium';
            break;
    }


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
    document.getElementById('stat-senses').innerHTML = `<span class="bold">Senses</span>Passive Perception ${TempA.wis.mod + 10}`;

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

    // Hide All Abilities and Actions by Form and Level
    formList.forEach(i => {
        i.classList.remove('current-form');
        document.querySelectorAll(`.${i.id.slice(0, -1)}-form`).forEach(j => j.classList.add('hide'));
    });

    for (let i = 1; i < 20; i++) document.querySelectorAll(`.lvl-${i}`).forEach(x => x.classList.add('hide'));

    // Display current form in Nav Bar
    currentForm.classList.add('current-form');

    // Unhide Abilities and Actions if classList contains 'current-form' and if it meets current level
    let cForm = document.querySelectorAll(`.${currentForm.id.slice(0, -1)}-form`);
    cForm.forEach(i => { for (let j = myLevel; j <= 20; j++) if (!i.classList.contains(`lvl-${j}`)) i.classList.remove('hide'); });

    for (let i = parseInt(myLevel)+1; i <= 20; i++) document.querySelectorAll(`.lvl-${i}`).forEach(x => x.classList.add('hide'));

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
                text = myLevel;
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
                text = '1d' + (Math.ceil(Math.round(3+(myLevel/3))/2)*2);
                break;
            case 'DAMAGE_DIE_2':
                text = '2d' + (Math.ceil(Math.round(3+(myLevel/3))/2)*2);
                break;
            case 'DAMAGE_DIE_3':
                text = '2d' + ((Math.ceil(Math.round(3+(myLevel/3))/2)*2)+2);
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
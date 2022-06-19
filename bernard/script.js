// ====== SKILLS LIST ====== //
const skillsList = ['Acrobatics (Dex)', 'Animal Handling (Wis)', 'Arcana (Int)', 'Athletics (Str)', 'Deception (Cha)', 'History (Int)', 'Insight (Wis)', 'Intimidation (Cha)', 'Investigation (Int)', 'Medicine (Wis)', 'Nature (Int)', 'Perception (Wis)', 'Performance (Cha)', 'Persuasion (Cha)', 'Religion (Int)', 'Sleight of Hand (Dex)', 'Stealth (Dex)', 'Survival (Wis)']
const proficientList = ['Athletics (Str)', 'Investigation (Int)', 'Stealth (Dex)'];
const expertiseList = ['Insight (Wis)', 'Intimidation (Cha)'];

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

    switch (dark) {
        case false:
            r.style.setProperty('--c-background', theme.dark.bg);
            r.style.setProperty('--c-shadow', theme.dark.shadow);
            r.style.setProperty('--c-font', theme.dark.font);
            dark = true;
            break;

        case true:
            r.style.setProperty('--c-background', theme.light.bg);
            r.style.setProperty('--c-shadow', theme.light.shadow);
            r.style.setProperty('--c-font', theme.light.font);
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

    // Display Available Forms
    if (levelInput.value >= 4) document.getElementById('hybridB').parentElement.classList.remove('hide');
    else document.getElementById('hybridB').parentElement.classList.add('hide');

    // Update Proficiency Bonus variable
    PB = Math.ceil(levelInput.value / 4) + 1;

    // Update Level
    document.getElementById('stat-level').innerHTML = '<span class="bold">Level</span>' + levelInput.value;

    // Update Proficiency Bonus
    document.getElementById('stat-prof').innerHTML = '<span class="bold">Proficiency Bonus</span>' + PB;

    // Update Armour Class
    let AC = document.getElementById('stat-ac')
    if (currentForm.id == 'humanoidB') AC.innerHTML = '<span class="bold">Armour Class</span>' + (10 + Abilities.dex.mod + Abilities.wis.mod);
    else AC.innerHTML = '<span class="bold">Armour Class</span>' + (10 + Abilities.str.mod);

    // Update HP
    let tempText = '<span class="bold">Hit Points</span>';
    switch (currentForm.id) {
        case 'humanoidB':
            tempText += 4 + (levelInput.value * (5 + Abilities.con.mod));
            tempText += ` (${levelInput.value}d8 + ${levelInput.value * Abilities.con.mod})`;
            break;
        case 'bearB':
            tempText += 4 + (levelInput.value * (6 + Abilities.con.mod + 3));
            tempText += ` (${levelInput.value}d10 + ${levelInput.value * (Abilities.con.mod + 3)})`;
            break;
        case 'hybridB':
            tempText += 4 + (levelInput.value * (6 + Abilities.con.mod + 1));
            tempText += ` (${levelInput.value}d10 + ${levelInput.value * (Abilities.con.mod + 1)})`;
            break;
    }
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
    let ablStr = document.querySelector('.str');
    document.querySelector('.dex').innerHTML = `<span>DEX</span><br><div class="attr-num">${Abilities.dex.score} (${mySign(Abilities.dex.mod)})</div>`;
    let ablCon = document.querySelector('.con');
    document.querySelector('.int').innerHTML = `<span>INT</span><br><div class="attr-num">${Abilities.int.score} (${mySign(Abilities.int.mod)})</div>`;
    document.querySelector('.wis').innerHTML = `<span>WIS</span><br><div class="attr-num">${Abilities.wis.score} (${mySign(Abilities.wis.mod)})</div>`;
    document.querySelector('.cha').innerHTML = `<span>CHA</span><br><div class="attr-num">${Abilities.cha.score} (${mySign(Abilities.cha.mod)})</div>`;
    switch (currentForm.id) {
        case 'humanoidB':
            ablStr.innerHTML = `<span>STR</span><br><div class="attr-num">${Abilities.str.score} (${mySign(Abilities.str.mod)})</div>`;
            ablCon.innerHTML = `<span>CON</span><br><div class="attr-num">${Abilities.con.score} (${mySign(Abilities.con.mod)})</div>`;
            break;
        case 'bearB':
            ablStr.innerHTML = `<span>STR</span><br><div class="attr-num">${Abilities.str.score + 6} (${mySign(Math.floor((Abilities.str.score + 6) / 2) - 5)})</div>`;
            ablCon.innerHTML = `<span>CON</span><br><div class="attr-num">${Abilities.con.score + 6} (${mySign(Math.floor((Abilities.con.score + 6) / 2) - 5)})</div>`;
            break;
        case 'hybridB':
            ablStr.innerHTML = `<span>STR</span><br><div class="attr-num">${Abilities.str.score + 3} (${mySign(Math.floor((Abilities.str.score + 3) / 2) - 5)})</div>`;
            ablCon.innerHTML = `<span>CON</span><br><div class="attr-num">${Abilities.con.score + 3} (${mySign(Math.floor((Abilities.con.score + 3) / 2) - 5)})</div>`;
            break;
    }


    // Update Saves
    let statSaves = document.getElementById('stat-saves');
    switch (currentForm.id) {
        case 'humanoidB':
            statSaves.innerHTML = `<span class="bold">Saves</span>Strength +${Abilities.str.mod + PB}, Constitution +${Abilities.con.mod + PB}`;
            break;
        case 'bearB':
            statSaves.innerHTML = `<span class="bold">Saves</span>Strength +${Math.floor((Abilities.str.score + 6) / 2) - 5 + PB}, Constitution +${Math.floor((Abilities.con.score + 6) / 2) - 5 + PB}`;
            break;
        case 'hybridB':
            statSaves.innerHTML = `<span class="bold">Saves</span>Strength +${Math.floor((Abilities.str.score + 3) / 2) - 5 + PB}, Constitution +${Math.floor((Abilities.con.score + 3) / 2) - 5 + PB}`;
            break;
    }

    // Update Skills
    tempText = '<span class="bold">Skills</span>(click to show)<table id="skills-table" class="hide">';
    skillsList.forEach(i => {
        let spl = i.slice(0, -1);
        spl = spl.slice(spl.indexOf('(') + 1);
        spl = spl.toLocaleLowerCase();
        console.log(spl);

        let pass = false;

        // Am I proficient?
        proficientList.forEach(j => {
            if (i == j) {
                tempText += `<tr><td>${i}</td><td class="bold">${mySign(Abilities[spl].mod + PB)}</td><tr>`;
                pass = true;
            }
        });
        // Do I have expertise?
        expertiseList.forEach(j => {
            if (i == j) {
                tempText += `<tr><td>${i}</td><td class="bold">${mySign(Abilities[spl].mod + (2 * PB))}</td><tr>`;
                pass = true;
            }
        })
        if (!pass) tempText += `<tr><td>${i}</td><td>${mySign(Abilities[spl].mod)}</td><tr>`;
    });
    document.getElementById('stat-skills').innerHTML = tempText + '</table>';

    // Update Senses
    let statSenses = document.getElementById('stat-senses');
    switch (currentForm.id) {
        case 'humanoidB':
            statSenses.innerHTML = `<span class="bold">Senses</span>Passive Perception ${Abilities.wis.mod +10}`;;
            break;
        case 'bearB':
            statSenses.innerHTML = `<span class="bold">Senses</span>Passive Perception ${Abilities.wis.mod + PB +10}`;
            break;
        case 'hybridB':
            statSenses.innerHTML = `<span class="bold">Senses</span>Passive Perception ${Abilities.wis.mod + PB +10}`;
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

}

console.log(Abilities);






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
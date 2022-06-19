const score = { 'str': 18, 'dex': 9, 'con': 16, 'int': 18, 'wis': 14, 'cha': 10 }
const ability = { 'str': 4, 'dex': -1, 'con': 3, 'int': 4, 'wis': 2, 'cha': 0 }

// ====== DARK MODE ====== //
let dark = false;
document.querySelector('#dark-mode').addEventListener('click', () => {
    let theme = {
        'light': {
            'bg': '#ececd8',
            'shadow': '#1e2d2fe0',
            'accent': '#e06c75',
            'font': '#1e2d2f'
        }, 'dark': {
            'bg': '#1e2d2f',
            'shadow': '#ececd8e0',
            'accent': '#e06c75',
            'font': '#ececd8'
        }
    };
    let r = document.querySelector(':root');

    switch (dark) {
        case false:
            r.style.setProperty('--c-accent', theme.dark.accent);
            r.style.setProperty('--c-background', theme.dark.bg);
            r.style.setProperty('--c-shadow', theme.dark.shadow);
            r.style.setProperty('--c-font', theme.dark.font);
            dark = true;
            break;

        case true:
            r.style.setProperty('--c-accent', theme.light.accent);
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
    // Update Proficiency Bonus variable
    PB = Math.ceil(levelInput.value / 4) + 1;

    // Update Level
    document.getElementById('stat-level').innerHTML = '<span class="bold">Level</span>' + levelInput.value;

    // Update Proficiency Bonus
    document.getElementById('stat-prof').innerHTML = '<span class="bold">Proficiency Bonus</span>' + PB;

    // Update Armour Class
    let AC = document.getElementById('stat-ac')
    if (currentForm.id == 'humanoidB') AC.innerHTML = '<span class="bold">Armour Class</span>' + (10 + ability.dex + ability.wis);
    else AC.innerHTML = '<span class="bold">Armour Class</span>' + (10 + ability.str);

    // Update HP
    let tempText = '<span class="bold">Hit Points</span>';
    switch (currentForm.id) {
        case 'humanoidB':
            tempText += 4 + (levelInput.value * (5 + ability.con));
            tempText += ` (${levelInput.value}d8 + ${levelInput.value*ability.con})`;
            break;
        case 'bearB':
            tempText += 4 + (levelInput.value * (6 + ability.con + 3));
            tempText += ` (${levelInput.value}d10 + ${levelInput.value*(ability.con + 3)})`;
            break;
        case 'hybridB':
            tempText += 4 + (levelInput.value * (6 + ability.con + 1));
            tempText += ` (${levelInput.value}d10 + ${levelInput.value*(ability.con + 1)})`;
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
    let ablCon = document.querySelector('.con');
    switch (currentForm.id) {
        case 'humanoidB':
            ablStr.innerHTML = `<span>STR</span><br><div class="attr-num">${score.str} (+${ability.str})</div>`;
            ablCon.innerHTML = `<span>CON</span><br><div class="attr-num">${score.con} (+${ability.con})</div>`;
            break;
        case 'bearB':
            ablStr.innerHTML = `<span>STR</span><br><div class="attr-num">${score.str+6} (+${Math.floor((score.str+6)/2)-5})</div>`;
            ablCon.innerHTML = `<span>CON</span><br><div class="attr-num">${score.con+6} (+${Math.floor((score.con+6)/2)-5})</div>`;
            break;
        case 'hybridB':
            ablStr.innerHTML = `<span>STR</span><br><div class="attr-num">${score.str+3} (+${Math.floor((score.str+3)/2)-5})</div>`;
            ablCon.innerHTML = `<span>CON</span><br><div class="attr-num">${score.con+3} (+${Math.floor((score.con+3)/2)-5})</div>`;
            break;
    }


    // Update Saves
    
    let statSaves = document.getElementById('stat-saves');
    switch (currentForm.id) {
        case 'humanoidB':
            statSaves.innerHTML = `<span class="bold">Saves</span>Strength +${ability.str+PB}, Constitution +${ability.con+PB}`;
            break;
        case 'bearB':
            statSaves.innerHTML = `<span class="bold">Saves</span>Strength +${Math.floor((score.str+6)/2)-5+PB}, Constitution +${Math.floor((score.con+6)/2)-5+PB}`;
            break;
        case 'hybridB':
            statSaves.innerHTML = `<span class="bold">Saves</span>Strength +${Math.floor((score.str+3)/2)-5+PB}, Constitution +${Math.floor((score.con+3)/2)-5+PB}`;
            break;
    }
}











// After everything has Initialised
updateStatBlocks(document.querySelector('.current-form'));

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
            document.getElementById(j.id.slice(0,-1)+'-form').classList.add('hide');
        });
        i.classList.add('current-form');
        document.getElementById(i.id.slice(0,-1)+'-form').classList.remove('hide');
    });
});
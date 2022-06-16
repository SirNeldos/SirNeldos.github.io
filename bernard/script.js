


// ====== DARK MODE ======
const theme = {
    'light': {
        'bg': '#fffff1',
        'table': '#e8e8d5',
        'shadow': '#5c4f41',
        'accent': '#e06c75',
        'font': '#282c34'
    }, 'dark': {
        'bg': '#282c34',
        'table': '#5a605d',
        'shadow': '#c1b1a0',
        'accent': '#e06c75',
        'font': '#e1d4c6'
    }
};

let dark = false;
document.querySelector('#dark-mode').addEventListener('click', () => {
    var r = document.querySelector(':root');

    switch (dark) {
        case false:
            r.style.setProperty('--c-accent', theme.dark.accent);
            r.style.setProperty('--c-background', theme.dark.bg);
            r.style.setProperty('--c-table', theme.dark.table);
            r.style.setProperty('--c-shadow', theme.dark.shadow);
            r.style.setProperty('--c-font', theme.dark.font);
            dark = true;
            break;

        case true:
            r.style.setProperty('--c-accent', theme.light.accent);
            r.style.setProperty('--c-background', theme.light.bg);
            r.style.setProperty('--c-table', theme.light.table);
            r.style.setProperty('--c-shadow', theme.light.shadow);
            r.style.setProperty('--c-font', theme.light.font);
            dark = false;
            break;
    }
});


// ====== IMPLEMENT TAPERS ======
document.querySelectorAll('.taper').forEach(e => {
    e.innerHTML = '<svg preserveAspectRatio="none" viewBox="0 0 100 5"><polygon points="0,5 100,5 0,0" /></svg>'
});


// ====== POPULATE THE SURVIVAL TABLE ======

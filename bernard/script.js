


// ====== DARK MODE ======
const theme = {
    'light': {
        'bg': '#fffff1',
        'table': '#e8e8d5',
        'shadow': '#5c4f41',
        'accent': '#c35d5d',
        'font': '#1e2d2f'
    }, 'dark': {
        'bg': '#4a4e4c',
        'table': '#5a605d',
        'shadow': '#e1d4c6',
        'accent': '#fd864d',
        'font': '#fffff1'
    }
};

const themeCheck = document.querySelector('#dark-mode input');
themeCheck.addEventListener('change', () => {
    var r = document.querySelector(':root');

    switch (themeCheck.checked) {
        case true:

            r.style.setProperty('--c-accent', theme.dark.accent);
            r.style.setProperty('--c-background', theme.dark.bg);
            r.style.setProperty('--c-table', theme.dark.table);
            r.style.setProperty('--c-shadow', theme.dark.shadow);
            r.style.setProperty('--c-font', theme.dark.font);
            break;

        case false:

            r.style.setProperty('--c-accent', theme.light.accent);
            r.style.setProperty('--c-background', theme.light.bg);
            r.style.setProperty('--c-table', theme.light.table);
            r.style.setProperty('--c-shadow', theme.light.shadow);
            r.style.setProperty('--c-font', theme.light.font);
            break;
    }
});


// ====== IMPLEMENT TAPERS ======
document.querySelectorAll('.taper').forEach(e => {
    e.innerHTML = '<svg preserveAspectRatio="none" viewBox="0 0 100 5"><polygon points="0,5 100,5 0,0" /></svg>'
});


// ====== POPULATE THE SURVIVAL TABLE ======

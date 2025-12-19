document.addEventListener('DOMContentLoaded', () => {
    console.log('Burger menu script loaded');
    const burger = document.querySelector('.burger');
    const nav = document.getElementById('site-navigation');
    if (!burger || !nav) {
        console.error('Burger or nav not found');
        return;
    }
    console.log('Burger and nav found');

    // Forcer la direction flex pour empiler les lignes
    burger.style.flexDirection = 'column';

    const openMenu = () => {
        console.log('Opening menu');
        burger.classList.add('open');
        nav.classList.add('open');
        document.body.classList.add('menu-open');
        burger.setAttribute('aria-expanded', 'true');
    };

    const closeMenu = () => {
        console.log('Closing menu');
        burger.classList.remove('open');
        nav.classList.remove('open');
        document.body.classList.remove('menu-open');
        burger.setAttribute('aria-expanded', 'false');
    };

    burger.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('Burger clicked');
        if (nav.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (nav.classList.contains('open') && !nav.contains(e.target) && e.target !== burger) {
            closeMenu();
        }
    });

    // Close on link click (mobile)
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('open')) {
            closeMenu();
        }
    });
});

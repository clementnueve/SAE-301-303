document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.getElementById('site-navigation');
    if (!burger || !nav) return;

    const links = nav.querySelectorAll('a');

    const setOpen = (open) => {
        if (open) {
            burger.classList.add('open');
            nav.classList.add('open');
            burger.setAttribute('aria-expanded', 'true');
        } else {
            burger.classList.remove('open');
            nav.classList.remove('open');
            burger.setAttribute('aria-expanded', 'false');
        }
    };

    burger.addEventListener('click', (e) => {
        e.stopPropagation();
        setOpen(!nav.classList.contains('open'));
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !burger.contains(e.target)) {
            if (nav.classList.contains('open')) setOpen(false);
        }
    });

    // Close on link click (mobile)
    links.forEach((link) => link.addEventListener('click', () => setOpen(false)));

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') setOpen(false);
    });
});

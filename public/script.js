document.addEventListener('DOMContentLoaded', () => {

    /* Mobile Navigation */
    const ham = document.getElementById('ham');
    const menu = document.getElementById('menu');

    if (ham && menu) {
        ham.addEventListener('click', () => {
            ham.classList.toggle('open');
            menu.classList.toggle('open');
        });
        menu.querySelectorAll('a').forEach(l => l.addEventListener('click', () => {
            ham.classList.remove('open'); menu.classList.remove('open');
        }));
        document.addEventListener('click', e => {
            if (!ham.contains(e.target) && !menu.contains(e.target)) {
                ham.classList.remove('open'); menu.classList.remove('open');
            }
        });
    }

    /* Scroll Reveal */
    const io = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); io.unobserve(e.target); } });
    }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.tile, .animal-card, .hero-bubble').forEach(el => {
        el.classList.add('up'); io.observe(el);
    });

    const css = document.createElement('style');
    css.textContent = `.up{opacity:0;transform:translateY(32px);transition:opacity .7s ease,transform .7s ease}.vis{opacity:1!important;transform:translateY(0)!important}`;
    document.head.appendChild(css);

    /* Header effects */
    const hdr = document.getElementById('hdr');
    if (hdr) {
        let prev = 0;
        window.addEventListener('scroll', () => {
            const y = window.scrollY;
            hdr.style.boxShadow = y > 30 ? '0 2px 20px rgba(108,92,231,.07)' : 'none';
            hdr.style.transform = y > 500 && y > prev ? 'translateY(-100%)' : 'translateY(0)';
            hdr.style.transition = 'transform .35s ease,box-shadow .3s ease';
            prev = y;
        }, { passive: true });
    }

    /* Smooth scroll */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function(e) {
            const t = document.querySelector(this.getAttribute('href'));
            if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        });
    });
});
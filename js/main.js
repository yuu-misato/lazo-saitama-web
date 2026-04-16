/* ================================================
   Lazo 埼玉版 公式サイト
   Main JavaScript
================================================ */

(() => {
    'use strict';

    /* ---------- Header scroll effect ---------- */
    const header = document.querySelector('.site-header');
    const scrollThreshold = 40;

    const updateHeader = () => {
        if (window.scrollY > scrollThreshold) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();

    /* ---------- Mobile menu toggle ---------- */
    const menuToggle = document.querySelector('.menu-toggle');
    const siteNav = document.querySelector('.site-nav');

    menuToggle?.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        siteNav?.classList.toggle('open');
        document.body.style.overflow = siteNav?.classList.contains('open') ? 'hidden' : '';
    });

    document.querySelectorAll('.site-nav a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle?.classList.remove('active');
            siteNav?.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    /* ---------- Fade-in on scroll ---------- */
    const fadeTargets = document.querySelectorAll(
        '.section-header, .pillar-card, .community-card, .event-item, .story-item, .benefit-item, .hero-copy, .hero-visual, .latest-cover, .latest-details, .disaster-visual, .disaster-text, .company-content, .ad-cta-box'
    );

    fadeTargets.forEach(el => el.classList.add('fade-in'));

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });

    fadeTargets.forEach(el => fadeObserver.observe(el));

    /* ---------- Counter animation ---------- */
    const counter = document.querySelector('.project-100-counter [data-count]');
    if (counter) {
        const target = parseInt(counter.dataset.count || '0', 10);
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 60));

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const tick = () => {
                    current = Math.min(current + step, target);
                    counter.textContent = String(current).padStart(3, '0');
                    if (current < target) requestAnimationFrame(tick);
                };
                tick();
                counterObserver.unobserve(entry.target);
            });
        }, { threshold: 0.5 });

        counterObserver.observe(counter);
    }

    /* ---------- Smooth scroll for anchor links ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            const offset = header ? header.offsetHeight + 20 : 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

    /* ---------- Area selector interaction ---------- */
    document.querySelectorAll('.area-item').forEach(item => {
        item.addEventListener('click', () => {
            const name = item.querySelector('.area-item-name')?.textContent || '';
            // In a real implementation, this would navigate to /area/{city}
            console.log(`選択されたエリア: ${name}`);
        });
    });

    /* ---------- Hero ribbon parallax ---------- */
    const ribbon = document.querySelector('.hero-ribbon');
    if (ribbon) {
        window.addEventListener('scroll', () => {
            const y = window.scrollY;
            if (y < 600) {
                ribbon.style.transform = `rotate(${-15 + y * 0.02}deg) translateX(${y * 0.1}px)`;
            }
        }, { passive: true });
    }

    /* ---------- Current year in footer ---------- */
    const yearEl = document.querySelector('[data-current-year]');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

})();

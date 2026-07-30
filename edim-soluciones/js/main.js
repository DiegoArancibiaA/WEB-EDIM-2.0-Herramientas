/**
 * EDIM SOLUCIONES - Main JavaScript
 * Vanilla JS - No frameworks
 */

(function() {
    'use strict';

    // ============================================
    // SMOOTH SCROLL (Custom easing for premium feel)
    // ============================================
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                closeMobileMenu();
            }
        });
    });

    // ============================================
    // HEADER SCROLL EFFECT
    // ============================================
    const header = document.getElementById('header');

    function handleHeaderScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });

    // ============================================
    // MOBILE MENU
    // ============================================
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuOverlay = document.getElementById('menuOverlay');

    function openMobileMenu() {
        mobileToggle.classList.add('active');
        mobileMenu.classList.add('open');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('open');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            if (mobileMenu.classList.contains('open')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMobileMenu);
    }

    // ============================================
    // SCROLL REVEAL (Intersection Observer)
    // ============================================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    const revealElements = document.querySelectorAll(
        '.reveal, .reveal-scale, .reveal-blur, .reveal-left, .reveal-right'
    );
    revealElements.forEach(el => revealObserver.observe(el));

    // ============================================
    // COUNTER ANIMATION
    // ============================================
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const start = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    counter.textContent = Math.floor(easeOut * target);
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    }
                }

                requestAnimationFrame(updateCounter);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.counter').forEach(counter => {
        counterObserver.observe(counter);
    });

    // ============================================
    // CALCULATOR TABS
    // ============================================
    const calcTabs = document.querySelectorAll('.calc-tab');
    const calcCards = document.querySelectorAll('.calc-card');

    calcTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            calcTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const category = tab.getAttribute('data-tab');

            calcCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    requestAnimationFrame(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    });
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });

    // ============================================
    // TESTIMONIALS SLIDER
    // ============================================
    const track = document.getElementById('testimonialsTrack');
    const dotsContainer = document.getElementById('testimonialsDots');

    if (track && dotsContainer) {
        const testimonialCards = track.querySelectorAll('.testimonial-card');
        let currentSlide = 0;
        let autoSlideInterval;

        function getSlidesPerView() {
            if (window.innerWidth >= 1024) return 3;
            if (window.innerWidth >= 768) return 2;
            return 1;
        }

        function createDots() {
            dotsContainer.innerHTML = '';
            const slidesPerView = getSlidesPerView();
            const totalDots = Math.ceil(testimonialCards.length / slidesPerView);
            for (let i = 0; i < totalDots; i++) {
                const dot = document.createElement('button');
                dot.classList.add('testimonials-dot');
                dot.setAttribute('aria-label', 'Slide ' + (i + 1));
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            }
        }

        function goToSlide(index) {
            const slidesPerView = getSlidesPerView();
            const maxSlide = Math.ceil(testimonialCards.length / slidesPerView) - 1;
            currentSlide = Math.max(0, Math.min(index, maxSlide));
            const slideWidth = 100 / slidesPerView;
            track.style.transform = 'translateX(-' + (currentSlide * slideWidth) + '%)';

            document.querySelectorAll('.testimonials-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }

        function nextSlide() {
            const slidesPerView = getSlidesPerView();
            const maxSlide = Math.ceil(testimonialCards.length / slidesPerView) - 1;
            goToSlide(currentSlide >= maxSlide ? 0 : currentSlide + 1);
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 5000);
        }

        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        createDots();
        startAutoSlide();

        track.addEventListener('mouseenter', stopAutoSlide);
        track.addEventListener('mouseleave', startAutoSlide);

        window.addEventListener('resize', () => {
            createDots();
            goToSlide(0);
        });
    }

    // ============================================
    // CONTACT FORM VALIDATION
    // ============================================
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        function showError(fieldId, show) {
            const errorEl = document.getElementById('error-' + fieldId);
            const inputEl = document.getElementById(fieldId);
            if (!errorEl || !inputEl) return;
            if (show) {
                errorEl.classList.add('visible');
                inputEl.classList.add('error');
            } else {
                errorEl.classList.remove('visible');
                inputEl.classList.remove('error');
            }
        }

        function validateEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;

            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const asunto = document.getElementById('asunto').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();

            if (!nombre) { showError('nombre', true); isValid = false; }
            else { showError('nombre', false); }

            if (!email || !validateEmail(email)) { showError('email', true); isValid = false; }
            else { showError('email', false); }

            if (!asunto) { showError('asunto', true); isValid = false; }
            else { showError('asunto', false); }

            if (!mensaje) { showError('mensaje', true); isValid = false; }
            else { showError('mensaje', false); }

            if (isValid) {
                contactForm.style.display = 'none';
                if (formSuccess) formSuccess.classList.add('visible');
            }
        });

        ['nombre', 'email', 'asunto', 'mensaje'].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('input', function() {
                    showError(id, false);
                });
            }
        });
    }

    // ============================================
    // PARALLAX EFFECT (Subtle)
    // ============================================
    const parallaxElements = document.querySelectorAll('.hero-orb');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        parallaxElements.forEach((el, i) => {
            const speed = 0.08 + (i * 0.04);
            el.style.transform = 'translateY(' + (scrollY * speed) + 'px)';
        });
    }, { passive: true });

    // ============================================
    // TOOL BUTTONS FEEDBACK
    // ============================================
    document.querySelectorAll('.tool-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const originalHTML = this.innerHTML;
            this.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> Pronto Disponible';
            this.style.background = 'var(--gray-medium)';
            this.style.color = 'var(--text-secondary)';
            setTimeout(() => {
                this.innerHTML = originalHTML;
                this.style.background = '';
                this.style.color = '';
            }, 2000);
        });
    });

    // ============================================
    // ACTIVE NAV LINK ON SCROLL
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }, { passive: true });

})();

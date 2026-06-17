// Mobile Menu Hamburger Toggle
(function () {
    'use strict';

    function isMobile() {
        return window.innerWidth <= 768;
    }

    // Create the mobile menu overlay
    function createMobileOverlay() {
        // Don't create if already exists
        if (document.querySelector('.mobile-menu-overlay')) return;

        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        overlay.innerHTML = `
            <div class="mobile-menu-close"><i class="bx bx-x"></i></div>
            <a href="./index.html">HOME</a>
            <a href="./brands.html">BRANDS</a>
            <a href="./event-partners.html">EVENT PARTNERS</a>
            <a href="./creators.html">CREATORS</a>
            <a href="./contact-us.html">CONTACT US</a>
            <a href="./sign-in.html" class="mobile-menu-sign-in">SIGN IN <i class="bx bx-arrow-right-stroke"></i></a>
        `;
        document.body.appendChild(overlay);

        // Close button handler
        overlay.querySelector('.mobile-menu-close').addEventListener('click', function () {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close on link click
        overlay.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close on overlay background click
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Setup hamburger button click handler
    function setupHamburger() {
        const btn = document.getElementById('mobile-menu-btn');
        if (!btn) return;

        btn.addEventListener('click', function () {
            createMobileOverlay();
            const overlay = document.querySelector('.mobile-menu-overlay');
            if (overlay) {
                overlay.classList.toggle('active');
                if (overlay.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            }
        });
    }

    // Close menu on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            const overlay = document.querySelector('.mobile-menu-overlay.active');
            if (overlay) {
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    // Responsive DOM rearranging for Home page Hero section
    // Safari/iOS has catastrophic bugs with 'display: contents' and flexbox locking scrolling. 
    function arrangeHeroDOM() {
        const wrapper1 = document.getElementById('hero-wrapper-1');
        const p1 = document.getElementById('hero-left-top-left');
        const p2 = document.getElementById('hero-left-bottom');
        const p3 = document.getElementById('hero-left-top-right');
        const p4 = document.getElementById('hero-middle');
        const p5 = document.getElementById('hero-right-top');
        const p6 = document.getElementById('hero-right-bottom');

        if (!wrapper1 || !p1 || !p2 || !p3 || !p4 || !p5 || !p6) return;

        if (window.innerWidth <= 768 && !wrapper1.classList.contains('mobile-arranged')) {
            // Move elements to root of wrapper-1 for native flex-direction: column flow
            wrapper1.appendChild(p1);
            wrapper1.appendChild(p2);
            wrapper1.appendChild(p3);
            wrapper1.appendChild(p4);
            wrapper1.appendChild(p5);
            wrapper1.appendChild(p6);
            
            document.getElementById('hero-left').style.display = 'none';
            document.getElementById('hero-right').style.display = 'none';
            wrapper1.classList.add('mobile-arranged');
        } else if (window.innerWidth > 768 && wrapper1.classList.contains('mobile-arranged')) {
            // Revert them back exactly where they were for Desktop
            const leftTop = document.getElementById('hero-left-top');
            const left = document.getElementById('hero-left');
            const right = document.getElementById('hero-right');
            
            leftTop.appendChild(p1);
            leftTop.appendChild(p3);
            left.appendChild(p2);
            
            // #hero-middle comes after #hero-left
            wrapper1.insertBefore(p4, right);
            
            right.prepend(p5);
            right.appendChild(p6);
            
            left.style.display = '';
            right.style.display = '';
            wrapper1.classList.remove('mobile-arranged');
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setupHamburger();
            arrangeHeroDOM();
        });
    } else {
        setupHamburger();
        arrangeHeroDOM();
    }

    // Handle viewport resizing
    window.addEventListener('resize', arrangeHeroDOM);
})();

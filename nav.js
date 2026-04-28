/* ============================================
   RESALE SHOP — Shared Navigation Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // --- Hamburger Toggle ---
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const overlay = document.querySelector('.mobile-nav-overlay');

  function openMenu() {
    hamburger?.classList.add('open');
    mobileNav?.classList.add('open');
    overlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    hamburger?.classList.remove('open');
    mobileNav?.classList.remove('open');
    overlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', () => {
    hamburger.classList.contains('open') ? closeMenu() : openMenu();
  });
  overlay?.addEventListener('click', closeMenu);

  // Close on mobile link click
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // --- Scroll-based navbar ---
  const navbar = document.querySelector('.navbar');
  function handleScroll() {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- Active link highlighting ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        closeMenu();
      }
    });
  });

  // --- Intersection Observer for animations ---
  const animatedEls = document.querySelectorAll('[data-animate]');
  if (animatedEls.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const anim = el.getAttribute('data-animate');
          el.classList.add(`animate-${anim}`);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    animatedEls.forEach(el => {
      el.style.opacity = '0';
      observer.observe(el);
    });
  }

  // --- Floating Utilities Injection ---
  function initUtilities() {
    // Inject mobile toggles into drawer if they don't exist
    const mobileNav = document.querySelector('.mobile-nav');
    if (mobileNav && !mobileNav.querySelector('.mobile-nav-utils')) {
      const mobileUtils = document.createElement('div');
      mobileUtils.className = 'mobile-nav-utils';
      mobileUtils.innerHTML = `
        <button id="themeToggleMobile" class="nav-icon-btn" title="Toggle Theme">🌞</button>
        <button id="rtlToggleMobile" class="nav-icon-btn" title="Toggle RTL">RTL</button>
      `;
      mobileNav.prepend(mobileUtils);
    }

    const utilsHTML = `
      <div class="floating-utilities">
        <button id="scrollTopBtn" class="util-btn" title="Move to Top">↑</button>
      </div>
    `;
    if (!document.querySelector('.floating-utilities')) {
      document.body.insertAdjacentHTML('beforeend', utilsHTML);
    }

    const themeToggles = document.querySelectorAll('#themeToggle, #themeToggleNav, #themeToggleMobile');
    const rtlToggles = document.querySelectorAll('#rtlToggle, #rtlToggleNav, #rtlToggleMobile');
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    // Theme Logic
    const updateThemeIcons = (isLight) => {
      themeToggles.forEach(btn => {
        btn.textContent = isLight ? '🌙' : '🌞';
      });
    };

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
      updateThemeIcons(true);
    }
    
    themeToggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        updateThemeIcons(isLight);
      });
    });

    // RTL Logic
    const savedRtl = localStorage.getItem('rtl');
    if (savedRtl === 'true') {
      document.body.classList.add('rtl');
    }
    
    rtlToggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        document.body.classList.toggle('rtl');
        const isRtl = document.body.classList.contains('rtl');
        localStorage.setItem('rtl', isRtl ? 'true' : 'false');
      });
    });

    // Scroll to Top Logic
    function handleScrollTopBtn() {
      if (window.scrollY > 300) {
        scrollTopBtn?.classList.add('show');
      } else {
        scrollTopBtn?.classList.remove('show');
      }
    }
    window.addEventListener('scroll', handleScrollTopBtn, { passive: true });
    handleScrollTopBtn(); // Initial check

    scrollTopBtn?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  
  initUtilities();
});

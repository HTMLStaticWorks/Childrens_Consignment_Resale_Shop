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
});

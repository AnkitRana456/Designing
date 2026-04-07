(function () {
  'use strict';

  /* ── Mobile hamburger nav ── */
  const hamburgerBtn          = document.getElementById('hamburger-btn');
  const mobileNavOverlay      = document.getElementById('mobile-nav-overlay');
  const mobileNavClose        = document.getElementById('mobile-nav-close');
  const mobileProjectsTrigger = document.getElementById('mobile-projects-trigger');
  const mobileProjectsBack    = document.getElementById('mobile-projects-back');
  const mobileMainPanel       = document.getElementById('mobile-main-panel');
  const mobileProjectsPanel   = document.getElementById('mobile-projects-panel');

  function openMobileNav() {
    mobileNavOverlay.classList.add('open');
    hamburgerBtn.classList.add('active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    mobileNavOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Reset panels state
    mobileMainPanel.classList.remove('slide-out');
    mobileProjectsPanel.classList.remove('slide-in');
  }

  function closeMobileNav() {
    mobileNavOverlay.classList.remove('open');
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    mobileNavOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn && mobileNavOverlay) {
    hamburgerBtn.addEventListener('click', openMobileNav);
    mobileNavClose.addEventListener('click', closeMobileNav);

    // Drilldown Logic
    mobileProjectsTrigger?.addEventListener('click', () => {
      mobileMainPanel.classList.add('slide-out');
      mobileProjectsPanel.classList.add('slide-in');
    });

    mobileProjectsBack?.addEventListener('click', () => {
      mobileMainPanel.classList.remove('slide-out');
      mobileProjectsPanel.classList.remove('slide-in');
    });

    // Close on link click
    const mobileLinks = document.querySelectorAll('.mobile-nav-item, .mobile-project-item, .mobile-contact-btn');
    mobileLinks.forEach(link => {
      if (link.id !== 'mobile-projects-trigger') {
        link.addEventListener('click', closeMobileNav);
      }
    });

    mobileNavOverlay.addEventListener('click', (e) => {
      if (e.target === mobileNavOverlay) closeMobileNav();
    });
  }

const dropdownBtn = document.getElementById('nav-projects-btn');
  const dropdownMenu = document.getElementById('projects-dropdown');
  const navDropdown = dropdownBtn ? dropdownBtn.closest('.nav-dropdown') : null;

  if (dropdownBtn && dropdownMenu) {

    dropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdownMenu.classList.toggle('open');

      if (navDropdown) navDropdown.classList.toggle('open', isOpen);
    });

document.addEventListener('click', () => {
      dropdownMenu.classList.remove('open');
      if (navDropdown) navDropdown.classList.remove('open');
    });

dropdownMenu.querySelectorAll('.dropdown-item').forEach(item => {
      item.addEventListener('click', () => {
        dropdownMenu.classList.remove('open');
        if (navDropdown) navDropdown.classList.remove('open');
      });
    });
  }

const carousel = document.getElementById('verde-carousel');
  const prevBtn  = document.getElementById('verde-prev');
  const nextBtn  = document.getElementById('verde-next');

  if (carousel && prevBtn && nextBtn) {
    let currentOffset = 0;
    const cardWidth = 236;
    const maxCards = carousel.querySelectorAll('.amenity-card').length;
    const visible = 4;
    const maxOffset = Math.max(0, (maxCards - visible) * cardWidth);

    nextBtn.addEventListener('click', () => {
      currentOffset = Math.min(currentOffset + cardWidth, maxOffset);
      carousel.style.transform = `translateX(-${currentOffset}px)`;
      prevBtn.classList.toggle('carousel-btn-active', currentOffset > 0);
      nextBtn.classList.toggle('carousel-btn-active', currentOffset < maxOffset);
    });

    prevBtn.addEventListener('click', () => {
      currentOffset = Math.max(currentOffset - cardWidth, 0);
      carousel.style.transform = `translateX(-${currentOffset}px)`;
      prevBtn.classList.toggle('carousel-btn-active', currentOffset > 0);
      nextBtn.classList.toggle('carousel-btn-active', currentOffset < maxOffset);
    });
  }

const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-inquiry-btn');

  if (form && submitBtn) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const original = submitBtn.textContent;
      submitBtn.textContent = 'âœ“ INQUIRY SENT!';
      submitBtn.style.background = '#2d5a27';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = original;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
        form.reset();
      }, 3500);
    });
  }

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = document.getElementById('navbar')?.offsetHeight || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

const fadeEls = document.querySelectorAll(
    '.verde-about, .amenities-section, .masterplan-inner, .gs-about, .gs-gallery-inner, .springs-hero-content, .location-inner, .contact-inner'
  );

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    io.observe(el);
  });

const galleryCards = document.querySelectorAll('.gs-gallery-card');

  galleryCards.forEach(card => {
    const baseTiltY = parseFloat(card.dataset.tilt || 0);
    const gloss     = card.querySelector('.card-gloss');

    card.addEventListener('mousemove', (e) => {
      const rect    = card.getBoundingClientRect();
      const x       = e.clientX - rect.left;
      const y       = e.clientY - rect.top;
      const pctX    = (x / rect.width  - 0.5) * 2;
      const pctY    = (y / rect.height - 0.5) * 2;

const tiltY   = baseTiltY + pctX * 12;
      const tiltX   = -pctY * 9;
      const scale   = 1.06;

      card.style.transition = 'transform 0.08s ease, box-shadow 0.08s ease';
      card.style.transform  =
        `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${scale}) translateZ(10px)`;

if (gloss) {
        const gx = (pctX * 0.5 + 0.5) * 100;
        const gy = (pctY * 0.5 + 0.5) * 100;
        gloss.style.background =
          `radial-gradient(circle at ${gx}% ${gy}%,
            rgba(255,255,255,0.28) 0%,
            rgba(255,255,255,0.06) 50%,
            rgba(255,255,255,0) 75%)`;
        gloss.style.opacity = '1';
      }
    });

    card.addEventListener('mouseleave', () => {

      card.style.transition = 'transform 0.5s cubic-bezier(0.23,1,0.32,1), box-shadow 0.5s cubic-bezier(0.23,1,0.32,1)';
      card.style.transform  = '';
      if (gloss) gloss.style.opacity = '0';
    });
  });

})();

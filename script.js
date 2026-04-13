(function () {
  'use strict';

  /* ── Initialize international phone inputs ── */
  function initPhoneFields() {
    const inputs = [
      document.querySelector("#phone-num"),
      document.querySelector("#modal-phone")
    ];
    
    // Safety check for library availability
    const lib = window.intlTelInput;
    if (typeof lib !== 'function') {
      console.warn("ITI library not found, waiting...");
      return;
    }

    inputs.forEach(input => {
      if (input && !input.parentElement.classList.contains('iti')) {
        lib(input, {
          initialCountry: "in",
          separateDialCode: true,
          utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
        });
        // Success: hide our manual fallback
        input.closest('.phone-input-group')?.classList.add('iti-loaded');
      }
    });
  }

  // Run on various events to ensure success
  initPhoneFields();
  window.addEventListener('load', initPhoneFields);
  setTimeout(initPhoneFields, 500); 
  setTimeout(initPhoneFields, 1500);

  /* ── Mobile hamburger nav ── */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
  const mobileNavClose = document.getElementById('mobile-nav-close');
  const mobileProjectsTrigger = document.getElementById('mobile-projects-trigger');
  const mobileProjectsBack = document.getElementById('mobile-projects-back');
  const mobileMainPanel = document.getElementById('mobile-main-panel');
  const mobileProjectsPanel = document.getElementById('mobile-projects-panel');

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
  const prevBtn = document.getElementById('verde-prev');
  const nextBtn = document.getElementById('verde-next');

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

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
    
      const original = submitBtn.textContent;
      submitBtn.textContent = '✓ INQUIRY SENT!';
      submitBtn.style.background = '#2d5a27';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = original;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      
      }, 3500);
    });
  }


  const inquiryModal = document.getElementById('inquiry-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalForm = document.getElementById('redesigned-enquiry-modal');
  const modalSubmitBtn = document.getElementById('modal-submit-btn');

  function openModal() {
    if (inquiryModal) {
      inquiryModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (inquiryModal) {
      inquiryModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  inquiryModal?.addEventListener('click', (e) => {
    if (e.target === inquiryModal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && inquiryModal?.getAttribute('aria-hidden') === 'false') {
      closeModal();
    }
  });

  if (modalSubmitBtn) {
    modalSubmitBtn.addEventListener('click', () => {
      const original = modalSubmitBtn.textContent;
      modalSubmitBtn.textContent = '✓ SUBMITTED';
      modalSubmitBtn.style.background = '#28a745';
      modalSubmitBtn.disabled = true;

      setTimeout(() => {
        closeModal();
        setTimeout(() => {
          modalSubmitBtn.textContent = original;
          modalSubmitBtn.style.background = '';
          modalSubmitBtn.disabled = false;
        }, 500);
      }, 2000);
    });
  }

 
  const contactSection = document.getElementById('contact');
  const actionButtons = [
    'verde-know-more', 'verde-brochure',
    'gs-know-more', 'gs-brochure', 'gs-learn-more', 'gs-dl-brochure', 'gs-gallery-btn',
    'springs-know-more', 'springs-brochure'
  ];

  actionButtons.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener('click', openModal);
    }
  });

 
  function scrollToContact() {
    if (contactSection) {
      const navH = document.getElementById('navbar')?.offsetHeight || 72;
      const top = contactSection.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });

      setTimeout(() => {
        const firstInput = contactSection.querySelector('input');
        if (firstInput) firstInput.focus();
      }, 800);
    }
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
    const gloss = card.querySelector('.card-gloss');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const pctX = (x / rect.width - 0.5) * 2;
      const pctY = (y / rect.height - 0.5) * 2;

      const tiltY = baseTiltY + pctX * 12;
      const tiltX = -pctY * 9;
      const scale = 1.06;

      card.style.transition = 'transform 0.08s ease, box-shadow 0.08s ease';
      card.style.transform =
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
      card.style.transform = '';
      if (gloss) gloss.style.opacity = '0';
    });
  });

})();

/* ============================================================
   JEY PHOTOGRAPHE — JAVASCRIPT
   Features: Loader, Cursor, Hero Slider, Scroll Reveal,
             Gallery Filter + Lightbox, Stats Counter,
             Testimonials, Contact Form, Nav scroll
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ══════════════════════════════════════
     LOADER
  ══════════════════════════════════════ */
  const loader = document.getElementById('loader');
  const loaderProgress = document.getElementById('loaderProgress');

  document.body.classList.add('loading');

  // Animate loader bar
  setTimeout(() => { loaderProgress.style.width = '100%'; }, 100);

  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.classList.remove('loading');
    // Trigger initial reveal
    revealObserver.trigger();
  }, 2200);


  /* ══════════════════════════════════════
     CUSTOM CURSOR
  ══════════════════════════════════════ */
  const cursor = document.getElementById('cursor');
  const cursorFollower = document.getElementById('cursorFollower');
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  // Smooth follower
  function animateCursor() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top  = followerY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover state
  const hoverTargets = document.querySelectorAll('a, button, .gallery-item, .filter-btn, input, textarea, select');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hovered');
      cursorFollower.classList.add('hovered');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovered');
      cursorFollower.classList.remove('hovered');
    });
  });


  /* ══════════════════════════════════════
     NAVIGATION
  ══════════════════════════════════════ */
  const nav = document.getElementById('nav');
  const navBurger = document.getElementById('navBurger');
  const mobileMenu = document.getElementById('mobileMenu');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  navBurger.addEventListener('click', () => {
    navBurger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      navBurger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });


  /* ══════════════════════════════════════
     HERO SLIDER
  ══════════════════════════════════════ */
  const slides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.hero-dot');
  const heroSlideNum = document.getElementById('heroSlideNum');
  let currentSlide = 0;
  let slideInterval;

  function goToSlide(idx) {
    slides[currentSlide].classList.remove('active');
    heroDots[currentSlide].classList.remove('active');
    currentSlide = idx;
    slides[currentSlide].classList.add('active');
    heroDots[currentSlide].classList.add('active');
    heroSlideNum.textContent = String(currentSlide + 1).padStart(2, '0');
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % slides.length);
  }

  slideInterval = setInterval(nextSlide, 5500);

  heroDots.forEach(dot => {
    dot.addEventListener('click', () => {
      clearInterval(slideInterval);
      goToSlide(parseInt(dot.dataset.slide));
      slideInterval = setInterval(nextSlide, 5500);
    });
  });


  /* ══════════════════════════════════════
     SCROLL REVEAL
  ══════════════════════════════════════ */
  const revealObserver = (() => {
    const els = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseFloat(el.style.getPropertyValue('--delay') || '0');
          setTimeout(() => el.classList.add('revealed'), delay * 1000);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    els.forEach(el => observer.observe(el));

    return {
      trigger: () => {
        // Reveal hero elements immediately after load
        document.querySelectorAll('.hero .reveal-up').forEach((el, i) => {
          setTimeout(() => el.classList.add('revealed'), 300 + i * 150);
        });
      }
    };
  })();


  /* ══════════════════════════════════════
     STATS COUNTER
  ══════════════════════════════════════ */
  const statNums = document.querySelectorAll('.stat-num');
  let statsTriggered = false;

  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !statsTriggered) {
      statsTriggered = true;
      statNums.forEach(el => {
        const target = parseInt(el.dataset.target);
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(timer); }
          el.textContent = Math.floor(current) + (el.dataset.target === '98' ? '' : '+');
        }, 16);
      });
    }
  }, { threshold: 0.4 });

  if (document.querySelector('.about-stats')) {
    statsObserver.observe(document.querySelector('.about-stats'));
  }


  /* ══════════════════════════════════════
     GALLERY FILTER
  ══════════════════════════════════════ */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.dataset.cat;

      galleryItems.forEach((item, i) => {
        const itemCat = item.dataset.cat;
        const show = cat === 'all' || itemCat === cat;

        item.style.transition = `opacity 0.4s ease ${i * 0.02}s, transform 0.4s ease ${i * 0.02}s`;

        if (show) {
          item.style.display = '';
          requestAnimationFrame(() => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.96)';
            requestAnimationFrame(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            });
          });
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.96)';
          setTimeout(() => { item.style.display = 'none'; }, 400);
        }
      });
    });
  });


  /* ══════════════════════════════════════
     LIGHTBOX
  ══════════════════════════════════════ */
  const lightbox = document.getElementById('lightbox');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  let lightboxItems = [];
  let lightboxIdx = 0;

  function openLightbox(items, idx) {
    lightboxItems = items;
    lightboxIdx = idx;
    showLightboxImage();
    lightbox.classList.add('open');
    lightboxBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightboxBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  function showLightboxImage() {
    const item = lightboxItems[lightboxIdx];
    const img = item.querySelector('img');
    const cap = item.querySelector('.gallery-overlay span');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = cap ? cap.textContent : '';

    // Fade animation
    lightboxImg.style.opacity = '0';
    lightboxImg.onload = () => {
      lightboxImg.style.transition = 'opacity 0.3s';
      lightboxImg.style.opacity = '1';
    };
  }

  galleryItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
      const visibleItems = Array.from(galleryItems).filter(i => i.style.display !== 'none');
      const visIdx = visibleItems.indexOf(item);
      openLightbox(visibleItems, visIdx >= 0 ? visIdx : idx);
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxBackdrop.addEventListener('click', closeLightbox);

  lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    lightboxIdx = (lightboxIdx - 1 + lightboxItems.length) % lightboxItems.length;
    showLightboxImage();
  });

  lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    lightboxIdx = (lightboxIdx + 1) % lightboxItems.length;
    showLightboxImage();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') { lightboxIdx = (lightboxIdx - 1 + lightboxItems.length) % lightboxItems.length; showLightboxImage(); }
    if (e.key === 'ArrowRight') { lightboxIdx = (lightboxIdx + 1) % lightboxItems.length; showLightboxImage(); }
  });


  /* ══════════════════════════════════════
     TESTIMONIALS SLIDER
  ══════════════════════════════════════ */
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const testimonialDots  = document.querySelectorAll('.testimonial-dot');
  let testimonialIdx = 0;
  let testimonialInterval;

  function showTestimonial(idx) {
    testimonialCards[testimonialIdx].classList.remove('active');
    testimonialDots[testimonialIdx].classList.remove('active');
    testimonialIdx = idx;
    testimonialCards[testimonialIdx].classList.add('active');
    testimonialDots[testimonialIdx].classList.add('active');
  }

  testimonialCards[0].classList.add('active');

  testimonialInterval = setInterval(() => {
    showTestimonial((testimonialIdx + 1) % testimonialCards.length);
  }, 5000);

  testimonialDots.forEach(dot => {
    dot.addEventListener('click', () => {
      clearInterval(testimonialInterval);
      showTestimonial(parseInt(dot.dataset.idx));
      testimonialInterval = setInterval(() => {
        showTestimonial((testimonialIdx + 1) % testimonialCards.length);
      }, 5000);
    });
  });


  /* ══════════════════════════════════════
     CONTACT FORM
  ══════════════════════════════════════ */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const submitBtn   = document.getElementById('submitBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      submitBtn.querySelector('span').textContent = 'Envoi en cours...';
      submitBtn.disabled = true;

      // Simulate async send
      setTimeout(() => {
        contactForm.reset();
        submitBtn.querySelector('span').textContent = 'Envoyer le message';
        submitBtn.disabled = false;
        formSuccess.classList.add('show');
        setTimeout(() => formSuccess.classList.remove('show'), 5000);
      }, 1500);
    });
  }


  /* ══════════════════════════════════════
     SMOOTH SCROLL for nav links
  ══════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  /* ══════════════════════════════════════
     PARALLAX on About Image (subtle)
  ══════════════════════════════════════ */
  const aboutImage = document.querySelector('.about-image');
  if (aboutImage) {
    window.addEventListener('scroll', () => {
      const rect = aboutImage.closest('.about-image-wrap').getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        aboutImage.style.transform = `translateY(${(progress - 0.5) * 30}px)`;
      }
    }, { passive: true });
  }

});

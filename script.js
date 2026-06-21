/* ============================================================
   JEY PHOTOGRAPHE — JAVASCRIPT DYNAMIQUE
   Features: JSON Dynamic Loading, Loader, Cursor, Hero Slider,
             Scroll Reveal, Gallery Filter + Lightbox,
             Stats Counter, Testimonials, Contact Form, Nav scroll
   ============================================================ */

'use strict';

// Catégories traduites pour l'affichage de la galerie
const CATEGORY_NAMES = {
  all: "Tout",
  wedding: "Mariage",
  shooting: "Portrait",
  lifestyle: "Lifestyle",
  evenement: "Événement",
  deco: "Décoration",
  church: "Église"
};

document.addEventListener('DOMContentLoaded', async () => {

  // Données de secours (Fallback) si data.json ne peut pas être chargé (ex: ouverture directe en file://)
  const DEFAULT_DATA = {
    "site": {
      "title": "JEY — Photographe | Capturing Life's Finest Moments",
      "description": "JEY Photographe — Spécialiste en photographie de mariage, portrait, lifestyle et événementiel. Des instants précieux, capturés pour l'éternité."
    },
    "hero": {
      "eyebrow": "Photographe Professionnel",
      "title": "L'Art de <em>Capturer</em> l'Instant",
      "subtitle": "Mariage · Portrait · Lifestyle · Événement",
      "ctaText": "Découvrir le travail",
      "ctaLink": "#gallery",
      "cta2Text": "Réserver une session",
      "cta2Link": "#contact",
      "slides": [
        "WEDDING/DSC07460.jpg",
        "PORTFOLIO/SHOOTING/MEILLEUR 1.jpg",
        "PORTFOLIO/EVENEMENT /DSC05473.jpg",
        "PORTFOLIO/LIFESTYLE/Maman Lili.jpg",
        "WEDDING/DSC09026.jpg"
      ]
    },
    "about": {
      "image": "PORTFOLIO/IMG_8921.jpeg",
      "experience": "10+",
      "eyebrow": "À propos",
      "title": "Une vision,<br /><em>une signature</em>",
      "descParagraphs": [
        "Je suis JEY, photographe passionné par l'humain et ses émotions. Chaque image que je crée est une histoire — un fragment de vie figé dans le temps, dont la beauté ne s'efface jamais.",
        "Que ce soit lors d'un mariage, d'un shooting portrait ou d'un événement, mon œil cherche toujours ce moment authentique, cette lumière unique, cette émotion vraie qui rend chaque photo inoubliable."
      ],
      "stats": [
        { "num": 500, "label": "Séances réalisées" },
        { "num": 200, "label": "Mariages capturés" },
        { "num": 98, "label": "% Clients satisfaits", "noPlus": true }
      ],
      "ctaText": "Travaillons ensemble"
    },
    "gallery": [
      { "src": "WEDDING/1 2.jpg", "cat": "wedding", "layout": "tall", "alt": "Mariage JEY" },
      { "src": "WEDDING/1.jpg", "cat": "wedding", "layout": "normal", "alt": "Mariage JEY" },
      { "src": "WEDDING/2.jpg", "cat": "wedding", "layout": "wide", "alt": "Mariage JEY" },
      { "src": "WEDDING/27.jpg", "cat": "wedding", "layout": "normal", "alt": "Mariage JEY" },
      { "src": "WEDDING/3 2.jpg", "cat": "wedding", "layout": "tall", "alt": "Mariage JEY" },
      { "src": "WEDDING/3.jpg", "cat": "wedding", "layout": "wide", "alt": "Mariage JEY" },
      { "src": "PORTFOLIO/SHOOTING/MEILLEUR 1.jpg", "cat": "shooting", "layout": "tall", "alt": "Portrait JEY" },
      { "src": "PORTFOLIO/SHOOTING/KOFF'S FAMILY.jpg", "cat": "shooting", "layout": "wide", "alt": "Portrait Famille" },
      { "src": "PORTFOLIO/LIFESTYLE/Maman Lili.jpg", "cat": "lifestyle", "layout": "tall", "alt": "Lifestyle JEY" },
      { "src": "PORTFOLIO/EVENEMENT /DSC05473.jpg", "cat": "evenement", "layout": "wide", "alt": "Événement JEY" },
      { "src": "PORTFOLIO/DECO/DSC04265.jpg", "cat": "deco", "layout": "wide", "alt": "Décoration JEY" },
      { "src": "PORTFOLIO/CHURCH/RW 1 .jpg", "cat": "church", "layout": "wide", "alt": "Église JEY" }
    ],
    "services": [
      {
        "icon": "♥",
        "title": "Mariage",
        "desc": "Chaque mariage est unique. Je capture l'émotion, la joie et les détails précieux de votre jour J avec discrétion et talent.",
        "items": ["Préparatifs & cérémonie", "Séance couple", "Cocktail & réception", "Album premium inclus"],
        "link": "#contact"
      },
      {
        "icon": "◉",
        "title": "Portrait & Shooting",
        "desc": "Séances studio ou en extérieur pour mettre en valeur votre personnalité, famille ou projet professionnel.",
        "items": ["Portrait individuel", "Photo de famille", "Book professionnel", "Shooting thématique"],
        "link": "#contact"
      },
      {
        "icon": "★",
        "title": "Événement",
        "desc": "Concerts, conférences, soirées privées... Je capture l'énergie de vos événements avec dynamisme et précision.",
        "items": ["Événements corporate", "Soirées & galas", "Concerts & spectacles", "Livraison rapide"],
        "link": "#contact"
      },
      {
        "icon": "⬡",
        "title": "Lifestyle & Décor",
        "desc": "Des images de mode de vie authentiques et des photos de décoration qui subliment vos espaces et vos projets.",
        "items": ["Photo lifestyle", "Décoration d'intérieur", "Contenu réseaux sociaux", "Direction artistique"],
        "link": "#contact"
      }
    ],
    "testimonials": [
      {
        "stars": 5,
        "text": "\"JEY a su capturer chaque instant de notre mariage avec une sensibilité et un professionnalisme rares. Les photos sont absolument magnifiques !\"",
        "author": "Marie & Paul K.",
        "role": "Mariés en 2024"
      },
      {
        "stars": 5,
        "text": "\"Un photographe exceptionnel ! Il capte la lumière comme personne. Notre séance lifestyle a dépassé toutes nos attentes. On recommande les yeux fermés.\"",
        "author": "Élodie M.",
        "role": "Shooting Lifestyle"
      }
    ],
    "contact": {
      "email": "jeremieleba344@gmail.com",
      "phone": "+225 07 88 17 04 83",
      "address": "Abidjan, Côte d'Ivoire",
      "social": {
        "instagram": "https://www.instagram.com/jeremieleba_?igsh=djUxdmhmMTU1YzI2&utm_source=qr",
        "facebook": "https://www.facebook.com/share/1DvG66n7N4/?mibextid=wwXIfr",
        "tiktok": "https://www.tiktok.com/@jeremieleba252?_r=1&_t=ZS-94vjrdHsIMq",
        "whatsapp": "https://wa.me/2250788170483"
      }
    }
  };

  // Chargement des données
  let data = DEFAULT_DATA;
  try {
    // Mode Live Preview : si localStorage contient des modifications en cours, on les charge
    const localData = localStorage.getItem('jey_portfolio_data');
    if (localData) {
      data = JSON.parse(localData);
    } else {
      const res = await fetch('data.json');
      if (res.ok) {
        data = await res.json();
      }
    }
  } catch (err) {
    console.warn("Échec du chargement dynamique. Utilisation des données par défaut.", err);
  }

  // Application des métadonnées du site
  if (data.site) {
    document.title = data.site.title || "JEY — Photographe";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && data.site.description) {
      metaDesc.setAttribute('content', data.site.description);
    }
  }

  // Fonction d'injection dynamique dans le DOM
  function populateDOM(d) {
    // --- HERO ---
    const heroSlides = document.getElementById('heroSlides');
    const heroEyebrow = document.getElementById('heroEyebrow');
    const heroTitle = document.getElementById('heroTitle');
    const heroSubtitle = document.getElementById('heroSubtitle');
    const heroCta = document.getElementById('heroCta');
    const heroSlideTotal = document.getElementById('heroSlideTotal');
    const heroDots = document.getElementById('heroDots');

    if (d.hero) {
      if (heroSlides && d.hero.slides && d.hero.slides.length > 0) {
        heroSlides.innerHTML = d.hero.slides.map((src, idx) => `
          <div class="hero-slide ${idx === 0 ? 'active' : ''}" style="background-image: url('${src}')"></div>
        `).join('');
      }
      if (heroEyebrow) heroEyebrow.textContent = d.hero.eyebrow;
      if (heroTitle) heroTitle.innerHTML = d.hero.title;
      if (heroSubtitle) heroSubtitle.textContent = d.hero.subtitle;
      if (heroCta) {
        heroCta.innerHTML = `
          <a href="${d.hero.ctaLink || '#gallery'}" class="btn btn-primary">${d.hero.ctaText || 'Découvrir'}</a>
          <a href="${d.hero.cta2Link || '#contact'}" class="btn btn-ghost">${d.hero.cta2Text || 'Réserver'}</a>
        `;
      }
      if (heroSlideTotal && d.hero.slides) {
        heroSlideTotal.textContent = String(d.hero.slides.length).padStart(2, '0');
      }
      if (heroDots && d.hero.slides) {
        heroDots.innerHTML = d.hero.slides.map((_, idx) => `
          <button class="hero-dot ${idx === 0 ? 'active' : ''}" data-slide="${idx}"></button>
        `).join('');
      }
    }

    // --- ABOUT ---
    const aboutImage = document.getElementById('aboutImage');
    const aboutBadgeNum = document.getElementById('aboutBadgeNum');
    const aboutBadgeLabel = document.getElementById('aboutBadgeLabel');
    const aboutEyebrow = document.getElementById('aboutEyebrow');
    const aboutTitle = document.getElementById('aboutTitle');
    const aboutDesc = document.getElementById('aboutDesc');
    const aboutStats = document.getElementById('aboutStats');
    const aboutCta = document.getElementById('aboutCta');

    if (d.about) {
      if (aboutImage) aboutImage.src = d.about.image;
      if (aboutBadgeNum) aboutBadgeNum.textContent = d.about.experience;
      if (aboutBadgeLabel) aboutBadgeLabel.textContent = "Ans d'expérience";
      if (aboutEyebrow) aboutEyebrow.textContent = d.about.eyebrow;
      if (aboutTitle) aboutTitle.innerHTML = d.about.title;
      if (aboutDesc && d.about.descParagraphs) {
        aboutDesc.innerHTML = d.about.descParagraphs.map(p => `
          <p class="about-desc">${p}</p>
        `).join('');
      }
      if (aboutStats && d.about.stats) {
        aboutStats.innerHTML = d.about.stats.map(s => `
          <div class="stat">
            <span class="stat-num" data-target="${s.num}">0</span>
            <span class="stat-label">${s.label}</span>
          </div>
        `).join('');
      }
      if (aboutCta) {
        aboutCta.textContent = d.about.ctaText;
      }
    }

    // --- GALLERY ---
    const galleryGrid = document.getElementById('galleryGrid');
    if (galleryGrid && d.gallery) {
      galleryGrid.innerHTML = d.gallery.map(item => `
        <div class="gallery-item ${item.layout || 'normal'}" data-cat="${item.cat}">
          <img src="${item.src}" alt="${item.alt || 'Photographie'}" loading="lazy" />
          <div class="gallery-overlay"><span>${CATEGORY_NAMES[item.cat] || item.cat}</span></div>
        </div>
      `).join('');
    }

    // --- SERVICES ---
    const servicesGrid = document.getElementById('servicesGrid');
    if (servicesGrid && d.services) {
      servicesGrid.innerHTML = d.services.map((s, idx) => `
        <div class="service-card reveal-up" style="--delay: ${idx * 0.1}s">
          <div class="service-icon">${s.icon}</div>
          <h3>${s.title}</h3>
          <p>${s.desc}</p>
          <ul>
            ${s.items.map(item => `<li>${item}</li>`).join('')}
          </ul>
          <a href="${s.link || '#contact'}" class="service-link">En savoir plus →</a>
        </div>
      `).join('');
    }

    // --- TESTIMONIALS ---
    const testimonialsTrack = document.getElementById('testimonialsTrack');
    const testimonialsNav = document.getElementById('testimonialsNav');
    if (d.testimonials) {
      if (testimonialsTrack) {
        testimonialsTrack.innerHTML = d.testimonials.map(t => `
          <div class="testimonial-card">
            <div class="testimonial-stars">${"★".repeat(t.stars)}</div>
            <p class="testimonial-text">${t.text}</p>
            <div class="testimonial-author">
              <span class="testimonial-name">${t.author}</span>
              <span class="testimonial-role">${t.role}</span>
            </div>
          </div>
        `).join('');
      }
      if (testimonialsNav) {
        testimonialsNav.innerHTML = d.testimonials.map((_, idx) => `
          <button class="testimonial-dot ${idx === 0 ? 'active' : ''}" data-idx="${idx}"></button>
        `).join('');
      }
    }

    // --- CONTACT & FOOTER ---
    const contactEmail = document.getElementById('contactEmail');
    const contactPhone = document.getElementById('contactPhone');
    const contactAddress = document.getElementById('contactAddress');
    const socialInstagram = document.getElementById('socialInstagram');
    const socialFacebook = document.getElementById('socialFacebook');
    const socialTiktok = document.getElementById('socialTiktok');
    const socialWhatsapp = document.getElementById('socialWhatsapp');
    const whatsappPopup = document.getElementById('whatsappPopup');
    const footerCopy = document.getElementById('footerCopy');

    if (d.contact) {
      if (contactEmail) contactEmail.textContent = d.contact.email;
      if (contactPhone) contactPhone.textContent = d.contact.phone;
      if (contactAddress) contactAddress.textContent = d.contact.address;
      if (d.contact.social) {
        if (socialInstagram) socialInstagram.href = d.contact.social.instagram;
        if (socialFacebook) socialFacebook.href = d.contact.social.facebook;
        if (socialTiktok) socialTiktok.href = d.contact.social.tiktok;
        if (socialWhatsapp) socialWhatsapp.href = d.contact.social.whatsapp;
        if (whatsappPopup) whatsappPopup.href = d.contact.social.whatsapp;
      }
    }
    if (footerCopy) {
      footerCopy.textContent = `© ${new Date().getFullYear()} JEY Photographe. Tous droits réservés.`;
    }
  }

  // Lancer l'injection des éléments dynamiques dans le DOM
  populateDOM(data);


  /* ══════════════════════════════════════
     LOADER
  ══════════════════════════════════════ */
  const loader = document.getElementById('loader');
  const loaderProgress = document.getElementById('loaderProgress');

  document.body.classList.add('loading');

  // Animate loader bar
  setTimeout(() => { if (loaderProgress) loaderProgress.style.width = '100%'; }, 100);

  setTimeout(() => {
    if (loader) loader.classList.add('hidden');
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

  if (cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top  = mouseY + 'px';
    });

    // Smooth follower
    const animateCursor = () => {
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      cursorFollower.style.left = followerX + 'px';
      cursorFollower.style.top  = followerY + 'px';
      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Hover state
    const updateCursorHoverState = () => {
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
    };
    updateCursorHoverState();
  }


  /* ══════════════════════════════════════
     NAVIGATION
  ══════════════════════════════════════ */
  const nav = document.getElementById('nav');
  const navBurger = document.getElementById('navBurger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  if (navBurger && mobileMenu) {
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
  }


  /* ══════════════════════════════════════
     HERO SLIDER
  ══════════════════════════════════════ */
  const slides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.hero-dot');
  const heroSlideNum = document.getElementById('heroSlideNum');
  let currentSlide = 0;
  let slideInterval;

  if (slides.length > 0) {
    const goToSlide = (idx) => {
      if (slides[currentSlide]) slides[currentSlide].classList.remove('active');
      if (heroDots[currentSlide]) heroDots[currentSlide].classList.remove('active');
      currentSlide = idx;
      if (slides[currentSlide]) slides[currentSlide].classList.add('active');
      if (heroDots[currentSlide]) heroDots[currentSlide].classList.add('active');
      if (heroSlideNum) heroSlideNum.textContent = String(currentSlide + 1).padStart(2, '0');
    };

    const nextSlide = () => {
      goToSlide((currentSlide + 1) % slides.length);
    };

    slideInterval = setInterval(nextSlide, 5500);

    heroDots.forEach(dot => {
      dot.addEventListener('click', () => {
        clearInterval(slideInterval);
        goToSlide(parseInt(dot.dataset.slide));
        slideInterval = setInterval(nextSlide, 5500);
      });
    });
  }


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
        const isPercentage = el.textContent.includes('%') || el.nextElementSibling?.textContent === '%';
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = Math.floor(current) + (target === 98 ? '' : '+');
        }, 16);
      });
    }
  }, { threshold: 0.4 });

  if (document.querySelector('.about-stats') && statNums.length > 0) {
    statsObserver.observe(document.querySelector('.about-stats'));
  }


  /* ══════════════════════════════════════
     GALLERY FILTER
  ══════════════════════════════════════ */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const cat = btn.dataset.cat;

        galleryItems.forEach((item, i) => {
          const itemCat = item.dataset.cat;
          const show = cat === 'all' || itemCat === cat;

          item.style.transition = `opacity 0.4s ease ${i * 0.01}s, transform 0.4s ease ${i * 0.01}s`;

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
  }


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

  if (lightbox && galleryItems.length > 0) {
    const openLightbox = (items, idx) => {
      lightboxItems = items;
      lightboxIdx = idx;
      showLightboxImage();
      lightbox.classList.add('open');
      if (lightboxBackdrop) lightboxBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      lightbox.classList.remove('open');
      if (lightboxBackdrop) lightboxBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    };

    const showLightboxImage = () => {
      const item = lightboxItems[lightboxIdx];
      if (!item) return;
      const img = item.querySelector('img');
      const cap = item.querySelector('.gallery-overlay span');
      if (img && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxImg.style.opacity = '0';
        lightboxImg.onload = () => {
          lightboxImg.style.transition = 'opacity 0.3s';
          lightboxImg.style.opacity = '1';
        };
      }
      if (lightboxCaption) {
        lightboxCaption.textContent = cap ? cap.textContent : '';
      }
    };

    galleryItems.forEach((item, idx) => {
      item.addEventListener('click', () => {
        const visibleItems = Array.from(galleryItems).filter(i => i.style.display !== 'none');
        const visIdx = visibleItems.indexOf(item);
        openLightbox(visibleItems, visIdx >= 0 ? visIdx : idx);
      });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

    if (lightboxPrev) {
      lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        lightboxIdx = (lightboxIdx - 1 + lightboxItems.length) % lightboxItems.length;
        showLightboxImage();
      });
    }

    if (lightboxNext) {
      lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        lightboxIdx = (lightboxIdx + 1) % lightboxItems.length;
        showLightboxImage();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') {
        lightboxIdx = (lightboxIdx - 1 + lightboxItems.length) % lightboxItems.length;
        showLightboxImage();
      }
      if (e.key === 'ArrowRight') {
        lightboxIdx = (lightboxIdx + 1) % lightboxItems.length;
        showLightboxImage();
      }
    });
  }


  /* ══════════════════════════════════════
     TESTIMONIALS SLIDER
  ══════════════════════════════════════ */
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const testimonialDots  = document.querySelectorAll('.testimonial-dot');
  let testimonialIdx = 0;
  let testimonialInterval;

  if (testimonialCards.length > 0) {
    const showTestimonial = (idx) => {
      if (testimonialCards[testimonialIdx]) testimonialCards[testimonialIdx].classList.remove('active');
      if (testimonialDots[testimonialIdx]) testimonialDots[testimonialIdx].classList.remove('active');
      testimonialIdx = idx;
      if (testimonialCards[testimonialIdx]) testimonialCards[testimonialIdx].classList.add('active');
      if (testimonialDots[testimonialIdx]) testimonialDots[testimonialIdx].classList.add('active');
    };

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
  }


  /* ══════════════════════════════════════
     CONTACT FORM
  ══════════════════════════════════════ */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const submitBtn   = document.getElementById('submitBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (submitBtn) {
        submitBtn.querySelector('span').textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
      }

      // Simulate async send
      setTimeout(() => {
        contactForm.reset();
        if (submitBtn) {
          submitBtn.querySelector('span').textContent = 'Envoyer le message';
          submitBtn.disabled = false;
        }
        if (formSuccess) {
          formSuccess.classList.add('show');
          setTimeout(() => formSuccess.classList.remove('show'), 5000);
        }
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
  const aboutImageEl = document.getElementById('aboutImage');
  if (aboutImageEl) {
    window.addEventListener('scroll', () => {
      const wrap = aboutImageEl.closest('.about-image-wrap');
      if (!wrap) return;
      const rect = wrap.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        aboutImageEl.style.transform = `translateY(${(progress - 0.5) * 30}px)`;
      }
    }, { passive: true });
  }

});

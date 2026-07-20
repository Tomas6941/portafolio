(function () {
  'use strict';

  // ── REDUCED MOTION ──

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── PRELOADER ──

  window.addEventListener('load', function () {
    document.body.classList.add('loaded');
    initTyping();
  });

  // ── CUSTOM CURSOR ──

  var dot = document.querySelector('.cursor-dot');
  var ring = document.querySelector('.cursor-ring');
  var useCursor = !window.matchMedia('(max-width: 900px)').matches;

  var mouseX = 0, mouseY = 0;
  var ringX = 0, ringY = 0;
  var ringAnimId = null;
  var ringIdle = true;

  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';

    var dx = Math.abs(mouseX - ringX);
    var dy = Math.abs(mouseY - ringY);

    if (dx < 0.5 && dy < 0.5) {
      if (!ringIdle) {
        ringIdle = true;
        ringAnimId = null;
      }
      return;
    }

    ringIdle = false;
    ringAnimId = requestAnimationFrame(animateRing);
  }

  if (useCursor && dot && ring) {
    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';

      if (ringIdle && ringAnimId === null) {
        ringIdle = false;
        ringAnimId = requestAnimationFrame(animateRing);
      }
    }, { passive: true });
  }

  // ── CURSOR HOVER EXPANSION ──

  if (useCursor && ring) {
    var hoverTargets = document.querySelectorAll('a, button, .project-link, .social-link, .filter-btn, .project-preview img');
    hoverTargets.forEach(function (el) {
      el.addEventListener('mouseenter', function () { ring.classList.add('expanded'); });
      el.addEventListener('mouseleave', function () { ring.classList.remove('expanded'); });
    });
  }

  // ── SCROLL COALESCING ──

  var ticking = false;
  var scrollY = 0;

  // ── SCROLL PROGRESS ──

  var progressBar = document.querySelector('.scroll-progress');

  function updateScrollProgress() {
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  }

  // ── BACK TO TOP ──

  var backToTop = document.getElementById('back-to-top');

  function updateBackToTop() {
    if (backToTop) backToTop.classList.toggle('visible', scrollY > 300);
  }

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── NAV SCROLL ──

  var nav = document.querySelector('nav');

  function updateNavScroll() {
    if (nav) nav.classList.toggle('scrolled', scrollY > 10);
  }

  // ── ACTIVE NAV LINK ──

  var sections = document.querySelectorAll('section[id]');
  var navLinkEls = document.querySelectorAll('.nav-links a');

  function updateActiveLink() {
    var current = '';
    sections.forEach(function (s) {
      if (scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinkEls.forEach(function (a) {
      var isCurrent = a.getAttribute('href') === '#' + current;
      a.style.opacity = isCurrent ? '1' : '0.6';
      if (isCurrent) {
        a.setAttribute('aria-current', 'page');
      } else {
        a.removeAttribute('aria-current');
      }
    });
  }

  // ── SECTION NUMBER PARALLAX ──

  var sectionNums = document.querySelectorAll('.section-number[data-section]');

  function updateSectionParallax() {
    sectionNums.forEach(function (num) {
      var parent = num.parentElement;
      if (!parent) return;
      var rect = parent.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        num.classList.add('revealed');
      }
      var center = rect.top + rect.height / 2;
      var viewportCenter = window.innerHeight / 2;
      var offset = (center - viewportCenter) * -0.04;
      if (prefersReducedMotion) {
        num.style.transform = 'translateY(0)';
      } else {
        num.style.transform = num.classList.contains('revealed') ? 'translateY(' + offset + 'px)' : 'translateX(20px)';
      }
    });
  }

  // ── UNIFIED SCROLL HANDLER ──

  window.addEventListener('scroll', function () {
    scrollY = window.scrollY;
    if (!ticking) {
      requestAnimationFrame(function () {
        if (progressBar) updateScrollProgress();
        updateBackToTop();
        updateNavScroll();
        updateActiveLink();
        updateSectionParallax();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // ── THEME TOGGLE ──

  var themeToggle = document.getElementById('theme-toggle');
  var htmlEl = document.documentElement;

  function setTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  var savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    htmlEl.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    htmlEl.setAttribute('data-theme', 'light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = htmlEl.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // ── HAMBURGER MENU ──

  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('nav-links');

  function closeMenu() {
    if (navLinks) navLinks.classList.remove('open');
    if (hamburger) {
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    document.querySelectorAll('.nav-links a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        closeMenu();
        hamburger.focus();
      }
    });
  }

  // ── TYPING ANIMATION ──

  function initTyping() {
    var textEl = document.querySelector('.typing-text');
    if (!textEl) return;
    var words = ['Full Stack Developer', 'Python Backend Dev', 'Junior Developer'];
    var wordIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var isPaused = false;

    function type() {
      if (prefersReducedMotion) {
        textEl.textContent = words[0];
        return;
      }
      var current = words[wordIndex];
      if (isPaused) {
        setTimeout(type, 2000);
        isPaused = false;
        return;
      }
      if (isDeleting) {
        charIndex--;
        textEl.textContent = current.substring(0, charIndex);
        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(type, 400);
          return;
        }
        setTimeout(type, 40);
      } else {
        charIndex++;
        textEl.textContent = current.substring(0, charIndex);
        if (charIndex === current.length) {
          isPaused = true;
          isDeleting = true;
          setTimeout(type, 3000);
          return;
        }
        setTimeout(type, 60);
      }
    }

    type();
  }

  // ── STAGGERED REVEAL ──

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var delay = Number(entry.target.dataset.delay) || 0;
        setTimeout(function () {
          entry.target.classList.add('visible');
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, prefersReducedMotion ? 0 : delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    revealObserver.observe(el);
  });

  // ── COUNTER ANIMATION ──

  var counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        var raw = el.dataset.target;
        if (!raw) return;
        var suffix = raw.indexOf('+') !== -1 ? '+' : '';
        var target = parseInt(raw, 10);
        if (isNaN(target)) return;

        if (prefersReducedMotion) {
          el.textContent = target + suffix;
          counterObserver.unobserve(el);
          return;
        }

        var duration = 1200;
        var start = performance.now();

        function update(now) {
          var elapsed = now - start;
          var progress = Math.min(elapsed / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          var current = Math.floor(eased * target);
          el.textContent = current + suffix;
          if (progress < 1) requestAnimationFrame(update);
          else el.textContent = target + suffix;
        }

        requestAnimationFrame(update);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-num').forEach(function (el) {
    el.dataset.target = el.textContent.trim();
    el.textContent = '0';
    counterObserver.observe(el);
  });

  // ── MOUSE PARALLAX ON HERO SHAPE ──

  var heroShape = document.querySelector('.hero-shape');
  if (heroShape && !prefersReducedMotion) {
    heroShape.style.transition = 'transform 0.1s ease-out';
    document.addEventListener('mousemove', function (e) {
      var rect = heroShape.getBoundingClientRect();
      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;
      var dx = (e.clientX - cx) / 30;
      var dy = (e.clientY - cy) / 30;
      heroShape.style.transform = 'translate(' + dx + 'px, ' + dy + 'px)';
    }, { passive: true });
  }

  // ── MAGNETIC BUTTONS ──

  if (!prefersReducedMotion) {
    document.querySelectorAll('.btn-primary, .btn-outline, .form-submit').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var dx = e.clientX - (rect.left + rect.width / 2);
        var dy = e.clientY - (rect.top + rect.height / 2);
        var dist = Math.sqrt(dx * dx + dy * dy);
        var strength = Math.min(dist / 4, 8);
        var angle = Math.atan2(dy, dx);
        btn.style.transform = 'translate(' + (Math.cos(angle) * strength) + 'px, ' + (Math.sin(angle) * strength) + 'px)';
        btn.style.transition = 'transform 0.08s ease-out';
      });

      btn.addEventListener('mouseleave', function () {
        btn.style.transform = 'translate(0, 0)';
        btn.style.transition = 'transform 0.3s ease';
      });
    });
  }

  // ── PROJECT CARD HOVER GLOW ──

  document.querySelectorAll('.project-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      card.style.setProperty('--mx', x + 'px');
      card.style.setProperty('--my', y + 'px');
    });
  });

  // ── PROJECT FILTERS ──

  var filterBtns = document.querySelectorAll('.filter-btn');
  var projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.dataset.filter;

      projectCards.forEach(function (card) {
        if (filter === 'all') {
          card.classList.remove('hidden');
        } else {
          var tags = card.dataset.tags || '';
          var type = card.dataset.type || '';
          card.classList.toggle('hidden', tags.indexOf(filter) === -1 && type !== filter);
        }
      });
    });
  });

  // ── LIGHTBOX ──

  var lightbox = document.getElementById('lightbox');
  var lightboxImg = lightbox ? lightbox.querySelector('.lightbox-img') : null;
  var lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;
  var lastFocusedElement = null;

  function openLightbox(img) {
    if (!lightbox || !lightboxImg) return;
    lastFocusedElement = img;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (lightboxClose) lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  document.querySelectorAll('.project-preview img').forEach(function (img) {
    img.addEventListener('click', function () { openLightbox(img); });
    img.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(img);
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });

  // ── WHATSAPP FORM ──

  var WA_NUMBER = '5493517962251';

  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = document.getElementById('name').value.trim();
      var email = document.getElementById('email').value.trim();
      var message = document.getElementById('message').value.trim();

      var text = 'Hola Tomás, te escribo desde tu portfolio:\n\n*Nombre:* ' + name + '\n*Email:* ' + email + '\n\n*Mensaje:*\n' + message;

      var url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text);
      window.open(url, '_blank', 'noopener,noreferrer');

      var btn = this.querySelector('.form-submit');
      var originalText = btn.textContent;
      btn.textContent = 'Abriendo WhatsApp...';
      btn.style.background = 'var(--text)';
      btn.style.color = 'var(--bg)';
      btn.disabled = true;

      setTimeout(function () {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.color = '';
        btn.disabled = false;
        contactForm.reset();
      }, 3000);
    });
  }

})();

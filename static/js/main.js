// ── PRELOADER ──

window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  initTyping();
});

// ── CUSTOM CURSOR ──

const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
const useCursor = !(window.matchMedia('(max-width: 900px)').matches);

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

if (useCursor && dot && ring) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  }, { passive: true });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();
}

// ── SCROLL COALESCING ──

let ticking = false;
let scrollY = 0;

// ── SCROLL PROGRESS ──

const progressBar = document.querySelector('.scroll-progress');

function updateScrollProgress() {
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
  progressBar.style.width = progress + '%';
}

// ── BACK TO TOP ──

const backToTop = document.getElementById('back-to-top');

function updateBackToTop() {
  backToTop.classList.toggle('visible', scrollY > 300);
}

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── NAV SCROLL ──

const nav = document.querySelector('nav');

function updateNavScroll() {
  nav.classList.toggle('scrolled', scrollY > 10);
}

// ── ACTIVE NAV LINK ──

const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-links a');

function updateActiveLink() {
  let current = '';
  sections.forEach(s => { if (scrollY >= s.offsetTop - 120) current = s.id; });
  navLinkEls.forEach(a => {
    a.style.opacity = a.getAttribute('href') === `#${current}` ? '1' : '0.6';
  });
}

// ── SECTION NUMBER PARALLAX ──

const sectionNums = document.querySelectorAll('.section-number[data-section]');

function updateSectionParallax() {
  sectionNums.forEach(num => {
    const parent = num.parentElement;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      num.classList.add('revealed');
    }
    const center = rect.top + rect.height / 2;
    const viewportCenter = window.innerHeight / 2;
    const offset = (center - viewportCenter) * -0.04;
    num.style.transform = num.classList.contains('revealed') ? `translateY(${offset}px)` : 'translateX(20px)';
  });
}

// ── UNIFIED SCROLL HANDLER ──

window.addEventListener('scroll', () => {
  scrollY = window.scrollY;
  if (!ticking) {
    requestAnimationFrame(() => {
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

const themeToggle = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;

function setTheme(theme) {
  htmlEl.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

const saved = localStorage.getItem('theme');
if (saved) htmlEl.setAttribute('data-theme', saved);

themeToggle.addEventListener('click', () => {
  const current = htmlEl.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});

// ── HAMBURGER MENU ──

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ── TYPING ANIMATION ──

function initTyping() {
  const textEl = document.querySelector('.typing-text');
  if (!textEl) return;
  const words = ['Full Stack Developer', 'Python Backend Dev', 'Junior Developer'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  function type() {
    const current = words[wordIndex];
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

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = Number(entry.target.dataset.delay) || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  revealObserver.observe(el);
});

// ── COUNTER ANIMATION ──

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const raw = el.dataset.target;
      const suffix = raw.includes('+') ? '+' : '';
      const target = parseInt(raw);
      const duration = 1200;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);
        el.textContent = current + suffix;
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target + suffix;
      }

      requestAnimationFrame(update);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => {
  el.dataset.target = el.textContent.trim();
  el.textContent = '0';
  counterObserver.observe(el);
});

// ── MOUSE PARALLAX ON HERO SHAPE ──

const heroShape = document.querySelector('.hero-shape');
if (heroShape) {
  document.addEventListener('mousemove', (e) => {
    const rect = heroShape.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / 30;
    const dy = (e.clientY - cy) / 30;
    heroShape.style.transform = `translate(${dx}px, ${dy}px)`;
    heroShape.style.transition = 'transform 0.1s ease-out';
  }, { passive: true });
}

// ── MAGNETIC BUTTONS ──

document.querySelectorAll('.btn-primary, .btn-outline, .form-submit').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    const dist = Math.sqrt(dx * dx + dy * dy);
    const strength = Math.min(dist / 4, 8);
    const angle = Math.atan2(dy, dx);
    btn.style.transform = `translate(${Math.cos(angle) * strength}px, ${Math.sin(angle) * strength}px)`;
    btn.style.transition = 'transform 0.08s ease-out';
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0, 0)';
    btn.style.transition = 'transform 0.3s ease';
  });
});

// ── PROJECT CARD HOVER GLOW ──

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mx', x + 'px');
    card.style.setProperty('--my', y + 'px');
  });
});

// ── PROJECT FILTERS ──

const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      if (filter === 'all') {
        card.classList.remove('hidden');
      } else {
        const tags = card.dataset.tags || '';
        const type = card.dataset.type || '';
        card.classList.toggle('hidden', !tags.includes(filter) && type !== filter);
      }
    });
  });
});

// ── LIGHTBOX ──

const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('.lightbox-img');
const lightboxClose = lightbox.querySelector('.lightbox-close');

document.querySelectorAll('.project-preview img').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
});

// ── WHATSAPP FORM ──

const WA_NUMBER = '5493517962251';

document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  const text = `Hola Tomás, te escribo desde tu portfolio:

*Nombre:* ${name}
*Email:* ${email}

*Mensaje:*
${message}`;

  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');

  const btn = this.querySelector('.form-submit');
  const originalHTML = btn.innerHTML;
  btn.innerHTML = 'Abriendo WhatsApp...';
  btn.style.background = 'var(--text)';
  btn.style.color = 'var(--bg)';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = originalHTML;
    btn.style.background = '';
    btn.style.color = '';
    btn.disabled = false;
    this.reset();
  }, 3000);
});

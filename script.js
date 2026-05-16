// Saad Naseem — profile interactions

const prefersReducedMotion =
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// 1) Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// 2) Theme toggle (persists to localStorage, defaults to dark)
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem('theme', next);
  });
}

function applyTheme(mode) {
  root.setAttribute('data-theme', mode);
  if (!themeToggle) return;
  const icon = themeToggle.querySelector('i');
  if (icon) icon.className = mode === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  themeToggle.setAttribute('aria-pressed', mode === 'light' ? 'true' : 'false');
}

// 3) Typewriter for hero role (skipped under prefers-reduced-motion)
const roles = [
  'Biochemist',
  'Metabolic Engineer',
  'ML Practitioner',
  'Postdoctoral Scholar',
  'Problem Solver',
];
const target = document.getElementById('typeTarget');
if (target) {
  if (prefersReducedMotion) {
    target.textContent = roles[0];
  } else {
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;
    const type = () => {
      const current = roles[roleIndex];
      if (!deleting) {
        target.textContent = current.slice(0, ++charIndex);
        if (charIndex === current.length) {
          deleting = true;
          return setTimeout(type, 1600);
        }
      } else {
        target.textContent = current.slice(0, --charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      setTimeout(type, deleting ? 40 : 80);
    };
    type();
  }
}

// 4) Reveal-on-scroll for sections (no-op under prefers-reduced-motion)
const revealEls = document.querySelectorAll(
  '.section, .skill, .pub, .timeline__item, .contact__card, .awards li, .hero__card, .hero__text > *'
);
if ('IntersectionObserver' in window && !prefersReducedMotion) {
  revealEls.forEach((el) => el.classList.add('reveal'));
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach((el) => io.observe(el));
}

// 5) Highlight active nav link on scroll
const navLinks = document.querySelectorAll('.nav__links a');
const sections = Array.from(navLinks)
  .map((a) => {
    const href = a.getAttribute('href') || '';
    return href.startsWith('#') ? document.querySelector(href) : null;
  })
  .filter(Boolean);

if ('IntersectionObserver' in window && sections.length) {
  const navIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = '#' + entry.target.id;
          navLinks.forEach((a) => {
            a.style.color = a.getAttribute('href') === id ? 'var(--text)' : '';
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );
  sections.forEach((s) => navIO.observe(s));
}

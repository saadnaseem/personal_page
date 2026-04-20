// Saad Naseem — profile interactions

// 1) Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// 2) Theme toggle (persists to localStorage, defaults to dark)
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  applyTheme(next);
  localStorage.setItem('theme', next);
});

function applyTheme(mode) {
  root.setAttribute('data-theme', mode);
  const icon = themeToggle.querySelector('i');
  icon.className = mode === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

// 3) Typewriter for hero role
const roles = [
  'Biochemist',
  'Metabolic Engineer',
  'ML Practitioner',
  'Postdoctoral Scholar',
  'Problem Solver',
];
const target = document.getElementById('typeTarget');
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
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
}
type();

// 4) Reveal-on-scroll for sections
const revealEls = document.querySelectorAll('.section, .skill, .pub, .timeline__item, .contact__card, .awards li, .hero__card, .hero__text > *');
revealEls.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => io.observe(el));

// 5) Highlight active nav link on scroll
const navLinks = document.querySelectorAll('.nav__links a');
const sections = Array.from(navLinks).map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

const navIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = '#' + entry.target.id;
      navLinks.forEach(a => a.style.color = a.getAttribute('href') === id ? 'var(--text)' : '');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => navIO.observe(s));

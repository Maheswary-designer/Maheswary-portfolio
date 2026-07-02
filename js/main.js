// Maheswary portfolio interactions
const preloader = document.getElementById('preloader');
const header = document.getElementById('siteHeader');
const menuOpen = document.getElementById('menuOpen');
const menuClose = document.getElementById('menuClose');
const sideMenu = document.getElementById('sideMenu');
const sideLinks = document.querySelectorAll('.side-link');

window.addEventListener('load', () => {
  setTimeout(() => preloader.classList.add('hide'), 650);
});

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

function openMenu() {
  sideMenu.classList.add('open');
  sideMenu.setAttribute('aria-hidden', 'false');
  document.body.classList.add('menu-active');
}

function closeMenu() {
  sideMenu.classList.remove('open');
  sideMenu.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('menu-active');
}

menuOpen.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);
sideLinks.forEach(link => link.addEventListener('click', closeMenu));

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu();
});

// Hero slider
const slides = [...document.querySelectorAll('.slide')];
const currentSlide = document.getElementById('currentSlide');
const nextSlide = document.getElementById('nextSlide');
const prevSlide = document.getElementById('prevSlide');
let slideIndex = 0;
let slideTimer;

function renderSlide(index) {
  slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
  currentSlide.textContent = String(index + 1).padStart(2, '0');
}

function goToSlide(direction = 1) {
  slideIndex = (slideIndex + direction + slides.length) % slides.length;
  renderSlide(slideIndex);
}

function startSlider() {
  slideTimer = setInterval(() => goToSlide(1), 5200);
}

function resetSlider(direction) {
  clearInterval(slideTimer);
  goToSlide(direction);
  startSlider();
}

nextSlide.addEventListener('click', () => resetSlider(1));
prevSlide.addEventListener('click', () => resetSlider(-1));
startSlider();

// Scroll reveal animation
const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

revealItems.forEach(item => revealObserver.observe(item));

// Custom cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
let mouseX = 0;
let mouseY = 0;
let ringX = 0;
let ringY = 0;

window.addEventListener('mousemove', event => {
  mouseX = event.clientX;
  mouseY = event.clientY;
  cursorDot.style.left = `${mouseX}px`;
  cursorDot.style.top = `${mouseY}px`;
});

function animateCursor() {
  ringX += (mouseX - ringX) * 0.18;
  ringY += (mouseY - ringY) * 0.18;
  cursorRing.style.left = `${ringX}px`;
  cursorRing.style.top = `${ringY}px`;
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .work-card, .service-card').forEach(item => {
  item.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
  item.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
});

// Footer year
const year = document.getElementById('year');
year.textContent = new Date().getFullYear();

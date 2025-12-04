const slides = document.querySelectorAll('.slide');
let currentIndex = 0;
let autoSlide;
let pauseTimer;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

function startAutoSlide() {
  autoSlide = setInterval(nextSlide, 3000); // change every 3s
}

function stopAutoSlide() {
  clearInterval(autoSlide);
}

function pauseAndResume() {
  stopAutoSlide();
  clearTimeout(pauseTimer);
  pauseTimer = setTimeout(startAutoSlide, 5000); // resume after 5s
}

// Start autoplay
startAutoSlide();

// Pause when clicked
document.querySelector('.slide').addEventListener('click', pauseAndResume);

const slider = document.querySelector('.slide');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

nextBtn.addEventListener('click', () => {
  slider.scrollBy({ left: 400, behavior: 'smooth' }); // move right
});

prevBtn.addEventListener('click', () => {
  slider.scrollBy({ left: -400, behavior: 'smooth' }); // move left
});
const STD_CAROUSEL_VISIBLE = 3;
const STD_CAROUSEL_INTERVAL_MS = 5000;
const STD_CAROUSEL_TRANSITION_MS = 700;

function initStdCarousel() {
  const viewport = document.querySelector('.std-carousel__viewport');
  const track = document.getElementById('std-carousel-track');

  if (!viewport || !track) return;

  const source = WEDDING_CONFIG.saveTheDatePhotos?.length
    ? WEDDING_CONFIG.saveTheDatePhotos
    : [WEDDING_CONFIG.couplePhoto];

  const photos = source.length >= STD_CAROUSEL_VISIBLE
    ? source
    : [...source, ...source, ...source].slice(0, Math.max(source.length, STD_CAROUSEL_VISIBLE));

  const alt = getCoupleNames();
  const extended = photos.concat(photos.slice(0, STD_CAROUSEL_VISIBLE));

  track.innerHTML = extended
    .map(
      (src) =>
        `<div class="std-carousel__slide"><img src="${src}" alt="${alt}" loading="lazy" draggable="false"></div>`
    )
    .join('');

  let index = 0;
  let timerId = null;

  function updateEdgeSlides() {
    const slides = track.querySelectorAll('.std-carousel__slide');
    slides.forEach((slide) => {
      slide.classList.remove('std-carousel__slide--edge-left', 'std-carousel__slide--edge-right');
    });

    const leftIdx = index;
    const rightIdx = index + STD_CAROUSEL_VISIBLE - 1;
    if (slides[leftIdx]) slides[leftIdx].classList.add('std-carousel__slide--edge-left');
    if (slides[rightIdx]) slides[rightIdx].classList.add('std-carousel__slide--edge-right');
  }

  function slideWidth() {
    const slide = track.querySelector('.std-carousel__slide');
    return slide ? slide.getBoundingClientRect().width : viewport.clientWidth / STD_CAROUSEL_VISIBLE;
  }

  function setPosition(animate) {
    track.style.transition = animate
      ? `transform ${STD_CAROUSEL_TRANSITION_MS}ms ease-in-out`
      : 'none';
    track.style.transform = `translateX(-${index * slideWidth()}px)`;
  }

  function advance() {
    if (photos.length <= 1) return;
    index += 1;
    setPosition(true);
  }

  track.addEventListener('transitionend', (e) => {
    if (e.propertyName !== 'transform') return;
    if (index >= photos.length) {
      index = 0;
      setPosition(false);
    }
    updateEdgeSlides();
  });

  function startAutoplay() {
    if (timerId) clearInterval(timerId);
    if (photos.length <= 1) return;
    timerId = setInterval(advance, STD_CAROUSEL_INTERVAL_MS);
  }

  window.addEventListener('resize', () => {
    setPosition(false);
    updateEdgeSlides();
  });

  setPosition(false);
  updateEdgeSlides();
  startAutoplay();
}

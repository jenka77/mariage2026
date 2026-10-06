const PHOTO_LIGHTBOX_LABELS = {
  fr: { close: 'Fermer', enlarge: 'Agrandir la photo de la chapelle' },
  en: { close: 'Close', enlarge: 'Enlarge chapel photo' },
};

function closePhotoLightbox() {
  const modal = document.getElementById('photo-lightbox');
  if (!modal) return;
  modal.classList.remove('photo-lightbox--open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function openPhotoLightbox(src, alt) {
  let modal = document.getElementById('photo-lightbox');
  if (!modal) return;

  const img = modal.querySelector('.photo-lightbox__img');
  if (img) {
    img.src = src;
    img.alt = alt || '';
  }

  modal.classList.add('photo-lightbox--open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  modal.querySelector('.photo-lightbox__close')?.focus();
}

function ensurePhotoLightbox(lang) {
  if (document.getElementById('photo-lightbox')) return;

  const labels = PHOTO_LIGHTBOX_LABELS[lang] || PHOTO_LIGHTBOX_LABELS.fr;
  const modal = document.createElement('div');
  modal.id = 'photo-lightbox';
  modal.className = 'photo-lightbox';
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = `
    <div class="photo-lightbox__backdrop" data-close-lightbox></div>
    <div class="photo-lightbox__dialog" role="dialog" aria-modal="true" aria-label="${labels.enlarge}">
      <button type="button" class="photo-lightbox__close" data-close-lightbox aria-label="${labels.close}">&times;</button>
      <img class="photo-lightbox__img" src="" alt="">
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelectorAll('[data-close-lightbox]').forEach((el) => {
    el.addEventListener('click', closePhotoLightbox);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('photo-lightbox--open')) {
      closePhotoLightbox();
    }
  });
}

function initPhotoLightbox(selector, lang) {
  const trigger = document.querySelector(selector);
  if (!trigger) return;

  ensurePhotoLightbox(lang);

  const labels = PHOTO_LIGHTBOX_LABELS[lang] || PHOTO_LIGHTBOX_LABELS.fr;
  trigger.classList.add('photo-lightbox-trigger');
  trigger.setAttribute('role', 'button');
  trigger.setAttribute('tabindex', '0');
  trigger.setAttribute('aria-label', labels.enlarge);

  const open = () => {
    openPhotoLightbox(trigger.currentSrc || trigger.src, trigger.alt);
  };

  trigger.addEventListener('click', open);
  trigger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      open();
    }
  });
}

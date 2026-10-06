const COUNTDOWN_LABELS = {
  en: { days: 'Days', hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds', title: 'Countdown to Our Wedding' },
  fr: { days: 'Jours', hours: 'Heures', minutes: 'Minutes', seconds: 'Secondes', title: 'Compte à rebours jusqu\'à notre mariage' },
};

const RESERVATION_COUNTDOWN_LABELS = {
  en: {
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
    title: 'Time Left to Confirm Your Reservation',
    datePrefix: 'Deadline:',
  },
  fr: {
    days: 'Jours',
    hours: 'Heures',
    minutes: 'Minutes',
    seconds: 'Secondes',
    title: 'Temps restant pour confirmer votre réservation',
    datePrefix: 'Date limite :',
  },
};

function runCountdown(targetISO, prefix) {
  const target = new Date(targetISO).getTime();

  function tick() {
    const diff = Math.max(0, target - Date.now());
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const daysEl = document.getElementById(`${prefix}days`);
    if (!daysEl) return;

    daysEl.textContent = String(days).padStart(2, '0');
    document.getElementById(`${prefix}hours`).textContent = String(hours).padStart(2, '0');
    document.getElementById(`${prefix}minutes`).textContent = String(minutes).padStart(2, '0');
    document.getElementById(`${prefix}seconds`).textContent = String(seconds).padStart(2, '0');
  }

  tick();
  setInterval(tick, 1000);
}

function getCalendarUrl(lang) {
  const isFr = lang === 'fr';
  const start = new Date(WEDDING_CONFIG.weddingDateISO);
  const end = new Date(start.getTime() + 4 * 60 * 60 * 1000);

  function formatDate(d) {
    return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  }

  const title = encodeURIComponent(`${getCoupleNames()} — ${isFr ? 'Mariage' : 'Wedding'}`);
  const details = encodeURIComponent(isFr ? WEDDING_CONFIG.venueFr : WEDDING_CONFIG.venue);
  const location = encodeURIComponent(isFr ? WEDDING_CONFIG.venueFr : WEDDING_CONFIG.venue);
  const dates = `${formatDate(start)}/${formatDate(end)}`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}

function isFrLang(lang) {
  return lang === 'fr';
}

function initCountdown(lang) {
  const labels = COUNTDOWN_LABELS[lang];
  const std = WEDDING_CONFIG.saveTheDate || {};
  const titleEl = document.getElementById('countdown-title');
  if (titleEl) {
    titleEl.textContent = isFrLang(lang)
      ? (std.countdownTitleFr || labels.title)
      : (std.countdownTitleEn || labels.title);
  }

  ['days', 'hours', 'minutes', 'seconds'].forEach((unit) => {
    const labelEl = document.getElementById(`cd-label-${unit}`);
    if (labelEl) labelEl.textContent = labels[unit];
  });

  runCountdown(WEDDING_CONFIG.weddingDateISO, 'cd-');
}

function initReservationCountdown(lang) {
  const labels = RESERVATION_COUNTDOWN_LABELS[lang];
  const isFr = lang === 'fr';

  const titleEl = document.getElementById('rd-countdown-title');
  if (titleEl) titleEl.textContent = labels.title;

  const dateEl = document.getElementById('rd-countdown-date');
  if (dateEl) {
    dateEl.textContent = `${labels.datePrefix} ${isFr ? WEDDING_CONFIG.rsvpDeadlineFr : WEDDING_CONFIG.rsvpDeadline}`;
  }

  ['days', 'hours', 'minutes', 'seconds'].forEach((unit) => {
    const labelEl = document.getElementById(`rd-label-${unit}`);
    if (labelEl) labelEl.textContent = labels[unit];
  });

  runCountdown(WEDDING_CONFIG.rsvpDeadlineISO, 'rd-');
}

function initSaveTheDate(lang) {
  const isFr = lang === 'fr';
  const std = WEDDING_CONFIG.saveTheDate || {};

  const taglineEl = document.getElementById('std-tagline');
  if (taglineEl) {
    taglineEl.textContent = isFr ? (std.taglineFr || 'Nous nous marions') : (std.taglineEn || "We're Getting Married");
  }

  const namesEl = document.getElementById('std-page-names');
  if (namesEl) namesEl.textContent = getCoupleNames();

  const messageEl = document.getElementById('std-message');
  if (messageEl) {
    messageEl.textContent = isFr
      ? (std.messageFr || '')
      : (std.messageEn || '');
  }

  const thanksEl = document.getElementById('std-thanks');
  if (thanksEl) {
    thanksEl.textContent = isFr
      ? (std.thanksFr || '')
      : (std.thanksEn || '');
  }

  const infoEl = document.getElementById('std-action-info');
  if (infoEl) {
    infoEl.textContent = isFr ? (std.actionInfoFr || 'Bon à savoir') : (std.actionInfoEn || 'Good to Know');
  }

  const calendarLabelEl = document.getElementById('std-action-calendar');
  if (calendarLabelEl) {
    calendarLabelEl.textContent = isFr
      ? (std.actionCalendarFr || 'Ajouter à mon calendrier')
      : (std.actionCalendarEn || 'Add to Calendar');
  }

  const helpLabelEl = document.getElementById('std-action-help-label');
  if (helpLabelEl) {
    helpLabelEl.textContent = isFr ? (std.actionHelpFr || 'Aide') : (std.actionHelpEn || 'Help');
  }

  const calendarLink = document.getElementById('std-calendar-link');
  if (calendarLink) calendarLink.href = getCalendarUrl(lang);

  initSaveTheDateHeroImage(isFr);

  if (document.getElementById('cd-days')) {
    initCountdown(lang);
  }
}

function initSaveTheDateHeroImage(isFr) {
  const img = document.getElementById('std-hero-image');
  if (!img) return;

  const src =
    WEDDING_CONFIG.saveTheDateImage ||
    WEDDING_CONFIG.couplePhoto ||
    'assets/save-the-date-gemini.jpg';
  img.src = src;
  img.alt = isFr
    ? `Illustration — ${getCoupleNames()}`
    : `${getCoupleNames()} — illustration`;
}

function initStdFooterActions() {
  document.getElementById('std-action-faq')?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof openFaqWidget === 'function') openFaqWidget();
  });

  document.getElementById('std-action-help')?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof openHelpWidget === 'function') openHelpWidget();
  });
}

const FAQ_LABELS = {
  en: { aria: 'Good to know', title: 'Good to Know' },
  fr: { aria: 'Bon à savoir', title: 'Bon à savoir' },
};

function closeFaqWidget() {
  const btn = document.getElementById('faq-widget-btn');
  const panel = document.getElementById('faq-widget-panel');
  if (!btn || !panel) return;
  panel.classList.remove('faq-widget__panel--open');
  btn.setAttribute('aria-expanded', 'false');
  panel.setAttribute('aria-hidden', 'true');
}

function openFaqWidget() {
  const btn = document.getElementById('faq-widget-btn');
  const panel = document.getElementById('faq-widget-panel');
  if (!btn || !panel) return;

  if (typeof closeHelpWidget === 'function') closeHelpWidget();

  panel.classList.add('faq-widget__panel--open');
  btn.setAttribute('aria-expanded', 'true');
  panel.setAttribute('aria-hidden', 'false');
  btn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  btn.focus();
}

function buildFaqItemsHtml(lang) {
  const faq = WEDDING_CONFIG.faq;
  const isFr = lang === 'fr';

  return faq.items
    .map((item) => {
      const question = isFr ? item.qFr : item.qEn;
      let answerHtml;

      if (item.contactHelp) {
        const before = isFr ? item.aFrBefore : item.aEnBefore;
        const after = isFr ? item.aFrAfter : item.aEnAfter;
        const linkText = isFr ? faq.helpLinkFr : faq.helpLinkEn;
        answerHtml =
          `${before}<button type="button" class="faq__help-link" data-open-help>${linkText}</button>${after}`;
      } else {
        answerHtml = isFr ? item.aFr : item.aEn;
      }

      return `
        <details class="faq-item">
          <summary class="faq-item__question">${question}</summary>
          <p class="faq-item__answer">${answerHtml}</p>
        </details>
      `;
    })
    .join('');
}

function initFaq(lang) {
  if (document.getElementById('faq-widget')) return;

  const labels = FAQ_LABELS[lang] || FAQ_LABELS.fr;
  const faq = WEDDING_CONFIG.faq;
  const isFr = lang === 'fr';
  const title = isFr ? faq.titleFr : faq.titleEn;

  const widget = document.createElement('div');
  widget.className = 'faq-widget';
  widget.id = 'faq-widget';
  widget.innerHTML = `
    <button type="button" class="faq-widget__btn" id="faq-widget-btn" aria-label="${labels.aria}" aria-expanded="false">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
        <path d="M12 11v5M12 8h.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </button>
    <div class="faq-widget__panel" id="faq-widget-panel" aria-hidden="true">
      <p class="faq-widget__title">${title}</p>
      <div class="faq-widget__list faq-list" id="faq-widget-list"></div>
    </div>
  `;

  document.body.appendChild(widget);

  const listEl = document.getElementById('faq-widget-list');
  listEl.innerHTML = buildFaqItemsHtml(lang);

  listEl.querySelectorAll('[data-open-help]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof openHelpWidget === 'function') openHelpWidget();
    });
  });

  const faqBtn = document.getElementById('faq-widget-btn');
  const panel = document.getElementById('faq-widget-panel');

  faqBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = panel.classList.toggle('faq-widget__panel--open');
    faqBtn.setAttribute('aria-expanded', open);
    panel.setAttribute('aria-hidden', !open);
    if (open && typeof closeHelpWidget === 'function') closeHelpWidget();
  });

  document.addEventListener('click', (e) => {
    if (widget.contains(e.target)) return;
    if (e.target.closest('#std-action-faq, #std-action-help')) return;
    closeFaqWidget();
  });
}

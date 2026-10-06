// ── Contact aide ──
// Email corrigé : le « q » était probablement un « @ » mal tapé
const HELP_LABELS = {
  en: {
    aria: 'Help',
    title: 'Need help?',
    whatsapp: 'Message on WhatsApp',
    call: 'Call us',
    email: 'Send an email',
  },
  fr: {
    aria: 'Aide',
    title: 'Besoin d\'aide ?',
    whatsapp: 'Écrire sur WhatsApp',
    call: 'Appeler',
    email: 'Envoyer un email',
  },
};

function initHelp(lang) {
  if (document.getElementById('help-widget')) return;

  const contact = WEDDING_CONFIG.contact;
  const labels = HELP_LABELS[lang] || HELP_LABELS.fr;
  const phone = contact.phone.replace(/\s/g, '');
  const phoneWa = phone.replace(/^\+/, '');

  const widget = document.createElement('div');
  widget.className = 'help-widget';
  widget.id = 'help-widget';
  widget.innerHTML = `
    <button type="button" class="help-widget__btn" id="help-widget-btn" aria-label="${labels.aria}" aria-expanded="false">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
        <path d="M9.5 9.5a2.5 2.5 0 0 1 4.2 1.8c0 1.8-2.2 2.2-2.2 3.7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        <circle cx="12" cy="17" r="0.75" fill="currentColor"/>
      </svg>
    </button>
    <div class="help-widget__menu" id="help-widget-menu" aria-hidden="true">
      <p class="help-widget__title">${labels.title}</p>
      <a href="https://wa.me/${phoneWa}" class="help-widget__option" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
        ${labels.whatsapp}
      </a>
      <a href="tel:${phone}" class="help-widget__option">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        ${labels.call}
      </a>
      <a href="mailto:${contact.email}" class="help-widget__option">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M2 7l10 7 10-7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        ${labels.email}
      </a>
    </div>
  `;

  document.body.appendChild(widget);

  const btn = document.getElementById('help-widget-btn');
  const menu = document.getElementById('help-widget-menu');

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = menu.classList.toggle('help-widget__menu--open');
    btn.setAttribute('aria-expanded', open);
    menu.setAttribute('aria-hidden', !open);
    if (open && typeof closeFaqWidget === 'function') closeFaqWidget();
  });

  document.addEventListener('click', (e) => {
    if (widget.contains(e.target)) return;
    if (e.target.closest('#std-action-faq, #std-action-help')) return;
    closeHelpWidget();
  });
}

function closeHelpWidget() {
  const btn = document.getElementById('help-widget-btn');
  const menu = document.getElementById('help-widget-menu');
  if (!btn || !menu) return;
  menu.classList.remove('help-widget__menu--open');
  btn.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-hidden', 'true');
}

function openHelpWidget() {
  const btn = document.getElementById('help-widget-btn');
  const menu = document.getElementById('help-widget-menu');
  if (!btn || !menu) return;

  if (typeof closeFaqWidget === 'function') closeFaqWidget();

  menu.classList.add('help-widget__menu--open');
  btn.setAttribute('aria-expanded', 'true');
  menu.setAttribute('aria-hidden', 'false');
  btn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  btn.focus();
}

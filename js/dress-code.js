function initDressCode(lang) {
  const dc = WEDDING_CONFIG.dressCode;
  const isFr = lang === 'fr';

  const titleMain = document.getElementById('dc-title-main');
  const titleScript = document.getElementById('dc-title-script');
  if (titleMain) titleMain.textContent = isFr ? dc.titleMainFr : dc.titleMainEn;
  if (titleScript) titleScript.textContent = isFr ? dc.titleScriptFr : dc.titleScriptEn;

  const setText = (id, en, fr) => {
    const el = document.getElementById(id);
    if (el) el.textContent = isFr ? fr : en;
  };

  setText('dc-lead', dc.leadEn, dc.leadFr);
  setText('dc-text', dc.textEn, dc.textFr);
  setText('dc-avoid', dc.avoidEn, dc.avoidFr);
  setText('dc-tip', dc.tipEn, dc.tipFr);

  const colorsEl = document.getElementById('dc-colors');
  if (colorsEl) {
    colorsEl.innerHTML = dc.colors
      .map((color) => `<span class="dress-code__swatch" style="background-color:${color}"></span>`)
      .join('');
  }

  const illustration = document.querySelector('.dress-code__illustration');
  if (illustration && WEDDING_CONFIG.dressCodeIcon) {
    illustration.src = WEDDING_CONFIG.dressCodeIcon;
  }
}

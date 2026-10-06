function normalize(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function initSearchableField(config) {
  const {
    inputId,
    hiddenId,
    listId,
    lang,
    items,
    getLabel,
    getValue,
    minChars = 2,
    maxResults = 8,
  } = config;

  const input = document.getElementById(inputId);
  const hidden = document.getElementById(hiddenId);
  const list = document.getElementById(listId);
  if (!input || !hidden || !list) return;

  let activeIndex = -1;

  function filterItems(query) {
    const q = normalize(query.trim());
    if (q.length < minChars) return [];

    return items
      .filter((item) => {
        const label = normalize(getLabel(item, lang));
        const value = normalize(getValue(item));
        return label.includes(q) || label.startsWith(q) || value.includes(q);
      })
      .slice(0, maxResults);
  }

  function selectItem(item) {
    hidden.value = getValue(item);
    input.value = getLabel(item, lang);
    list.innerHTML = '';
    list.classList.remove('search-dropdown--open');
    activeIndex = -1;
  }

  function renderList(matches) {
    if (!matches.length) {
      list.innerHTML = '';
      list.classList.remove('search-dropdown--open');
      return;
    }

    list.innerHTML = matches
      .map(
        (item, i) =>
          `<li class="search-dropdown__item" role="option" data-index="${i}">${getLabel(item, lang)}</li>`
      )
      .join('');
    list.classList.add('search-dropdown--open');
    activeIndex = -1;
  }

  input.addEventListener('input', () => {
    hidden.value = '';
    renderList(filterItems(input.value));
  });

  input.addEventListener('focus', () => {
    if (input.value.trim().length >= minChars) {
      renderList(filterItems(input.value));
    }
  });

  input.addEventListener('keydown', (e) => {
    const itemsEl = list.querySelectorAll('.search-dropdown__item');
    if (!itemsEl.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIndex = Math.min(activeIndex + 1, itemsEl.length - 1);
      itemsEl.forEach((el, i) => el.classList.toggle('search-dropdown__item--active', i === activeIndex));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = Math.max(activeIndex - 1, 0);
      itemsEl.forEach((el, i) => el.classList.toggle('search-dropdown__item--active', i === activeIndex));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      const matches = filterItems(input.value);
      if (matches[activeIndex]) selectItem(matches[activeIndex]);
    } else if (e.key === 'Escape') {
      list.innerHTML = '';
      list.classList.remove('search-dropdown--open');
    }
  });

  list.addEventListener('click', (e) => {
    const li = e.target.closest('.search-dropdown__item');
    if (!li) return;
    const matches = filterItems(input.value);
    const item = matches[parseInt(li.dataset.index, 10)];
    if (item) selectItem(item);
  });

  document.addEventListener('click', (e) => {
    const wrap = input.closest('.search-field');
    if (wrap && !wrap.contains(e.target)) {
      list.innerHTML = '';
      list.classList.remove('search-dropdown--open');
    }
  });

  return {
    reset() {
      input.value = '';
      hidden.value = '';
      list.innerHTML = '';
      list.classList.remove('search-dropdown--open');
    },
    getValidItem() {
      if (!hidden.value) return null;
      return items.find((item) => getValue(item) === hidden.value) || null;
    },
  };
}

function initCountrySearches(lang) {
  const isFr = lang === 'fr';

  const countrySearch = initSearchableField({
    inputId: 'countrySearchInput',
    hiddenId: 'countryOfResidence',
    listId: 'countrySearchList',
    lang,
    items: ALL_COUNTRIES,
    getLabel: (c, l) => (l === 'fr' ? c.nameFr : c.nameEn),
    getValue: (c) => c.code,
    minChars: 2,
  });

  const phoneCodeSearch = initSearchableField({
    inputId: 'phoneCodeSearchInput',
    hiddenId: 'phoneCountryCode',
    listId: 'phoneCodeSearchList',
    lang,
    items: PHONE_CODES,
    getLabel: (p, l) => `${p.code} — ${l === 'fr' ? p.countryFr : p.countryEn}`,
    getValue: (p) => p.code,
    minChars: 1,
  });

  const placeholders = isFr
    ? {
        country: 'Ex : Cam, Fra, All…',
        phone: 'Ex : +33, +237…',
      }
    : {
        country: 'e.g. Cam, Fra, Ger…',
        phone: 'e.g. +33, +237…',
      };

  document.getElementById('countrySearchInput').placeholder = placeholders.country;
  document.getElementById('phoneCodeSearchInput').placeholder = placeholders.phone;

  return { countrySearch, phoneCodeSearch };
}

function getCountryName(code, lang) {
  const country = ALL_COUNTRIES.find((c) => c.code === code);
  if (!country) return code;
  return lang === 'fr' ? country.nameFr : country.nameEn;
}

function resetCountrySearches(searches) {
  searches?.countrySearch?.reset();
  searches?.phoneCodeSearch?.reset();
}

const RELATIONSHIPS = {
  en: [
    { value: '', label: 'Select relationship' },
    { value: 'spouse', label: 'Spouse / Partner' },
    { value: 'child', label: 'Child' },
    { value: 'parent', label: 'Parent' },
    { value: 'sibling', label: 'Sibling' },
    { value: 'friend', label: 'Friend' },
    { value: 'colleague', label: 'Colleague' },
    { value: 'other', label: 'Other' },
  ],
  fr: [
    { value: '', label: 'Sélectionnez le lien' },
    { value: 'spouse', label: 'Conjoint(e) / Partenaire' },
    { value: 'child', label: 'Enfant' },
    { value: 'parent', label: 'Parent' },
    { value: 'sibling', label: 'Frère / Sœur' },
    { value: 'friend', label: 'Ami(e)' },
    { value: 'colleague', label: 'Collègue' },
    { value: 'other', label: 'Autre' },
  ],
};

const MESSAGES = {
  en: {
    success: 'Thank you! Your reservation has been received.',
    error: 'Something went wrong. Please try again.',
    errorFileProtocol:
      'The form cannot be sent from a local file. Run « npm start », then open http://localhost:3000/rsvp-en.html',
    errorServerUnavailable:
      'Cannot reach the server. Make sure « npm start » is running, then open http://localhost:3000/rsvp-en.html',
    sending: 'Sending…',
    submit: 'Confirm Reservation',
    openBtn: 'Reservation',
    phoneRequired: 'Please enter your phone number.',
    countryRequired: 'Please select your country from the list.',
    countryInvalid: 'Please choose a valid country from the suggestions.',
    codeRequired: 'Please select a country code from the list.',
    codeInvalid: 'Please choose a valid country code from the suggestions.',
    additionalGuestsLead: 'Please enter the details of the other guest(s) joining you.',
    guestTitle: (n) => `Guest ${n}`,
    guestFirstName: 'First Name',
    guestLastName: 'Last Name',
    guestRelationship: 'Relationship to you',
    guestRelationshipOther: 'Please specify the relationship',
    guestNameRequired: (n) => `Please enter the full name for guest ${n}.`,
    guestRelationshipRequired: (n) => `Please select how guest ${n} is related to you.`,
    guestRelationshipOtherRequired: (n) => `Please specify your relationship to guest ${n}.`,
    nameHint: 'Please enter the full name of the person responding.',
    alreadyResponded: 'A response has already been recorded for this name. Contact us if you need to change it.',
  },
  fr: {
    success: 'Merci ! Votre réservation a bien été reçue.',
    error: 'Une erreur est survenue. Veuillez réessayer.',
    errorFileProtocol:
      'Impossible d\'envoyer le formulaire depuis un fichier local. Lancez « npm start », puis ouvrez http://localhost:3000/rsvp-fr.html',
    errorServerUnavailable:
      'Impossible de contacter le serveur. Vérifiez que « npm start » est bien lancé, puis ouvrez http://localhost:3000/rsvp-fr.html',
    sending: 'Envoi en cours…',
    submit: 'Confirmer la réservation',
    openBtn: 'Réservation',
    phoneRequired: 'Veuillez saisir votre numéro de téléphone.',
    countryRequired: 'Veuillez sélectionner votre pays dans la liste.',
    countryInvalid: 'Veuillez choisir un pays valide parmi les suggestions.',
    codeRequired: 'Veuillez sélectionner un indicatif dans la liste.',
    codeInvalid: 'Veuillez choisir un indicatif valide parmi les suggestions.',
    additionalGuestsLead: 'Merci d\'indiquer les personnes qui vous accompagnent.',
    guestTitle: (n) => `Invité(e) ${n}`,
    guestFirstName: 'Prénom',
    guestLastName: 'Nom',
    guestRelationship: 'Lien avec vous',
    guestRelationshipOther: 'Précisez le lien',
    guestNameRequired: (n) => `Veuillez saisir le nom complet de l'invité(e) ${n}.`,
    guestRelationshipRequired: (n) => `Veuillez indiquer le lien de l'invité(e) ${n} avec vous.`,
    guestRelationshipOtherRequired: (n) => `Veuillez préciser votre lien avec l'invité(e) ${n}.`,
    nameHint: 'Merci de saisir le nom complet de la personne qui répond.',
    alreadyResponded: 'Une réponse existe déjà pour ce nom. Contactez-nous si vous devez la modifier.',
  },
};

let countrySearches = null;
const MAX_GUESTS_PER_RSVP = 5;

function getRsvpApiUrl() {
  if (window.location.protocol === 'file:') return null;
  return `${window.location.origin}/api/rsvp`;
}

function getSubmitErrorMessage(lang, context) {
  const msgs = MESSAGES[lang];
  if (context === 'file') return msgs.errorFileProtocol;
  if (context === 'server') return msgs.errorServerUnavailable;
  return msgs.error;
}

function getRelationshipOptionsHtml(lang) {
  return RELATIONSHIPS[lang]
    .map((opt) => `<option value="${opt.value}">${opt.label}</option>`)
    .join('');
}

function getRelationshipLabel(value, lang, otherText) {
  if (value === 'other') return otherText?.trim() || '';
  return RELATIONSHIPS[lang].find((r) => r.value === value)?.label || value;
}

function updateGuestsSelectMax(maxGuests, lang) {
  const guestsSelect = document.getElementById('guests');
  if (!guestsSelect) return;

  const limit = Math.max(1, Math.min(MAX_GUESTS_PER_RSVP, maxGuests || MAX_GUESTS_PER_RSVP));
  const currentValue = parseInt(guestsSelect.value, 10) || 1;

  guestsSelect.innerHTML = Array.from({ length: limit }, (_, i) => {
    const value = i + 1;
    return `<option value="${value}">${value}</option>`;
  }).join('');

  guestsSelect.value = String(Math.min(currentValue, limit));
  updateGuestSections(lang);
}

function renderAdditionalGuestFields(count, lang) {
  const listEl = document.getElementById('additional-guests-list');
  const leadEl = document.getElementById('additional-guests-lead');
  const groupEl = document.getElementById('additional-guests-group');
  const msgs = MESSAGES[lang];

  if (!listEl || !groupEl) return;

  if (count <= 0) {
    groupEl.hidden = true;
    listEl.innerHTML = '';
    return;
  }

  groupEl.hidden = false;
  if (leadEl) leadEl.textContent = msgs.additionalGuestsLead;

  const optionsHtml = getRelationshipOptionsHtml(lang);
  listEl.innerHTML = Array.from({ length: count }, (_, i) => {
    const guestNum = i + 2;
    return `
      <fieldset class="additional-guest-card">
        <legend class="additional-guest-card__title">${msgs.guestTitle(guestNum)}</legend>
        <div class="form-row">
          <div class="form-group">
            <label for="guestFirstName_${i}">${msgs.guestFirstName} <span class="required">*</span></label>
            <input type="text" id="guestFirstName_${i}" name="guestFirstName_${i}" required autocomplete="off">
          </div>
          <div class="form-group">
            <label for="guestLastName_${i}">${msgs.guestLastName} <span class="required">*</span></label>
            <input type="text" id="guestLastName_${i}" name="guestLastName_${i}" required autocomplete="off">
          </div>
        </div>
        <div class="form-group">
          <label for="guestRelationship_${i}">${msgs.guestRelationship} <span class="required">*</span></label>
          <select id="guestRelationship_${i}" name="guestRelationship_${i}" required data-guest-relationship="${i}">
            ${optionsHtml}
          </select>
        </div>
        <div class="form-group guest-relationship-other" id="guestRelationshipOtherGroup_${i}" hidden>
          <label for="guestRelationshipOther_${i}">${msgs.guestRelationshipOther} <span class="required">*</span></label>
          <input type="text" id="guestRelationshipOther_${i}" name="guestRelationshipOther_${i}" autocomplete="off">
        </div>
      </fieldset>
    `;
  }).join('');

  listEl.querySelectorAll('[data-guest-relationship]').forEach((select) => {
    select.addEventListener('change', () => {
      const index = select.dataset.guestRelationship;
      const otherGroup = document.getElementById(`guestRelationshipOtherGroup_${index}`);
      const otherInput = document.getElementById(`guestRelationshipOther_${index}`);
      const isOther = select.value === 'other';
      if (otherGroup) otherGroup.hidden = !isOther;
      if (otherInput) {
        otherInput.required = isOther;
        if (!isOther) otherInput.value = '';
      }
    });
  });
}

function updateGuestSections(lang) {
  const guestsGroup = document.getElementById('guests-group');
  const guestsSelect = document.getElementById('guests');
  const attending = document.querySelector('input[name="attendance"]:checked')?.value === 'yes';

  if (guestsGroup) {
    guestsGroup.style.display = attending ? 'block' : 'none';
  }

  if (!attending || !guestsSelect) {
    renderAdditionalGuestFields(0, lang);
    return;
  }

  const total = parseInt(guestsSelect.value, 10) || 1;
  renderAdditionalGuestFields(Math.max(0, total - 1), lang);
}

function collectAdditionalGuests(lang) {
  const total = parseInt(document.getElementById('guests')?.value, 10) || 1;
  const count = Math.max(0, total - 1);
  const guests = [];

  for (let i = 0; i < count; i += 1) {
    const firstName = document.getElementById(`guestFirstName_${i}`)?.value.trim() || '';
    const lastName = document.getElementById(`guestLastName_${i}`)?.value.trim() || '';
    const relationship = document.getElementById(`guestRelationship_${i}`)?.value || '';
    const relationshipOther = document.getElementById(`guestRelationshipOther_${i}`)?.value.trim() || '';

    guests.push({
      firstName,
      lastName,
      relationship,
      relationshipOther: relationship === 'other' ? relationshipOther : '',
      relationshipLabel: getRelationshipLabel(relationship, lang, relationshipOther),
    });
  }

  return guests;
}

function validateAdditionalGuests(lang) {
  const msgs = MESSAGES[lang];
  const guests = collectAdditionalGuests(lang);

  for (let i = 0; i < guests.length; i += 1) {
    const guestNum = i + 2;
    const guest = guests[i];

    if (!guest.firstName || !guest.lastName) {
      return { valid: false, message: msgs.guestNameRequired(guestNum) };
    }
    if (!guest.relationship) {
      return { valid: false, message: msgs.guestRelationshipRequired(guestNum) };
    }
    if (guest.relationship === 'other' && !guest.relationshipOther) {
      return { valid: false, message: msgs.guestRelationshipOtherRequired(guestNum) };
    }
  }

  return { valid: true, guests };
}

function openRsvpModal() {
  const modal = document.getElementById('rsvp-modal');
  if (!modal) return;
  modal.classList.add('rsvp-modal--open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  document.getElementById('firstName')?.focus();
}

function closeRsvpModal() {
  const modal = document.getElementById('rsvp-modal');
  if (!modal) return;
  modal.classList.remove('rsvp-modal--open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function initRsvpForm(lang) {
  const form = document.getElementById('rsvp-form');
  const messageEl = document.getElementById('form-message');
  const submitBtn = document.getElementById('submit-btn');
  const guestsSelect = document.getElementById('guests');
  const openBtn = document.getElementById('rsvp-open-btn');
  const modal = document.getElementById('rsvp-modal');
  const msgs = MESSAGES[lang];

  countrySearches = initCountrySearches(lang);
  updateGuestSections(lang);

  const nameHint = document.getElementById('rsvp-name-hint');
  if (nameHint) nameHint.textContent = msgs.nameHint;

  updateGuestsSelectMax(MAX_GUESTS_PER_RSVP, lang);

  if (openBtn) {
    openBtn.textContent = msgs.openBtn;
    openBtn.addEventListener('click', openRsvpModal);
  }

  if (modal) {
    document.getElementById('rsvp-modal-close')?.addEventListener('click', closeRsvpModal);
    document.getElementById('rsvp-modal-backdrop')?.addEventListener('click', closeRsvpModal);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('rsvp-modal--open')) {
        closeRsvpModal();
      }
    });
  }

  document.querySelectorAll('input[name="attendance"]').forEach((radio) => {
    radio.addEventListener('change', () => updateGuestSections(lang));
  });

  guestsSelect?.addEventListener('change', () => updateGuestSections(lang));

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    messageEl.className = 'message';
    messageEl.textContent = '';

    const formData = new FormData(form);
    const countryOfResidence = formData.get('countryOfResidence');
    const phoneCountryCode = formData.get('phoneCountryCode');
    const phoneNumber = formData.get('phoneNumber')?.trim().replace(/\s/g, '');
    const attendance = formData.get('attendance');
    const guestCount = attendance === 'yes' ? parseInt(formData.get('guests'), 10) : 0;

    if (!countryOfResidence || !countrySearches?.countrySearch?.getValidItem()) {
      messageEl.className = 'message message--error';
      messageEl.textContent = countryOfResidence ? msgs.countryInvalid : msgs.countryRequired;
      document.getElementById('countrySearchInput')?.focus();
      return;
    }
    if (!phoneCountryCode || !countrySearches?.phoneCodeSearch?.getValidItem()) {
      messageEl.className = 'message message--error';
      messageEl.textContent = phoneCountryCode ? msgs.codeInvalid : msgs.codeRequired;
      document.getElementById('phoneCodeSearchInput')?.focus();
      return;
    }
    if (!phoneNumber) {
      messageEl.className = 'message message--error';
      messageEl.textContent = msgs.phoneRequired;
      document.getElementById('phoneNumber')?.focus();
      return;
    }

    let additionalGuests = [];
    if (attendance === 'yes' && guestCount > 1) {
      const guestValidation = validateAdditionalGuests(lang);
      if (!guestValidation.valid) {
        messageEl.className = 'message message--error';
        messageEl.textContent = guestValidation.message;
        return;
      }
      additionalGuests = guestValidation.guests;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = msgs.sending;

    const data = {
      firstName: formData.get('firstName').trim(),
      lastName: formData.get('lastName').trim(),
      email: formData.get('email')?.trim() || '',
      countryOfResidence,
      countryOfResidenceName: getCountryName(countryOfResidence, lang),
      phoneCountryCode,
      phoneNumber,
      fullPhone: `${phoneCountryCode}${phoneNumber}`,
      attendance,
      guests: guestCount,
      additionalGuests,
      dietary: formData.get('dietary')?.trim() || '',
      message: formData.get('message')?.trim() || '',
      lang,
      submittedAt: new Date().toISOString(),
    };

    const apiUrl = getRsvpApiUrl();
    if (!apiUrl) {
      messageEl.className = 'message message--error';
      messageEl.textContent = getSubmitErrorMessage(lang, 'file');
      submitBtn.disabled = false;
      submitBtn.textContent = msgs.submit;
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        let serverMessage = '';
        try {
          const payload = await response.json();
          serverMessage = payload?.message || payload?.error || '';
        } catch {
          /* ignore */
        }
        throw new Error(serverMessage || 'Request failed');
      }

      messageEl.className = 'message message--success';
      messageEl.textContent = msgs.success;
      form.reset();
      resetCountrySearches(countrySearches);
      updateGuestsSelectMax(MAX_GUESTS_PER_RSVP, lang);
      updateGuestSections(lang);

      if (modal) {
        setTimeout(closeRsvpModal, 2500);
      }
    } catch (err) {
      messageEl.className = 'message message--error';
      const failedFetch = err?.message === 'Failed to fetch' || err?.name === 'TypeError';
      if (err?.message && err.message !== 'Request failed' && !failedFetch) {
        messageEl.textContent = err.message;
      } else {
        messageEl.textContent = getSubmitErrorMessage(lang, 'server');
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = msgs.submit;
    }
  });
}

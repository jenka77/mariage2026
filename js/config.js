// ── Personnalisez les informations du mariage ici ──
const WEDDING_CONFIG = {
  groom: 'Yannick',
  bride: 'Dora',
  monogram: 'DY',
  monogramLeft: 'D',
  monogramRight: 'Y',

  // Prénoms : 'brittany' | 'burgues' (accueil + billet + réservation)
  coupleNamesFont: 'brittany',

  // Date du mariage (pour le décompte — format ISO)
  weddingDateISO: '2026-12-19T14:30:00',

  date: 'Saturday, December 19, 2026',
  dateShort: '19 DEC 2026',
  dateFr: 'Samedi 19 décembre 2026',
  dateShortFr: '19 DÉC. 2026',
  landingDate: '19 Décembre 2026',
  time: '2:30 PM',

  venue: 'EEC Paroisse de Biyem-Assi, RFJJ+Q9V, Yaoundé, Cameroon',
  venueFr: 'EEC Paroisse de Biyem-Assi, RFJJ+Q9V, Yaoundé, Cameroun',

  // Photo page enveloppe (première page — index.html)
  landingPhoto: 'assets/mariage26.jpeg',
  landingRingsImage: 'assets/wedding-rings-sign.png',

  // Photo Save the Date (en.html / fr.html) — noir & blanc
  couplePhoto: 'assets/couple-landing.jpeg',

  ceremonyPhoto: 'assets/chapelle1.jpeg',
  receptionPhoto: 'assets/reception.jpeg',

  // Image sous les prénoms (fr.html / en.html) — remplacez par votre PNG/JPG si besoin
  saveTheDateImage: 'assets/couple-landing.jpeg',
  // true = fond papier crème (maquette billet), sans photo de couple
  saveTheDatePaperBackground: true,
  // Opacité du voile crème sur le fond (plus bas = image plus visible)
  saveTheDateBgWash: 0.54,

  // false = image complète (placeholder actuel) | true = photo seule + cœur en overlay
  overlayDesign: false,

  invitation: {
    familiesLineFr: 'Avec leurs familles',
    familiesLineEn: 'Together with their families',
    inviteSuffixFr: 'vous invitent à leur mariage',
    inviteSuffixEn: 'invite you to their wedding',
  },

  saveTheDate: {
    taglineEn: "We're Getting Married",
    taglineFr: 'Nous nous marions',
    countdownTitleEn: 'Countdown to Our Wedding',
    countdownTitleFr: 'Compte à rebours jusqu\'à notre mariage',
    messageEn: 'Each passing day brings us a little closer to the most beautiful day of our lives.',
    messageFr: 'Chaque jour qui passe nous rapproche un peu plus du plus beau jour de notre vie.',
    thanksEn: 'Thank you for being by our side!',
    thanksFr: 'Merci d\'être à nos côtés !',
    actionInfoEn: 'Good to Know',
    actionInfoFr: 'Bon à savoir',
    actionCalendarEn: 'Add to Calendar',
    actionCalendarFr: 'Ajouter à mon calendrier',
    actionHelpEn: 'Help',
    actionHelpFr: 'Aide',
  },

  ceremony: {
    sectionTitleEn: 'Religious Ceremony',
    sectionTitleFr: 'Cérémonie religieuse',
    name: 'EEC Paroisse de Biyem-Assi',
    nameFr: 'EEC Paroisse de Biyem-Assi',
    address: 'RFJJ+Q9V, Yaoundé, Cameroon',
    addressFr: 'RFJJ+Q9V, Yaoundé, Cameroun',
    cityEn: 'Yaoundé, Cameroon',
    cityFr: 'Yaoundé, Cameroun',
    mapsUrl: 'https://maps.app.goo.gl/NB83KsPmr6NNLumJA',
    mapsLabelEn: 'Open in Google Maps',
    mapsLabelFr: 'Voir sur Google Maps',
    detailsLabelEn: 'View details',
    detailsLabelFr: 'Voir les détails',
    time: '2:30 PM',
    timeFr: '14h30',
  },

  reception: {
    sectionTitleEn: 'Dinner / Evening',
    sectionTitleFr: 'Dîner / Soirée',
    name: 'Blessings Hall',
    nameFr: 'Blessings Hall',
    address: 'RFJJ+Q9V, Yaoundé, Cameroon',
    addressFr: 'RFJJ+Q9V, Yaoundé, Cameroun',
    cityEn: 'Yaoundé, Cameroon',
    cityFr: 'Yaoundé, Cameroun',
    mapsUrl: 'https://maps.app.goo.gl/NB83KsPmr6NNLumJA',
    mapsLabelEn: 'Open in Google Maps',
    mapsLabelFr: 'Voir sur Google Maps',
    detailsLabelEn: 'View details',
    detailsLabelFr: 'Voir les détails',
    time: '6:00 PM',
    timeFr: '18h00',
    timePrefixEn: '',
    timePrefixFr: '',
  },

  rsvpDeadline: 'November 10, 2026',
  rsvpDeadlineFr: '10 novembre 2026',
  rsvpDeadlineISO: '2026-11-10T23:59:59',

  dressCodeIcon: 'assets/dresscode.png',
  dressCode: {
    titleMainEn: 'Dress',
    titleScriptEn: 'Code',
    titleMainFr: 'Code',
    titleScriptFr: 'Vestimentaire',
    leadEn: 'Black Tie Optional.',
    leadFr: 'Tenue de soirée optionnelle.',
    textEn:
      'You are welcome to wear any of the shades below (choose from these authorised colours).',
    textFr:
      'Vous pouvez porter l\'une des teintes ci-dessous (couleurs autorisées pour les invités).',
    avoidEn: 'Please avoid white and off-white out of respect for the bride.',
    avoidFr: 'Merci d\'éviter le blanc et le blanc cassé par respect pour la mariée.',
    colors: [
      '#7A3A12',
      '#5B161B',
      '#4F4A38',
      '#A04E28',
      '#8B6644',
      '#1A2E24',
      '#DAC5A6',
    ],
    colorSwatches: [
      { hex: '#7A3A12', nameFr: 'Terracotta', nameEn: 'Terracotta' },
      { hex: '#5B161B', nameFr: 'Bordeaux / rouge brique', nameEn: 'Burgundy / brick red' },
      { hex: '#4F4A38', nameFr: 'Vert olive', nameEn: 'Olive green' },
      { hex: '#A04E28', nameFr: 'Rouille / cuivre', nameEn: 'Rust / copper' },
      { hex: '#8B6644', nameFr: 'Camel / caramel', nameEn: 'Camel / caramel' },
      { hex: '#1A2E24', nameFr: 'Vert forêt', nameEn: 'Forest green' },
      { hex: '#DAC5A6', nameFr: 'Beige champagne / sable', nameEn: 'Champagne beige / sand' },
    ],
  },

  faq: {
    labelEn: 'FAQ',
    labelFr: 'FAQ',
    titleEn: 'Good to Know – FAQ',
    titleFr: 'Bon à savoir – FAQ',
    helpLinkEn: 'help button',
    helpLinkFr: 'bouton d\'aide',
    items: [
      {
        qEn: 'Can I bring a plus one?',
        qFr: 'Puis-je venir accompagné(e) ?',
        aEn:
          'Please check the number of seats shown on your invitation ticket. There are two ticket types:\n\nCouple ticket: valid for two guests (Mrs and Mr).\nIndividual ticket: valid for one guest (Mrs, Miss or Mr).\n\nPlease respect the number of seats on your ticket.',
        aFr:
          'Nous vous invitons à vérifier le nombre de places indiqué sur votre billet d\'invitation. Il existe deux catégories de billets :\n\nBillet couple : valable pour deux personnes (Mme et M.).\nBillet individuel : valable pour une seule personne (Mme, Mlle ou M.).\n\nMerci de respecter le nombre de places correspondant à votre billet.',
      },
      {
        qEn: 'Are children welcome?',
        qFr: 'Les enfants sont-ils les bienvenus ?',
        aEn:
          'We have chosen to celebrate this day mainly among adults. However, if you wish to bring your child or children, please ensure each one has their own invitation ticket. Without a ticket, we unfortunately cannot guarantee their admission.',
        aFr:
          'Nous avons choisi de célébrer cette journée principalement entre adultes. Toutefois, si vous souhaitez venir avec votre ou vos enfants, assurez-vous que chacun d\'eux dispose de son propre billet d\'invitation. Sans billet, leur accès ne pourra malheureusement pas être garanti.',
      },
      {
        qEn: 'Is parking available on site?',
        qFr: 'Un parking est-il disponible sur place ?',
        aEn:
          'Yes, parking is available at the EEC parish of Biyem-Assi. Spaces are limited, so we cannot guarantee a spot for every guest. We recommend arriving early: first come, first served!',
        aFr:
          'Oui, un parking est disponible sur le site de l\'EEC, paroisse de Biyem-Assi. Toutefois, les places étant limitées, nous ne pouvons pas garantir une place de stationnement à chaque invité. Nous vous recommandons donc d\'arriver tôt : premier arrivé, premier servi !',
      },
      {
        qEn: 'Can I go home to change or plan something else between the ceremony and the reception?',
        qFr:
          'Puis-je rentrer me changer ou prévoir une autre activité entre la cérémonie religieuse et la soirée ?',
        aEn:
          'We strongly advise against it, as the different parts of the day will follow one another. We recommend staying on site to enjoy every moment and celebrate this beautiful day with us without missing anything!',
        aFr:
          'Nous vous le déconseillons fortement, car les différents moments de cette journée s\'enchaîneront. Nous vous recommandons de rester sur place afin de profiter pleinement de chaque instant et de célébrer cette belle journée à nos côtés, sans rien manquer !',
      },
      {
        qEn: 'Is there transport between the church and the reception venue?',
        qFr: 'Y a-t-il une possibilité de déplacement entre l\'église et le lieu de la soirée ?',
        aEn:
          'No travel is needed, as the religious ceremony and the evening celebration will take place at the same site.',
        aFr:
          'Aucun déplacement ne sera nécessaire, car la célébration religieuse et la soirée se dérouleront sur le même site.',
      },
      {
        qEn: 'Can I take photos during the wedding?',
        qFr: 'Puis-je prendre des photos pendant le mariage ?',
        aEn:
          'Yes, you may take photos discreetly to capture these beautiful moments. Professional photographers will also be present to capture the highlights of our day. Photos will be made available to you on the event website.',
        aFr:
          'Oui, vous pourrez prendre des photos discrètement afin d\'immortaliser ces beaux moments. Des photographes professionnels seront également présents pour capturer les moments forts de notre journée. Les photos seront mises à votre disposition sur le site Internet de l\'événement.',
      },
      {
        qEn: 'What if I forgot my ticket?',
        qFr: 'Que faire si j\'ai oublié mon billet ?',
        aEn:
          'Your ticket is required to access our wedding, both the religious ceremony and the evening celebration. No admission will be allowed without a ticket. Please check that you have it with you before leaving home.',
        aFr:
          'Le billet est obligatoire pour accéder à notre mariage, aussi bien à la célébration religieuse qu\'à la soirée. Aucun accès ne sera autorisé sans billet. Nous vous invitons donc à vérifier que vous l\'avez bien avec vous avant de partir de chez vous.',
      },
    ],
  },

  adminPassword: 'mariage2026',

  // RSVP ouvert : les réponses sont enregistrées dans data/rsvps.json (plus de liste d'invités).

  contact: {
    phone: '+237640555409',
    email: 'karelletchatchouang@gmail.com',
    whatsappOnly: true,
  },
};

function getCoupleNames() {
  return `${WEDDING_CONFIG.bride} & ${WEDDING_CONFIG.groom}`;
}

function getCoupleNamesEt() {
  return `${WEDDING_CONFIG.bride} et ${WEDDING_CONFIG.groom}`;
}

function getCoupleNamesAnd() {
  return `${WEDDING_CONFIG.bride} and ${WEDDING_CONFIG.groom}`;
}

function getCoupleNamesUpper() {
  return `${WEDDING_CONFIG.bride.toUpperCase()} & ${WEDDING_CONFIG.groom.toUpperCase()}`;
}

function getEnvelopeMonogramLetters() {
  const cfg = WEDDING_CONFIG;
  return {
    left: (cfg.monogramLeft || cfg.bride?.charAt(0) || 'D').toUpperCase(),
    right: (cfg.monogramRight || cfg.groom?.charAt(0) || 'Y').toUpperCase(),
  };
}

(function applyCoupleNamesFontPreference() {
  const pick = (WEDDING_CONFIG.coupleNamesFont || 'brittany').toLowerCase();
  document.documentElement.dataset.coupleFont =
    pick === 'burgues' ? 'burgues' : 'brittany';
})();

// ── Personnalisez les informations du mariage ici ──
const WEDDING_CONFIG = {
  groom: 'Yannick',
  bride: 'Dora',
  monogram: 'DY',
  monogramLeft: 'D',
  monogramRight: 'Y',
  envelopeMonogramImage: 'assets/monogram-dy-seal.svg',

  // Date du mariage (pour le décompte — format ISO)
  weddingDateISO: '2026-12-19T14:30:00',

  date: 'Saturday, December 19, 2026',
  dateShort: '19 DEC 2026',
  dateFr: 'Samedi 19 décembre 2026',
  dateShortFr: '19 DÉC. 2026',
  landingDate: '19 décembre 2026',
  time: '2:30 PM',

  venue: 'EEC Paroisse de Biyem-Assi, RFJJ+Q9V, Yaoundé, Cameroon',
  venueFr: 'EEC Paroisse de Biyem-Assi, RFJJ+Q9V, Yaoundé, Cameroun',

  // Photo page enveloppe (première page — index.html)
  landingPhoto: 'assets/image2.jpeg',
  landingRingsImage: 'assets/wedding-rings-sign.png',

  // Photo Save the Date (en.html / fr.html) — noir & blanc
  couplePhoto: 'assets/image2.jpeg',

  ceremonyPhoto: 'assets/chapelle1.jpeg',
  receptionPhoto: 'assets/buffet.png',

  // Image sous les prénoms (fr.html / en.html) — remplacez par votre PNG/JPG si besoin
  saveTheDateImage: 'assets/save-the-date-gemini.jpg',
  // true = fond papier crème (maquette billet), sans photo de couple
  saveTheDatePaperBackground: true,
  // Opacité du voile crème sur le fond (plus bas = image plus visible)
  saveTheDateBgWash: 0.54,

  // false = image complète (placeholder actuel) | true = photo seule + cœur en overlay
  overlayDesign: false,

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
    name: 'EEC Paroisse de Biyem-Assi',
    nameFr: 'EEC Paroisse de Biyem-Assi',
    address: 'RFJJ+Q9V, Yaoundé, Cameroon',
    addressFr: 'RFJJ+Q9V, Yaoundé, Cameroun',
    mapsUrl: 'https://maps.app.goo.gl/NB83KsPmr6NNLumJA',
    mapsLabelEn: 'Open in Google Maps',
    mapsLabelFr: 'Voir sur Google Maps',
    time: '2:30 PM',
    timeFr: '14h30',
  },

  reception: {
    name: 'EEC Paroisse de Biyem-Assi',
    nameFr: 'EEC Paroisse de Biyem-Assi',
    address: 'RFJJ+Q9V, Yaoundé, Cameroon',
    addressFr: 'RFJJ+Q9V, Yaoundé, Cameroun',
    mapsUrl: 'https://maps.app.goo.gl/NB83KsPmr6NNLumJA',
    mapsLabelEn: 'Open in Google Maps',
    mapsLabelFr: 'Voir sur Google Maps',
    time: '6:00 PM',
    timeFr: '18h00',
  },

  rsvpDeadline: 'November 20, 2026',
  rsvpDeadlineFr: '20 novembre 2026',
  rsvpDeadlineISO: '2026-11-20T23:59:59',

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
    tipEn:
      'Ladies, please consider block heels or wedges for walking comfortably on the grass.',
    tipFr:
      'Mesdames, pensez aux talons larges ou compensés pour marcher confortablement sur l\'herbe.',
    colors: [
      '#7A3A12',
      '#5B161B',
      '#4F4A38',
      '#A04E28',
      '#8B6644',
      '#1A2E24',
      '#7A505C',
    ],
    colorSwatches: [
      { hex: '#7A3A12', nameFr: 'Terracotta', nameEn: 'Terracotta' },
      { hex: '#5B161B', nameFr: 'Bordeaux / rouge brique', nameEn: 'Burgundy / brick red' },
      { hex: '#4F4A38', nameFr: 'Vert olive', nameEn: 'Olive green' },
      { hex: '#A04E28', nameFr: 'Rouille / cuivre', nameEn: 'Rust / copper' },
      { hex: '#8B6644', nameFr: 'Camel / caramel', nameEn: 'Camel / caramel' },
      { hex: '#1A2E24', nameFr: 'Vert forêt', nameEn: 'Forest green' },
      { hex: '#7A505C', nameFr: 'Vieux rose', nameEn: 'Dusty rose' },
    ],
  },

  faq: {
    labelEn: 'FAQ',
    labelFr: 'FAQ',
    titleEn: 'Good to Know',
    titleFr: 'Bon à savoir',
    helpLinkEn: 'help button',
    helpLinkFr: 'bouton d\'aide',
    items: [
      {
        qEn: 'Can I bring a plus one?',
        qFr: 'Puis-je venir accompagné(e) ?',
        aEn:
          'Two types of tickets are used: the couple ticket, valid for two guests (Mr and Mrs), and the individual ticket, valid for one guest. Please register according to the ticket you received.',
        aFr:
          'Deux types de billets existent : le billet couple, valable pour deux personnes (Mme et M.), et le billet individuel, valable pour une seule personne. Merci de vous enregistrer conformément au billet reçu.',
      },
      {
        qEn: 'Are children welcome?',
        qFr: 'Les enfants sont-ils les bienvenus ?',
        aEn:
          'Our wedding is primarily an adults\' celebration. Children are welcome only if they have their own invitation ticket.',
        aFr:
          'Notre mariage est avant tout une célébration entre adultes. Les enfants sont les bienvenus uniquement s\'ils disposent de leur propre billet d\'invitation.',
      },
      {
        qEn: 'Is parking available on site?',
        qFr: 'Un parking est-il disponible sur place ?',
        aEn:
          'Yes, parking is available at the EEC parish of Biyem-Assi. Spaces are limited, so we recommend arriving a little early.',
        aFr:
          'Oui, un parking est disponible sur le site de l\'EEC, paroisse de Biyem-Assi. Les places étant limitées, nous vous conseillons d\'arriver un peu en avance.',
      },
      {
        qEn: 'Can I go home to change or plan something else between the ceremony and the reception?',
        qFr:
          'Puis-je rentrer me changer ou prévoir une autre activité entre la cérémonie religieuse et la soirée ?',
        aEn:
          'We kindly ask you to stay with us: the highlights of the day follow one after another. Please do not plan to go home or schedule another activity between the religious ceremony and the evening celebration.',
        aFr:
          'Nous vous invitons à rester avec nous : les temps forts de la journée s\'enchaînent les uns après les autres. Il n\'est donc pas prévu de retourner chez vous ou de prévoir une autre activité entre la cérémonie religieuse et la soirée.',
      },
      {
        qEn: 'Is there transport between the church and the reception venue?',
        qFr: 'Y a-t-il une possibilité de déplacement entre l\'église et le lieu de la soirée ?',
        aEn:
          'No travel is needed: the religious ceremony and the evening celebration take place at the same site.',
        aFr:
          'Aucun déplacement n\'est nécessaire : la cérémonie religieuse et la soirée se déroulent sur le même site.',
      },
      {
        qEn: 'Can I take photos during the wedding?',
        qFr: 'Puis-je prendre des photos pendant le mariage ?',
        aEn:
          'You may take photos while remaining discreet. Professional photographers will also be present to capture every moment.',
        aFr:
          'Vous pouvez prendre des photos en restant discret(e). Des photographes professionnels seront présents pour immortaliser chaque instant.',
      },
      {
        qEn: 'What if I forgot my ticket?',
        qFr: 'Que faire si j\'ai oublié mon billet ?',
        contactHelp: true,
        aEnBefore: 'Your ticket is required to access the ceremony and the reception. If you forgot it, please contact us as soon as possible using the ',
        aEnAfter: ' at the bottom of the page.',
        aFrBefore:
          'Votre billet est obligatoire pour accéder à la cérémonie et à la soirée. Si vous l\'avez oublié, contactez-nous dès que possible via le ',
        aFrAfter: ' en bas de la page.',
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

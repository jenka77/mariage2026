// ── Personnalisez les informations du mariage ici ──
const WEDDING_CONFIG = {
  groom: 'Yannick',
  bride: 'Dora',
  monogram: 'YD',

  // Date du mariage (pour le décompte — format ISO)
  weddingDateISO: '2026-12-19T15:00:00',

  date: 'Saturday, December 19, 2026',
  dateShort: '19 DEC 2026',
  dateFr: 'Samedi 19 décembre 2026',
  dateShortFr: '19 DÉC. 2026',
  landingDate: '19 décembre 2026',
  time: '3:00 PM',

  venue: 'EEC Paroisse de Biyem-Assi, RFJJ+Q9V, Yaoundé, Cameroon',
  venueFr: 'EEC Paroisse de Biyem-Assi, RFJJ+Q9V, Yaoundé, Cameroun',

  // Photo page enveloppe (première page — index.html)
  landingPhoto: 'assets/image2.jpeg',

  // Photo Save the Date (en.html / fr.html) — noir & blanc
  couplePhoto: 'assets/image2.jpeg',

  ceremonyPhoto: 'assets/chapelle1.jpeg',
  receptionPhoto: 'assets/buffet.png',

  // Image sous les prénoms (fr.html / en.html) — remplacez par votre PNG/JPG si besoin
  saveTheDateImage: 'assets/save-the-date-gemini.jpg',

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

  rsvpDeadline: 'November 30, 2026',
  rsvpDeadlineFr: '30 novembre 2026',
  rsvpDeadlineISO: '2026-11-30T23:59:59',

  // Page « Notre Histoire » — image hero + bande de photos
  storyHero: 'assets/mariage1.png',
  storyStripPhotos: [
    'assets/image1.jpeg',
    'assets/image2.jpeg',
    'assets/image3.jpeg',
    'assets/image4.jpeg',
    'assets/image5.jpeg',
    'assets/image6.jpeg',
  ],

  story: {
    detailsLinkEn: 'The details — please click here',
    detailsLinkFr: 'Cliquez ici',
    titleOurEn: 'OUR',
    titleLoveEn: 'LOVE',
    titleStoryEn: 'Story',
    titleOurFr: 'Notre',
    titleLoveFr: 'Histoire',
    titleStoryFr: "d'amour",
    textEn:
      'It started with a borrowed umbrella on a rainy afternoon in Paris. Three years, two countries, and one sunset proposal in Positano later — we are getting married.',
    textFr:
      'Tout a commencé par un parapluie emprunté un après-midi pluvieux à Paris. Trois ans, deux pays et une demande en mariage au coucher du soleil à Positano plus tard — nous nous marions.',
    placeholderEn: 'Your photo',
    placeholderFr: 'Votre photo',
  },

  dressCodeIcon: 'assets/dresscode.png',
  dressCode: {
    titleMainEn: 'Dress',
    titleScriptEn: 'Code',
    titleMainFr: 'Code',
    titleScriptFr: 'Vestimentaire',
    leadEn: 'Black Tie Optional.',
    leadFr: 'Tenue de soirée optionnelle.',
    textEn:
      'We invite you to dress in shades of ivory, champagne, or deep burgundy.',
    textFr:
      'Nous vous invitons à porter des tons ivoire, champagne ou bordeaux profond.',
    avoidEn: 'Please avoid white and off-white out of respect for the bride.',
    avoidFr: 'Merci d\'éviter le blanc et le blanc cassé par respect pour la mariée.',
    tipEn:
      'Ladies, please consider block heels or wedges for walking comfortably on the grass.',
    tipFr:
      'Mesdames, pensez aux talons larges ou compensés pour marcher confortablement sur l\'herbe.',
    colors: ['#f3ebd3', '#7c7d41', '#8b633d', '#632b2b', '#333131'],
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
        aEn: 'If your invitation includes a plus one, it will be noted on your invitation. If you\'re unsure, please reach out to us and we\'ll be happy to clarify.',
        aFr: 'Si votre invitation inclut un accompagnant, cela sera indiqué sur votre invitation. En cas de doute, contactez-nous et nous serons ravis de vous répondre.',
      },
      {
        qEn: 'Are children welcome?',
        qFr: 'Les enfants sont-ils les bienvenus ?',
        aEn: 'We love your little ones, but we have chosen to make our wedding an adults-only celebration. We hope this gives you a chance to enjoy a wonderful evening. We appreciate your understanding.',
        aFr: 'Nous adorons vos petits, mais nous avons choisi de faire de notre mariage une célébration réservée aux adultes. Nous espérons que cela vous permettra de profiter pleinement de la soirée. Merci de votre compréhension.',
      },
      {
        qEn: 'Is there parking at the venue?',
        qFr: 'Y a-t-il un parking sur place ?',
        aEn: 'Parking is available near the parish. We recommend arriving a little early.',
        aFr: 'Un parking est disponible à proximité de la paroisse. Nous vous conseillons d\'arriver un peu en avance.',
      },
      {
        qEn: 'Will there be vegetarian or dietary options?',
        qFr: 'Y aura-t-il des options végétariennes ou régimes spéciaux ?',
        aEn: 'Absolutely. Please indicate your dietary preferences on your reservation form and we will ensure your meal is perfect for you.',
        aFr: 'Absolument. Merci d\'indiquer vos préférences alimentaires sur le formulaire de réservation et nous veillerons à ce que votre repas vous convienne parfaitement.',
      },
      {
        qEn: 'Can I take photos during the ceremony?',
        qFr: 'Puis-je prendre des photos pendant la cérémonie ?',
        aEn: 'We kindly ask that you remain fully present with us during the ceremony. Our photographer will capture every moment beautifully. Feel free to take photos during the cocktail hour and reception.',
        aFr: 'Nous vous demandons de rester pleinement présents avec nous pendant la cérémonie. Notre photographe immortalisera chaque instant. N\'hésitez pas à prendre des photos pendant le cocktail et la réception.',
      },
      {
        qEn: 'When should I book my accommodation?',
        qFr: 'Quand dois-je réserver mon hébergement ?',
        aEn: 'We recommend booking as early as possible to ensure availability near the venue.',
        aFr: 'Nous vous recommandons de réserver le plus tôt possible pour garantir une disponibilité près du lieu.',
      },
      {
        qEn: 'Who should I contact if I have a question?',
        qFr: 'Qui dois-je contacter si j\'ai une question ?',
        contactHelp: true,
        aEnBefore: 'Please use our ',
        aEnAfter: ' at the bottom of the page. We will get back to you as quickly as we can.',
        aFrBefore: 'Utilisez le ',
        aFrAfter: ' en bas de la page. Nous vous répondrons dans les plus brefs délais.',
      },
    ],
  },

  adminPassword: 'mariage2026',

  // RSVP ouvert : les réponses sont enregistrées dans data/rsvps.json (plus de liste d'invités).

  contact: {
    phone: '+4917688652911',
    email: 'karelletchatchouang@gmail.com',
  },
};

function getCoupleNames() {
  return `${WEDDING_CONFIG.groom} & ${WEDDING_CONFIG.bride}`;
}

function getCoupleNamesUpper() {
  return `${WEDDING_CONFIG.groom.toUpperCase()} & ${WEDDING_CONFIG.bride.toUpperCase()}`;
}

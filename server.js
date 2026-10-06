const express = require('express');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'rsvps.json');
const GUEST_LIST_FILE = path.join(__dirname, 'data', 'guest-list.json');

const RSVP_ERRORS = {
  NOT_ON_GUEST_LIST: {
    fr: 'Votre nom ne figure pas sur notre liste d\'invités. Merci de vérifier l\'orthographe (comme sur votre invitation) ou de nous contacter.',
    en: 'Your name is not on our guest list. Please check the spelling (as on your invitation) or contact us.',
  },
  ALREADY_RESPONDED: {
    fr: 'Une réponse existe déjà pour ce nom. Contactez-nous si vous devez la modifier.',
    en: 'A response has already been recorded for this name. Contact us if you need to change it.',
  },
  TOO_MANY_GUESTS: {
    fr: (max) => `Votre invitation permet au maximum ${max} personne${max > 1 ? 's' : ''} (vous inclus).`,
    en: (max) => `Your invitation allows a maximum of ${max} guest${max > 1 ? 's' : ''} (including yourself).`,
  },
};

function getRsvpErrorMessage(code, lang, params) {
  const entry = RSVP_ERRORS[code];
  if (!entry) return lang === 'en' ? 'Invalid request' : 'Requête invalide';
  const message = entry[lang === 'en' ? 'en' : 'fr'];
  return typeof message === 'function' ? message(params?.maxGuests ?? 1) : message;
}

app.use(express.json());
app.use(express.static(path.join(__dirname)));

function enrichRsvp(rsvp) {
  const additionalGuests = normalizeAdditionalGuests(rsvp.additionalGuests || []);
  const attendance = rsvp.attendance === 'yes' ? 'yes' : 'no';
  const guests = attendance === 'yes' ? Math.max(1, parseInt(rsvp.guests, 10) || 1) : 0;
  const guestList =
    rsvp.guestList && rsvp.guestList.length
      ? rsvp.guestList
      : buildGuestList({
          attendance,
          firstName: trim(rsvp.firstName),
          lastName: trim(rsvp.lastName),
          additionalGuests,
        });

  return {
    ...rsvp,
    firstName: trim(rsvp.firstName),
    lastName: trim(rsvp.lastName),
    attendance,
    guests,
    additionalGuests,
    guestList: attendance === 'yes' ? guestList : [],
    confirmedCount: attendance === 'yes' ? guestList.length : 0,
  };
}

function readRsvps() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')).map(enrichRsvp);
    }
  } catch {
    /* ignore */
  }
  return [];
}

function writeRsvps(rsvps) {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(rsvps, null, 2));
}

function readGuestListConfig() {
  try {
    if (fs.existsSync(GUEST_LIST_FILE)) {
      return JSON.parse(fs.readFileSync(GUEST_LIST_FILE, 'utf8'));
    }
  } catch {
    /* ignore */
  }
  return { enabled: false, guests: [] };
}

function normalizeNameKey(value) {
  return trim(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function guestNameKey(firstName, lastName) {
  return `${normalizeNameKey(firstName)}|${normalizeNameKey(lastName)}`;
}

function findInvitedGuest(firstName, lastName) {
  const config = readGuestListConfig();
  if (!config.enabled) return null;

  const key = guestNameKey(firstName, lastName);
  return (config.guests || []).find(
    (guest) => guestNameKey(guest.firstName, guest.lastName) === key
  ) || null;
}

function hasExistingResponse(invitedGuestId, rsvps) {
  return rsvps.some((rsvp) => rsvp.invitedGuestId === invitedGuestId);
}

function hasExistingResponseByName(firstName, lastName, rsvps) {
  const key = guestNameKey(firstName, lastName);
  return rsvps.some((rsvp) => guestNameKey(rsvp.firstName, rsvp.lastName) === key);
}

const MAX_GUESTS_PER_RSVP = 5;

function buildInvitedGuestOverview(rsvps) {
  const config = readGuestListConfig();
  if (!config.enabled) {
    return { enabled: false, guests: [], summary: null };
  }

  const guests = (config.guests || []).map((guest) => {
    const response = rsvps.find((rsvp) => rsvp.invitedGuestId === guest.id);
    return {
      id: guest.id,
      firstName: guest.firstName,
      lastName: guest.lastName,
      fullName: `${guest.firstName} ${guest.lastName}`.trim(),
      maxGuests: Math.max(1, parseInt(guest.maxGuests, 10) || 1),
      status: response ? response.attendance : 'pending',
      respondedAt: response?.submittedAt || null,
      confirmedCount: response?.attendance === 'yes' ? (response.confirmedCount ?? response.guests ?? 0) : 0,
    };
  });

  const responded = guests.filter((g) => g.status !== 'pending').length;
  const pending = guests.length - responded;
  const attending = guests.filter((g) => g.status === 'yes').length;
  const declined = guests.filter((g) => g.status === 'no').length;

  return {
    enabled: true,
    guests,
    summary: {
      total: guests.length,
      responded,
      pending,
      attending,
      declined,
    },
  };
}

function getAdminPassword() {
  const configContent = fs.readFileSync(path.join(__dirname, 'js', 'config.js'), 'utf8');
  const match = configContent.match(/adminPassword:\s*['"](.+?)['"]/);
  return match ? match[1] : 'mariage2026';
}

function getCoupleNames() {
  const configContent = fs.readFileSync(path.join(__dirname, 'js', 'config.js'), 'utf8');
  const groom = configContent.match(/groom:\s*['"](.+?)['"]/)?.[1] || '';
  const bride = configContent.match(/bride:\s*['"](.+?)['"]/)?.[1] || '';
  return `${groom} & ${bride}`.trim();
}

function buildGuestsPdfBuffer(allConfirmedGuests, confirmedPersons) {
  return new Promise((resolve, reject) => {
    const fontRegular = path.join(__dirname, 'assets', 'fonts', 'DejaVuSans.ttf');
    const fontBold = path.join(__dirname, 'assets', 'fonts', 'DejaVuSans-Bold.ttf');
    const doc = new PDFDocument({ size: 'A4', layout: 'landscape', margin: 40 });
    const chunks = [];
    const coupleNames = getCoupleNames();

    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    doc.registerFont('Regular', fontRegular);
    doc.registerFont('Bold', fontBold);

    const columns = [
      { label: '#', width: 28, key: 'index' },
      { label: 'Nom complet', width: 145, key: 'fullName' },
      { label: 'Type', width: 82, key: 'type' },
      { label: 'Lien', width: 88, key: 'relationship' },
      { label: 'Répondant', width: 120, key: 'contactName' },
      { label: 'Téléphone', width: 95, key: 'contactPhone' },
      { label: 'Régime', width: 120, key: 'dietary' },
    ];

    const rowHeight = 22;
    const headerHeight = 24;
    const pageBottom = doc.page.height - 40;

    function drawPageHeader() {
      doc.font('Bold').fontSize(18).fillColor('#5b161b')
        .text('Liste des invités confirmés', { align: 'center' });
      doc.moveDown(0.35);
      doc.font('Regular').fontSize(11).fillColor('#333333')
        .text(coupleNames, { align: 'center' });
      doc.moveDown(0.5);
      doc.fontSize(9).fillColor('#666666')
        .text(
          `Exporté le ${new Date().toLocaleString('fr-FR')} — ${confirmedPersons} personne${confirmedPersons > 1 ? 's' : ''} confirmée${confirmedPersons > 1 ? 's' : ''}`,
          { align: 'center' }
        );
      doc.moveDown(0.8);
    }

    function drawTableHeader(y) {
      let x = 40;
      doc.font('Bold').fontSize(8).fillColor('#5b161b');
      columns.forEach((col) => {
        doc.text(col.label, x, y, { width: col.width, lineBreak: false });
        x += col.width;
      });
      doc.moveTo(40, y + headerHeight - 6)
        .lineTo(doc.page.width - 40, y + headerHeight - 6)
        .strokeColor('#c9a96e')
        .lineWidth(1)
        .stroke();
      return y + headerHeight;
    }

    function drawRow(guest, index, y) {
      const values = {
        index: String(index),
        fullName: guest.fullName || '—',
        type: guest.role === 'main' ? 'Principal' : 'Accompagnant',
        relationship: guest.role === 'main' ? '—' : guest.relationshipLabel || '—',
        contactName: guest.contactName || '—',
        contactPhone: guest.contactPhone || '—',
        dietary: guest.dietary || '—',
      };

      let x = 40;
      doc.font('Regular').fontSize(8).fillColor('#222222');
      columns.forEach((col) => {
        doc.text(String(values[col.key]), x, y, { width: col.width - 4, lineBreak: false });
        x += col.width;
      });

      return y + rowHeight;
    }

    drawPageHeader();
    let y = drawTableHeader(doc.y);

    if (allConfirmedGuests.length === 0) {
      doc.font('Regular').fontSize(10).fillColor('#666666')
        .text('Aucun invité confirmé pour le moment.', 40, y + 10);
    } else {
      allConfirmedGuests.forEach((guest, index) => {
        if (y + rowHeight > pageBottom) {
          doc.addPage();
          y = drawTableHeader(40);
        }
        y = drawRow(guest, index + 1, y);
      });
    }

    doc.end();
  });
}

function checkAdmin(req, res) {
  const password = req.query.password || req.body?.password;
  if (password !== getAdminPassword()) {
    res.status(401).json({ error: 'Unauthorized' });
    return false;
  }
  return true;
}

function trim(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeAdditionalGuests(additionalGuests) {
  if (!Array.isArray(additionalGuests)) return [];

  return additionalGuests.map((guest) => {
    const relationship = trim(guest.relationship);
    const relationshipOther = relationship === 'other' ? trim(guest.relationshipOther) : '';
    const relationshipLabel =
      trim(guest.relationshipLabel) ||
      (relationship === 'other' ? relationshipOther : relationship);

    return {
      firstName: trim(guest.firstName),
      lastName: trim(guest.lastName),
      relationship,
      relationshipOther,
      relationshipLabel,
    };
  });
}

function buildGuestList(rsvp) {
  if (rsvp.attendance !== 'yes') return [];

  const mainGuest = {
    firstName: rsvp.firstName,
    lastName: rsvp.lastName,
    fullName: `${rsvp.firstName} ${rsvp.lastName}`.trim(),
    role: 'main',
    relationship: '',
    relationshipLabel: '',
  };

  const companions = (rsvp.additionalGuests || []).map((guest) => ({
    firstName: guest.firstName,
    lastName: guest.lastName,
    fullName: `${guest.firstName} ${guest.lastName}`.trim(),
    role: 'companion',
    relationship: guest.relationship || '',
    relationshipLabel: guest.relationshipLabel || guest.relationshipOther || guest.relationship || '',
  }));

  return [mainGuest, ...companions];
}

function normalizeRsvp(body) {
  const attendance = body.attendance === 'yes' ? 'yes' : 'no';
  const guests = attendance === 'yes' ? Math.max(1, parseInt(body.guests, 10) || 1) : 0;
  const additionalGuests =
    attendance === 'yes' && guests > 1 ? normalizeAdditionalGuests(body.additionalGuests) : [];

  const guestList = attendance === 'yes' ? buildGuestList({
    attendance,
    firstName: trim(body.firstName),
    lastName: trim(body.lastName),
    additionalGuests,
  }) : [];

  return {
    firstName: trim(body.firstName),
    lastName: trim(body.lastName),
    email: trim(body.email),
    countryOfResidence: trim(body.countryOfResidence),
    countryOfResidenceName: trim(body.countryOfResidenceName),
    phoneCountryCode: trim(body.phoneCountryCode),
    phoneNumber: trim(body.phoneNumber).replace(/\s/g, ''),
    fullPhone: `${trim(body.phoneCountryCode)}${trim(body.phoneNumber).replace(/\s/g, '')}`,
    attendance,
    guests,
    confirmedCount: guestList.length,
    additionalGuests,
    guestList,
    dietary: trim(body.dietary),
    message: trim(body.message),
    lang: body.lang === 'en' ? 'en' : 'fr',
    submittedAt: body.submittedAt || new Date().toISOString(),
    invitedGuestId: trim(body.invitedGuestId) || null,
  };
}

function validateRsvp(body, existingRsvps) {
  const normalized = normalizeRsvp(body);
  const lang = normalized.lang;

  if (!normalized.firstName || !normalized.lastName) {
    return { valid: false, error: 'Missing name' };
  }
  if (!normalized.attendance) {
    return { valid: false, error: 'Missing attendance' };
  }
  if (!normalized.phoneNumber || !normalized.phoneCountryCode) {
    return { valid: false, error: 'Missing phone' };
  }
  if (!normalized.countryOfResidence) {
    return { valid: false, error: 'Missing country' };
  }

  if (hasExistingResponseByName(normalized.firstName, normalized.lastName, existingRsvps)) {
    return {
      valid: false,
      error: 'ALREADY_RESPONDED',
      message: getRsvpErrorMessage('ALREADY_RESPONDED', lang),
    };
  }

  if (normalized.attendance === 'yes' && normalized.guests > MAX_GUESTS_PER_RSVP) {
    return {
      valid: false,
      error: 'TOO_MANY_GUESTS',
      message: getRsvpErrorMessage('TOO_MANY_GUESTS', lang, { maxGuests: MAX_GUESTS_PER_RSVP }),
    };
  }

  if (normalized.attendance === 'yes') {
    if (normalized.guests < 1) {
      return { valid: false, error: 'Invalid guest count' };
    }
    if (normalized.additionalGuests.length !== Math.max(0, normalized.guests - 1)) {
      return { valid: false, error: 'Guest details mismatch' };
    }
    if (normalized.confirmedCount !== normalized.guests) {
      return { valid: false, error: 'Confirmed count mismatch' };
    }

    for (const guest of normalized.additionalGuests) {
      if (!guest.firstName || !guest.lastName || !guest.relationship) {
        return { valid: false, error: 'Incomplete companion details' };
      }
      if (guest.relationship === 'other' && !guest.relationshipOther) {
        return { valid: false, error: 'Missing relationship detail' };
      }
    }
  } else if (normalized.additionalGuests.length > 0 || normalized.guests > 0) {
    return { valid: false, error: 'Declined RSVP cannot include guests' };
  }

  return { valid: true, data: normalized };
}

function computeStats(rsvps) {
  const responses = rsvps.length;
  const attendingHouseholds = rsvps.filter((r) => r.attendance === 'yes').length;
  const declinedHouseholds = rsvps.filter((r) => r.attendance === 'no').length;
  const confirmedPersons = rsvps.reduce((sum, r) => sum + (r.confirmedCount || (r.attendance === 'yes' ? r.guests || 0 : 0)), 0);

  const allConfirmedGuests = [];
  rsvps.forEach((rsvp) => {
    if (rsvp.attendance !== 'yes') return;

    const guestList = rsvp.guestList || buildGuestList(rsvp);
    guestList.forEach((guest) => {
      allConfirmedGuests.push({
        reservationId: rsvp.id,
        submittedAt: rsvp.submittedAt,
        ...guest,
        contactName: `${rsvp.firstName} ${rsvp.lastName}`,
        contactPhone: rsvp.fullPhone || `${rsvp.phoneCountryCode || ''}${rsvp.phoneNumber || ''}`,
        contactEmail: rsvp.email || '',
        country: rsvp.countryOfResidenceName || rsvp.countryOfResidence || '',
        dietary: rsvp.dietary || '',
        lang: rsvp.lang,
      });
    });
  });

  return {
    responses,
    attendingHouseholds,
    declinedHouseholds,
    confirmedPersons,
    allConfirmedGuests,
  };
}

function formatAdditionalGuestsForExport(additionalGuests) {
  if (!Array.isArray(additionalGuests) || additionalGuests.length === 0) return '';
  return additionalGuests
    .map((g) => {
      const rel = g.relationshipLabel || g.relationshipOther || g.relationship || '';
      return `${g.firstName} ${g.lastName} (${rel})`;
    })
    .join('; ');
}

function formatGuestListForExport(guestList) {
  if (!Array.isArray(guestList) || guestList.length === 0) return '';
  return guestList.map((g) => g.fullName || `${g.firstName} ${g.lastName}`).join('; ');
}

function csvEscape(value) {
  return `"${String(value ?? '').replace(/"/g, '""')}"`;
}

function buildCsv(rows) {
  return rows.map((row) => row.map(csvEscape).join(',')).join('\n');
}

app.post('/api/invited-guest/check', (req, res) => {
  const config = readGuestListConfig();
  if (!config.enabled) {
    return res.json({ enabled: false, invited: true });
  }

  const firstName = trim(req.body?.firstName);
  const lastName = trim(req.body?.lastName);
  if (!firstName || !lastName) {
    return res.json({ enabled: true, invited: false, complete: false });
  }

  const invitedGuest = findInvitedGuest(firstName, lastName);
  if (!invitedGuest) {
    return res.json({ enabled: true, invited: false, complete: true });
  }

  const maxGuests = Math.max(1, parseInt(invitedGuest.maxGuests, 10) || 1);
  const alreadyResponded = hasExistingResponse(invitedGuest.id, readRsvps());

  res.json({
    enabled: true,
    invited: true,
    complete: true,
    maxGuests,
    alreadyResponded,
    invitedGuestId: invitedGuest.id,
  });
});

app.post('/api/rsvp', (req, res) => {
  const rsvps = readRsvps();
  const validation = validateRsvp(req.body, rsvps);
  if (!validation.valid) {
    return res.status(400).json({
      error: validation.error,
      message: validation.message || validation.error,
    });
  }

  const record = {
    id: Date.now(),
    ...validation.data,
  };

  rsvps.push(record);
  writeRsvps(rsvps);

  res.json({
    success: true,
    confirmedCount: record.confirmedCount,
  });
});

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.get('/api/rsvps', (req, res) => {
  if (!checkAdmin(req, res)) return;
  res.json(readRsvps());
});

app.get('/api/stats', (req, res) => {
  if (!checkAdmin(req, res)) return;
  const rsvps = readRsvps();
  res.json({
    ...computeStats(rsvps),
    rsvps,
    invitedGuestOverview: buildInvitedGuestOverview(rsvps),
  });
});

app.get('/api/export', (req, res) => {
  if (!checkAdmin(req, res)) return;

  const rsvps = readRsvps();
  const headers = [
    'Date',
    'Prénom',
    'Nom',
    'Pays',
    'Téléphone',
    'Email',
    'Présence',
    'Nb personnes confirmées',
    'Liste complète des invités',
    'Accompagnants (détail)',
    'Régime alimentaire',
    'Message',
    'Langue',
  ];

  const rows = rsvps.map((r) => [
    r.submittedAt,
    r.firstName,
    r.lastName,
    r.countryOfResidenceName || r.countryOfResidence || '',
    r.fullPhone || `${r.phoneCountryCode || ''}${r.phoneNumber || ''}`,
    r.email,
    r.attendance === 'yes' ? 'Oui' : 'Non',
    r.attendance === 'yes' ? r.confirmedCount ?? r.guests : 0,
    formatGuestListForExport(r.guestList || buildGuestList(r)),
    formatAdditionalGuestsForExport(r.additionalGuests),
    r.dietary,
    r.message,
    r.lang,
  ]);

  const csv = buildCsv([headers, ...rows]);
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="reservations.csv"');
  res.send('\uFEFF' + csv);
});

app.get('/api/export-guests', (req, res) => {
  if (!checkAdmin(req, res)) return;

  const stats = computeStats(readRsvps());
  const headers = [
    'Date réponse',
    'Nom complet',
    'Type',
    'Lien avec le répondant',
    'Répondant',
    'Téléphone répondant',
    'Email répondant',
    'Pays',
    'Régime alimentaire (foyer)',
    'Langue',
  ];

  const rows = stats.allConfirmedGuests.map((guest) => [
    guest.submittedAt,
    guest.fullName,
    guest.role === 'main' ? 'Invité principal' : 'Accompagnant',
    guest.relationshipLabel || '—',
    guest.contactName,
    guest.contactPhone,
    guest.contactEmail,
    guest.country,
    guest.dietary,
    guest.lang,
  ]);

  const csv = buildCsv([headers, ...rows]);
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="invites-confirmes.csv"');
  res.send('\uFEFF' + csv);
});

app.get('/api/export-guests-pdf', async (req, res) => {
  if (!checkAdmin(req, res)) return;

  try {
    const stats = computeStats(readRsvps());
    const pdfBuffer = await buildGuestsPdfBuffer(stats.allConfirmedGuests, stats.confirmedPersons);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="invites-confirmes.pdf"');
    res.send(pdfBuffer);
  } catch (err) {
    console.error('PDF export failed:', err);
    res.status(500).json({ error: 'PDF export failed' });
  }
});

app.listen(PORT, () => {
  console.log(`\n  💒 Wedding invitation running at http://localhost:${PORT}\n`);
  console.log(`  Admin panel: http://localhost:${PORT}/admin.html\n`);
});

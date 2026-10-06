function formatStoryParagraph(paragraph) {
  const trimmed = paragraph.trim();
  if (!trimmed) return '';

  const withEmphasis = trimmed.replace(/\*([^*\n]+)\*/g, '<em>$1</em>');

  if (withEmphasis.startsWith('> ')) {
    return `<blockquote class="story-editorial__quote"><p>${withEmphasis.slice(2)}</p></blockquote>`;
  }

  return `<p>${withEmphasis}</p>`;
}

function initOurStory(lang) {
  const isFr = lang === 'fr';
  const story = WEDDING_CONFIG.story;
  const invitationPage = isFr ? 'fr.html' : 'en.html';

  const heroImg = document.getElementById('story-hero-img');
  if (heroImg) {
    heroImg.src = WEDDING_CONFIG.storyHero || 'assets/mariage1.png';
    heroImg.alt = isFr ? 'Invitation au mariage' : 'Wedding invitation';
  }

  const detailsLink = document.getElementById('story-details-link');
  if (detailsLink) {
    detailsLink.href = `${invitationPage}#invitation`;
    detailsLink.textContent = isFr ? story.detailsLinkFr : story.detailsLinkEn;
  }

  const backLinks = document.querySelectorAll('[data-story-back]');
  backLinks.forEach((link) => {
    link.href = invitationPage;
  });

  const titleOur = document.getElementById('story-title-our');
  const titleLove = document.getElementById('story-title-love');
  const titleStory = document.getElementById('story-title-story');
  if (titleOur) titleOur.textContent = isFr ? story.titleOurFr : story.titleOurEn;
  if (titleLove) titleLove.textContent = isFr ? story.titleLoveFr : story.titleLoveEn;
  if (titleStory) titleStory.textContent = isFr ? story.titleStoryFr : story.titleStoryEn;

  const textEl = document.getElementById('story-text');
  if (textEl) {
    const rawText = isFr ? story.textFr : story.textEn;
    const paragraphs = rawText.split(/\n\n+/).filter(Boolean);
    textEl.innerHTML = paragraphs.map(formatStoryParagraph).join('');
  }

  const stripEl = document.getElementById('story-strip');
  const photos = WEDDING_CONFIG.storyStripPhotos || [];
  const placeholder = isFr ? story.placeholderFr : story.placeholderEn;

  if (stripEl) {
    stripEl.innerHTML = photos.map((src, index) => {
      const inner = src
        ? `<img src="${src}" alt="${placeholder} ${index + 1}" loading="lazy">`
        : `<span class="story-strip__placeholder">${placeholder} ${index + 1}</span>`;
      return `<div class="story-strip__frame">${inner}</div>`;
    }).join('');
  }
}

const fs = require('fs');

function githubSyncConfigured() {
  return process.env.GITHUB_SYNC === 'true' && Boolean(process.env.GITHUB_TOKEN);
}

function getRepoConfig() {
  const repo = process.env.GITHUB_REPO || 'jenka77/mariage2026';
  const [owner, repoName] = repo.split('/');
  if (!owner || !repoName) {
    throw new Error('GITHUB_REPO must be owner/repo');
  }
  return {
    owner,
    repo: repoName,
    path: process.env.GITHUB_RSVP_PATH || 'data/rsvps.json',
    branch: process.env.GITHUB_BRANCH || 'main',
  };
}

async function githubRequest(url, options = {}) {
  const token = process.env.GITHUB_TOKEN;
  const response = await fetch(url, {
    ...options,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(options.headers || {}),
    },
  });

  const text = await response.text();
  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }
  }

  if (!response.ok) {
    const message = data?.message || response.statusText || 'GitHub API error';
    const err = new Error(message);
    err.status = response.status;
    err.data = data;
    throw err;
  }

  return data;
}

function contentsApiPath(filePath) {
  return filePath.split('/').map(encodeURIComponent).join('/');
}

async function getFileMeta(cfg) {
  const url = `https://api.github.com/repos/${cfg.owner}/${cfg.repo}/contents/${contentsApiPath(cfg.path)}?ref=${encodeURIComponent(cfg.branch)}`;
  try {
    return await githubRequest(url);
  } catch (err) {
    if (err.status === 404) return null;
    throw err;
  }
}

async function pushRsvpFileToGitHub(fileContent, attempt = 0) {
  if (!githubSyncConfigured()) {
    return { ok: false, skipped: true, reason: 'GITHUB_SYNC or GITHUB_TOKEN not set' };
  }

  const cfg = getRepoConfig();
  const meta = await getFileMeta(cfg);
  const body = {
    message: process.env.GITHUB_SYNC_MESSAGE || 'Sync RSVP data from wedding site',
    content: Buffer.from(fileContent, 'utf8').toString('base64'),
    branch: cfg.branch,
  };
  if (meta?.sha) body.sha = meta.sha;

  const url = `https://api.github.com/repos/${cfg.owner}/${cfg.repo}/contents/${contentsApiPath(cfg.path)}`;
  try {
    await githubRequest(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return { ok: true, path: cfg.path, branch: cfg.branch };
  } catch (err) {
    if (err.status === 409 && attempt < 1) {
      return pushRsvpFileToGitHub(fileContent, attempt + 1);
    }
    throw err;
  }
}

async function syncRsvpFilePathToGitHub(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  JSON.parse(content);
  return pushRsvpFileToGitHub(content);
}

module.exports = {
  githubSyncConfigured,
  syncRsvpFilePathToGitHub,
};

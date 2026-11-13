/**
 * Sync the CURRENT public documentation of all three FAIRmorph repositories.
 * No submodule SHA or cross-repository access token is needed.
 *
 * Every npm run prepare-docs / build / dev fetches origin/main.
 * GitHub Actions also rebuilds automatically on a schedule.
 *
 * The portal's own src/content/docs/index.mdx and guide/* are NEVER touched.
 */
import fs from 'fs-extra';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = process.cwd();
const SOURCE_CACHE = path.join(ROOT, '.docs-upstream');
const CONTENT_ROOT = path.join(ROOT, 'src/content/docs');
const SOURCES = [
  { id: 'engine', label: 'FAIRmorph Engine', url: 'https://github.com/FAIRmorph/fairmorph-engine.git' },
  { id: 'workbench', label: 'FAIRmorph Workbench', url: 'https://github.com/FAIRmorph/fairmorph-workbench.git' },
  { id: 'validations', label: 'FAIRmorph Validations', url: 'https://github.com/FAIRmorph/fairmorph-validations.git' },
];

function git(...args) {
  return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
}

function currentCheckout(source) {
  const destination = path.join(SOURCE_CACHE, source.id);
  if (fs.existsSync(path.join(destination, '.git'))) {
    // Never trust a stale local cache: always fetch main and reset to its HEAD.
    git('-C', destination, 'fetch', '--depth=1', 'origin', 'main');
    git('-C', destination, 'checkout', '--detach', 'FETCH_HEAD');
  } else {
    fs.removeSync(destination);
    git('clone', '--depth=1', '--branch', 'main', source.url, destination);
  }
  return { root: destination, sha: git('-C', destination, 'rev-parse', 'HEAD') };
}

function collectMarkdown(root, relative = '') {
  const found = [];
  for (const entry of fs.readdirSync(path.join(root, relative), { withFileTypes: true })) {
    const next = path.posix.join(relative, entry.name);
    if (entry.isDirectory()) {
      // Do not publish vendored libraries, Git metadata, build outputs or obsolete example internals.
      if (['.git', '.github', 'node_modules', 'vendor', 'target', 'dist', 'legacy', '.venv'].includes(entry.name)) continue;
      found.push(...collectMarkdown(root, next));
    } else if (entry.isFile() && /\.md$/i.test(entry.name)) {
      found.push(next);
    }
  }
  return found.sort();
}

function publishedPath(relative) {
  // Astro Starlight section indexes come from README.md; root README is the section landing page.
  return relative.replace(/(^|\/)README\.md$/i, '$1index.md');
}

function titleFor(text, source, relative) {
  if (relative === 'README.md') return source.label;
  const heading = text.match(/^#\s+(.+)$/m)?.[1]?.trim();
  if (heading) return heading.replace(/\*\*/g, '').replace(/`/g, '');
  return path.posix.basename(relative, '.md').replace(/[-_]/g, ' ');
}

function updateLinks(text, relative, included, source) {
  return text.replace(/\]\(([^)]+)\)/g, (full, target) => {
    if (/^(https?:|mailto:|#|\/)/i.test(target)) return full;
    const [file, fragment] = target.split('#', 2);
    if (!file) return full;
    const absolute = path.posix.normalize(path.posix.join(path.posix.dirname(relative), file));
    if (included.has(absolute)) {
      const publishedTarget = publishedPath(absolute);
      const outputSelf = publishedPath(relative);
      let next = path.posix.relative(path.posix.dirname(outputSelf), publishedTarget);
      if (!next.startsWith('.')) next = './' + next;
      return '](' + next + (fragment ? '#' + fragment : '') + ')';
    }
    // Files such as LICENSE, source images and JSON contracts remain in their origin repository.
    const origin = source.url.replace(/\.git$/, '');
    return '](' + origin + '/blob/main/' + absolute + (fragment ? '#' + fragment : '') + ')';
  });
}

function ensureFrontmatter(text, title, source, sha) {
  if (/^---\r?\n/.test(text)) return text;
  const desc = 'Mirrored from ' + source.label + ' at commit ' + sha.slice(0, 12);
  return '---\ntitle: ' + JSON.stringify(title) + '\ndescription: ' + JSON.stringify(desc) + '\n---\n\n' + text;
}

fs.ensureDirSync(SOURCE_CACHE);
const revisions = {};
for (const source of SOURCES) {
  const { root, sha } = currentCheckout(source);
  const destination = path.join(CONTENT_ROOT, source.id);
  const paths = collectMarkdown(root);
  const included = new Set(paths);
  // If both docs/README.md and docs/index.md exist, prefer the longer docs README as section index.
  const outputNames = new Set();
  const selected = paths.filter(file => {
    if (file.endsWith('/index.md') && included.has(file.replace(/\/index\.md$/i, '/README.md'))) return false;
    const outputName = publishedPath(file);
    if (outputNames.has(outputName)) throw new Error('Duplicate generated slug: ' + outputName);
    outputNames.add(outputName);
    return true;
  });
  if (!selected.includes('README.md')) throw new Error(source.id + ' repository has no root README.md');
  // Remove stale pages from earlier builds after a source document is renamed/deleted.
  fs.removeSync(destination);
  for (const file of selected) {
    const output = path.join(destination, publishedPath(file));
    let text = fs.readFileSync(path.join(root, file), 'utf8');
    text = updateLinks(text, file, included, source);
    text = ensureFrontmatter(text, titleFor(text, source, file), source, sha);
    fs.ensureDirSync(path.dirname(output));
    fs.writeFileSync(output, text, 'utf8');
  }
  revisions[source.id] = { repository: source.url.replace(/\.git$/, ''), commit: sha, pages: selected.length };
  console.log('Synced ' + source.id + ': ' + selected.length + ' Markdown pages from ' + sha.slice(0, 12));
}
// Generated provenance is a build artifact, not an authored documentation page.
fs.writeFileSync(path.join(SOURCE_CACHE, 'revisions.json'), JSON.stringify(revisions, null, 2) + '\n');
console.log('Docs updated from all upstream main branches; portal-authored pages unchanged.');

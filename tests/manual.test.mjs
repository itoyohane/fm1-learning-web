import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { serveResource } from '../scripts/dev-server.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const context = vm.createContext({ window: {} });
for (const file of ['content.js', 'core.js']) vm.runInContext(readFileSync(path.join(root, 'src', file), 'utf8'), context);
const { pages, sources } = context.window.FeluccaManual;
const { parseRoute, buildSearchIndex, search, excerpt } = context.window.FeluccaCore;
const index = buildSearchIndex(pages);
const byId = new Map(pages.map((page) => [page.id, page]));

test('all chapters and sections have unique, valid routes and real source references', () => {
  assert.equal(byId.size, pages.length);
  for (const page of pages) {
    assert.match(page.id, /^[a-z][a-z0-9-]+$/);
    assert.equal(new Set(page.sections.map((section) => section.id)).size, page.sections.length);
    assert.ok(page.sources.length);
    for (const id of page.sources) assert.ok(sources[id]?.url.startsWith('https://'));
    for (const section of page.sections) {
      assert.match(section.id, /^[a-z][a-z0-9-]+$/);
      assert.ok(section.body.length > 30);
    }
  }
});

test('every course cross-link resolves to an existing chapter and section', () => {
  for (const page of pages) for (const section of page.sections) {
    for (const match of section.body.matchAll(/href="(#\/[^"]+)"/g)) {
      const route = parseRoute(match[1]);
      const target = byId.get(route.pageId);
      assert.ok(target, `${page.id}: ${match[1]}`);
      if (route.sectionId) assert.ok(target.sections.some((item) => item.id === route.sectionId), match[1]);
    }
  }
});

test('routes survive refresh, deep links and malformed fragments', () => {
  assert.equal(parseRoute('').pageId, 'quick-start');
  assert.equal(parseRoute('#/saving/save-project').sectionId, 'save-project');
  assert.equal(parseRoute('#/step-recording').pageId, 'step-recording');
  assert.equal(parseRoute('#/%E0%A4%A').pageId, 'not-found');
});

test('Chinese task queries and English controls find actionable manual sections', () => {
  const cases = [
    ['保存工程', 'saving', 'save-project'],
    ['实时录音', 'live-recording', ''],
    ['WHITE', 'scales', ''],
    ['没声音', 'troubleshooting', ''],
    ['REC', 'quick-start', 'first-loop'],
    ['CHORD ENTRY', 'step-recording', 'chord-entry'],
  ];
  for (const [query, pageId, sectionId] of cases) {
    assert.ok(search(index, query).some((item) => item.pageId === pageId && (!sectionId || item.sectionId === sectionId)), query);
  }
  assert.equal(search(index, '保存工程')[0].sectionId, 'save-project');
  assert.equal(search(index, '   ').length, 0);
  assert.equal(search(index, '<script>unknown</script>').length, 0);
  assert.equal(search(index, 'zzzzzzzzzz').length, 0);
});

test('search handles case, multiple terms, literal punctuation and bounded snippets', () => {
  assert.equal(search(index, 'rec')[0].pageId, search(index, 'REC')[0].pageId);
  assert.ok(search(index, '保存 工程').length);
  assert.doesNotThrow(() => search(index, '.*[()'));
  assert.ok(excerpt('a'.repeat(300), 'a').length <= 92);
});

test('source HTML contains no embedded executable content', () => {
  for (const page of pages) for (const section of page.sections) {
    assert.doesNotMatch(section.body, /<script|onerror=|onclick=|javascript:/i);
    for (const match of section.body.matchAll(/<a [^>]*target="_blank"[^>]*>/g)) assert.match(match[0], /noopener noreferrer/);
  }
});

test('offline entry point references only files included in the project', () => {
  const html = readFileSync(path.join(root, 'index.html'), 'utf8');
  assert.match(html, /lang="zh-CN"/);
  for (const match of html.matchAll(/(?:src|href)="\.\/([^"]+)"/g)) assert.ok(existsSync(path.join(root, match[1])), match[1]);
  assert.ok(html.indexOf('content.js') < html.indexOf('core.js'));
  assert.ok(html.indexOf('core.js') < html.indexOf('app.js'));
});

test('preview handler serves HTML, CSS and scripts without exposing private files', async () => {
  const html = await serveResource(new Request('http://local.preview/'));
  assert.equal(html.status, 200);
  assert.match(html.headers.get('content-type'), /text\/html/);
  assert.match(await html.text(), /Felucca/);
  const css = await serveResource(new Request('http://local.preview/src/styles.css'));
  assert.match(css.headers.get('content-type'), /text\/css/);
  const head = await serveResource(new Request('http://local.preview/src/content.js', { method: 'HEAD' }));
  assert.equal(head.status, 200);
  assert.equal(await head.text(), '');
  for (const resource of ['/.git/config', '/AGENTS.md', '/src/%2e%2e/%2e%2e/AGENTS.md', '/%E0%A4%A']) {
    const response = await serveResource(new Request('http://local.preview' + resource));
    assert.ok([400, 404].includes(response.status), resource);
  }
  assert.equal((await serveResource(new Request('http://local.preview/', { method: 'POST' }))).status, 405);
});

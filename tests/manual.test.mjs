import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { serveResource } from '../scripts/dev-server.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const context = vm.createContext({ window: {} });
for (const file of ['content.js', 'content-en.js', 'content-official.js', 'content-sloop.js', 'firmwares.js', 'locales.js', 'core.js']) vm.runInContext(readFileSync(path.join(root, 'src', file), 'utf8'), context);
const { pages, sources } = context.window.FeluccaManual;
const locales = context.window.FeluccaLocales;
const { parseRoute, formatRoute, firmwareDestination, formatControlLabels, formatControlText, buildSearchIndex, search, excerpt, tokenize, groupResults, moveSelection, readingAnchor, isComposing } = context.window.FeluccaCore;
const firmwares = context.window.FM1Firmwares;
const index = buildSearchIndex(pages);
const byId = new Map(pages.map((page) => [page.id, page]));

test('panel controls share Quick start keycaps in prose, tables, chords and translated text', () => {
  for (const firmwareId of Object.keys(firmwares)) {
    for (const text of ['按住 SEL + HOME，再按 REC。', 'Hold SEL + HOME, then press REC.', 'FX → SEL → SELECT → SEL', 'OCT− / OCT+ · KNOB 1–4 · PLAY/STOP']) {
      const html = formatControlText(text, firmwareId);
      assert.match(html, /<kbd>/);
      assert.equal(html.replace(/<\/?kbd>/g, ''), text);
      assert.equal(formatControlLabels(html, firmwareId), html, 'formatting must not nest keycaps');
    }
    const table = formatControlLabels('<table><tr><th>KNOB 1</th><td>HOME</td></tr></table>', firmwareId);
    assert.match(table, /<th><kbd>KNOB 1<\/kbd><\/th>/);
    assert.match(table, /<td><kbd>HOME<\/kbd><\/td>/);
  }
  assert.equal(formatControlLabels('OP1–OP6', 'official'), '<kbd>OP1–OP6</kbd>');
  assert.equal(formatControlLabels('OP1–OP6', 'sloop'), 'OP1–OP6');
});

test('control formatting preserves screen literals, existing keycaps, attributes and technical names', () => {
  const authored = '<p title="press HOME > SEL">按 <kbd>SEL</kbd>，看 <code>SCL &gt; QNT</code>。<a href="https://example.com/HOME">HOME</a></p><pre>REC + HOME</pre><code>FX LATCH = ON</code>';
  const rendered = formatControlLabels(authored);
  assert.match(rendered, /title="press HOME > SEL"/);
  assert.match(rendered, /href="https:\/\/example.com\/HOME"/);
  assert.match(rendered, /<a [^>]+><kbd>HOME<\/kbd><\/a>/);
  for (const literal of ['<kbd>SEL</kbd>', '<code>SCL &gt; QNT</code>', '<pre>REC + HOME</pre>', '<code>FX LATCH = ON</code>']) assert.ok(rendered.includes(literal));
  const names = 'B_SCL B_SEL HOME_PAGE REC_OFF VOICE FREEZE MUTE SELDOM SELECTOR';
  assert.equal(formatControlLabels(names), names);
  assert.equal(formatControlText('<img src=x> HOME & SEL'), '&lt;img src=x&gt; <kbd>HOME</kbd> &amp; <kbd>SEL</kbd>');
});

test('keycap presentation preserves every manual section, destination and search text', () => {
  for (const [firmwareId, firmware] of Object.entries(firmwares)) for (const manual of Object.values(firmware.locales)) {
    for (const page of manual.pages) for (const section of page.sections) {
      const rendered = formatControlLabels(section.body, firmwareId);
      assert.equal(rendered.replace(/<\/?kbd\b[^>]*>/g, ''), section.body.replace(/<\/?kbd\b[^>]*>/g, ''), `${firmwareId}/${page.id}/${section.id}`);
      assert.equal(formatControlLabels(rendered, firmwareId), rendered);
      assert.deepEqual([...rendered.matchAll(/href="([^"]+)"/g)].map(m => m[1]), [...section.body.matchAll(/href="([^"]+)"/g)].map(m => m[1]));
      assert.doesNotMatch(rendered, /<kbd>\s*<kbd>/);
      for (const label of rendered.matchAll(/aria-label="([^"]*)"/g)) assert.doesNotMatch(label[1], /<\/?(?:kbd|code)>/);
    }
  }
});

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
  assert.ok(html.indexOf('content-en.js') < html.indexOf('locales.js'));
  assert.ok(html.indexOf('locales.js') < html.indexOf('app.js'));
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
  for (const file of ['content-en.js', 'content-official.js', 'content-sloop.js', 'firmwares.js', 'locales.js']) {
    const response = await serveResource(new Request('http://local.preview/src/' + file));
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /javascript/);
  }
  for (const resource of ['/.git/config', '/AGENTS.md', '/src/%2e%2e/%2e%2e/AGENTS.md', '/%E0%A4%A']) {
    const response = await serveResource(new Request('http://local.preview' + resource));
    assert.ok([400, 404].includes(response.status), resource);
  }
  assert.equal((await serveResource(new Request('http://local.preview/', { method: 'POST' }))).status, 405);
});

test('both languages provide every chapter, section, and source without fallback text', () => {
  assert.equal(locales.en.pages.length, locales.zh.pages.length);
  for (const [i, original] of locales.zh.pages.entries()) {
    const english = locales.en.pages[i];
    assert.equal(english.id, original.id);
    assert.equal(JSON.stringify(english.sections.map((section) => section.id)), JSON.stringify(original.sections.map((section) => section.id)));
    assert.equal(JSON.stringify(english.sources), JSON.stringify(original.sources));
    for (const text of [english.title, english.group, english.summary, ...english.sections.flatMap((section) => [section.title, section.body])]) {
      assert.ok(text.length);
      assert.doesNotMatch(text, /[\u3400-\u9fff]/u, english.id);
    }
  }
  for (const id of Object.keys(sources)) {
    assert.equal(locales.en.sources[id].url, locales.zh.sources[id].url);
    assert.ok(locales.en.sources[id].title);
  }
});

test('English chapter cross-links and source HTML remain safe and navigable', () => {
  const englishById = new Map(locales.en.pages.map((page) => [page.id, page]));
  for (const page of locales.en.pages) for (const section of page.sections) {
    assert.doesNotMatch(section.body, /<script|onerror=|onclick=|javascript:/i);
    for (const match of section.body.matchAll(/href="(#\/[^"]+)"/g)) {
      const route = parseRoute(match[1]);
      const target = englishById.get(route.pageId);
      assert.ok(target, match[1]);
      if (route.sectionId) assert.ok(target.sections.some((item) => item.id === route.sectionId), match[1]);
    }
  }
});

test('all static interface labels have complete Chinese and English translations', () => {
  const ui = context.window.FeluccaUI;
  assert.equal(JSON.stringify(Object.keys(ui.en).sort()), JSON.stringify(Object.keys(ui.zh).sort()));
  for (const labels of Object.values(ui)) for (const value of Object.values(labels)) assert.ok(typeof value === 'string' && value.length);
  const html = readFileSync(path.join(root, 'index.html'), 'utf8');
  for (const match of html.matchAll(/data-i18n="([^"]+)"/g)) for (const labels of Object.values(ui)) assert.ok(labels[match[1]], match[1]);
});

test('bilingual searches return the selected language, including natural task queries', () => {
  const englishIndex = buildSearchIndex(locales.en.pages, locales.zh.pages);
  const chineseIndex = buildSearchIndex(locales.zh.pages, locales.en.pages);
  for (const query of ['保存工程', 'How do I save a project', 'save project']) {
    const result = search(englishIndex, query)[0];
    assert.equal(result.pageId, 'saving', query);
    assert.equal(result.sectionId, 'save-project', query);
    assert.equal(result.title, 'Save a project');
  }
  assert.equal(search(chineseIndex, 'save project')[0].title, '保存整个工程');
  assert.ok(search(englishIndex, '没声音').some((result) => result.pageId === 'troubleshooting'));
  assert.ok(search(englishIndex, 'ｒｅｃ').some((result) => result.pageId === 'live-recording'));
  assert.equal(search(englishIndex, 'how to').length, 0);
});

test('search grouping preserves every result and keyboard order within a chapter', () => {
  const matches = search(buildSearchIndex(locales.en.pages, locales.zh.pages), 'REC');
  const groups = groupResults(matches);
  assert.equal(groups.flatMap((group) => group.items).length, matches.length);
  assert.equal(new Set(groups.map((group) => group.pageId)).size, groups.length);
  for (const group of groups) {
    assert.ok(group.title);
    assert.ok(group.items.every((item) => item.pageId === group.pageId));
    assert.equal(JSON.stringify(group.items.map((item) => item.sectionId)), JSON.stringify(matches.filter((item) => item.pageId === group.pageId).map((item) => item.sectionId)));
  }
});

test('keyboard selection wraps, handles empty results, and ignores IME confirmation', () => {
  assert.equal(moveSelection(-1, 1, 5), 0);
  assert.equal(moveSelection(-1, -1, 5), 4);
  assert.equal(moveSelection(4, 1, 5), 0);
  assert.equal(moveSelection(0, -1, 5), 4);
  assert.equal(moveSelection(0, 1, 1), 0);
  assert.equal(moveSelection(0, 1, 0), -1);
  assert.equal(isComposing({ key: 'Enter', isComposing: true }), true);
  assert.equal(isComposing({ key: 'Enter', keyCode: 229 }), true);
  assert.equal(isComposing({ key: 'Enter', isComposing: false, keyCode: 13 }), false);
});

test('reading position is tied to a stable section and proportion, not document length', () => {
  const snapshot = readingAnchor([{ id: 'before-start', top: -100, height: 600 }, { id: 'first-sound', top: 500, height: 900 }], 140);
  assert.equal(snapshot.id, 'before-start');
  assert.equal(snapshot.fraction, 0.4);
  assert.equal(readingAnchor([{ id: 'before-start', top: 200, height: 600 }], 140), null);
  assert.equal(readingAnchor([], 140), null);
  assert.equal(readingAnchor([{ id: 'zero', top: 0, height: 0 }], 140).fraction, 1);
});

test('query normalization is repeatable and punctuation cannot become a regular expression', () => {
  const first = tokenize('保存工程');
  first.push('mutated');
  assert.ok(!tokenize('保存工程').includes('mutated'));
  assert.equal(tokenize('.*[()]').length, 0);
  assert.equal(excerpt('Start here. Save the project in slot A.', 'save project'), 'Start here. Save the project in slot A.');
});

test('firmware-qualified links override saved preferences and legacy links stay on Felucca', () => {
  for (const id of ['official', 'felucca', 'sloop']) {
    const route = parseRoute(formatRoute(id, 'saving', 'save-preset'), id === 'official' ? 'felucca' : 'official');
    assert.equal(route.firmwareId, id);
    assert.equal(route.pageId, 'saving');
    assert.equal(route.sectionId, 'save-preset');
  }
  assert.equal(parseRoute('', 'official').firmwareId, 'official');
  assert.equal(parseRoute('#/saving/save-project', 'official').firmwareId, 'felucca');
  assert.equal(parseRoute('#/quick-start', 'official').firmwareId, 'felucca');
  assert.equal(parseRoute('#/unsupported/quick-start/first-sound').firmwareId, 'unsupported');
  assert.equal(Object.hasOwn(firmwares, parseRoute('#/__proto__/quick-start/first-sound').firmwareId), false);
  assert.equal(parseRoute('#/official/%E0%A4%A', 'official').pageId, 'not-found');
  assert.equal(parseRoute('#/sloop').firmwareId, 'sloop');
  assert.equal(parseRoute('#/sloop/quick-start', 'official').pageId, 'quick-start');
});

test('firmware switching restores a valid previous location or a matching chapter', () => {
  const official = firmwares.official.locales.zh.pages;
  const current = parseRoute('#/felucca/controls/gestures');
  assert.equal(firmwareDestination('official', current, official, null), '#/official/controls/gestures');
  assert.equal(firmwareDestination('official', current, official, '#/official/effects/order'), '#/official/effects/order');
  assert.equal(firmwareDestination('official', current, official, '#/official/effects/removed'), '#/official/effects');
  assert.equal(firmwareDestination('official', current, official, '#/official/removed/removed'), '#/official/quick-start');
  assert.equal(firmwareDestination('official', current, official, '#/felucca/drums'), '#/official/controls/gestures');
  assert.equal(firmwareDestination('official', parseRoute('#/felucca/live-recording/record'), official, null), '#/official/quick-start');
  const sloop = firmwares.sloop.locales.zh.pages;
  assert.equal(firmwareDestination('sloop', current, sloop, '#/sloop/song/chain'), '#/sloop/song/chain');
  assert.equal(firmwareDestination('sloop', current, sloop, null), '#/sloop/controls/gestures');
});

test('Felucca, SLOOP and stock guides provide complete translations, links and scoped sources', () => {
  assert.deepEqual(Object.keys(firmwares).sort(), ['felucca', 'official', 'sloop']);
  for (const [firmwareId, firmware] of Object.entries(firmwares)) {
    assert.equal(firmware.id, firmwareId);
    const zh = firmware.locales.zh;
    const en = firmware.locales.en;
    assert.equal(JSON.stringify(zh.pages.map((page) => page.id)), JSON.stringify(en.pages.map((page) => page.id)));
    for (const language of ['zh', 'en']) {
      const manual = firmware.locales[language];
      const lookup = new Map(manual.pages.map((page) => [page.id, page]));
      assert.equal(lookup.size, manual.pages.length);
      for (const [i, page] of manual.pages.entries()) {
        assert.equal(JSON.stringify(page.sections.map((section) => section.id)), JSON.stringify(zh.pages[i].sections.map((section) => section.id)));
        assert.equal(new Set(page.sections.map((section) => section.id)).size, page.sections.length);
        assert.ok(page.sources.length);
        for (const id of page.sources) {
          const source = manual.sources[id];
          assert.ok(source?.title, `${firmwareId}/${page.id}/${id}`);
          if (firmwareId === 'official') {
            assert.equal(source.document, 'FM-1-manual.pdf');
            assert.equal(source.url, undefined);
            assert.ok(source.pages.every((number) => Number.isInteger(number) && number >= 1 && number <= 31));
          } else assert.match(source.url, /^https:\/\//);
        }
        for (const section of page.sections) {
          assert.match(section.id, /^[a-z][a-z0-9-]+$/);
          assert.ok(section.body.length > 30);
          assert.doesNotMatch(section.body, /<script|onerror=|onclick=|javascript:/i);
          if (language === 'en') for (const text of [page.title, page.summary, section.title, section.body]) assert.doesNotMatch(text, /[\u3400-\u9fff]/u);
          for (const match of section.body.matchAll(/href="(#\/[^\"]+)"/g)) {
            const route = parseRoute(match[1]);
            const target = lookup.get(route.pageId);
            assert.equal(route.firmwareId, firmwareId, match[1]);
            assert.ok(target, match[1]);
            if (route.sectionId) assert.ok(target.sections.some((item) => item.id === route.sectionId), match[1]);
          }
        }
      }
      const searchIndex = buildSearchIndex(manual.pages, firmware.locales[language === 'zh' ? 'en' : 'zh'].pages);
      for (const suggestion of firmware.suggestions) assert.ok(searchIndex.some((item) => `${item.pageId}/${item.sectionId}` === suggestion), suggestion);
    }
  }
});

test('SLOOP search finds its own recording and performance instructions in both languages', () => {
  for (const language of ['zh', 'en']) {
    const manual = firmwares.sloop.locales[language];
    const alternate = firmwares.sloop.locales[language === 'zh' ? 'en' : 'zh'];
    const sloopIndex = buildSearchIndex(manual.pages, alternate.pages);
    for (const [query, pageId, sectionId] of [
      ['自由录音', 'live-recording', 'free-take'], ['free take', 'live-recording', 'free-take'],
      ['参数锁', 'step-recording', 'locks'], ['MIDI LEARN', 'midi', 'learn'],
      ['USB 音频', 'midi', 'usb-audio'], ['保存四轨循环', 'saving', 'save-project'],
    ]) assert.ok(search(sloopIndex, query).some((result) => result.pageId === pageId && result.sectionId === sectionId), `${language}: ${query}`);
    assert.equal(search(sloopIndex, '双击保持').length, 0);
    assert.equal(search(sloopIndex, 'hugelton').length, 0);
    assert.ok(Object.values(manual.sources).every((source) => source.url.includes('isod89')));
  }
});

test('SLOOP retains verified 2.6 operations instead of inheriting Felucca or 2.7 controls', () => {
  const sloop = firmwares.sloop.locales.zh;
  const body = (pageId, sectionId) => sloop.pages.find((page) => page.id === pageId).sections.find((item) => item.id === sectionId).body;
  assert.equal(sloop.version, '2.6');
  assert.equal(sloop.checkedAt, '2026-10-28');
  assert.match(body('controls', 'gestures'), /按住功能键 \+ 短按 HOME/);
  assert.doesNotMatch(body('controls', 'gestures'), /双击/);
  assert.match(body('live-recording', 'free-take'), /下一个第一拍/);
  assert.match(body('step-recording', 'detail'), /VEL 1–127/);
  assert.match(body('saving', 'save-project'), /PROJECT/);
  assert.match(body('presets', 'engine-list'), /DIGITAL/);
  assert.doesNotMatch(body('presets', 'engine-list'), /SLICE/);
  assert.match(body('sources', 'version'), /GUIDE.md 已标为 2.7/);
});

test('Felucca uses the physical SEL label while preserving screen names and routing values', () => {
  for (const language of ['zh', 'en']) {
    const manual = firmwares.felucca.locales[language];
    const body = (page, section) => manual.pages.find(p => p.id === page).sections.find(s => s.id === section).body;
    assert.match(body('controls', 'gestures'), /<kbd>SEL<\/kbd>/);
    assert.match(body('scales', 'white'), /SEL/);
    assert.match(body('scales', 'white'), /<code>SCL<\/code>/);
    assert.match(body('shortcuts', 'buttons'), /<kbd>SEL<\/kbd>/);
    assert.match(body('midi', 'midi-channel'), /<code>SEL<\/code>/);
    assert.match(body('midi', 'midi-channel'), /CH5-8 \/ CH9-12 \/ CH13-16/);
    assert.match(body('midi', 'midi-channel'), /OMNI/);
    for (const page of manual.pages) for (const section of page.sections) {
      assert.doesNotMatch(section.body, /<kbd>SCL<\/kbd>|(?:短按|长按|双击|Tap|Hold) SCL/);
    }
    assert.match(manual.sources.input.url, /\/v1\.6\.1\//);
    assert.equal(manual.version, '1.6.1');
  }
});

test('reviewed instructions retain recording prerequisites and separate firmware backup scopes', () => {
  const body = (firmware, page, section) => firmwares[firmware].locales.zh.pages.find(p => p.id === page).sections.find(s => s.id === section).body;
  assert.match(body('felucca', 'modulation', 'locks'), /停止播放并短按 REC 启用步进输入/);
  assert.match(body('felucca', 'saving', 'load-backup'), /备份不包含 FM6 外部音色库/);
  assert.match(body('felucca', 'step-recording', 'chord-entry'), /单音模式只保留一个音/);
  assert.match(body('sloop', 'presets', 'choose'), /KNOB 2/);
  assert.match(body('sloop', 'sources', 'version'), /d30d655/);
  assert.match(firmwares.sloop.locales.zh.sources.guide.url, /d30d6553353373cf5506b9ed285fc4a2aa0c30ef/);
  assert.match(body('official', 'controls', 'gestures'), /<kbd>PIT<\/kbd>/);
  assert.doesNotMatch(body('official', 'shortcuts', 'buttons'), /OCT±/);
});

test('stock bilingual search resolves its own tasks without exposing Felucca-only chapters', () => {
  for (const language of ['zh', 'en']) {
    const manual = firmwares.official.locales[language];
    const other = firmwares.official.locales[language === 'zh' ? 'en' : 'zh'];
    const stockIndex = buildSearchIndex(manual.pages, other.pages);
    for (const [query, pageId, sectionId] of [['保存当前修改', 'saving', 'save-preset'], ['Save edits', 'saving', 'save-preset'], ['步进音序', 'step-recording', ''], ['BLE MIDI', 'midi', 'connect'], ['长音', 'step-recording', 'long-rest']]) {
      assert.ok(search(stockIndex, query).some((result) => result.pageId === pageId && (!sectionId || result.sectionId === sectionId)), `${language}: ${query}`);
    }
    assert.equal(search(stockIndex, 'CHORD ENTRY').length, 0);
    assert.ok(search(stockIndex, 'REC').every((result) => !['live-recording', 'drums', 'tracks'].includes(result.pageId)));
    assert.ok(!stockIndex.some((item) => item.sectionId === 'save-project'));
  }
});

test('stock instructions preserve key differences established by the supplied manual', () => {
  const stock = new Map(firmwares.official.locales.zh.pages.map((page) => [page.id, page]));
  const body = (pageId, sectionId) => stock.get(pageId).sections.find((item) => item.id === sectionId).body;
  assert.match(body('controls', 'knobs'), /32 种 FM 算法/);
  assert.match(body('saving', 'save-preset'), /长按/);
  assert.match(body('step-recording', 'record'), /先开 SEQ/);
  assert.match(body('step-recording', 'pages'), /PRESETS 无效/);
  assert.match(body('settings', 'reset'), /上一次导入/);
  assert.match(body('midi', 'audio'), /没有确认 USB 音频/);
  assert.match(body('modulation', 'envelope'), /再次按 ENV 会关闭/);
  assert.equal(firmwares.official.locales.zh.manualRevision, '2026-08-10');
  assert.equal(firmwares.official.locales.zh.version, undefined);
});

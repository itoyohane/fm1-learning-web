(() => {
  const segmenter = typeof Intl.Segmenter === 'function' ? new Intl.Segmenter('zh-CN', { granularity: 'word' }) : null;
  let tokenCacheText;
  let tokenCacheValue = [];
  function parseRoute(hash, defaultFirmware = 'felucca') {
    try {
      const parts = decodeURIComponent(hash.replace(/^#\/?/, '')).split('/');
      if (!parts[0]) return { firmwareId: defaultFirmware, pageId: 'quick-start', sectionId: '' };
      if (['felucca', 'official'].includes(parts[0]) || parts.length > 2) {
        return { firmwareId: parts[0], pageId: parts[1] || 'quick-start', sectionId: parts[2] || '' };
      }
      // Existing shared links always refer to Felucca, even with a saved stock-firmware preference.
      return { firmwareId: 'felucca', pageId: parts[0], sectionId: parts[1] || '' };
    } catch {
      return { firmwareId: defaultFirmware, pageId: 'not-found', sectionId: '' };
    }
  }
  function formatRoute(firmwareId, pageId = 'quick-start', sectionId = '') {
    return '#/' + [firmwareId, pageId, ...(sectionId ? [sectionId] : [])].map(encodeURIComponent).join('/');
  }
  function firmwareDestination(firmwareId, current, pages, savedHash) {
    const saved = savedHash ? parseRoute(savedHash) : null;
    const candidate = saved?.firmwareId === firmwareId ? saved : current;
    const page = pages.find((item) => item.id === candidate?.pageId) || pages[0];
    const sectionId = page.sections.some((item) => item.id === candidate?.sectionId) ? candidate.sectionId : '';
    return formatRoute(firmwareId, page.id, sectionId);
  }
  function plainText(html) {
    return html.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
  }
  function normalize(text) {
    return text.normalize('NFKC').toLocaleLowerCase().replace(/\s+/g, ' ').trim();
  }
  function buildSearchIndex(pages, alternatePages = []) {
    const alternate = new Map(alternatePages.map((page) => [page.id, page]));
    return pages.flatMap((page) => {
      const other = alternate.get(page.id);
      const items = [
        { pageId: page.id, sectionId: '', title: page.title, chapter: page.group, text: page.summary, keywords: page.keywords, alternateTitle: other?.title || '', alternateText: other?.summary || '' },
        ...page.sections.map((section) => {
          const translated = other?.sections.find((item) => item.id === section.id);
          return { pageId: page.id, sectionId: section.id, title: section.title, chapter: page.title, text: plainText(section.body), keywords: page.keywords, alternateTitle: translated?.title || '', alternateText: translated ? plainText(translated.body) : '' };
        }),
      ];
      return items.map((item) => ({
        ...item, groupTitle: page.title,
        fields: [item.title, item.chapter, item.text, item.keywords, item.alternateTitle, item.alternateText, other?.keywords || ''].map(normalize),
      }));
    });
  }
  function tokenize(query) {
    const text = normalize(query);
    if (text === tokenCacheText) return [...tokenCacheValue];
    let tokens;
    if (segmenter) {
      tokens = [...segmenter.segment(text)]
        .filter((part) => part.isWordLike).map((part) => part.segment);
    } else {
      tokens = text.split(/\s+/).filter(Boolean);
    }
    const filler = new Set(['how', 'to', 'do', 'i', 'the', 'a', 'an', 'my', 'please', '如何', '怎么', '怎样', '请']);
    tokenCacheText = text;
    tokenCacheValue = [...new Set(tokens.filter((token) => !filler.has(token)))];
    return [...tokenCacheValue];
  }
  function search(index, query, limit = Infinity) {
    const tokens = tokenize(query);
    if (!tokens.length) return [];
    return index.map((item, order) => {
      const [title, chapter, text, keywords, alternateTitle, alternateText, alternateKeywords] = item.fields;
      let score = 0;
      for (const token of tokens) {
        if (![title, text, keywords, chapter, alternateTitle, alternateText, alternateKeywords].some((value) => value.includes(token))) return null;
        score += title.includes(token) ? 40 : 0;
        score += chapter.includes(token) ? 12 : 0;
        score += text.includes(token) ? 5 : 0;
        score += keywords.includes(token) ? 2 : 0;
        score += alternateTitle.includes(token) ? 24 : 0;
        score += alternateText.includes(token) ? 3 : 0;
        score += alternateKeywords.includes(token) ? 1 : 0;
      }
      return { ...item, score, order };
    }).filter(Boolean).sort((a, b) => b.score - a.score || a.order - b.order).slice(0, limit);
  }
  function excerpt(text, query, length = 90) {
    const tokens = tokenize(query);
    const matches = tokens.map((token) => normalize(text).indexOf(token)).filter((hit) => hit >= 0);
    const hit = matches.length ? Math.min(...matches) : 0;
    const start = Math.max(0, hit - 18);
    return (start ? '…' : '') + text.slice(start, start + length) + (text.length > start + length ? '…' : '');
  }
  function groupResults(results) {
    const groups = new Map();
    for (const item of results) {
      if (!groups.has(item.pageId)) groups.set(item.pageId, { pageId: item.pageId, title: item.groupTitle, items: [] });
      groups.get(item.pageId).items.push(item);
    }
    return [...groups.values()];
  }
  function moveSelection(current, direction, count) {
    if (!count) return -1;
    if (current < 0) return direction < 0 ? count - 1 : 0;
    return ((current + direction) % count + count) % count;
  }
  function readingAnchor(sections, viewportTop) {
    const section = [...sections].reverse().find((item) => item.top <= viewportTop);
    if (!section) return null;
    return { id: section.id, fraction: Math.min(1, Math.max(0, (viewportTop - section.top) / Math.max(1, section.height))) };
  }
  function isComposing(event) { return Boolean(event.isComposing || event.keyCode === 229); }
  window.FeluccaCore = Object.freeze({ parseRoute, formatRoute, firmwareDestination, plainText, normalize, buildSearchIndex, tokenize, search, excerpt, groupResults, moveSelection, readingAnchor, isComposing });
})();

(() => {
  function parseRoute(hash) {
    try {
      const parts = decodeURIComponent(hash.replace(/^#\/?/, '')).split('/');
      return { pageId: parts[0] || 'quick-start', sectionId: parts[1] || '' };
    } catch {
      return { pageId: 'not-found', sectionId: '' };
    }
  }
  function plainText(html) {
    return html.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
  }
  function buildSearchIndex(pages) {
    return pages.flatMap((page) => [
      { pageId: page.id, sectionId: '', title: page.title, chapter: page.group, text: page.summary, keywords: page.keywords },
      ...page.sections.map((section) => ({ pageId: page.id, sectionId: section.id, title: section.title, chapter: page.title, text: plainText(section.body), keywords: page.keywords })),
    ]);
  }
  function tokenize(query) {
    const text = query.trim().toLocaleLowerCase();
    if (typeof Intl.Segmenter === 'function') {
      return [...new Intl.Segmenter('zh-CN', { granularity: 'word' }).segment(text)]
        .filter((part) => part.isWordLike).map((part) => part.segment);
    }
    return text.split(/\s+/).filter(Boolean);
  }
  function search(index, query, limit = 14) {
    const tokens = tokenize(query);
    if (!tokens.length) return [];
    return index.map((item, order) => {
      const title = item.title.toLocaleLowerCase();
      const text = item.text.toLocaleLowerCase();
      const keywords = item.keywords.toLocaleLowerCase();
      const chapter = item.chapter.toLocaleLowerCase();
      let score = 0;
      for (const token of tokens) {
        if (![title, text, keywords, chapter].some((value) => value.includes(token))) return null;
        score += title.includes(token) ? 40 : 0;
        score += chapter.includes(token) ? 12 : 0;
        score += text.includes(token) ? 5 : 0;
        score += keywords.includes(token) ? 2 : 0;
      }
      return { ...item, score, order };
    }).filter(Boolean).sort((a, b) => b.score - a.score || a.order - b.order).slice(0, limit);
  }
  function excerpt(text, query, length = 90) {
    const token = query.trim().toLocaleLowerCase().split(/\s+/)[0] || '';
    const hit = text.toLocaleLowerCase().indexOf(token);
    const start = Math.max(0, hit - 18);
    return (start ? '…' : '') + text.slice(start, start + length) + (text.length > start + length ? '…' : '');
  }
  window.FeluccaCore = Object.freeze({ parseRoute, plainText, buildSearchIndex, tokenize, search, excerpt });
})();

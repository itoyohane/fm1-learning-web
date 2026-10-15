(() => {
  'use strict';
  const { pages, sources } = window.FeluccaManual;
  const { parseRoute, buildSearchIndex, tokenize, search, excerpt } = window.FeluccaCore;
  const byId = new Map(pages.map((page) => [page.id, page]));
  const $ = (id) => document.getElementById(id);
  const searchIndex = buildSearchIndex(pages);
  const dialog = $('search-dialog');
  let currentPage = '';
  let observer;
  let results = [];
  let selectedResult = -1;
  let searchOpener;

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function routeHref(pageId, sectionId = '') {
    return `#/${pageId}${sectionId ? `/${sectionId}` : ''}`;
  }
  function renderChapters() {
    const nav = $('chapter-nav');
    let groupName = '';
    let group;
    for (const page of pages) {
      if (page.group !== groupName) {
        groupName = page.group;
        group = element('section', 'nav-group');
        group.append(element('h2', 'nav-group-title', groupName));
        nav.append(group);
      }
      const anchor = element('a', 'chapter-link', page.title);
      anchor.href = routeHref(page.id);
      anchor.dataset.page = page.id;
      group.append(anchor);
    }
  }
  function setMenu(open) {
    $('menu-toggle').setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
    $('sidebar-backdrop').hidden = !open;
    if (open) {
      $('sidebar').removeAttribute('inert');
      ($('sidebar').querySelector('[aria-current="page"]') || $('close-menu')).focus();
    } else if (window.matchMedia('(max-width: 760px)').matches) $('sidebar').setAttribute('inert', '');
  }
  function syncSidebar() {
    setMenu(false);
    if (!window.matchMedia('(max-width: 760px)').matches) $('sidebar').removeAttribute('inert');
  }
  function setOutlineActive(id) {
    $('table-of-contents').querySelectorAll('a').forEach((anchor) => {
      if (anchor.dataset.section === id) anchor.setAttribute('aria-current', 'location');
      else anchor.removeAttribute('aria-current');
    });
  }
  function observeSections(page) {
    observer?.disconnect();
    if (!('IntersectionObserver' in window)) return;
    observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible.length) setOutlineActive(visible[0].target.id);
    }, { rootMargin: '-130px 0px -55% 0px', threshold: 0 });
    page.sections.forEach((section) => observer.observe($(section.id)));
  }
  function renderArticle(page) {
    const article = $('article');
    article.replaceChildren(element('h1', '', page.title), element('p', 'page-summary', page.summary));
    for (const section of page.sections) {
      const container = element('section', 'article-section');
      container.id = section.id;
      const heading = element('h2');
      const anchor = element('a', 'heading-link', section.title);
      anchor.href = routeHref(page.id, section.id);
      heading.append(anchor);
      const body = element('div', 'section-body');
      // Only locally authored content enters this sink; never search queries.
      body.innerHTML = section.body;
      container.append(heading, body);
      article.append(container);
    }
    const reference = element('section', 'source-references');
    reference.append(element('h2', '', '本页来源'));
    const sourceList = element('ul');
    for (const sourceId of page.sources) {
      const source = sources[sourceId];
      const item = element('li');
      const anchor = element('a', '', source.title);
      anchor.href = source.url;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      item.append(anchor);
      sourceList.append(item);
    }
    reference.append(sourceList);
    article.append(reference);
  }
  function renderPageNavigation(page) {
    const index = pages.indexOf(page);
    const nav = $('page-navigation');
    nav.replaceChildren();
    for (const [adjacent, label, className] of [[pages[index - 1], '上一节', 'previous-page'], [pages[index + 1], '下一节', 'next-page']]) {
      if (!adjacent) { nav.append(element('span')); continue; }
      const anchor = element('a', className);
      anchor.href = routeHref(adjacent.id);
      anchor.append(element('span', 'pagination-label', label), element('span', 'pagination-title', adjacent.title));
      nav.append(anchor);
    }
  }
  function renderRoute(initial = false) {
    const { pageId, sectionId } = parseRoute(location.hash);
    const page = byId.get(pageId);
    const changed = currentPage !== pageId;
    if (!page) {
      currentPage = pageId;
      observer?.disconnect();
      $('article').replaceChildren(element('h1', '', '未找到章节'), element('p', '', '请从左侧目录选择，或搜索手册。'));
      $('breadcrumb').textContent = '学习手册';
      $('table-of-contents').replaceChildren();
      $('page-navigation').replaceChildren();
      document.title = '未找到章节 · Felucca 学习手册';
    } else if (changed) {
      currentPage = pageId;
      document.title = `${page.title} · Felucca 学习手册`;
      $('breadcrumb').textContent = `${page.group} / ${page.title}`;
      renderArticle(page);
      renderPageNavigation(page);
      const outline = $('table-of-contents');
      outline.replaceChildren();
      for (const section of page.sections) {
        const anchor = element('a', '', section.title);
        anchor.href = routeHref(page.id, section.id);
        anchor.dataset.section = section.id;
        outline.append(anchor);
      }
      observeSections(page);
      setOutlineActive(sectionId || page.sections[0].id);
    }
    document.querySelectorAll('[data-page]').forEach((anchor) => {
      if (anchor.dataset.page === pageId) anchor.setAttribute('aria-current', 'page');
      else anchor.removeAttribute('aria-current');
    });
    document.querySelectorAll('[data-tab]').forEach((anchor) => {
      const active = anchor.dataset.tab === (pageId === 'shortcuts' ? 'shortcuts' : pageId === 'sources' ? 'sources' : 'manual');
      if (active) anchor.setAttribute('aria-current', 'page');
      else anchor.removeAttribute('aria-current');
    });
    setMenu(false);
    if (changed && !initial) $('main-content').focus({ preventScroll: true });
    requestAnimationFrame(() => {
      const target = page?.sections.some((section) => section.id === sectionId) ? $(sectionId) : null;
      if (target) { target.scrollIntoView({ block: 'start' }); setOutlineActive(sectionId); }
      else if (changed || !initial) window.scrollTo({ top: 0, behavior: 'instant' });
    });
  }
  function highlight(node, text, query) {
    const tokens = tokenize(query);
    if (!tokens.length) { node.textContent = text; return; }
    const escaped = tokens.map((token) => token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const pattern = new RegExp(`(${escaped.join('|')})`, 'gi');
    let last = 0;
    for (const match of text.matchAll(pattern)) {
      node.append(document.createTextNode(text.slice(last, match.index)), element('mark', '', match[0]));
      last = match.index + match[0].length;
    }
    node.append(document.createTextNode(text.slice(last)));
  }
  function updateSearch() {
    const query = $('search-input').value;
    const container = $('search-results');
    container.replaceChildren();
    selectedResult = -1;
    results = search(searchIndex, query);
    $('search-status').textContent = !query.trim() ? '输入操作名称或屏幕上的英文。' : results.length ? `显示 ${results.length} 条相关内容` : '没有找到相关内容，试试“保存”“REC”或“音色”。';
    for (const [index, result] of results.entries()) {
      const anchor = element('a', 'search-result');
      anchor.id = `search-result-${index}`;
      anchor.href = routeHref(result.pageId, result.sectionId);
      anchor.append(element('span', 'result-chapter', result.chapter));
      const title = element('strong', 'result-title');
      const description = element('span', 'result-description');
      highlight(title, result.title, query);
      highlight(description, excerpt(result.text, query), query);
      anchor.append(title, description);
      anchor.addEventListener('click', () => dialog.close());
      container.append(anchor);
    }
  }
  function selectResult(index) {
    const anchors = [...$('search-results').querySelectorAll('a')];
    anchors.forEach((anchor) => anchor.classList.remove('is-selected'));
    selectedResult = (index + anchors.length) % anchors.length;
    const selected = anchors[selectedResult];
    selected.classList.add('is-selected');
    selected.scrollIntoView({ block: 'nearest' });
    $('search-status').textContent = `第 ${selectedResult + 1} 条，共 ${anchors.length} 条：${results[selectedResult].title}`;
  }
  function openSearch() {
    if (dialog.open) return;
    searchOpener = document.activeElement;
    dialog.showModal();
    $('search-input').value = '';
    updateSearch();
    $('search-input').focus();
  }
  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    $('theme-toggle').textContent = theme === 'dark' ? '浅色模式' : '深色模式';
    $('theme-toggle').setAttribute('aria-pressed', String(theme === 'dark'));
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#171721' : '#ffffff';
  }
  try { applyTheme(localStorage.getItem('felucca-theme') === 'dark' ? 'dark' : 'light'); }
  catch { applyTheme('light'); }
  $('theme-toggle').addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(theme);
    try { localStorage.setItem('felucca-theme', theme); } catch { /* Storage may be disabled for file URLs. */ }
  });
  $('open-search').addEventListener('click', openSearch);
  $('close-search').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => { if (searchOpener?.isConnected) searchOpener.focus(); });
  $('search-input').addEventListener('input', updateSearch);
  $('search-input').addEventListener('keydown', (event) => {
    if (!results.length) return;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      selectResult(selectedResult === -1 && direction === -1 ? results.length - 1 : selectedResult + direction);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      $('search-results').querySelectorAll('a')[Math.max(0, selectedResult)].click();
    }
  });
  $('menu-toggle').addEventListener('click', () => setMenu($('menu-toggle').getAttribute('aria-expanded') !== 'true'));
  for (const id of ['close-menu', 'sidebar-backdrop']) $(id).addEventListener('click', () => { setMenu(false); $('menu-toggle').focus(); });
  $('print-page').addEventListener('click', () => window.print());
  document.querySelector('.skip-link').addEventListener('click', (event) => {
    event.preventDefault();
    $('main-content').focus();
  });
  document.addEventListener('keydown', (event) => {
    const input = event.target.closest('input, textarea, select, [contenteditable="true"]');
    if (((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') || (event.key === '/' && !input && !dialog.open)) { event.preventDefault(); openSearch(); }
    if (event.key === 'Escape' && document.body.classList.contains('menu-open')) { setMenu(false); $('menu-toggle').focus(); }
    if (event.key === 'Tab' && document.body.classList.contains('menu-open')) {
      const nodes = [...$('sidebar').querySelectorAll('a, button')];
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  document.addEventListener('click', (event) => {
    const anchor = event.target.closest('a[href^="#/"]');
    if (anchor && anchor.hash === location.hash) {
      event.preventDefault();
      renderRoute();
      $('main-content').focus({ preventScroll: true });
    }
  });
  window.addEventListener('hashchange', () => renderRoute());
  window.matchMedia('(max-width: 760px)').addEventListener('change', syncSidebar);
  renderChapters();
  renderRoute(true);
  syncSidebar();
})();

(() => {
  'use strict';
  const firmwares = window.FM1Firmwares;
  const { parseRoute, formatRoute, firmwareDestination, buildSearchIndex, tokenize, search, excerpt, groupResults, moveSelection, readingAnchor, isComposing } = window.FeluccaCore;
  const $ = (id) => document.getElementById(id);
  const dialog = $('search-dialog');
  const input = $('search-input');
  const storage = {
    get(key) { try { return localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch { /* Offline/private browsing may restrict storage. */ } },
  };
  let language = storage.get('felucca-language') === 'en' ? 'en' : 'zh';
  let firmwareId = Object.hasOwn(firmwares, storage.get('fm1-firmware')) ? storage.get('fm1-firmware') : 'felucca';
  let theme = storage.get('felucca-theme') === 'dark' ? 'dark' : 'light';
  let pages, sources, byId, searchIndex;
  let currentPage = '';
  let renderedLanguage = '';
  let renderedFirmware = '';
  let observer;
  let results = [];
  let selectedResult = -1;
  let searchOpener;
  let searchFrame = 0;
  let composing = false;
  let closingForNavigation = false;
  let pointerStartedOutside = false;

  function firmware() { return firmwares[firmwareId]; }
  function t(key) { return window.FeluccaUI[language][key].replace('{firmware}', firmware().labels[language]); }
  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function routeHref(pageId, sectionId = '') { return formatRoute(firmwareId, pageId, sectionId); }
  function resultKey(result) { return result ? routeHref(result.pageId, result.sectionId) : ''; }
  function setLocaleData() {
    const locales = firmware().locales;
    ({ pages, sources } = locales[language]);
    byId = new Map(pages.map((page) => [page.id, page]));
    searchIndex = buildSearchIndex(pages, locales[language === 'zh' ? 'en' : 'zh'].pages);
  }
  function applyTheme() {
    document.documentElement.dataset.theme = theme;
    $('theme-toggle').textContent = t(theme === 'dark' ? 'light' : 'dark');
    $('theme-toggle').setAttribute('aria-pressed', String(theme === 'dark'));
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#171721' : '#ffffff';
  }
  function renderUI() {
    document.documentElement.lang = t('lang');
    document.querySelectorAll('[data-i18n]').forEach((node) => { node.textContent = t(node.dataset.i18n); });
    document.querySelector('meta[name="description"]').content = t('description');
    document.querySelector('.brand').setAttribute('aria-label', t('home'));
    document.querySelector('.top-nav').setAttribute('aria-label', t('nav'));
    document.querySelector('.page-outline').setAttribute('aria-label', t('outline'));
    for (const [id, key] of [['sidebar', 'chapterNav'], ['chapter-nav', 'chapters'], ['page-navigation', 'adjacent'], ['table-of-contents', 'sections'], ['search-results', 'resultList']]) $(id).setAttribute('aria-label', t(key));
    $('language-select').value = language;
    const select = $('firmware-select');
    select.replaceChildren(...Object.values(firmwares).map((item) => {
      const option = element('option', '', item.labels[language]);
      option.value = item.id;
      return option;
    }));
    select.value = firmwareId;
    $('firmware-context').textContent = t('context');
    $('firmware-baseline').textContent = firmware().baselines[language];
    $('firmware-checked').textContent = t('checked');
    const source = $('firmware-source');
    const sourceLabel = firmware().sourceLabels[language];
    source.setAttribute('aria-label', sourceLabel);
    source.title = sourceLabel;
    source.href = firmware().sourceUrl;
    $('github-source-icon').toggleAttribute('hidden', firmware().sourceIcon !== 'github');
    $('official-source-icon').hidden = firmware().sourceIcon !== 'official';
    if (firmware().sourceIcon === 'official' && !$('official-logo').getAttribute('src')) $('official-logo').src = firmware().sourceIconUrl;
    document.querySelector('.brand').href = routeHref('quick-start');
    document.querySelectorAll('[data-tab]').forEach((anchor) => { anchor.href = routeHref(anchor.dataset.tab === 'manual' ? 'quick-start' : anchor.dataset.tab); });
    $('open-search').setAttribute('aria-label', t('search'));
    $('open-search').setAttribute('aria-keyshortcuts', 'Control+k Meta+k');
    input.placeholder = t('searchPlaceholder');
    $('clear-search').setAttribute('aria-label', t('clearLabel'));
    applyTheme();
  }
  function renderChapters() {
    const nav = $('chapter-nav');
    nav.replaceChildren();
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
      // Only trusted, locally authored chapter HTML enters this sink.
      body.innerHTML = section.body;
      // Legacy authored Felucca links are rendered with an explicit firmware namespace.
      body.querySelectorAll('a[href^="#/"]').forEach((anchor) => {
        const route = parseRoute(anchor.getAttribute('href'));
        anchor.href = formatRoute(firmwareId, route.pageId, route.sectionId);
      });
      container.append(heading, body);
      article.append(container);
    }
    if (firmware().showPageSources) {
      const reference = element('section', 'source-references');
      reference.append(element('h2', '', t('pageSources')));
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
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) article.animate?.([{ opacity: 0.65 }, { opacity: 1 }], { duration: 140, easing: 'ease-out' });
  }
  function renderPageNavigation(page) {
    const index = pages.indexOf(page);
    const nav = $('page-navigation');
    nav.replaceChildren();
    for (const [adjacent, label, className] of [[pages[index - 1], t('previous'), 'previous-page'], [pages[index + 1], t('next'), 'next-page']]) {
      if (!adjacent) { nav.append(element('span')); continue; }
      const anchor = element('a', className);
      anchor.href = routeHref(adjacent.id);
      anchor.append(element('span', 'pagination-label', label), element('span', 'pagination-title', adjacent.title));
      nav.append(anchor);
    }
  }
  function renderRoute({ initial = false, scroll = true, focus = true } = {}) {
    const route = parseRoute(location.hash, firmwareId);
    const knownFirmware = Object.hasOwn(firmwares, route.firmwareId);
    // Give the initial history entry an identity before a firmware switch changes preferences.
    if (!location.hash || location.hash === '#/') history.replaceState(null, '', formatRoute(route.firmwareId, route.pageId, route.sectionId));
    if (knownFirmware && route.firmwareId !== firmwareId) {
      firmwareId = route.firmwareId;
      storage.set('fm1-firmware', firmwareId);
      setLocaleData();
      renderUI();
      renderChapters();
      $('sidebar').scrollTop = 0;
      if (dialog.open) updateSearch();
    }
    const { pageId, sectionId } = route;
    const page = knownFirmware ? byId.get(pageId) : null;
    const changed = currentPage !== pageId || renderedLanguage !== language || renderedFirmware !== route.firmwareId;
    if (page) storage.set(`fm1-last-${firmwareId}`, routeHref(pageId, sectionId));
    if (!page) {
      observer?.disconnect();
      $('article').replaceChildren(element('h1', '', t('notFound')), element('p', '', t('notFoundHelp')));
      $('breadcrumb').textContent = t('manual');
      $('table-of-contents').replaceChildren();
      $('page-navigation').replaceChildren();
      document.title = `${t('notFound')} · ${t('title')}`;
    } else if (changed) {
      document.title = `${page.title} · ${firmware().labels[language]} · ${t('title')}`;
      $('breadcrumb').textContent = `${firmware().labels[language]} / ${page.group} / ${page.title}`;
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
    currentPage = pageId;
    renderedLanguage = language;
    renderedFirmware = route.firmwareId;
    document.querySelectorAll('[data-page]').forEach((anchor) => {
      if (page && anchor.dataset.page === pageId) anchor.setAttribute('aria-current', 'page');
      else anchor.removeAttribute('aria-current');
    });
    document.querySelectorAll('[data-tab]').forEach((anchor) => {
      const active = anchor.dataset.tab === (pageId === 'shortcuts' ? 'shortcuts' : pageId === 'sources' ? 'sources' : 'manual');
      if (active) anchor.setAttribute('aria-current', 'page');
      else anchor.removeAttribute('aria-current');
    });
    setMenu(false);
    if (changed && !initial && focus) $('main-content').focus({ preventScroll: true });
    if (!scroll) return;
    requestAnimationFrame(() => {
      const target = page?.sections.some((section) => section.id === sectionId) ? $(sectionId) : null;
      if (target) { target.scrollIntoView({ block: 'start' }); setOutlineActive(sectionId); }
      else if (changed || !initial) window.scrollTo({ top: 0, behavior: 'instant' });
    });
  }
  function switchLanguage(nextLanguage) {
    if (!firmware().locales[nextLanguage] || nextLanguage === language) return;
    const viewportTop = document.querySelector('.site-header').getBoundingClientRect().bottom + 24;
    const metrics = [...$('article').querySelectorAll('.article-section')].map((node) => ({ id: node.id, ...pickRect(node) }));
    const anchor = readingAnchor(metrics, viewportTop);
    const scrollTop = window.scrollY;
    const sidebarScroll = $('sidebar').scrollTop;
    language = nextLanguage;
    storage.set('felucca-language', language);
    setLocaleData();
    renderUI();
    renderChapters();
    renderRoute({ scroll: false, focus: false });
    $('sidebar').scrollTop = sidebarScroll;
    requestAnimationFrame(() => {
      const section = anchor && $(anchor.id);
      if (section) {
        const rect = section.getBoundingClientRect();
        window.scrollTo({ top: Math.max(0, window.scrollY + rect.top + rect.height * anchor.fraction - viewportTop), behavior: 'instant' });
        setOutlineActive(anchor.id);
      } else window.scrollTo({ top: scrollTop, behavior: 'instant' });
    });
    if (dialog.open) updateSearch();
  }
  function switchFirmware(nextFirmware) {
    if (!Object.hasOwn(firmwares, nextFirmware) || nextFirmware === firmwareId) return;
    const destination = firmwareDestination(nextFirmware, parseRoute(location.hash, firmwareId), firmwares[nextFirmware].locales[language].pages, storage.get(`fm1-last-${nextFirmware}`));
    // Hash history makes Back/Forward restore both the guide and its chapter.
    location.hash = destination;
  }
  function pickRect(node) {
    const rect = node.getBoundingClientRect();
    return { top: rect.top, height: rect.height };
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
  function setSelected(index, scroll = false) {
    const options = [...$('search-results').querySelectorAll('[role="option"]')];
    selectedResult = options.length ? Math.max(0, Math.min(index, options.length - 1)) : -1;
    options.forEach((option, i) => {
      option.classList.toggle('is-selected', i === selectedResult);
      option.setAttribute('aria-selected', String(i === selectedResult));
    });
    if (selectedResult < 0) input.removeAttribute('aria-activedescendant');
    else {
      input.setAttribute('aria-activedescendant', options[selectedResult].id);
      if (scroll) options[selectedResult].scrollIntoView({ block: 'nearest' });
    }
  }
  function updateSearch() {
    if (searchFrame) { cancelAnimationFrame(searchFrame); searchFrame = 0; }
    const query = input.value;
    const searching = Boolean(query.trim());
    let matches;
    if (searching) matches = search(searchIndex, query);
    else {
      const suggested = firmware().suggestions;
      matches = suggested.map((key) => searchIndex.find((item) => `${item.pageId}/${item.sectionId}` === key)).filter(Boolean);
    }
    const groups = groupResults(matches);
    results = groups.flatMap((group) => group.items);
    const container = $('search-results');
    container.replaceChildren();
    container.scrollTop = 0;
    $('clear-search').hidden = !input.value;
    $('search-empty').hidden = !searching || Boolean(results.length);
    container.hidden = !results.length;
    input.setAttribute('aria-expanded', String(dialog.open && Boolean(results.length)));
    $('search-status').textContent = searching ? t('searchCount').replace('{count}', results.length) : t('searchIdle');
    let index = 0;
    for (const [groupIndex, group] of groups.entries()) {
      const section = element('div', 'search-group');
      section.setAttribute('role', 'group');
      const label = element('div', 'result-group-title', group.title);
      label.id = `search-group-${groupIndex}`;
      label.setAttribute('role', 'presentation');
      section.setAttribute('aria-labelledby', label.id);
      section.append(label);
      for (const result of group.items) {
        const option = element('a', 'search-result');
        option.id = `search-result-${index}`;
        option.href = resultKey(result);
        option.dataset.resultIndex = String(index);
        option.tabIndex = -1;
        option.setAttribute('role', 'option');
        option.setAttribute('aria-selected', 'false');
        option.setAttribute('aria-posinset', String(index + 1));
        option.setAttribute('aria-setsize', String(results.length));
        const title = element('span', 'result-title');
        title.id = `result-title-${index}`;
        const description = element('span', 'result-description');
        description.id = `result-description-${index}`;
        highlight(title, result.title, query);
        highlight(description, excerpt(result.text, query), query);
        option.setAttribute('aria-labelledby', title.id);
        option.setAttribute('aria-describedby', description.id);
        option.append(title, description);
        section.append(option);
        index++;
      }
      container.append(section);
    }
    setSelected(0);
  }
  function scheduleSearch() {
    if (composing) return;
    if (searchFrame) cancelAnimationFrame(searchFrame);
    searchFrame = requestAnimationFrame(updateSearch);
  }
  function openSearch() {
    if (dialog.open) { input.focus(); input.select(); return; }
    searchOpener = document.activeElement?.closest('#sidebar') ? $('open-search') : document.activeElement;
    setMenu(false);
    closingForNavigation = false;
    composing = false;
    dialog.showModal();
    document.body.classList.add('search-open');
    updateSearch();
    input.focus();
    input.select();
  }
  function closeSearch(navigate = false) {
    closingForNavigation = navigate;
    dialog.close();
  }
  function activateResult(index) {
    const result = results[index];
    if (!result) return;
    const href = resultKey(result);
    closeSearch(true);
    if (location.hash === href) { renderRoute(); $('main-content').focus({ preventScroll: true }); }
    else location.hash = href;
  }
  function outsideDialog(event) {
    const rect = dialog.getBoundingClientRect();
    return event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
  }

  $('theme-toggle').addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    storage.set('felucca-theme', theme);
    applyTheme();
  });
  $('language-select').addEventListener('change', (event) => switchLanguage(event.target.value));
  $('firmware-select').addEventListener('change', (event) => switchFirmware(event.target.value));
  $('official-logo').addEventListener('load', () => { $('official-logo').hidden = false; $('official-icon-fallback').hidden = true; });
  $('official-logo').addEventListener('error', () => { $('official-logo').hidden = true; $('official-icon-fallback').hidden = false; });
  $('open-search').addEventListener('click', openSearch);
  $('close-search').addEventListener('click', () => closeSearch());
  $('clear-search').addEventListener('click', () => { input.value = ''; updateSearch(); input.focus(); });
  dialog.addEventListener('pointerdown', (event) => { pointerStartedOutside = event.target === dialog && outsideDialog(event); });
  dialog.addEventListener('click', (event) => { if (pointerStartedOutside && event.target === dialog && outsideDialog(event)) closeSearch(); pointerStartedOutside = false; });
  dialog.addEventListener('cancel', () => { closingForNavigation = false; });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('search-open');
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
    if (searchFrame) { cancelAnimationFrame(searchFrame); searchFrame = 0; }
    if (closingForNavigation) $('main-content').focus({ preventScroll: true });
    else if (searchOpener?.isConnected && !searchOpener.closest('[inert]')) searchOpener.focus({ preventScroll: true });
    else $('open-search').focus({ preventScroll: true });
  });
  input.addEventListener('compositionstart', () => {
    composing = true;
    if (searchFrame) { cancelAnimationFrame(searchFrame); searchFrame = 0; }
  });
  input.addEventListener('compositionend', () => { composing = false; scheduleSearch(); });
  input.addEventListener('input', (event) => { if (!event.isComposing) scheduleSearch(); });
  input.addEventListener('keydown', (event) => {
    if (composing || isComposing(event)) return;
    if (searchFrame) updateSearch();
    if (!results.length) return;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setSelected(moveSelection(selectedResult, event.key === 'ArrowDown' ? 1 : -1, results.length), true);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      activateResult(selectedResult < 0 ? 0 : selectedResult);
    }
  });
  $('search-results').addEventListener('pointermove', (event) => {
    const option = event.target.closest('[data-result-index]');
    if (option && event.pointerType !== 'touch' && Number(option.dataset.resultIndex) !== selectedResult) setSelected(Number(option.dataset.resultIndex));
  });
  $('search-results').addEventListener('click', (event) => {
    const option = event.target.closest('[data-result-index]');
    if (!option) return;
    event.preventDefault();
    event.stopPropagation();
    activateResult(Number(option.dataset.resultIndex));
  });
  $('menu-toggle').addEventListener('click', () => setMenu($('menu-toggle').getAttribute('aria-expanded') !== 'true'));
  for (const id of ['close-menu', 'sidebar-backdrop']) $(id).addEventListener('click', () => { setMenu(false); $('menu-toggle').focus(); });
  document.querySelector('.skip-link').addEventListener('click', (event) => { event.preventDefault(); $('main-content').focus(); });
  document.addEventListener('keydown', (event) => {
    if (isComposing(event) || composing) return;
    const typing = event.target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"])');
    const shortcut = (event.ctrlKey || event.metaKey) && !event.altKey && event.key.toLowerCase() === 'k';
    if (shortcut || (event.key === '/' && !typing && !dialog.open && !event.ctrlKey && !event.metaKey && !event.altKey)) { event.preventDefault(); openSearch(); }
    if (event.key === 'Escape' && document.body.classList.contains('menu-open')) { setMenu(false); $('menu-toggle').focus(); }
    if (event.key === 'Tab' && document.body.classList.contains('menu-open')) {
      const nodes = [...$('sidebar').querySelectorAll('a, button, select')];
      if (event.shiftKey && document.activeElement === nodes[0]) { event.preventDefault(); nodes[nodes.length - 1].focus(); }
      else if (!event.shiftKey && document.activeElement === nodes[nodes.length - 1]) { event.preventDefault(); nodes[0].focus(); }
    }
  });
  document.addEventListener('click', (event) => {
    const anchor = event.target.closest('a[href^="#/"]');
    if (anchor && anchor.hash === location.hash) { event.preventDefault(); renderRoute(); $('main-content').focus({ preventScroll: true }); }
  });
  window.addEventListener('hashchange', () => renderRoute());
  window.matchMedia('(max-width: 760px)').addEventListener('change', syncSidebar);
  if (/Mac|iPhone|iPad/.test(navigator.userAgentData?.platform || navigator.platform)) $('search-shortcut').textContent = '⌘ K';
  setLocaleData();
  renderUI();
  renderChapters();
  renderRoute({ initial: true });
  syncSidebar();
})();

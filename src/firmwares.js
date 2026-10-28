(() => {
  window.FM1Firmwares = Object.freeze({
    felucca: Object.freeze({
      id: 'felucca', labels: { zh: 'Felucca', en: 'Felucca' }, badge: 'Felucca v1.7.0',
      baselines: { zh: '内容基线：Felucca v1.7.0', en: 'Content baseline: Felucca v1.7.0' },
      sourceLabels: { zh: 'Felucca 项目仓库', en: 'Felucca on GitHub' }, sourceUrl: 'https://github.com/hugelton/Felucca',
      sourceIcon: 'github', showPageSources: true,
      locales: window.FeluccaLocales,
      suggestions: ['quick-start/first-sound', 'controls/gestures', 'live-recording/record', 'saving/save-project', 'shortcuts/buttons'],
    }),
    sloop: Object.freeze({
      id: 'sloop', labels: { zh: 'SLOOP', en: 'SLOOP' }, badge: 'SLOOP 2.8.3',
      baselines: { zh: '内容基线：SLOOP 2.8.3', en: 'Content baseline: SLOOP 2.8.3' },
      sourceLabels: { zh: 'SLOOP 项目仓库', en: 'SLOOP on GitHub' }, sourceUrl: 'https://github.com/isod89/sloop-fm1',
      sourceIcon: 'github', showPageSources: true,
      locales: window.FM1SloopLocales,
      suggestions: ['quick-start/first-loop', 'controls/gestures', 'live-recording/record', 'saving/save-project', 'shortcuts/buttons'],
    }),
    jiant: Object.freeze({
      id: 'jiant', labels: { zh: 'JIANT', en: 'JIANT' }, badge: 'JIANT main c6e7aa1',
      baselines: { zh: 'JIANT：main c6e7aa1（安装分支见资料）', en: 'JIANT: main c6e7aa1 (see sources for editions)' },
      sourceLabels: { zh: 'JIANT 项目仓库', en: 'JIANT on GitHub' }, sourceUrl: 'https://github.com/juanjiant-bit/JIANT',
      sourceIcon: 'github', showPageSources: true,
      locales: window.FM1JiantLocales,
      suggestions: ['quick-start/first-sound', 'controls/gestures', 'sequencing/record', 'saving/save-project', 'samples/load'],
    }),
    official: Object.freeze({
      id: 'official', labels: { zh: '官方固件', en: 'Official firmware' }, badge: 'FM-1 / Stock',
      baselines: { zh: '说明书修订：2026-08-10', en: 'Manual revision: 2026-08-10' },
      sourceLabels: { zh: 'M-VAVE FM-1 产品页', en: 'M-VAVE FM-1 product page' }, sourceUrl: 'https://www.m-vave.com/product?id=fm-1',
      sourceIcon: 'official', sourceIconUrl: 'https://www.m-vave.com/images/logo.webp', showPageSources: false,
      locales: window.FM1OfficialLocales,
      suggestions: ['quick-start/first-sound', 'controls/knobs', 'step-recording/record', 'saving/save-preset', 'shortcuts/buttons'],
    }),
  });
})();

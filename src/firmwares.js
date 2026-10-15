(() => {
  window.FM1Firmwares = Object.freeze({
    felucca: Object.freeze({
      id: 'felucca', labels: { zh: 'Felucca', en: 'Felucca' }, badge: 'Felucca v1.6.1',
      baselines: { zh: '内容基线：Felucca v1.6.1', en: 'Content baseline: Felucca v1.6.1' },
      sourceLabels: { zh: 'Felucca 项目仓库', en: 'Felucca on GitHub' }, sourceUrl: 'https://github.com/hugelton/Felucca',
      sourceIcon: 'github', showPageSources: true,
      locales: window.FeluccaLocales,
      suggestions: ['quick-start/first-sound', 'controls/gestures', 'live-recording/record', 'saving/save-project', 'shortcuts/buttons'],
    }),
    official: Object.freeze({
      id: 'official', labels: { zh: '官方固件', en: 'Official firmware' }, badge: 'FM-1 · Stock',
      baselines: { zh: '说明书修订：2026-08-10', en: 'Manual revision: 2026-08-10' },
      sourceLabels: { zh: 'M-VAVE FM-1 产品页', en: 'M-VAVE FM-1 product page' }, sourceUrl: 'https://www.m-vave.com/product?id=fm-1',
      sourceIcon: 'official', sourceIconUrl: 'https://www.m-vave.com/images/logo.webp', showPageSources: false,
      locales: window.FM1OfficialLocales,
      suggestions: ['quick-start/first-sound', 'controls/knobs', 'step-recording/record', 'saving/save-preset', 'shortcuts/buttons'],
    }),
  });
})();

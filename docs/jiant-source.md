# JIANT evidence and version boundaries

Checked 2026-10-28 against the requested [JIANT main repository](https://github.com/juanjiant-bit/JIANT/tree/main). Read-only clone HEAD: [`c6e7aa189525043806e6b3052dd1f8b3c39c3e33`](https://github.com/juanjiant-bit/JIANT/commit/c6e7aa189525043806e6b3052dd1f8b3c39c3e33). `git ls-remote --tags` returned no tags; a main snapshot is not described as a stable release.

## Primary evidence

- [README at this snapshot](https://github.com/juanjiant-bit/JIANT/blob/c6e7aa189525043806e6b3052dd1f8b3c39c3e33/README.md): Current versions; edition selection; sample storage and bank replacement; navigation rules; controls; songs/scenes and saving.
- [Installer EDITIONS.json](https://github.com/juanjiant-bit/JIANT/blob/c6e7aa189525043806e6b3052dd1f8b3c39c3e33/web/EDITIONS.json): `v0.9.9-par13b-3641c02-preview` = SAMPLE/public, `v0.9.9-par10-30f05b3` = ADDITIVE/previous, `v0.9.9-par12-527c7e4` = STANDARD/stable. The filename containing “preview” is still marked public in this manifest.
- [Installer UI](https://github.com/juanjiant-bit/JIANT/blob/c6e7aa189525043806e6b3052dd1f8b3c39c3e33/web/index_pkg.html) confirms the edition differences.
- [Historical MANUAL.md](https://github.com/juanjiant-bit/JIANT/blob/c6e7aa189525043806e6b3052dd1f8b3c39c3e33/docs/MANUAL.md) explicitly identifies **v0.6.30**. It supplements the saving/navigation explanation; its menu layout and “no user samples” claim are not treated as current par13b facts.
- Local source inspection included `firmware/src/ui.c` and the navigation implementation named by README (`ui_lens.c`). This is evidence inspection, not a firmware build or hardware test.

## Documentation scope

Ten independent bilingual chapters in `src/content-jiant.js`, registered as `jiant`. Common workflows follow the pinned README. Edition-specific engine/sample facts are labelled par12/par10/par13b; the 0.9.18 menu is explicitly labelled development-line behaviour. No claim that all features coexist in a public installer build. Source links use the full commit; live tools can change independently.

Physical instructions say **SEL**, while literal upstream screen names remain **SCL**. Keep **SELECT** distinct. JIANT has its own drum, project and macro behaviour: do not copy SLOOP HOME layer locking, its track-4 drum mapping, or Felucca's default engine list.

## Limits

No attached FM-1, flashing, audio measurement, or validation of every branch. Bank replacement and project loading are documented only, never executed by this website. Original WAVs are required because project backups exclude the SAMPLE audio bank.

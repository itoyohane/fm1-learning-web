# SLOOP source baseline

Checked **2026-10-28** against latest discovered release tag **v2.8.3**, commit [`5eb24c1dc18261a85c193e8b28318944690e58fd`](https://github.com/isod89/sloop-fm1/commit/5eb24c1dc18261a85c193e8b28318944690e58fd). The checked-out main HEAD equals this tag. `SLOOP.md` and `GUIDE.md` both identify 2.8.3; upstream still calls it beta.

The bilingual guide in `src/content-sloop.js` now pins all code/manual references to that commit. Chapter and section IDs remain stable, including `step-recording/entry` and `saving/save-project`.

## Changes from the previous 2.6 guide

Read [SLOOP.md](https://github.com/isod89/sloop-fm1/blob/5eb24c1dc18261a85c193e8b28318944690e58fd/SLOOP.md) and [GUIDE.md](https://github.com/isod89/sloop-fm1/blob/5eb24c1dc18261a85c193e8b28318944690e58fd/GUIDE.md), especially chapters 7–10, 13, 17, 21 and 24.

- **NOTES replaces STEP**: individual chord-note selection, PITCH/LEN/FORCE, PRESETS zoom, delete one note, and the bottom per-note sheet. Held OCT+ opens it; KNOB 1 picks a row, KNOB 2 changes values, OCT+ performs actions, OCT− closes. POLY long notes can continue under later notes in 2.8.3.
- **DRUMS** has grid/kit/sound. Black keys silently pick sounds; OCT−/OCT+ page the grid. Sound tuning/decay and its sheet are documented. Drum mute mode survives releasing EDIT.
- **REC QUANT OFF** stores timing as nudge. **SECTION** replaces PROJECT. Sixteen favourites, all fifteen arp modes, keyboard hold, sample loops, MIDI 3 and CC0 bank selection are included.
- **Effects**: FILTER RESO, drum FILTER page and punch-in fade time.
- **Editor**: .sloopsong and LIVE playlists. **Return to stock** uses M-VAVE M-UPGRADE, not the removed browser option.
- 2.8.3 fixes held-note overdubs, drum voice allocation, sample attack, incoming MIDI overflow and second-core fault handling; it does not change the stated twelve synth engines/153 presets.

The following remain SLOOP-specific: function-button + HOME layer lock, four tracks with a dedicated drum track, free-take closure on REC, and A–D sections within one song. Do not substitute Felucca double taps or JIANT's eight projects.

## Limits

Source inspection and application tests do not test hardware. No FM-1 was connected or flashed. The earlier 2.6 audit in `other-guides-fact-check.md` is historical and superseded for current SLOOP instructions.

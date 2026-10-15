/* Independently written instructions based on the supplied FM-1-manual.pdf, revision 2026-08-10.
 * Page references use PDF page numbers, not the printed footer numbers. */
(() => {
  const key = (text) => `<kbd>${text}</kbd>`;
  const p = (text) => `<p>${text}</p>`;
  const list = (...items) => `<ul>${items.map((item) => `<li>${item}</li>`).join('')}</ul>`;
  const steps = (...items) => `<ol class="steps">${items.map((item) => `<li>${item}</li>`).join('')}</ol>`;
  const note = (text) => `<aside class="callout"><p>${text}</p></aside>`;
  const link = (id, text, section = '') => `<a href="#/official/${id}${section ? `/${section}` : ''}">${text}</a>`;
  const table = (headers, rows) => `<div class="table-scroll" tabindex="0" role="region" aria-label="${headers.join(' / ')}"><table><thead><tr>${headers.map((text) => `<th scope="col">${text}</th>`).join('')}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((text) => `<td>${text}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  // Keep IDs and source assignments shared between translations.
  const section = (id, zhTitle, zhBody, enTitle, enBody) => ({ id, zh: { title: zhTitle, body: zhBody }, en: { title: enTitle, body: enBody } });
  const chapters = [
    {
      id: 'quick-start', group: ['开始', 'Getting started'], title: ['快速开始', 'Quick start'],
      summary: ['先选音色、弹出声音，再录一段 4 步音序。适用于 FM-1 官方固件。', 'Choose a sound, play it, then record a four-step sequence. For the stock FM-1 firmware.'],
      keywords: '官方 原厂 开始 声音 录音 stock official first sound REC SEQ', sources: ['controls', 'sequence', 'save'],
      sections: [
        section('before-start', '确认当前固件', p('左侧“固件教程”应选<strong>官方固件</strong>。本教程依据随项目提供的官方说明书，修订日期为 2026-08-10；这不是固件版本号。') + note('官方固件：ALGORITHM 选 FM 算法、SELECT 翻页、长按 SAVE 保存。若设备使用四轨和多种引擎，请切到 Felucca 教程。'),
          'Check the firmware', p('Select <strong>Official firmware</strong> under “Firmware guide”. This guide follows the supplied official manual, revised 2026-08-10. That date is not a firmware version.') + note('Stock controls: ALGORITHM selects an FM algorithm, SELECT changes pages, and holding SAVE saves. For four tracks and multiple engines, choose the Felucca guide.')),
        section('first-sound', '弹出第一个声音', steps('先调低 MASTER，打开电源。', `按 ${key('HOME')}，转动 ${key('PRESETS')} 选择 001–128 中的一个音色。`, '按琴键，慢慢增大 MASTER。插入耳机后，内置扬声器静音。', `用 ${key('OCT−')} / ${key('OCT+')} 改变八度；同时按下两键可将八度和键盘移调归零。`),
          'Play your first sound', steps('Turn MASTER down, then power on.', `Press ${key('HOME')} and turn ${key('PRESETS')} to choose a sound from 001–128.`, 'Play a key and slowly raise MASTER. Connecting headphones mutes the speaker.', `Use ${key('OCT−')} / ${key('OCT+')} to shift octaves. Press both together to reset the octave and keyboard transpose.`)),
        section('first-loop', '录一段 4 步循环', steps(`关闭 ARP，按 ${key('SEQ')}，确认 SEQ 灯和橙色 STOP 灯亮。`, '第一页：KNOB 1 选一个不用的 Pattern，KNOB 4 将 Step 设为 4。', `按 ${key('REC')}，红灯亮后依次弹 4 个音；每次输入前进一格。`, `再按 ${key('REC')} 结束输入，按 ${key('PLAY/STOP')} 开始循环；再按一次停止。`, `长按 ${key('SAVE')}，看到 Preset Saved 后松开。`) + p('更多步骤见' + link('step-recording', '步进音序') + '。'),
          'Record a four-step loop', steps(`Disable ARP, press ${key('SEQ')}, and check that SEQ and the orange STOP indicator are lit.`, 'On page 1, choose an unused Pattern with KNOB 1 and set Step to 4 with KNOB 4.', `Press ${key('REC')}. With the red indicator lit, play four notes, one entry per step.`, `Press ${key('REC')} again to finish input, then ${key('PLAY/STOP')} to loop. Press it again to stop.`, `Hold ${key('SAVE')} until Preset Saved appears, then release.`) + p('Continue with ' + link('step-recording', 'Step sequencer') + '.')),
      ],
    },
    {
      id: 'controls', group: ['开始', 'Getting started'], title: ['面板与翻页', 'Panel and pages'],
      summary: ['先看模式和页码，再用对应旋钮调整。', 'Check the mode and page number before turning a parameter knob.'],
      keywords: '面板 按键 旋钮 翻页 SELECT ALGORITHM MASTER OCT controls knobs page octave', sources: ['controls', 'edit', 'save'],
      sections: [
        section('knobs', '三个主要编码器', table(['控件', '官方固件中的作用'], [[key('PRESETS'), '即时载入 128 个预设之一；SEQ 开启时停用。'], [key('ALGORITHM'), '切换 32 种 FM 算法，改变六个运算器的连接。'], [key('SELECT'), '在当前模式内翻页；FX 中选择效果，录制时还有步进操作。'], [key('KNOB 1–4'), '对应当前屏幕的四个参数。'], [key('MASTER'), '调节输出音量。']]),
          'Main knobs', table(['Control', 'Stock-firmware function'], [[key('PRESETS'), 'Immediately loads one of 128 presets; inactive while SEQ is enabled.'], [key('ALGORITHM'), 'Selects one of 32 FM algorithms connecting six operators.'], [key('SELECT'), 'Changes pages in the current mode; selects effects in FX and also moves through steps while recording.'], [key('KNOB 1–4'), 'Adjusts the four parameters shown on the current page.'], [key('MASTER'), 'Sets output volume.']])),
        section('gestures', '进入页面与返回', list(`按 FX、LFO、EDIT、GLO、ARP 或 SEQ 进入对应模式。按 ${key('HOME')} 返回示波器首页。`, '同一模式中的不同参数页，用 SELECT 切换，查看底部 1/2 等页码。', 'ENV 再按一次会关闭包络；ARP / SEQ 再按一次会关闭对应功能。返回首页和关闭功能是不同操作。', 'EDIT 中部分琴键用于 OP1–6、PIT、GLO、MONO / POLY 选择，先回 HOME 再正常演奏。'),
          'Open a page and return', list(`Press FX, LFO, EDIT, GLO, ARP, or SEQ to enter its mode. Press ${key('HOME')} to return to the oscilloscope.`, 'Turn SELECT for more parameter pages; check the footer indicator, such as 1/2.', 'Pressing ENV again disables the envelope. Pressing ARP or SEQ again in that mode disables it. Returning home and disabling a feature are separate actions.', 'In EDIT, labeled keys select OP1–6, PIT, GLO, or MONO / POLY. Return HOME for normal playing.')),
        section('octave', '八度与半音移调', table(['操作', '结果'], [[key('OCT−') + ' / ' + key('OCT+'), '八度降低 / 升高，范围 −3 至 +3。'], ['按住 OCT− / OCT+，转 ALGORITHM', '设置向下 / 向上的键盘半音移调，最多各 12 个半音。'], ['同时按 OCT− 和 OCT+', '八度与键盘半音移调都归零。']]) + p('八度灯：0 时熄灭；±1 慢闪，±2 快闪，±3 常亮。键盘移调会自动保存为全局设置。'),
          'Octaves and semitones', table(['Action', 'Result'], [[key('OCT−') + ' / ' + key('OCT+'), 'Shift down / up by an octave, from −3 to +3.'], ['Hold OCT− / OCT+ and turn ALGORITHM', 'Set downward / upward keyboard transpose, up to 12 semitones in either direction.'], ['Press OCT− and OCT+ together', 'Reset both the octave and keyboard transpose.']]) + p('Octave indicator: off at 0, slow blinking at ±1, fast blinking at ±2, and solid at ±3. Keyboard transpose is saved globally.')),
      ],
    },
    {
      id: 'presets', group: ['声音', 'Sound'], title: ['选择与管理音色', 'Presets'],
      summary: ['128 个预设分为 A–D 四组，每组 32 个。修改前先选好目标。', 'There are 128 presets in four banks, A–D, with 32 voices each. Choose a destination before editing.'],
      keywords: '预设 音色 命名 复制 初始化 PRESETS Voice Rename Copy Init bank', sources: ['controls', 'edit', 'save'],
      sections: [
        section('choose', '选择音色', steps(`回 ${key('HOME')}，转 ${key('PRESETS')}；编号在 001–128 之间循环。`, '屏幕顶栏显示当前编号与名称。弹琴试听，满意后再编辑。', 'SEQ 开启时，PRESETS 不生效；用 SEQ 第二页 KNOB 1 的 Voice 选择该 Pattern 的音色。') + note('修改未保存时，先长按 SAVE，再切换预设。'),
          'Choose a preset', steps(`Return ${key('HOME')} and turn ${key('PRESETS')}; selection wraps through 001–128.`, 'Check the number and name in the header, and play before editing.', 'With SEQ enabled, PRESETS is inactive. Use Voice on SEQ page 2, KNOB 1, to choose the pattern sound.') + note('Hold SAVE before changing presets if you want to keep your edits.')),
        section('rename-copy', '重命名与复制', p('按 EDIT，再按琴键上的 GLO，用 SELECT 到第二页：') + table(['参数', '操作'], [['Rename · KNOB 2', '右旋进入；OP1–OP5 选字符类型或删除，KNOB 3 选字符，按屏幕提示用 SELECT 确认；KNOB 2 左旋取消。'], ['Copy Voice · KNOB 3', '右旋打开，左旋退出；KNOB 4 选要复制的源音色，用 SELECT 确认覆盖当前目标。']]) + note('复制会覆盖目标。先核对屏幕上的 SOURCE / TARGET，保留原音色后再确认。'),
          'Rename or copy', p('Press EDIT, select the keyboard GLO function, and turn SELECT to page 2:') + table(['Parameter', 'Action'], [['Rename · KNOB 2', 'Turn right to enter. OP1–OP5 select character categories or deletion; KNOB 3 selects a character. Follow the screen prompt to confirm with SELECT; turn KNOB 2 left to cancel.'], ['Copy Voice · KNOB 3', 'Turn right to open, left to exit. KNOB 4 chooses the source voice; SELECT confirms overwriting the current target.']]) + note('Copying overwrites the target. Check SOURCE / TARGET on screen and preserve the original before confirming.')),
        section('init', '从基础音色开始', p('EDIT → 琴键 GLO → 第二页，右旋 KNOB 1 的 Init Voice，把当前音色参数重置为基础数值。适合学习 FM；它不是恢复全部预设库。') + p('完成后' + link('saving', '保存修改') + '。整组重置见' + link('settings', '全局设置', 'reset') + '。'),
          'Start from a basic voice', p('Go to EDIT → keyboard GLO → page 2 and turn KNOB 1, Init Voice, right to reset the current voice parameters to basic values. This is useful for learning FM; it does not reset all preset banks.') + p('Then ' + link('saving', 'save your edits') + '. For bank resets, see ' + link('settings', 'Global settings', 'reset') + '.')),
      ],
    },
    {
      id: 'sound-design', group: ['声音', 'Sound'], title: ['FM 音色编辑', 'FM voice editing'],
      summary: ['六个运算器通过算法连接。先理解电平与频率，再调整包络。', 'Algorithms connect six operators. Start with level and frequency, then explore envelopes.'],
      keywords: 'FM 算法 运算器 载波 调制 音色 EDIT OP PIT GLO MONO POLY algorithm operator feedback frequency', sources: ['edit', 'parameters'],
      sections: [
        section('basics', '先理解三个词', table(['名称', '作用'], [['运算器 OP', '一个正弦波振荡器。FM-1 有 OP1–OP6。'], ['载波 / 调制器', '载波直接输出声音；调制器改变其他运算器的声音。'], ['算法 Algorithm', '运算器的连接方式。ALGORITHM 旋钮选择 32 种算法。']]) + p('调制器电平常影响明亮度和金属感；载波电平常影响输出大小。先看算法图，再判断当前 OP 的作用。'),
          'Three useful terms', table(['Term', 'Meaning'], [['Operator (OP)', 'A sine-wave oscillator. FM-1 has OP1–OP6.'], ['Carrier / modulator', 'A carrier outputs sound directly; a modulator changes another operator.'], ['Algorithm', 'The connections between operators. ALGORITHM selects one of 32 arrangements.']]) + p('Modulator level often changes brightness and metallic character; carrier level often changes output level. Check the algorithm diagram to identify each role.')),
        section('edit', '编辑一个运算器', steps(`按 ${key('EDIT')}，短按标为 OP1–OP6 的琴键选择运算器。`, 'SELECT 翻到第一页，用 KNOB 4 调 Out Level；每次少改一点并试听。', 'KNOB 2 的 FreqCoarse 调粗频率，KNOB 3 的 FreqFine 微调；KNOB 1 的 Detune 调失谐。', '按 EDIT 或 HOME 返回。保留结果请长按 SAVE。') + p('长按 OP 键可静音该运算器；切换音色会恢复。MONO 为单音、后按音优先；POLY 最多同时发 12 个音。'),
          'Edit an operator', steps(`Press ${key('EDIT')} and tap a keyboard key labeled OP1–OP6.`, 'Turn SELECT to page 1 and adjust Out Level with KNOB 4. Make small changes and listen.', 'KNOB 2, FreqCoarse, sets coarse frequency; KNOB 3, FreqFine, fine-tunes it; KNOB 1 sets Detune.', 'Press EDIT or HOME to return. Hold SAVE to keep the result.') + p('Holding an OP key mutes that operator; changing presets restores it. MONO uses one note with last-note priority; POLY supports up to 12 simultaneous notes.')),
        section('pages', '运算器六页参数', table(['页', 'KNOB 1 → 4'], [['1', 'Detune −7…7 / FreqCoarse 0…31 / FreqFine 0…99 / Out Level 0…99'], ['2', 'Rate 1 / Rate 2 / Rate 3 / Rate 4（均 0…99）'], ['3', 'Level 1 / Level 2 / Level 3 / Level 4（均 0…99）'], ['4', 'A ModSens 0…3 / KeyVelocity 0…7 / OscMode Ratio 或 Fixed / —'], ['5', 'L Depth / R Depth（0…99）/ BreakPoint（A-1…C7）/ —'], ['6', 'L Curve / R Curve（−LN、−EX、+LN、+EX）/ RateScale 0…7 / —']]) + p('Rate 与 Level 构成运算器自己的四阶段包络，区别于 ENV 页的整体 ADSR。PIT 的两页分别编辑音高包络 Rate 1–4 和 Level 1–4。'),
          'Six operator pages', table(['Page', 'KNOB 1 → 4'], [['1', 'Detune −7…7 / FreqCoarse 0…31 / FreqFine 0…99 / Out Level 0…99'], ['2', 'Rate 1 / Rate 2 / Rate 3 / Rate 4 (all 0…99)'], ['3', 'Level 1 / Level 2 / Level 3 / Level 4 (all 0…99)'], ['4', 'A ModSens 0…3 / KeyVelocity 0…7 / OscMode Ratio or Fixed / —'], ['5', 'L Depth / R Depth (0…99) / BreakPoint (A-1…C7) / —'], ['6', 'L Curve / R Curve (−LN, −EX, +LN, +EX) / RateScale 0…7 / —']]) + p('Rate and Level form each operator’s four-stage envelope, separate from the overall ENV ADSR. The two PIT pages edit pitch-envelope Rate 1–4 and Level 1–4.')),
        section('synthesis-global', 'EDIT 里的 GLO', p('在 EDIT 内按琴键 GLO，第一页依次是 Algorithm、Feedback、Osc Sync、Transpose；第二页用于初始化、命名和复制。') + note('琴键 GLO 编辑当前音色。面板上的 GLO 按钮打开 MIDI、力度和滑音等设备设置；两者不同。'),
          'GLO inside EDIT', p('In EDIT, select the keyboard GLO function. Page 1 contains Algorithm, Feedback, Osc Sync, and Transpose. Page 2 contains initialization, naming, and copying.') + note('Keyboard GLO edits the voice. The panel GLO button opens device MIDI, velocity, and glide settings. They are separate controls.')),
      ],
    },
    {
      id: 'effects', group: ['声音', 'Sound'], title: ['效果与顺序', 'Effects and routing'],
      summary: ['六个效果串联处理。先开一个效果，再调整参数。', 'Six effects form a serial chain. Enable one, then adjust its parameters.'],
      keywords: '效果 滤波 混响 延迟 失真 合唱 相位 FX SEL filter reverb delay distortion chorus phaser', sources: ['effects'],
      sections: [
        section('enable', '选择并开启效果', steps(`按 ${key('FX')}，转 ${key('SELECT')} 选效果；闪烁圆点表示当前选择。`, '右旋 KNOB 4 开启，左旋关闭。方块亮为开、暗为关。', 'KNOB 1–3 调当前效果参数；先用小幅度，再边弹边调。', '再按 FX 返回首页。'),
          'Choose and enable an effect', steps(`Press ${key('FX')} and turn ${key('SELECT')} to select an effect; the blinking dot marks it.`, 'Turn KNOB 4 right to enable or left to disable. Bright boxes are on; dim boxes are off.', 'Adjust KNOB 1–3 while playing. Start with small changes.', 'Press FX again to return home.')),
        section('parameters', '参数速查', table(['效果', 'KNOB 1', 'KNOB 2', 'KNOB 3'], [['Filter', 'LowPass / BandPass / HighPass', 'Cutoff · 100–20000 Hz', 'Q · 0–100'], ['Reverb', 'Room / Hall / Plate', 'Decay', 'Mix'], ['Delay', 'Decay', 'Rate', 'Mix'], ['Distortion', 'Gain', 'Tone', 'Level'], ['Chorus', 'Freq', 'Depth', 'Mix'], ['Phaser', 'Freq', 'Depth', 'Mix']]) + p('Mix 控制干声与效果声的比例。新手先试 Reverb 的少量 Mix，再试 Delay；KNOB 4 始终用于当前效果开关。'),
          'Parameter reference', table(['Effect', 'KNOB 1', 'KNOB 2', 'KNOB 3'], [['Filter', 'LowPass / BandPass / HighPass', 'Cutoff · 100–20000 Hz', 'Q · 0–100'], ['Reverb', 'Room / Hall / Plate', 'Decay', 'Mix'], ['Delay', 'Decay', 'Rate', 'Mix'], ['Distortion', 'Gain', 'Tone', 'Level'], ['Chorus', 'Freq', 'Depth', 'Mix'], ['Phaser', 'Freq', 'Depth', 'Mix']]) + p('Mix balances dry and processed sound. Try a little Reverb Mix first, then Delay. KNOB 4 always toggles the selected effect.')),
        section('order', '调整效果顺序', steps('在 FX 中选择要移动的效果。', `按 ${key('SEL')} 抓住效果，圆点变常亮、SEL 灯亮。`, '转 SELECT，让该效果与相邻效果交换位置。', '再按 SEL 放下。先试把 Distortion 放在 Reverb 前，听顺序如何改变结果。') + p('SEL 的排序功能仅在 FX 中生效；此处沿用官方说明书的 SEL 标签。'),
          'Reorder effects', steps('Select an effect in FX.', `Press ${key('SEL')} to grab it. The dot and SEL indicator become solid.`, 'Turn SELECT to swap it with neighboring effects.', 'Press SEL again to release. Try Distortion before Reverb and listen to the difference.') + p('SEL reordering works only in FX. This guide uses the SEL label from the official manual.')),
      ],
    },
    {
      id: 'modulation', group: ['声音', 'Sound'], title: ['包络与 LFO', 'Envelope and LFO'],
      summary: ['ENV 控制起落，LFO 让音高或音量周期性变化。', 'ENV shapes a note over time; LFO adds repeating pitch or volume changes.'],
      keywords: '包络 颤音 音量 调制 ENV LFO ADSR Attack Decay Sustain Release PMD AMD Sync', sources: ['modulation', 'parameters'],
      sections: [
        section('envelope', 'ENV：声音的起落', p('ENV 默认关闭。按 ENV 开启，灯亮后用四个旋钮编辑：') + table(['旋钮', '参数', '听感'], [['1', 'Attack', '越高，起音越慢。'], ['2', 'Decay', '从峰值衰减到延音电平的过程。'], ['3', 'Sustain', '按住琴键时保持的电平；它不是时间。'], ['4', 'Release', '越高，松键后的尾音越长。']]) + p('均为 0–100%。先选持续音色，增大 Attack 和 Release，按住再松开琴键听变化。再次按 ENV 会关闭包络功能。'),
          'ENV: shape the note', p('ENV is off by default. Press ENV to enable it, then use the four knobs:') + table(['Knob', 'Parameter', 'What to listen for'], [['1', 'Attack', 'Higher values give a slower onset.'], ['2', 'Decay', 'The fall from peak level to sustain.'], ['3', 'Sustain', 'The level while holding the key; this is not a time.'], ['4', 'Release', 'Higher values give a longer tail after release.']]) + p('All range from 0–100%. Choose a sustained voice, raise Attack and Release, then hold and release a key. Pressing ENV again disables the envelope.')),
        section('lfo', 'LFO 第一页', table(['旋钮', '参数', '作用'], [['1', 'Wave', 'Triangle / Saw Down / Saw Up / Square / Sine / Sample & Hold'], ['2', 'Speed · 0–99', '调制速度。'], ['3', 'PMD · 0–99', '音高调制深度。'], ['4', 'AMD · 0–99', '振幅调制深度。']]) + p('按 LFO，先用 Sine、较低 Speed 和少量 PMD；听不到变化时，再检查第二页的 Pitch Sens 和音色灵敏度。'),
          'LFO page 1', table(['Knob', 'Parameter', 'Function'], [['1', 'Wave', 'Triangle / Saw Down / Saw Up / Square / Sine / Sample & Hold'], ['2', 'Speed · 0–99', 'Modulation speed.'], ['3', 'PMD · 0–99', 'Pitch-modulation depth.'], ['4', 'AMD · 0–99', 'Amplitude-modulation depth.']]) + p('Press LFO and start with Sine, a low Speed, and a small PMD. If nothing changes, check Pitch Sens on page 2 and the voice sensitivity settings.')),
        section('sync', 'LFO 第二页', table(['旋钮', '参数', '作用'], [['1', 'Delay · 0–99', '音符开始后，延迟多久再调制。'], ['2', 'Pitch Sens · 0–7', '音高调制灵敏度。'], ['3', 'Lfo Sync', '开启时，每个新音符重置 LFO；关闭时自由运行。'], ['4', 'Osc Sync', '开启时，新音符重置振荡器相位。']]) + note('这里的 Sync 是随新音符重置，不是 ARP / SEQ 的外部 MIDI 时钟同步。'),
          'LFO page 2', table(['Knob', 'Parameter', 'Function'], [['1', 'Delay · 0–99', 'Delay before modulation starts after a note.'], ['2', 'Pitch Sens · 0–7', 'Pitch-modulation sensitivity.'], ['3', 'Lfo Sync', 'Reset LFO on each new note when on; free-run when off.'], ['4', 'Osc Sync', 'Reset oscillator phase on each new note when on.']]) + note('Sync here means restarting on a new note. It differs from external MIDI clock sync in ARP / SEQ.')),
      ],
    },
    {
      id: 'arpeggiator', group: ['演奏与音序', 'Playing and sequencing'], title: ['琶音器', 'Arpeggiator'],
      summary: ['按住和弦，让音符按规则依次播放。ARP 与 SEQ 不能同时开启。', 'Hold a chord to play its notes in a repeating order. ARP and SEQ cannot be enabled together.'],
      keywords: '琶音 锁定 速度 ARP Latch Sync Tempo Gate Swing arpeggiator', sources: ['arp', 'sequence'],
      sections: [
        section('play', '开始与停止', steps('先关闭 SEQ；看到 Disable SEQ to enter 时，回到 SEQ 模式再次按 SEQ 关闭。', `按 ${key('ARP')}，灯亮后按住两个或三个琴键。`, '第一页 KNOB 1 先选 Up，KNOB 4 的 Tempo 可先设为 100。', '松键停止；若 Latch 已开，关闭第二页的 Latch，或回 ARP 模式再按 ARP 关闭。'),
          'Start and stop', steps('Disable SEQ first. If Disable SEQ to enter appears, return to SEQ mode and press SEQ again to disable it.', `Press ${key('ARP')} and hold two or three keys once the indicator is lit.`, 'On page 1, choose Up with KNOB 1 and try Tempo 100 with KNOB 4.', 'Release the keys to stop. If Latch is on, disable Latch on page 2, or return to ARP mode and press ARP again to disable it.')),
        section('pages', '两页参数', table(['页', 'KNOB 1', 'KNOB 2', 'KNOB 3', 'KNOB 4'], [['1', 'Mode', 'Octave · 1–4', 'Rate', 'Tempo · 30–300'], ['2', 'Gate · 20–100%', 'Swing · 50–75%', 'Latch', 'Sync']]) + p('Rate 是音符节奏细分；Gate 越低越短促；Swing 50% 为均匀节奏。Latch 松键后继续，按新键换音；Sync 开启后跟随外部 MIDI 时钟。'),
          'Two parameter pages', table(['Page', 'KNOB 1', 'KNOB 2', 'KNOB 3', 'KNOB 4'], [['1', 'Mode', 'Octave · 1–4', 'Rate', 'Tempo · 30–300'], ['2', 'Gate · 20–100%', 'Swing · 50–75%', 'Latch', 'Sync']]) + p('Rate sets rhythmic subdivision. Lower Gate makes notes shorter; Swing 50% is even timing. Latch continues after release and new keys change the notes. Sync follows external MIDI clock.')),
        section('modes', '七种模式', table(['模式', '播放规则'], [['Up / Down', '从低到高 / 从高到低。'], ['Inclusive / Exclusive', '上下往返，包含 / 排除重复端点。'], ['Random', '随机顺序。'], ['Order', '按下琴键的顺序。'], ['Repeat', '每个音符重复后再移到下一个。']]),
          'Seven modes', table(['Mode', 'Order'], [['Up / Down', 'Low to high / high to low.'], ['Inclusive / Exclusive', 'Back and forth, including / excluding repeated endpoints.'], ['Random', 'Random order.'], ['Order', 'The order in which keys were pressed.'], ['Repeat', 'Repeat each note before moving to the next.']])),
      ],
    },
    {
      id: 'step-recording', group: ['演奏与音序', 'Playing and sequencing'], title: ['步进音序', 'Step sequencer'],
      summary: ['16 个独立 Pattern，每个最多 16 步；每次输入一个音，自动走到下一步。', 'There are 16 independent patterns of up to 16 steps. Each note entry advances to the next step.'],
      keywords: '步进 录音 录制 音序 空拍 长音 连奏 Pattern Chain Step SEQ REC PLAY STOP Voice', sources: ['sequence', 'parameters', 'save'],
      sections: [
        section('record', '录入、播放、停止', steps(`关闭 ARP，按 ${key('SEQ')} 启用音序器，确认橙色 STOP 灯亮。`, '第一页 KNOB 1 选 Pattern 1–16，KNOB 4 设循环步数。使用空 Pattern 可避免覆盖已有内容。', `按 ${key('REC')}，红灯亮后依次弹音；每个音录入下一步。`, `再按 ${key('REC')} 退出录制，按 ${key('PLAY/STOP')} 播放。绿灯为播放，橙灯为停止。`, '再按 PLAY/STOP 停止。回 SEQ 模式再按 SEQ 可关闭音序器。') + note('先开 SEQ 才能使用 REC / PLAY。官方固件这里是逐步输入；不采用 Felucca 在 HOME 按 REC 的实时循环录音流程。'),
          'Record, play, stop', steps(`Disable ARP and press ${key('SEQ')}. Check the orange STOP indicator.`, 'On page 1, KNOB 1 selects Pattern 1–16 and KNOB 4 sets the loop length. Choose an empty pattern to protect existing work.', `Press ${key('REC')}. With the red indicator on, play notes; each entry advances a step.`, `Press ${key('REC')} again to exit recording, then ${key('PLAY/STOP')} to play. Green means playing; orange means stopped.`, 'Press PLAY/STOP again to stop. Return to SEQ mode and press SEQ again to disable it.') + note('Enable SEQ before using REC / PLAY. This stock-firmware workflow enters notes step by step; it differs from Felucca’s HOME-page live-loop recording.')),
        section('long-rest', '长音、空拍与替换', table(['任务', '录制状态下的操作'], [['长音', '按住琴键，转 SELECT 到结束步，再松键；说明书注明不会覆盖之前的音。'], ['移动输入位置', '按住 REC，再转 SELECT 到目标步。'], ['添加 / 替换音符', '移动到目标步后按琴键输入。'], ['空拍', '按住 REC + SELECT 移动位置，在目标步留空。'], ['每步 Rate', '录制中到第二页，用 KNOB 2 调该步 Rate。']]) + p('LED 常亮表示有音，熄灭表示空步，闪烁表示播放位置。'),
          'Long notes, rests, replacements', table(['Task', 'Action while recording'], [['Long note', 'Hold a musical key, turn SELECT to the ending step, then release. The manual states that earlier notes are preserved.'], ['Move the input position', 'Hold REC and turn SELECT to the desired step.'], ['Add / replace a note', 'Play a key at the chosen step.'], ['Rest', 'Move with REC + SELECT and leave the target step empty.'], ['Per-step Rate', 'While recording, use KNOB 2 on page 2 to adjust the step Rate.']]) + p('Step LEDs: solid means a note, off means empty, and blinking marks the playback position.')),
        section('pages', '三页参数', table(['页', 'KNOB 1', 'KNOB 2', 'KNOB 3', 'KNOB 4'], [['1', 'Pattern · 1–16', 'Clear', 'Chain · 1–16', 'Step · 1–16'], ['2', 'Voice · 1–128', 'Rate', 'Tempo · 30–300', 'Gate · 20–100%'], ['3', 'Swing · 50–75%', 'Sync', 'Transpose · −24…+24', '—']]) + p('SELECT 翻页。Clear 用于清除，先核对当前 Pattern，再按屏幕提示操作；说明书未给出独立清除组合键。') + note('SEQ 开启时 PRESETS 无效。选音色用第二页 KNOB 1 的 Voice。'),
          'Three parameter pages', table(['Page', 'KNOB 1', 'KNOB 2', 'KNOB 3', 'KNOB 4'], [['1', 'Pattern · 1–16', 'Clear', 'Chain · 1–16', 'Step · 1–16'], ['2', 'Voice · 1–128', 'Rate', 'Tempo · 30–300', 'Gate · 20–100%'], ['3', 'Swing · 50–75%', 'Sync', 'Transpose · −24…+24', '—']]) + p('Turn SELECT to change pages. Clear erases content: check the current Pattern and follow the screen prompt. The manual does not specify a separate clear-key combination.') + note('PRESETS is inactive while SEQ is enabled. Choose the voice with KNOB 1 on page 2.')),
        section('chain-save', '串联与保存', p('第一页 Chain 设置从当前 Pattern 开始连续播放的 Pattern 数量。先做两个短 Pattern，再把 Chain 设为 2，听连续播放的结果。') + p('说明书注明 Pattern 及绑定音色自动写入闪存。完成编辑后仍可长按 SAVE，保存全部待处理修改并确认 Preset Saved。') + p('没有 Felucca 的四轨工程、64 步或 SONG 页操作；需要这些功能时请切换固件教程。'),
          'Chain and save', p('Chain on page 1 sets how many patterns play consecutively, starting with the current pattern. Make two short patterns and set Chain to 2 to try it.') + p('The manual states that patterns and their assigned voices are saved automatically to flash. After editing, you can also hold SAVE to write all pending changes and confirm Preset Saved.') + p('Felucca’s four-track projects, 64-step patterns, and SONG-page controls belong to its separate guide.')),
      ],
    },
    {
      id: 'saving', group: ['演奏与音序', 'Playing and sequencing'], title: ['保存与音色库导入', 'Saving and bank import'],
      summary: ['长按 SAVE 写入待处理修改；导入 SysEx 时选择 A–D 目标库。', 'Hold SAVE to write pending edits. For SysEx imports, choose a destination bank A–D.'],
      keywords: '保存 音色库 导入 备份 SAVE Preset Saved SysEx DX7 bank import', sources: ['save', 'midi', 'settings'],
      sections: [
        section('save-preset', '保存当前修改', steps(`长按 ${key('SAVE')}。`, '保存时 SAVE 灯亮，屏幕短暂显示 Preset Saved。', '看到提示后松开。切换预设或关机前，先完成保存。') + p('说明书将音色参数、效果设置、音序器模式和全局设置列为待保存内容。长按 SAVE 在官方固件中是保存，不是 Felucca 的撤销。'),
          'Save edits', steps(`Hold ${key('SAVE')}.`, 'The SAVE indicator lights during saving and Preset Saved appears briefly.', 'Release after confirmation. Save before changing presets or powering off.') + p('The manual includes voice parameters, effects, sequencer patterns, and global settings among pending changes. Holding SAVE saves in stock firmware; Felucca uses that gesture for undo.')),
        section('import', '导入 DX7 音色库', steps('使用 MIDI 发送工具，通过 MIDI 连接发送标准 DX7 SysEx 音色库，每库 32 个音色。', '收到数据后，设备出现音色库选择界面。', '用 KNOB 1–4 选择目标库 A / B / C / D，等待保存完成。', '回 HOME，使用 PRESETS 试听导入的音色。') + note('导入会替换目标库。先确认库中是否有要保留的声音；本说明书没有给出音色库导出或完整备份流程。'),
          'Import a DX7 bank', steps('Use a MIDI sending tool to transmit a standard DX7 SysEx bank of 32 voices over a MIDI connection.', 'The device opens a bank-selection screen when data arrives.', 'Use KNOB 1–4 to choose A / B / C / D and wait for saving to finish.', 'Return HOME and audition the imported sounds with PRESETS.') + note('Importing replaces the destination bank. Preserve any sounds you need first. This manual does not document bank export or a complete backup workflow.')),
        section('reset', '重置前先确认', p('GLO → 第二页 → Reset Patches 可重置一组音色。说明书说明恢复的是<strong>上一次导入的音色</strong>，不要把它当作必然恢复最初出厂库。') + p('操作步骤见' + link('settings', '音色组重置', 'reset') + '。'),
          'Before resetting a bank', p('GLO → page 2 → Reset Patches resets a bank. The manual says it restores the <strong>last imported voices</strong>; do not assume it always restores the original factory bank.') + p('See ' + link('settings', 'Bank reset', 'reset') + '.')),
      ],
    },
    {
      id: 'midi', group: ['连接与设置', 'Connections and settings'], title: ['MIDI 与音频连接', 'MIDI and audio'],
      summary: ['MIDI 传音符与控制信息；录制声音使用音频输出。', 'MIDI carries notes and control data. Record sound from the audio output.'],
      keywords: '连接 蓝牙 电脑 音频 录音 USB BLE MIDI BT Program Change SysEx audio', sources: ['midi', 'ports', 'save', 'settings'],
      sections: [
        section('connect', '三种 MIDI 连接', table(['连接', '做法'], [['USB MIDI', '用支持数据的 USB 线连接电脑；说明书标为即插即用。'], ['BLE MIDI', '长按 HOME 开启 BT，再在支持 BLE MIDI 的应用中连接。HOME 灯闪烁为已开未连，常亮为已连接，灭为关闭。'], ['3.5 mm MIDI IN', '用合适的 3.5 mm 转 MIDI 适配器接外部设备的 MIDI OUT。']]) + p('三种接口可同时工作。接收不到音符时检查 GLO 的 MIDI Channel；可先用 ALL 排查。'),
          'Three MIDI connections', table(['Connection', 'How'], [['USB MIDI', 'Connect to a computer with a data-capable USB cable. The manual describes class-compliant operation.'], ['BLE MIDI', 'Hold HOME to enable BT, then connect in a BLE MIDI-capable application. HOME blinking means enabled but disconnected; solid means connected; off means disabled.'], ['3.5 mm MIDI IN', 'Use the appropriate 3.5 mm-to-MIDI adapter from an external device’s MIDI OUT.']]) + p('All three interfaces can work simultaneously. If notes are missing, check MIDI Channel in GLO; try ALL while troubleshooting.')),
        section('messages', '接收与发送什么', list('接收：Note On / Off 与力度、弯音、效果参数 CC、Program Change、标准 DX7 SysEx 音色库。', 'Program Change 0–127 对应设备预设 001–128，编号相差 1。', '键盘、ARP 和 SEQ 可发送音符事件。', 'ARP / SEQ 的 Sync 用于跟随外部 MIDI 时钟；先确保外部设备确实在发送时钟。') + p('说明书未列出完整 CC 编号表，本手册不补造编号。'),
          'Supported messages', list('Receives Note On / Off with velocity, pitch bend, effect CC messages, Program Change, and standard DX7 SysEx banks.', 'Program Change 0–127 maps to device presets 001–128: the displayed numbering differs by one.', 'The keyboard, ARP, and SEQ can send note events.', 'ARP / SEQ Sync follows external MIDI clock. Check that the external device is actually sending clock.') + p('The manual does not include a full CC number table; no undocumented numbers are supplied here.')),
        section('audio', '把声音录到电脑', steps('从 3.5 mm 音频输出接到音频接口的合适输入，先调低 MASTER。', '在录音软件中选择音频接口，开启音轨监听或录制。', '弹琴并逐渐调高音量，避免输入过载。') + note('说明书确认的是 USB MIDI，没有确认 USB 音频功能。只有 MIDI 轨时不会自动得到 FM-1 的实际声音。') + p('耳机建议使用 TRS 插头；说明书提示其他插头可能产生噪声或无法正确关闭扬声器。'),
          'Record sound on a computer', steps('Connect the 3.5 mm audio output to a suitable audio-interface input with MASTER initially low.', 'Select that interface in your recording app and enable audio monitoring or recording.', 'Play and gradually raise the level without overloading the input.') + note('The manual confirms USB MIDI, but does not confirm USB audio. A MIDI track alone does not capture the FM-1’s actual sound.') + p('Use TRS headphones as recommended in the manual. Other plugs may cause noise or fail to mute the speaker correctly.')),
      ],
    },
    {
      id: 'settings', group: ['连接与设置', 'Connections and settings'], title: ['全局设置', 'Global settings'],
      summary: ['面板 GLO 设置 MIDI、力度与滑音。重置音色组前先核对目标。', 'The panel GLO button controls MIDI, velocity, and glide. Check the destination before resetting a bank.'],
      keywords: '全局 力度 滑音 弯音 重置 GLO Velocity Glide MIDI Channel Reset Patches', sources: ['settings'],
      sections: [
        section('midi-settings', '第一页：MIDI 与弯音', p('按面板 GLO，SELECT 翻页，KNOB 1–4 对应：') + table(['旋钮', '参数', '范围'], [['1', 'MIDI Channel · 接收音符通道', 'ALL / 1–16'], ['2', 'Effect Channel · 效果控制通道', '1–16'], ['3', 'Pitch Bend Up · 上弯音', '1–24 半音'], ['4', 'Pitch Bend Down · 下弯音', '1–24 半音']]),
          'Page 1: MIDI and pitch bend', p('Press the panel GLO button and turn SELECT for pages. KNOB 1–4 control:') + table(['Knob', 'Parameter', 'Range'], [['1', 'MIDI Channel · note reception', 'ALL / 1–16'], ['2', 'Effect Channel · effect control', '1–16'], ['3', 'Pitch Bend Up', '1–24 semitones'], ['4', 'Pitch Bend Down', '1–24 semitones']])),
        section('velocity-glide', '第二页：力度与滑音', table(['旋钮', '参数', '作用'], [['2', 'Velocity · 1–127', '设置键盘全局力度。'], ['3', 'Glide', 'Full Time 每个音触发；Fingered 仅连奏时触发。'], ['4', 'Glide Val · 0–100', '滑音时间，对应 0–1 秒。']]) + p('滑音仅在 MONO 中生效。先到 EDIT 选 MONO，再回 GLO 第二页增大 Glide Val，连着弹两个音试听。'),
          'Page 2: velocity and glide', table(['Knob', 'Parameter', 'Function'], [['2', 'Velocity · 1–127', 'Global keyboard velocity.'], ['3', 'Glide', 'Full Time applies to all notes; Fingered applies only to overlapping notes.'], ['4', 'Glide Val · 0–100', 'Glide time, corresponding to 0–1 second.']]) + p('Glide works only in MONO. Select MONO in EDIT, then return to GLO page 2, raise Glide Val, and play two overlapping notes.')),
        section('reset', '重置一个音色组', steps('先确认目标组中没有需要保留的修改。', '在 GLO 第二页，右旋 KNOB 1 的 Reset Patches，进入重置界面。', '用 KNOB 1–4 选择 A / B / C / D。', 'SELECT 右旋确认重置，左旋取消；成功时显示 Reset Success。') + note('恢复对象是该组上一次导入的音色。不要误把 Reset Patches 当作当前编辑页的撤销。'),
          'Reset a voice bank', steps('Preserve any edits you need in the destination bank.', 'On GLO page 2, turn KNOB 1, Reset Patches, right to open the reset screen.', 'Use KNOB 1–4 to select A / B / C / D.', 'Turn SELECT right to confirm or left to cancel. Reset Success confirms completion.') + note('This restores the last imported voices in that bank. Reset Patches is not an undo action for the current edit.')),
      ],
    },
    {
      id: 'shortcuts', group: ['查阅', 'Reference'], title: ['按键速查', 'Control reference'],
      summary: ['仅列官方固件操作。按键相同，不代表与 Felucca 功能相同。', 'Stock-firmware controls only. Identical labels can have different functions in Felucca.'],
      keywords: '快捷 按键 长按 组合 速查 HOME SAVE SELECT ALGORITHM REC SEQ SEL shortcuts controls', sources: ['controls', 'effects', 'edit', 'sequence', 'save'],
      sections: [
        section('buttons', '常用操作', table(['操作', '结果'], [['HOME 短按 / 长按', '返回首页 / 开关 BLE MIDI。'], ['SAVE 长按', '保存待处理修改，显示 Preset Saved。'], ['SELECT 转动', '翻页；FX 选效果；录制时按上下文移动步。'], ['ALGORITHM 转动', '选择 FM 算法 1–32。'], ['FX → SEL → SELECT → SEL', '抓住效果 → 移动顺序 → 放下。'], ['EDIT → OP 短按 / 长按', '选择运算器 / 静音运算器。'], ['ENV 按一次 / 再按一次', '开启并编辑 ADSR / 关闭包络。'], ['SEQ → REC → 输入 → REC → PLAY', '启用 → 步进录入 → 结束录制 → 播放。'], ['OCT− + OCT+', '八度和键盘半音移调归零。'], ['按住 OCT± + 转 ALGORITHM', '设置键盘半音移调。']]),
          'Common actions', table(['Action', 'Result'], [['Tap / hold HOME', 'Return home / toggle BLE MIDI.'], ['Hold SAVE', 'Save pending edits; Preset Saved confirms.'], ['Turn SELECT', 'Change pages; select effects in FX; move steps in the recording context.'], ['Turn ALGORITHM', 'Select FM algorithm 1–32.'], ['FX → SEL → SELECT → SEL', 'Grab effect → reorder → release.'], ['EDIT → tap / hold OP', 'Select / mute an operator.'], ['Press ENV / press again', 'Enable and edit ADSR / disable the envelope.'], ['SEQ → REC → notes → REC → PLAY', 'Enable → enter steps → finish recording → play.'], ['OCT− + OCT+', 'Reset octave and keyboard semitone transpose.'], ['Hold OCT± + turn ALGORITHM', 'Set keyboard semitone transpose.']])),
        section('context', '先检查上下文', list('ARP 与 SEQ 互斥，进入另一功能前先关闭当前功能。', 'REC / PLAY 只在 SEQ 启用后工作。', 'SEQ 开启时，用第二页 Voice 选音色，不用 PRESETS。', 'EDIT 里的琴键 GLO 与面板 GLO 按钮不同。', '官方教程不使用 Felucca 的快捷层、四轨工程或长按 SAVE 撤销。'),
          'Check the context', list('ARP and SEQ are mutually exclusive; disable one before enabling the other.', 'REC / PLAY work only after SEQ is enabled.', 'While SEQ is enabled, choose Voice on page 2 instead of PRESETS.', 'Keyboard GLO inside EDIT differs from the panel GLO button.', 'Felucca shortcut layers, four-track projects, and hold-SAVE undo belong to its separate guide.')),
      ],
    },
    {
      id: 'troubleshooting', group: ['查阅', 'Reference'], title: ['常见问题', 'Troubleshooting'],
      summary: ['先检查当前模式、开关和连接，再修改参数。', 'Check the mode, feature switches, and connections before changing parameters.'],
      keywords: '问题 没声音 无声 录不进 停不下 不工作 PRESETS Enable SEQ first Disable ARP no sound troubleshooting battery', sources: ['controls', 'modulation', 'sequence', 'midi', 'ports'],
      sections: [
        section('no-sound', '没有声音', steps('调高适量 MASTER，检查耳机是否已插入；耳机连接会关闭扬声器。', '按 HOME，选一个已知能发声的预设。', '如果只在某音色无声，检查运算器电平、ENV 的 Sustain 与效果；长按 OP 静音可通过切换音色恢复。', '外部 MIDI 无声时，检查 GLO 的接收通道、连接和 MIDI 软件设置。'),
          'No sound', steps('Raise MASTER carefully and check headphones; connecting them mutes the speaker.', 'Press HOME and choose a known working preset.', 'For a silent voice, check operator levels, ENV Sustain, and effects. Changing presets restores operators muted by holding OP.', 'For external MIDI, check the GLO receive channel, cable, and MIDI application settings.')),
        section('transport', '录制或播放不工作', table(['现象 / 提示', '处理'], [['Enable SEQ first', '先按 SEQ 启用，再用 REC 或 PLAY/STOP。'], ['Disable ARP to enter', '回到 ARP 模式，再按 ARP 关闭。'], ['Disable SEQ to enter', '回到 SEQ 模式，再按 SEQ 关闭。'], ['转 PRESETS 不换音色', 'SEQ 已启用时，去第二页调 Voice。'], ['松键仍有琶音', '关闭 ARP 第二页 Latch，或关闭 ARP。'], ['Sync 开启但不播放', '检查外部 MIDI 时钟；不使用外部时钟时关闭 Sync。']]),
          'Recording or playback does not work', table(['Symptom / prompt', 'Action'], [['Enable SEQ first', 'Press SEQ to enable it before REC or PLAY/STOP.'], ['Disable ARP to enter', 'Return to ARP mode and press ARP again to disable it.'], ['Disable SEQ to enter', 'Return to SEQ mode and press SEQ again to disable it.'], ['PRESETS does not change sound', 'With SEQ enabled, adjust Voice on page 2.'], ['Arpeggio continues after release', 'Turn off Latch on ARP page 2, or disable ARP.'], ['Sync is on but nothing plays', 'Check incoming MIDI clock; turn Sync off when not using external clock.']])),
        section('power-audio', '电量与连接', list('出现 LOW BATTERY 时先充电，等警告消失再继续。', '耳机有噪声或插入后扬声器不停：检查是否使用说明书建议的 TRS 插头。', 'USB 已连但录不到声音：先区分 MIDI 与音频，再按音频输出的连接流程录制。') + p('参见' + link('midi', 'MIDI 与音频连接') + '。'),
          'Power and audio', list('When LOW BATTERY appears, charge until the warning clears.', 'For headphone noise or a speaker that does not mute, check for the TRS plug recommended in the manual.', 'USB connected but no recorded sound: distinguish MIDI from audio and use the audio-output recording workflow.') + p('See ' + link('midi', 'MIDI and audio') + '.')),
      ],
    },
    {
      id: 'sources', group: ['查阅', 'Reference'], title: ['资料与适用范围', 'Sources and scope'],
      summary: ['根据项目文件夹中的官方说明书整理，页码均为 PDF 文件页码。', 'Based on the official manual supplied in the project folder. References use PDF file page numbers.'],
      keywords: '官方 说明书 资料 来源 修订 版本 FM-1-manual.pdf revision manual sources', sources: ['controls', 'parameters', 'effects', 'modulation', 'edit', 'settings', 'save', 'arp', 'sequence', 'midi', 'ports'],
      sections: [
        section('version', '来源文件', p('设备：M-VAVE FM-1。来源：<strong>FM-1-manual.pdf</strong>，31 页，中英文。说明书修订：<strong>2026-08-10</strong>；核对：<strong>2026-10-15</strong>。') + p('英文正文为 PDF 第 2–15 页，中文正文为第 18–30 页。引用使用 PDF 页码，与页脚印刷编号不同。原文件位于项目上级文件夹，本网页未重新分发 PDF。') + note('教程为非官方整理。说明书未标明具体固件版本；设备页面有差异时，先核对对应版本说明，不把修订日期当作固件版本号。'),
          'Source file', p('Device: M-VAVE FM-1. Source: <strong>FM-1-manual.pdf</strong>, 31 pages, bilingual. Manual revision: <strong>2026-08-10</strong>. Checked: <strong>2026-10-15</strong>.') + p('English text is on PDF pages 2–15; Chinese text is on pages 18–30. References use PDF page numbers, which differ from printed footer numbers. The supplied PDF is in the parent project folder and is not redistributed by this website.') + note('This is an unofficial learning guide. The manual does not identify an exact firmware version. Check the relevant version documentation if your device differs; the revision date is not a firmware version.')),
        section('pages', '说明书索引', table(['主题', '中文 PDF 页', '英文 PDF 页'], [['旋钮、八度、预设', '18–19', '2–3'], ['参数表', '20–22', '4–6'], ['FX / SEL / ENV / LFO', '22–23', '7–8'], ['EDIT / GLO', '23–24、28', '8–9、13'], ['HOME / SAVE / ARP', '25–26', '9–10'], ['SEQ / REC / PLAY', '26–27', '10–12'], ['MIDI / 接口 / 电源', '29–30', '14–15']]),
          'Manual index', table(['Topic', 'Chinese PDF pages', 'English PDF pages'], [['Knobs, octave, presets', '18–19', '2–3'], ['Parameter tables', '20–22', '4–6'], ['FX / SEL / ENV / LFO', '22–23', '7–8'], ['EDIT / GLO', '23–24, 28', '8–9, 13'], ['HOME / SAVE / ARP', '25–26', '9–10'], ['SEQ / REC / PLAY', '26–27', '10–12'], ['MIDI / ports / power', '29–30', '14–15']])),
        section('limits', '未补造的操作', list('未提供官方固件刷写教程：当前说明书未覆盖该流程。', '未列出完整 MIDI CC 表、音色导出或备份命令。', '未确认 USB 音频；音频录制按 3.5 mm 输出说明。', 'Felucca 的多引擎、四轨、工程、采样与快捷层另有教程，在左侧切换查看。'),
          'Documentation boundaries', list('Firmware flashing is not covered by the supplied manual, so no stock flashing procedure is added.', 'A complete MIDI CC table, voice export, and backup commands are not documented.', 'USB audio is not confirmed; audio recording instructions use the 3.5 mm output.', 'Felucca engines, four tracks, projects, samples, and shortcut layers are covered in its separate guide. Switch guides in the sidebar.')),
      ],
    },
  ];
  const references = {
    controls: [[18, 19], [2, 3]], parameters: [[20, 21, 22], [4, 5, 6]],
    effects: [[20, 22, 23], [4, 5, 7]], modulation: [[21, 23], [5, 7, 8]],
    edit: [[21, 23, 24, 28], [5, 6, 8, 9, 13]], settings: [[22, 24], [6, 9]],
    save: [[25], [9, 10]], arp: [[22, 25, 26], [6, 10]],
    sequence: [[22, 26, 27], [6, 10, 11, 12]], midi: [[29], [14]], ports: [[29, 30], [14, 15]],
  };
  const locales = {};
  for (const [language, position] of [['zh', 0], ['en', 1]]) {
    const sources = Object.fromEntries(Object.entries(references).map(([id, translations]) => {
      const pageNumbers = translations[position];
      return [id, { title: `FM-1-manual.pdf · PDF ${language === 'zh' ? '第 ' : 'pp. '}${pageNumbers.join(', ')}${language === 'zh' ? ' 页' : ''}`, document: 'FM-1-manual.pdf', pages: pageNumbers }];
    }));
    const pages = chapters.map((chapter) => ({ ...chapter, group: chapter.group[position], title: chapter.title[position], summary: chapter.summary[position], sections: chapter.sections.map((item) => ({ id: item.id, ...item[language] })) }));
    locales[language] = Object.freeze({ pages, sources, manualRevision: '2026-08-10', checkedAt: '2026-10-15' });
  }
  window.FM1OfficialLocales = Object.freeze(locales);
})();

/* Independently written bilingual JIANT guide. Evidence and branch boundaries: docs/jiant-source.md. */
(() => {
  const chapters = [
  {
    "id": "quick-start",
    "group": [
      "入门",
      "Getting started"
    ],
    "title": [
      "快速开始",
      "Quick start"
    ],
    "summary": [
      "先确认版本，再选轨、选声音和保存。",
      "Check the version, choose a track and sound, then save."
    ],
    "keywords": "JIANT 新手 开始 first sound ALGORITHM PRESETS",
    "sources": [
      "readme",
      "editions",
      "manual"
    ],
    "sections": [
      {
        "id": "before-start",
        "zh": {
          "title": "先确认版本",
          "body": "<ul><li>本教程核对 JIANT main 提交 c6e7aa1 的 README 与源码。main 包含 0.9.18 开发线；公开安装器使用单独的 0.9.9-par 系列，功能不完全相同。</li><li>安装器默认 SAMPLE par13b，其次 ADDITIVE par10 和 STANDARD par12（stable）。先在设备 ABOUT 与安装器确认实际版本。</li><li>调低 MASTER，先备份已有作品。此手册不会执行刷机。</li></ul>"
        },
        "en": {
          "title": "Check your version",
          "body": "<ul><li>This guide follows README and source at JIANT main commit c6e7aa1. Main contains the 0.9.18 development line; public installers use separately pinned 0.9.9-par revisions with different features.</li><li>The public installer defaults to SAMPLE par13b, followed by ADDITIVE par10 and STANDARD par12 (stable). Check ABOUT on the device and the installer selection first.</li><li>Start with MASTER low and back up existing music. This manual does not flash firmware.</li></ul>"
        }
      },
      {
        "id": "first-sound",
        "zh": {
          "title": "选轨并弹奏",
          "body": "<ul><li>HOME 回主画面，ALGORITHM 选当前轨，PRESETS 浏览音色。默认 TRACKS 4 时只能选前四轨，TRACKS 6 才启用 T5、T6。</li><li>弹琴键并慢慢提高音量；按 EDIT 打开引擎参数，KNOB 1–4 对应屏幕四列。</li><li>先学会保存，再尝试随机化和 GEN；这些操作可能改变当前作品。</li></ul>"
        },
        "en": {
          "title": "Play a sound",
          "body": "<ul><li>Press HOME, choose a track with ALGORITHM and a sound with PRESETS. TRACKS 4 exposes four tracks; enable TRACKS 6 for T5 and T6.</li><li>Play keys and raise the volume gradually. EDIT opens engine parameters; KNOB 1–4 match the four screen columns.</li><li>Learn saving before trying dice or GEN, which can change the working music.</li></ul>"
        }
      }
    ]
  },
  {
    "id": "controls",
    "group": [
      "入门",
      "Getting started"
    ],
    "title": [
      "导航与快捷层",
      "Navigation and layers"
    ],
    "summary": [
      "区分按钮、SELECT 翻页与按住的快捷层。",
      "Distinguish section buttons, SELECT navigation and held layers."
    ],
    "keywords": "导航 按键 SELECT SEL SCL HOME navigation layers",
    "sources": [
      "readme",
      "editions",
      "manual"
    ],
    "sections": [
      {
        "id": "gestures",
        "zh": {
          "title": "六条导航规则",
          "body": "<ul><li>SELECT 在当前组的页面链逐页移动，到两端停止。功能键从外部回到上次页面，在组内跳到下一模块。</li><li>PRESETS 选音色；SEQ 内选 pattern；GEN 内选风格。ALGORITHM 始终选轨，KNOB 1 通常选当前对象。</li><li>按住功能键进入快捷层，松开返回。HOME + SELECT 打开 GEN；EDIT / SEQ / LFO / FX + SELECT 触发各自随机化，GLO + SELECT 调速度。</li><li>机身音阶键在本手册写作 SEL；上游称 SCL，屏幕 SCL 名称保持原样。SELECT 是另一个旋钮。</li></ul>"
        },
        "en": {
          "title": "Six navigation rules",
          "body": "<ul><li>SELECT walks the current section chain and stops at its ends. A section button returns to its last page from elsewhere, or jumps to its next group from inside.</li><li>PRESETS chooses sounds, patterns in SEQ and genres in GEN. ALGORITHM always selects a track; KNOB 1 usually selects the object being edited.</li><li>Hold a button for its layer; release to return. HOME + SELECT opens GEN; EDIT / SEQ / LFO / FX + SELECT rolls their dice; GLO + SELECT sets tempo.</li><li>This guide calls the physical scale key SEL. Upstream calls it SCL; literal screen SCL labels stay unchanged. SELECT is a separate knob.</li></ul>"
        }
      },
      {
        "id": "menu",
        "zh": {
          "title": "菜单与负载",
          "body": "<ul><li>按住 HOME 约 0.7 秒打开菜单。0.9.18 开发线的菜单分 SCREEN、AUDIO、MIDI、USB、SYSTEM 五组；SELECT 翻页，ALGORITHM 换组，HOME 关闭。</li><li>五格负载表反映音频计算负载。TRACKS 4 可节省资源；LOAD 的 FULL / LITE / ECO 逐级简化重效果，工程参数保留。</li><li>旧手册的菜单路径对应 0.6.30，不能当作所有安装器版本的菜单表。</li></ul>"
        },
        "en": {
          "title": "Menu and load",
          "body": "<ul><li>Hold HOME about 0.7 s for the menu. In the 0.9.18 development line its tabs are SCREEN, AUDIO, MIDI, USB and SYSTEM; SELECT walks pages, ALGORITHM changes tabs, HOME closes it.</li><li>The five-bar meter shows audio load. TRACKS 4 saves resources; LOAD FULL / LITE / ECO progressively simplifies heavy processing while retaining project settings.</li><li>The old manual describes 0.6.30 menus and is not a menu map for every installer version.</li></ul>"
        }
      }
    ]
  },
  {
    "id": "sound-design",
    "group": [
      "声音",
      "Sound"
    ],
    "title": [
      "引擎、调制与宏",
      "Engines, modulation and macros"
    ],
    "summary": [
      "按安装器分支选择声音，不混用引擎列表。",
      "Choose engines for the installed edition."
    ],
    "keywords": "声音 引擎 STRING ADD SAMPLE DRUM-X ANIMAL VOICE macros M1 M4 FM6",
    "sources": [
      "readme",
      "editions",
      "manual"
    ],
    "sections": [
      {
        "id": "engines",
        "zh": {
          "title": "各分支的引擎",
          "body": "<ul><li>STANDARD par12 有 DRUM（DRUM-X）、VOICE、ANIMAL、LOFI、ANALOG、FM6、PHASE、WHEEL、NOISE、STRING 十种引擎。</li><li>ADDITIVE par10 保留 ADD；SAMPLE par13b 用 SAMPLE 替换 ADD。它们是不同修订，不是功能完全相同的两种构建。</li><li>EDIT 调声音；ENV / LFO 的 DEST 页面分配调制。FM6 使用独立的运算器与包络编辑，不照搬官方固件教程。</li></ul>"
        },
        "en": {
          "title": "Edition-specific engines",
          "body": "<ul><li>STANDARD par12 has ten engines: DRUM (DRUM-X), VOICE, ANIMAL, LOFI, ANALOG, FM6, PHASE, WHEEL, NOISE and STRING.</li><li>ADDITIVE par10 retains ADD; SAMPLE par13b replaces ADD with SAMPLE. These are different revisions, not otherwise identical builds.</li><li>EDIT changes the sound; ENV / LFO DEST pages assign modulation. FM6 has operator and envelope editing; stock-firmware instructions do not apply.</li></ul>"
        }
      },
      {
        "id": "macros",
        "zh": {
          "title": "四个演奏宏",
          "body": "<ul><li>按住 LFO 后四旋钮控制 M1–M4；松开后宏层保持，再按 LFO 退出。</li><li>宏层中 F3 为正在演奏的轨随机分配路由，G3 清除路由。需要精确设置时到 LFO → MOD，以 M1–M4 为 SRC。</li><li>EDIT + SELECT 随机变化当前声音，OCT+ 保留、OCT− 取消；GLO + G4 撤销最近一次大修改，再按可重做。</li></ul>"
        },
        "en": {
          "title": "Four performance macros",
          "body": "<ul><li>Hold LFO for M1–M4 on the four knobs. The macro layer stays latched on release; press LFO again to leave.</li><li>With macros open, F3 rolls routes on playing tracks and G3 clears routes. Assign them explicitly in LFO → MOD using SRC M1–M4.</li><li>EDIT + SELECT rolls a sound variation; OCT+ keeps it, OCT− cancels. GLO + G4 undoes the last big change; repeat to redo.</li></ul>"
        }
      }
    ]
  },
  {
    "id": "drums",
    "group": [
      "声音",
      "Sound"
    ],
    "title": [
      "DRUM-X 鼓机",
      "DRUM-X drums"
    ],
    "summary": [
      "从鼓组 MORPH 到单声编辑与演奏静音。",
      "Morph kits, edit sounds and perform mutes."
    ],
    "keywords": "DRUM-X 鼓 MORPH kit mute X-MOD",
    "sources": [
      "readme",
      "editions",
      "manual"
    ],
    "sections": [
      {
        "id": "kit",
        "zh": {
          "title": "鼓组与单声",
          "body": "<ul><li>选 DRUM 轨，KNOB 1 MORPH 在鼓组 A、B 两侧之间变化。EDIT → SOUND、SOUND 2、SOUND 3 编辑 BD、SD、CP、CH、OH、TM、RS、CB。</li><li>FOLD 改击打波形，FM ENV 改起音。EDIT → X-MOD 用 RATE、DEPTH、SHAPE、RAND 自动变化 MORPH；INIT 会关闭它。</li></ul>"
        },
        "en": {
          "title": "Kit and sound editing",
          "body": "<ul><li>On a DRUM track, KNOB 1 MORPH blends kit sides A and B. EDIT → SOUND, SOUND 2 and SOUND 3 edit BD, SD, CP, CH, OH, TM, RS and CB.</li><li>FOLD shapes the hit and FM ENV changes its attack. EDIT → X-MOD modulates MORPH with RATE, DEPTH, SHAPE and RAND; INIT disables it.</li></ul>"
        }
      },
      {
        "id": "performance",
        "zh": {
          "title": "演奏与静音",
          "body": "<ul><li>DRUM 轨 OCT +1、+2、+3 为 ×2、×4、×8 连击；−1、−2、−3 为 SHORT、GHOST、FLAM。</li><li>按住 EDIT + 前八个黑键分别静音八种鼓声。GLO + 黑键 7–10 按 KICK、SNARE、HAT、PERC 分组静音。</li><li>不要套用 SLOOP 的第 4 轨十六路鼓声映射；JIANT 的鼓机和键位属于自己的引擎。</li></ul>"
        },
        "en": {
          "title": "Performance and mutes",
          "body": "<ul><li>On DRUM, octave +1, +2 and +3 give ×2, ×4 and ×8 ratchets; −1, −2 and −3 give SHORT, GHOST and FLAM.</li><li>Hold EDIT with black keys 1–8 to mute individual sounds; GLO with black keys 7–10 mutes KICK, SNARE, HAT and PERC groups.</li><li>Do not copy SLOOP track-4 sixteen-sound mappings: JIANT uses its own drum engine and controls.</li></ul>"
        }
      }
    ]
  },
  {
    "id": "effects",
    "group": [
      "声音",
      "Sound"
    ],
    "title": [
      "效果与现场演奏",
      "Effects and performance"
    ],
    "summary": [
      "区分效果页面和按住 FX 的现场效果。",
      "Use effect pages and the held-FX performance layer."
    ],
    "keywords": "FX TAPE EQ PUNCH DUCK REVERB GLITCH effects performance",
    "sources": [
      "readme",
      "editions",
      "manual"
    ],
    "sections": [
      {
        "id": "pages",
        "zh": {
          "title": "效果页面",
          "body": "<ul><li>FX 页面提供单轨 DIST、AUTOPAN，和延迟、混响、合唱、MASTER 等处理；SELECT 沿页面链移动。</li><li>MASTER 的 CLIP、PUNCH、DUCK 分别改变饱和、鼓的密度和底鼓驱动的起伏。</li><li>par9 起的更新说明包含 TAPE 与四段 EQ；不要把这些当作旧 0.6.30 手册已有功能。</li></ul>"
        },
        "en": {
          "title": "Effect pages",
          "body": "<ul><li>FX pages include track DIST and AUTOPAN, delay, reverb, chorus and MASTER processing. SELECT walks their chain.</li><li>MASTER CLIP adds saturation, PUNCH changes drum density and DUCK adds kick-driven pumping.</li><li>The par9 update notes include TAPE and four-band EQ; these are outside the old 0.6.30 manual.</li></ul>"
        }
      },
      {
        "id": "punch",
        "zh": {
          "title": "临时效果与自动化",
          "body": "<ul><li>按住 FX 后琴键成为效果控制，松开效果键停止。部分音符效果与扫频可在播放且 REC 待命时写入片段效果轨。</li><li>FX + G5 擦除效果自动化；播放中只擦播放头经过处，停止时可清整条。REPEAT、静音与锁定效果不按同一方式录入。</li><li>GLO 黑键 1–6 切轨静音；F3–D4 按住独奏 T1–T6；E4 取消所有静音。</li></ul>"
        },
        "en": {
          "title": "Punch-ins and automation",
          "body": "<ul><li>Hold FX to use keys as effects; release their keys to end them. Selected note effects and sweeps can record into the section lane during playback with REC armed.</li><li>FX + G5 erases the lane under the playhead, or the whole lane while stopped. REPEAT, mutes and latched effects do not record in the same way.</li><li>GLO with black keys 1–6 toggles track mutes; hold F3–D4 for T1–T6 solos; E4 unmutes all.</li></ul>"
        }
      }
    ]
  },
  {
    "id": "sequencing",
    "group": [
      "编曲",
      "Sequencing"
    ],
    "title": [
      "录音、音序与生成",
      "Recording, sequencing and generation"
    ],
    "summary": [
      "先录音，再尝试非破坏演奏与生成器。",
      "Record parts, then explore performance and generation."
    ],
    "keywords": "REC SEQ GEN seq2 MUTATE PLAYHEADS STRETCH COMP AUTO generator recording",
    "sources": [
      "readme",
      "editions",
      "manual"
    ],
    "sections": [
      {
        "id": "record",
        "zh": {
          "title": "实时与步进",
          "body": "<ul><li>REC 为当前轨待命，PLAY 控制播放；运行中转参数旋钮可录自动化。短按 SEQ 查看步骤与钢琴卷帘。</li><li>当前 README 的 par 系列使用 seq2，共享钢琴卷帘和 STEP、LENGTH/TRACK、MUTATE、PLAYHEADS、STRETCH、COMP、AUTO 页面；早期手册的布局不能逐页套用。</li><li>先备份再清理：按住 REC 再按某功能键清该部分自动化；SEQ + REC 询问 CLEAR ALL SEQUENCES，OCT+ 才确认。不要与反向按键顺序混淆。</li></ul>"
        },
        "en": {
          "title": "Recording and steps",
          "body": "<ul><li>REC arms the selected track and PLAY controls transport. Turning parameter knobs during playback can record automation. Tap SEQ for steps and the piano roll.</li><li>The current README describes par seq2 with a shared piano roll and STEP, LENGTH/TRACK, MUTATE, PLAYHEADS, STRETCH, COMP and AUTO pages. Early manual layouts do not map page for page.</li><li>Back up before clearing: hold REC then a section button to clear that section of automation. SEQ + REC asks CLEAR ALL SEQUENCES; OCT+ confirms. Reversing the button order is different.</li></ul>"
        }
      },
      {
        "id": "generator",
        "zh": {
          "title": "GEN 与撤销",
          "body": "<ul><li>HOME + SELECT 打开 GEN，选择风格后按 OCT+ 生成；PRESETS 在 GEN 选风格，不换声音。</li><li>生成可能改变引擎、音序、调性、速度和效果。先存入片段，保留原作品；GLO + G4 撤销。</li><li>main 的 0.9.18 新增功能不能仅凭版本号当作已进入每个 par 构建；使用 README 的分支说明核对。</li></ul>"
        },
        "en": {
          "title": "GEN and undo",
          "body": "<ul><li>HOME + SELECT opens GEN. Choose a genre and press OCT+ to generate; PRESETS chooses genres here, not sounds.</li><li>Generation can replace engines, patterns, harmony, tempo and effects. Save a section first; GLO + G4 undoes the change.</li><li>Do not assume every 0.9.18 feature exists in every par build; use the branch notes in README.</li></ul>"
        }
      }
    ]
  },
  {
    "id": "saving",
    "group": [
      "保存与连接",
      "Saving and connections"
    ],
    "title": [
      "片段、歌曲与备份",
      "Sections, songs and backup"
    ],
    "summary": [
      "区分音色、A–D 片段与八个工程。",
      "Distinguish sounds, A–D sections and eight projects."
    ],
    "keywords": "SAVE USER SECTIONS PROJECTS ARRANGE backup autosave scene 保存 歌曲 工程",
    "sources": [
      "readme",
      "editions",
      "manual"
    ],
    "sections": [
      {
        "id": "save-project",
        "zh": {
          "title": "保存与载入",
          "body": "<ul><li>SAVE → USER 保存音色（32 槽）；SECTIONS 保存当前工程的 A–D；PROJECTS 选择 1–8 工程和其中片段。按屏幕提示用 OCT+ 确认。</li><li>从其他组按 SAVE，USER 与 SECTIONS 会准备保存操作；SAVE、OCT+、OCT+ 按命名与确认提示完成。SAVE + C5 打开命名。</li><li>按住 SAVE 转 KNOB 1 选工程，停止状态松开时会载入该工程 A，替换工作音乐且没有 UNDO。不要把选工程当作选保存槽。</li><li>上游说明自动保存在停止后最后修改约 10 秒、每分钟最多一次；关机不会自动保存。重要作品手动保存，关机前停止并等待。</li></ul>"
        },
        "en": {
          "title": "Save and load",
          "body": "<ul><li>SAVE → USER stores sounds (32 slots); SECTIONS stores A–D in the current project; PROJECTS selects projects 1–8 and their sections. Follow OCT+ confirmation prompts.</li><li>SAVE from another section arms saving on USER and SECTIONS; SAVE, OCT+, OCT+ follows naming and confirmation. SAVE + C5 opens naming.</li><li>Hold SAVE and turn KNOB 1 to choose a project. Releasing while stopped loads its section A, replacing the working music without UNDO. This is not just choosing a save destination.</li><li>Upstream describes autosave after about 10 seconds since the last stopped edit, at most once a minute. Power-off does not save. Save important work manually, then stop and wait before switching off.</li></ul>"
        }
      },
      {
        "id": "arrange",
        "zh": {
          "title": "A–D 与歌曲",
          "body": "<ul><li>按住 SAVE：F3–B3 演奏 A–D，播放中下一小节切换；C4–F4 保存至 A–D。D5 切 LOOP / SONG，E5 为 SONG REC。</li><li>SAVE → ARRANGE 最多 16 行，每行选片段和小节数；KNOB 4 给行保存 scene（静音、宏、效果），END 可设一次、重复或循环。</li><li>通过上游网页编辑器导出备份。切换固件前保留独立文件，不假定不同固件的工程可互读。SAMPLE 音频另行备份原始 WAV。</li></ul>"
        },
        "en": {
          "title": "Arrange a song",
          "body": "<ul><li>Hold SAVE: F3–B3 launch A–D, queued to the next bar while playing; C4–F4 store A–D. D5 toggles LOOP / SONG; E5 is SONG REC.</li><li>SAVE → ARRANGE supports up to 16 rows with section and bar count. KNOB 4 stores a scene (mutes, macros, effects); END selects once, repeats or a loop.</li><li>Export a backup through the upstream web editor. Keep separate files before changing firmware; do not assume cross-firmware project compatibility. Keep original WAVs separately for SAMPLE.</li></ul>"
        }
      }
    ]
  },
  {
    "id": "samples",
    "group": [
      "保存与连接",
      "Saving and connections"
    ],
    "title": [
      "SAMPLE 分支与采样",
      "SAMPLE edition and samples"
    ],
    "summary": [
      "仅适用于 SAMPLE par13b，安装不会自动写入采样库。",
      "For SAMPLE par13b; installation does not populate its bank."
    ],
    "keywords": "SAMPLE par13b ADD par10 par12 WAV ADPCM KIT KEYS 6144 采样",
    "sources": [
      "readme",
      "editions",
      "manual"
    ],
    "sections": [
      {
        "id": "load",
        "zh": {
          "title": "加载采样库",
          "body": "<ul><li>仅 SAMPLE par13b 支持此采样流程，稳定 par12 不含 SAMPLE；刷新编辑器不能给旧固件增加引擎。</li><li>编辑器 Sound → Load factory samples 先在浏览器准备采样，检查列表后 Send to the device 会替换整个设备采样库。</li><li>设备选 SAMPLE → KIT KEYS，出厂十二声分布于 C4–B4。也可导入自己的 WAV。</li></ul>"
        },
        "en": {
          "title": "Load a sample bank",
          "body": "<ul><li>This workflow requires SAMPLE par13b. Stable par12 has no SAMPLE; refreshing the editor cannot add the engine to older firmware.</li><li>Editor Sound → Load factory samples stages a bank in the browser. Review it before Send to the device, which replaces the entire device sample bank.</li><li>Choose SAMPLE → KIT KEYS on a track; the twelve factory sounds occupy C4–B4. You can also import your own WAVs.</li></ul>"
        }
      },
      {
        "id": "limits",
        "zh": {
          "title": "容量与版本切换",
          "body": "<ul><li>最多 15 个单声道采样，共享包含头部的 6144 字节 IMA ADPCM 库，适合短小低保真声音。出厂库为 5406 字节，使用 2、4、8 kHz。</li><li>安装器不会自动装出厂采样；工程备份不包含采样音频，必须保留原始 WAV。</li><li>par10 的引擎槽 13 是 ADD，par13b 是 SAMPLE，声音不会自动转换；切换前备份。网页模拟器采样库只影响浏览器，不写入连接的 FM-1。</li></ul>"
        },
        "en": {
          "title": "Capacity and edition changes",
          "body": "<ul><li>Up to 15 mono samples share a 6144-byte IMA ADPCM bank including headers. This is short lo-fi storage. The factory bank uses 5406 bytes at 2, 4 and 8 kHz.</li><li>The installer does not load factory samples automatically. Project backups exclude sample audio; keep original WAVs.</li><li>Engine slot 13 is ADD in par10 and SAMPLE in par13b, with no sound conversion. Back up before switching. Emulator banks affect only the browser, not an attached FM-1.</li></ul>"
        }
      }
    ]
  },
  {
    "id": "shortcuts",
    "group": [
      "查阅",
      "Reference"
    ],
    "title": [
      "按键速查",
      "Control reference"
    ],
    "summary": [
      "JIANT 的组合键独立于 Felucca 和 SLOOP。",
      "JIANT combinations differ from Felucca and SLOOP."
    ],
    "keywords": "快捷 按键 shortcuts HOME SELECT SAVE REC GLO UNDO",
    "sources": [
      "readme",
      "editions",
      "manual"
    ],
    "sections": [
      {
        "id": "buttons",
        "zh": {
          "title": "常用按键",
          "body": "<ul><li>HOME 返回主画面，按住打开菜单；PLAY 播放 / 停止；REC 当前轨录音待命。</li><li>ALGORITHM 选轨；PRESETS 选声音（SEQ 为 pattern，GEN 为风格）；SELECT 翻页。</li><li>HOME + SELECT：GEN；EDIT + SELECT：声音随机化；GLO + SELECT：速度；GLO + G4：撤销 / 重做。</li></ul>"
        },
        "en": {
          "title": "Common controls",
          "body": "<ul><li>HOME returns home; hold for menu. PLAY starts / stops; REC arms the selected track.</li><li>ALGORITHM selects a track; PRESETS chooses sounds (patterns in SEQ, genres in GEN); SELECT walks pages.</li><li>HOME + SELECT: GEN; EDIT + SELECT: sound dice; GLO + SELECT: tempo; GLO + G4: undo / redo.</li></ul>"
        }
      },
      {
        "id": "saving",
        "zh": {
          "title": "保存与清理",
          "body": "<ul><li>SAVE + C5 命名；SAVE + OCT+ 保存当前片段，SAVE + OCT− 重新载入。留意屏幕确认和当前页面。</li><li>REC 先按住再按功能键：清该组自动化；SEQ + REC：请求清全部音序，OCT+ 确认。</li><li>LFO 宏层松开后保持，再按 LFO 退出；这不等同于 SLOOP 的 HOME 锁层。</li></ul>"
        },
        "en": {
          "title": "Saving and clearing",
          "body": "<ul><li>SAVE + C5 names; SAVE + OCT+ stores the current section and SAVE + OCT− recalls it. Check the current page and prompts.</li><li>Hold REC before a section button to clear its automation. SEQ + REC asks to clear all sequences; OCT+ confirms.</li><li>The LFO macro layer stays latched on release; press LFO again to leave. This differs from SLOOP HOME layer locking.</li></ul>"
        }
      }
    ]
  },
  {
    "id": "sources",
    "group": [
      "查阅",
      "Reference"
    ],
    "title": [
      "资料、版本与安装",
      "Sources, versions and installation"
    ],
    "summary": [
      "注明 main、公开安装器及旧手册的区别。",
      "Separate main, public installer revisions and the old manual."
    ],
    "keywords": "JIANT 来源 版本 main par13b par10 par12 0.9.18 0.6.30 firmware install",
    "sources": [
      "readme",
      "editions",
      "manual",
      "installer",
      "editor",
      "emulator",
      "interactive"
    ],
    "sections": [
      {
        "id": "version",
        "zh": {
          "title": "资料适用范围",
          "body": "<ul><li>核对日期 2026-10-28，main 快照 c6e7aa189525043806e6b3052dd1f8b3c39c3e33。主要依据 README 的 Current versions、导航、操作和保存章节，以及 EDITIONS.json。未发现发布 tag。</li><li>docs/MANUAL.md 自称 v0.6.30，只作历史补充。main 含 0.9.18 开发线，安装器的 par13b / par10 / par12 单独固定，不把开发功能一概标成稳定版。</li><li>本教程独立编写、非官方；未连接硬件、未刷机，不代表所有分支的硬件操作已验证。</li></ul>"
        },
        "en": {
          "title": "Evidence and scope",
          "body": "<ul><li>Checked 2026-10-28 at main snapshot c6e7aa189525043806e6b3052dd1f8b3c39c3e33. Primary evidence: README Current versions, navigation, controls and saving, plus EDITIONS.json. No release tags were found.</li><li>docs/MANUAL.md identifies v0.6.30 and is historical supplementary material. Main contains the 0.9.18 development line; installer par13b / par10 / par12 revisions are pinned separately. Development features are not all stable features.</li><li>This is an independently written unofficial guide. No hardware was connected or flashed; branch-specific hardware behaviour has not been tested.</li></ul>"
        }
      },
      {
        "id": "install",
        "zh": {
          "title": "安装与上游工具",
          "body": "<ul><li>通过下方上游安装器操作，使用 Chrome / Edge、USB 数据线和 MIDI 权限。先导出备份，核对目标版本与安装器对当前固件的要求，不直接覆盖未知固件。</li><li>旧手册要求从其他自定义固件先返回官方 V15；以当前安装器检查为准。保留原始 WAV 和旧工程，更新期间不要拔线。</li><li>模拟器、交互手册、安装器与编辑器随 main 更新，其页面内容可能新于本教程固定快照。</li></ul><ul><li><a href=\"https://github.com/juanjiant-bit/JIANT/blob/c6e7aa189525043806e6b3052dd1f8b3c39c3e33/README.md\" target=\"_blank\" rel=\"noopener noreferrer\">JIANT README (main snapshot)</a></li><li><a href=\"https://github.com/juanjiant-bit/JIANT/blob/c6e7aa189525043806e6b3052dd1f8b3c39c3e33/web/EDITIONS.json\" target=\"_blank\" rel=\"noopener noreferrer\">Installer editions</a></li><li><a href=\"https://github.com/juanjiant-bit/JIANT/blob/c6e7aa189525043806e6b3052dd1f8b3c39c3e33/docs/MANUAL.md\" target=\"_blank\" rel=\"noopener noreferrer\">Historical manual (0.6.30)</a></li><li><a href=\"https://juanjiant-bit.github.io/JIANT/webapp/installer/\" target=\"_blank\" rel=\"noopener noreferrer\">JIANT installer</a></li><li><a href=\"https://juanjiant-bit.github.io/JIANT/webapp/editor/\" target=\"_blank\" rel=\"noopener noreferrer\">JIANT editor</a></li><li><a href=\"https://juanjiant-bit.github.io/JIANT/emu/\" target=\"_blank\" rel=\"noopener noreferrer\">JIANT emulator</a></li><li><a href=\"https://juanjiant-bit.github.io/JIANT/manual/\" target=\"_blank\" rel=\"noopener noreferrer\">JIANT interactive</a></li></ul>"
        },
        "en": {
          "title": "Installation and upstream tools",
          "body": "<ul><li>Use the upstream installer below with Chrome / Edge, a USB data cable and MIDI permission. Export a backup and check the target revision and installer requirements for the current firmware before writing.</li><li>The old manual requires returning other custom firmware to official V15 first; follow the current installer checks. Keep original WAVs and old projects, and do not unplug while writing.</li><li>The emulator, interactive manual, installer and editor update with main and can differ from this pinned snapshot.</li></ul><ul><li><a href=\"https://github.com/juanjiant-bit/JIANT/blob/c6e7aa189525043806e6b3052dd1f8b3c39c3e33/README.md\" target=\"_blank\" rel=\"noopener noreferrer\">JIANT README (main snapshot)</a></li><li><a href=\"https://github.com/juanjiant-bit/JIANT/blob/c6e7aa189525043806e6b3052dd1f8b3c39c3e33/web/EDITIONS.json\" target=\"_blank\" rel=\"noopener noreferrer\">Installer editions</a></li><li><a href=\"https://github.com/juanjiant-bit/JIANT/blob/c6e7aa189525043806e6b3052dd1f8b3c39c3e33/docs/MANUAL.md\" target=\"_blank\" rel=\"noopener noreferrer\">Historical manual (0.6.30)</a></li><li><a href=\"https://juanjiant-bit.github.io/JIANT/webapp/installer/\" target=\"_blank\" rel=\"noopener noreferrer\">JIANT installer</a></li><li><a href=\"https://juanjiant-bit.github.io/JIANT/webapp/editor/\" target=\"_blank\" rel=\"noopener noreferrer\">JIANT editor</a></li><li><a href=\"https://juanjiant-bit.github.io/JIANT/emu/\" target=\"_blank\" rel=\"noopener noreferrer\">JIANT emulator</a></li><li><a href=\"https://juanjiant-bit.github.io/JIANT/manual/\" target=\"_blank\" rel=\"noopener noreferrer\">JIANT interactive</a></li></ul>"
        }
      }
    ]
  }
];
  const sources = {
  "readme": {
    "title": "JIANT README (main snapshot)",
    "url": "https://github.com/juanjiant-bit/JIANT/blob/c6e7aa189525043806e6b3052dd1f8b3c39c3e33/README.md"
  },
  "editions": {
    "title": "Installer editions",
    "url": "https://github.com/juanjiant-bit/JIANT/blob/c6e7aa189525043806e6b3052dd1f8b3c39c3e33/web/EDITIONS.json"
  },
  "manual": {
    "title": "Historical manual (0.6.30)",
    "url": "https://github.com/juanjiant-bit/JIANT/blob/c6e7aa189525043806e6b3052dd1f8b3c39c3e33/docs/MANUAL.md"
  },
  "installer": {
    "title": "JIANT installer",
    "url": "https://juanjiant-bit.github.io/JIANT/webapp/installer/"
  },
  "editor": {
    "title": "JIANT editor",
    "url": "https://juanjiant-bit.github.io/JIANT/webapp/editor/"
  },
  "emulator": {
    "title": "JIANT emulator",
    "url": "https://juanjiant-bit.github.io/JIANT/emu/"
  },
  "interactive": {
    "title": "JIANT interactive",
    "url": "https://juanjiant-bit.github.io/JIANT/manual/"
  }
};
  const locales = {};
  for (const [language, position] of [['zh', 0], ['en', 1]]) {
    const pages = chapters.map((chapter) => ({ ...chapter, group: chapter.group[position], title: chapter.title[position], summary: chapter.summary[position], sections: chapter.sections.map((section) => ({ id: section.id, ...section[language] })) }));
    const sourceTitles = language === 'zh' ? { readme: 'JIANT README（固定快照）', editions: '安装器分支', manual: '历史手册（0.6.30）', installer: 'JIANT 安装器', editor: 'JIANT 编辑器', emulator: 'JIANT 模拟器', interactive: 'JIANT 交互手册' } : {};
    const localizedSources = Object.fromEntries(Object.entries(sources).map(([id, source]) => [id, { ...source, title: sourceTitles[id] || source.title }]));
    locales[language] = Object.freeze({ pages, sources: localizedSources, version: 'main c6e7aa1', checkedAt: '2026-10-28' });
  }
  window.FM1JiantLocales = Object.freeze(locales);
})();

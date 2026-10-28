/* Original Chinese instructional content; source references accompany each chapter. */
(() => {
  const key = (label) => `<kbd>${label}</kbd>`;
  const code = (label) => `<code>${label}</code>`;
  const link = (id, label, section = '') => `<a href="#/${id}${section ? `/${section}` : ''}">${label}</a>`;
  const p = (text) => `<p>${text}</p>`;
  const list = (...items) => `<ul>${items.map((item) => `<li>${item}</li>`).join('')}</ul>`;
  const steps = (...items) => `<ol class="steps">${items.map((item) => `<li>${item}</li>`).join('')}</ol>`;
  const note = (text, title = '注意') => `<aside class="callout"><strong>${title}</strong><p>${text}</p></aside>`;
  const table = (headers, rows) => `<div class="table-scroll" tabindex="0" role="region" aria-label="${headers.map((text) => text.replace(/<[^>]*>/g, '')).join('、').replace(/&/g, '&amp;').replace(/"/g, '&quot;')}"><table><thead><tr>${headers.map((h) => `<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const section = (id, title, body) => ({ id, title, body });
  const source = (title, url) => ({ title, url });
  const sources = {
    firmware: source('Felucca 固件仓库', 'https://github.com/hugelton/Felucca'),
    controls: source('官方手册：Controls', 'https://github.com/hugelton/Felucca/wiki/Controls'),
    features: source('官方手册：Features', 'https://github.com/hugelton/Felucca/wiki/Features'),
    engines: source('官方手册：Engines', 'https://github.com/hugelton/Felucca/wiki/Engines'),
    menu: source('官方手册：Menu', 'https://github.com/hugelton/Felucca/wiki/Menu'),
    scales: source('官方手册：Scale Keyboard', 'https://github.com/hugelton/Felucca/wiki/Scale-Keyboard'),
    troubleshooting: source('官方手册：Troubleshooting', 'https://github.com/hugelton/Felucca/wiki/Troubleshooting'),
    releases: source('官方手册：Release Notes', 'https://github.com/hugelton/Felucca/wiki/Release-Notes'),
    input: source('源码：ui_input.c（按键与录音）', 'https://github.com/hugelton/Felucca/blob/v1.6.1/firmware/src/ui_input.c'),
    layer: source('源码：ui_layer.c（快捷层）', 'https://github.com/hugelton/Felucca/blob/v1.6.1/firmware/src/ui_layer.c'),
    ui: source('源码：ui.c（页面与预设）', 'https://github.com/hugelton/Felucca/blob/v1.6.1/firmware/src/ui.c'),
    editor: source('官方网页编辑器', 'https://hugelton.github.io/Felucca/webapp/editor/'),
    emulator: source('官方浏览器试玩', 'https://hugelton.github.io/Felucca/webapp/try/'),
  };

  const pages = [
    {
      id: 'quick-start', group: '入门', title: '快速开始',
      summary: '已刷入 Felucca？从选音色、弹奏到录下第一段循环。',
      keywords: '新手 入门 上手 第一次 开始 声音 REC PLAY PRESETS', sources: ['controls', 'input', 'features'],
      sections: [
        section('before-start', '开始前',
          list('准备已安装 Felucca 的 FM-1，开机并把主音量调低。', '使用内置扬声器，或插入耳机；插入耳机会关闭内置扬声器。', '确认固件版本。本手册以 <strong>v1.6.1</strong> 为准，旧版页面可能不同。') +
          note('保存已有作品后再练习。切换预设会替换当前音色的修改；清除音序会删除当前音轨的录音。', '先保留已有作品')),
        section('first-sound', '1. 选择音色并弹奏',
          steps(`短按 ${key('HOME')}，回到首页。若正显示 MIXER 或 CLOCK，继续短按直到回到 HOME。`, `转动 ${key('ALGORITHM')}，选择音轨 1。`, `慢慢转动 ${key('PRESETS')}，选择一个预设音色。`, '按住任意琴键，逐渐调高主音量。换几个预设，比较声音。') +
          p('结果：按键时能听到声音，屏幕上的音轨编号是 1。没有声音时查看' + link('troubleshooting', '声音检查清单', 'no-sound') + '。')),
        section('first-loop', '2. 录下一个循环',
          steps(`保持在 HOME 页。长按 ${key('SEQ')}，把 ${key('KNOB 1')} 的 LEN 设为 16、${key('KNOB 2')} 的 DIV 设为 1/16，然后松开。`, `转动 ${key('SELECT')}，将 BPM 调到约 90。SELECT 被改成其他用途时，在 HOME 的 CLOCK 页设置 BPM。`, `短按 ${key('REC')}。在 HOME 页，停止状态下这会启用录音并启动播放。`, '弹几个单音。旋律会随循环重复；录音持续开启时，新弹的音会继续叠加。', `再短按 ${key('REC')}，退出当前音轨的录音。此时循环继续播放。`, `短按 ${key('PLAY')} 停止；再按一次，检查录音。`) +
          note('这里的“录音”保存的是音符和演奏动作，不是麦克风录音。电脑录制音频见' + link('midi', 'USB 音频', 'usb-audio') + '。', '录的是音符')),
        section('next', '3. 保存并继续',
          p('按' + link('saving', '保存工程', 'save-project') + '保留全部音轨、音色和音序。接着阅读' + link('controls', '面板与按键') + '，熟悉短按、长按与确认操作。') +
          table(['想做什么', '阅读章节'], [
            ['先弄清按钮', link('controls', '面板与按键')],
            ['逐个输入音符', link('step-recording', '步进编曲')],
            ['加入鼓点和贝斯', link('drums', '鼓机') + '、' + link('tracks', '多轨与混音')],
          ])),
      ],
    },
    {
      id: 'controls', group: '入门', title: '面板与按键',
      summary: '先读屏幕，再转旋钮。同一个控件在不同页面可能有不同作用。',
      keywords: 'HOME ALGORITHM SELECT KNOB PRESETS 面板 按钮 旋钮 长按 双击 返回 确认', sources: ['controls', 'input', 'layer', 'menu'],
      sections: [
        section('gestures', '短按、长按与双击', table(['操作', '含义'], [
          ['短按', '按下后松开。页面按钮通常在松开时执行；重复短按可循环切换该组页面。'],
          ['长按', '按住不放，查看快捷层。根据屏幕上的琴键映射操作，松开后退出。'],
          ['双击', '快速按两次快捷层按钮，将快捷层保持打开；再短按该按钮关闭。'],
        ]) + p('支持快捷层的按钮：' + ['FX', 'GLO', 'SEL', 'EDIT', 'REC', 'SEQ'].map(key).join('、') + '。' + key('HOME') + ' 长按打开菜单，' + key('SAVE') + ' 长按撤销，' + key('LFO') + ' 配合旋钮作临时修改。') + note('机身按键写作 SEL，位于 FX 与 ENV 之间；它打开的音阶页面在 Felucca 中名为 ' + code('SCL') + '。SELECT 是另一只旋钮。', '按键名与页面名')),
        section('knobs', '旋钮的作用', table(['控件', '通常用途', '例外'], [
          [key('ALGORITHM'), '选择音轨 1–4', '菜单中选择分类标签；快捷层中按屏幕提示操作。'],
          [key('PRESETS'), '切换预设音色', '列表中选条目，菜单中选设置行，特定编辑页中有其他作用。'],
          [key('SELECT'), '调整 BPM', code('CONTROL > SELECT') + ' 可改为翻页、调制轮或力度。'],
          [key('KNOB 1–4'), '调整屏幕上对应的四个参数', '参数随页面、引擎和快捷层变化，以屏幕标签为准。'],
        ])),
        section('confirm', '返回与确认', list(
          `${key('HOME')}：离开编辑页面，回到 HOME；在 HOME 组内可轮换 MIXER、CLOCK。`,
          `长按 ${key('HOME')}：打开设置菜单；再短按 HOME 关闭。`,
          `操作页和确认对话框中，${key('OCT+')} 执行或确认，${key('OCT−')} 返回或取消。`,
          '平常弹奏时，OCT− / OCT+ 改变键盘八度；不要把所有页面中的 OCT+ 都当作确认。',
        )),
        section('screen', '读懂屏幕', list('顶部显示当前音轨、音序所用工程槽、播放状态和 BPM。', '星号表示当前内容有修改。工程槽 A–D 不等于音轨 1–4。', 'HOME 默认的四个参数由当前引擎决定；HOME 设为 LEVELS 后，它们变成四轨音量。') + p('全部按钮对应页面见' + link('shortcuts', '按键速查') + '。')),
      ],
    },
    {
      id: 'presets', group: '声音', title: '预设与引擎', summary: '预设是调好的音色；引擎决定声音怎样产生。',
      keywords: '音色 预设 引擎 PRESETS EDIT ANALOG FM6 SAMPLE DRUM 选择 切换', sources: ['engines', 'ui', 'layer', 'features'],
      sections: [
        section('choose', '选择预设', steps(`回到 HOME，用 ${key('ALGORITHM')} 选定要修改的音轨。`, `转动 ${key('PRESETS')} 换音色，并按琴键试听。`, '要按列表浏览，重复短按 SAVE 到 PRESETS 页；按屏幕标签选择分类和条目。') + note('加载音色不会替换该轨的音序，但会替换正在编辑的声音。保留修改请先存入 USER。', '换音色前')),
        section('engine', '切换引擎', steps(`长按 ${key('EDIT')}，查看引擎快捷层。`, '按屏幕标出的引擎键选择引擎；也可使用该层中标为 ENGINE 的旋钮。', '松开 EDIT，按琴键试听，再选择该引擎的预设。') + p('引擎快捷键以屏幕映射为准。机身 ALGORITHM 旋钮在常规页面用于选音轨，不是直接切换合成算法。')),
        section('engine-list', '13 种引擎', table(['引擎', '声音特点', '适合先试'], [
          ['ANALOG', '虚拟模拟：振荡器、滤波器', '贝斯、主旋律'], ['FM6', '六运算器 FM', '电钢琴、铃铛、金属音'],
          ['PHASE', '相位失真', '明亮的合成音'], ['LOFI', '芯片音乐、低保真', '游戏音色'],
          ['SAMPLE', '内置乐器与用户采样', '钢琴、长笛'], ['VOICE', '元音共振峰', '人声质感'],
          ['TRIO', '三个振荡器、同步与环形调制', '厚实的合成音'], ['WHEEL', '音轮风琴', '风琴'],
          ['GRAIN', '颗粒合成', '铺底、纹理'], ['PHYS', '物理建模', '拨弦、敲击'],
          ['NOISE', '噪声与金属质感', '音效'], ['SLICE', '切片播放', '拆解鼓循环'], ['DRUM', '八路合成鼓', '鼓点'],
        ])),
        section('start-simple', '新手练习', p('先选 ANALOG。选一个 BASS 预设，弹低音；再选 PAD 预设，听声音如何缓慢起落。能区分声音后，再读' + link('sound-design', '调整音色') + '。')),
      ],
    },
    {
      id: 'sound-design', group: '声音', title: '调整音色', summary: '每次只改一个参数，边弹边听。', keywords: '合成器 滤波器 包络 ENV ATTACK RELEASE CUTOFF EDIT FM6 参数', sources: ['ui', 'engines', 'input'],
      sections: [
        section('main', '先用首页四个旋钮', steps('选好预设，停留在 HOME。', '记下当前数值，按住琴键，慢慢转动 KNOB 1。', '听到变化后，换下一个旋钮；先不要同时改变四个参数。') + note('首页参数随引擎变化。如果四个标签都是 LEVEL，HOME 使用了 LEVELS 视图；到 EDIT 页调整声音。', '看参数名')),
        section('envelope', '包络：控制声音的起落', p('短按 ENV，按屏幕标签找到以下参数：') + table(['参数', '听感', '练习'], [
          ['ATTACK', '从按键到声音变响的时间', '调短：立即发声；调长：缓慢进入。'],
          ['DECAY', '起音后向持续音量变化的时间', '改变音头收回的速度。'],
          ['SUSTAIN', '持续按键时的保持音量', '调低后，声音起音后会变弱。'],
          ['RELEASE', '松开琴键后消失的时间', '调短：立刻收尾；调长：保留尾音。'],
        ]) + p('不同引擎可能还有自己的包络。FM6 的 OP ENV 是运算器包络，与这里的入门练习分开学习。')),
        section('filter', '滤波器：改变明暗', p('在 ANALOG 上，短按 EDIT 翻到 FILTER 页。降低低通滤波器的截止频率，声音会变暗；提高后更明亮。共振会突出截止点附近的频率。') + note('低频率、高共振可能让声音明显变小或突然变尖。先降低音量，小幅调整。', '试听建议')),
        section('undo', '临时试听与撤销', list(`按住 ${key('LFO')} 再转参数旋钮，松开 LFO 后参数恢复。适用于声音和效果参数页。`, `想保留临时修改，在仍按住 LFO 时按 ${key('OCT+')}。`, `长按 ${key('SAVE')} 撤销最近一步操作；它不是完整的多步历史。`) + p('喜欢的声音按' + link('saving', '保存用户音色', 'save-sound') + '存起来。')),
      ],
    },
    {
      id: 'scales', group: '声音', title: '音阶与和弦', summary: '用音阶约束减少错音，用和弦模式一键演奏多个音。', keywords: 'SEL SCL SCALE ROOT QNT WHITE CHORD 和弦 白键 调性 音阶 OCT', sources: ['scales', 'menu'],
      sections: [
        section('white', '只用白键演奏', steps('短按 SEL，打开 ' + code('SCL') + ' 页，找到 ROOT、SCALE 和 QNT。', '先把 ROOT 设为 C，SCALE 设为 MIN（小调）或 MAJ（大调）。', '把 QNT 设为 WHITE。依次弹几个白键。') + p('结果：白键依次播放所选音阶里的音。WHITE 模式下黑键不发声；这不是故障。OCT− / OCT+ 仍可切换八度。')),
        section('quantize', 'QNT 模式', table(['模式', '作用'], [
          ['OFF', '正常的半音键盘。'], ['SNAP', '保留所有琴键，把音高向下对齐到音阶。'],
          ['WHITE', '把音阶音排列在白键上，黑键静音。'], ['SEQ', '键盘按 SNAP 工作，播放中的音序也跟随当前根音和音阶；不改写原音符。'],
          ['SEQ+T', '在 SEQ 基础上，让音序跟随 TRN 移调。'],
        ]) + note('这里的 QNT 是“音高对齐”。音序器的 QUANTIZE 是“时间对齐”，两者不同。鼓轨和输入的 MIDI 保留各自的音符映射。', '两种量化')),
        section('chords', '一键和弦', steps('再次短按 SEL，切换到 CHORD 页。', '把 CHRD 从 OFF 改为音阶三和弦或七和弦模式。', '按一个琴键，听多个音同时发声；用 VOIC 改变和弦排列。') + p('四轨共用 8 个声部。和弦、长尾音与多轨叠加时，可能出现旧音被新音替换。')),
      ],
    },
    {
      id: 'live-recording', group: '音序器与多轨', title: '实时录音', summary: '边播放边弹奏，把演奏记录到循环里。', keywords: 'REC PLAY 实时 录音 循环 节拍器 CLICK COUNT-IN LEN DIV BPM 清除', sources: ['input', 'layer', 'features'],
      sections: [
        section('length', '设置循环长度与速度', steps('选择音轨并回到 HOME。', '长按 SEQ 打开 SEQ TOOLS：KNOB 1 调 LEN（步数），KNOB 2 调 DIV（每步时值）。先设 LEN 16、DIV 1/16。', '松开 SEQ，用 SELECT 调 BPM。若 SELECT 已改为其他功能，到 HOME > CLOCK 调整。') + p('16 步 × 每步 1/16，在常见 4/4 拍中相当于一小节。BPM 设为 90，留出练习时间。')),
        section('click', '开启节拍器与预备拍', steps('长按 HOME 打开菜单。ALGORITHM 选 AUDIO，PRESETS 选对应设置行。', '把 ' + code('CLICK = REC') + '、COUNT-IN = 1 BAR 设好，用 KNOB 1–4 或 OCT− / OCT+ 改值。', '短按 HOME 关闭菜单。') + p('CLICK 只送到耳机和扬声器，不会被录进音序，也不送到 USB 音频。COUNT-IN 不在外部时钟同步时使用。')),
        section('record', '录制与回放', steps('保持在 HOME，短按 REC 启用当前轨录音。停止状态下会同时启动播放；设置了 COUNT-IN 时先等待预备拍。', '跟着节拍弹几个单音。循环返回开头后，可继续叠加音符。', '再次短按 REC，退出当前轨录音；播放继续。', '短按 PLAY 停止，再按 PLAY 回放。') + note('如果停在 SEQ > STEP 的钢琴卷帘页，REC 进入的是步进输入。要实时录音，先回 HOME。', '起始页面不同，行为不同')),
        section('clear', '清除与重录', steps('先停止播放，确认当前选中的音轨。', '长按 REC，在屏幕键位图中找到 CLEAR，按对应琴键。', '松开 REC，重新录制。误清除后立即长按 SAVE 撤销。') + note('CLEAR 会清除当前轨的音序及自动化。其他音轨不受影响；重要内容先保存工程。', '清除范围')),
      ],
    },
    {
      id: 'step-recording', group: '音序器与多轨', title: '步进编曲', summary: '不要求跟上节奏。停止播放后，逐步写入音符。', keywords: 'SEQ STEP REC 步进 音序器 输入 音符 和弦 休止 长度 CHANCE RATCH NUDGE VEL', sources: ['input', 'features', 'menu'],
      sections: [
        section('enter', '逐个输入音符', steps('选一个非 DRUM 音轨。短按 PLAY 停止播放。', '短按 SEQ，确认页面是 STEP 的钢琴卷帘；必要时继续翻页。', '转 KNOB 1，把光标移到第 1 步。短按 REC，启用步进输入，播放仍保持停止。', '按一个琴键后松开。默认 HOLD 模式下，音符写入当前步，松开后光标前进。', '依次输入几个音符，再短按 REC 退出输入。按 PLAY 回放。')),
        section('edit', '移动、修改和清除', table(['操作', '效果'], [
          [key('KNOB 1'), '移动当前步光标。'], [key('KNOB 2'), '调整当前步的音高。'],
          [key('KNOB 3'), '调整已有音符的长度；空白步可选择该步时值/休止状态。'],
          [key('KNOB 4'), '设置重音、滑音等标记。'],
          ['STEP 页短按 ' + key('EDIT'), '清除光标处的步并移到下一步。'],
        ]) + note('STEP 页的 EDIT 是“清除当前步”，不会打开音色编辑。先回 HOME 再按 EDIT 可进入音色参数页。', 'EDIT 的上下文')),
        section('chord-entry', '输入和弦与空拍', list('默认 CHORD ENTRY = HOLD：按住的音符写入同一步，全部松开后光标前进。', 'CONTROL > CHORD ENTRY = ADD：每按一个键向当前步加入或移除一个音；转 KNOB 1 进入下一步。POLY 每步最多 4 个音，单音模式只保留一个音。', '需要空拍时，不输入音符，转 KNOB 1 越过该步。') + p('DRUM 使用鼓网格，操作见' + link('drums', '鼓机') + '。')),
        section('detail', '让循环有变化', p('再次短按 SEQ 到 DETAIL，选中有音符的一步：') + table(['旋钮', '参数', '用途'], [
          ['1', 'CHANCE', '降低触发概率；也可选条件步。'], ['2', 'RATCH', '把同一步分成 1–4 次连击。'],
          ['3', 'NUDGE', '微调触发时间；QUANTIZE 开启时播放仍对齐网格。'], ['4', 'VEL', '调整该步力度。'],
        ])),
      ],
    },
    {
      id: 'drums', group: '音序器与多轨', title: '鼓机', summary: 'DRUM 把一轨分成八路鼓；白键编排步骤，黑键选择鼓路。', keywords: 'DRUM KICK SNARE HAT 鼓机 鼓点 底鼓 军鼓 踩镲 网格', sources: ['engines', 'input', 'features'],
      sections: [
        section('kit', '选择鼓组', steps('用 ALGORITHM 选择一个暂未使用的音轨。', '长按 EDIT，按屏幕上的 DRUM 引擎键，松开 EDIT。', '选择一个鼓预设；在参数页用 KIT 更换鼓组。', '按 SEQ 到 STEP，确认屏幕显示鼓网格。')),
        section('beat', '编一小节鼓点', steps('长按 SEQ，设置 LEN = 16、DIV = 1/16 后松开。', '按屏幕标为 KICK 的黑键选底鼓路，在第 1、5、9、13 步的白键上放入鼓点。', '选择 SNARE 鼓路，在第 5、13 步放入军鼓。', '选择 HAT 鼓路，在第 1、3、5、7、9、11、13、15 步放入踩镲。', '按 PLAY 播放。再按已有鼓点的对应白键，可移除该鼓点。') + note('白键编号按屏幕步骤映射，不是按音名寻找。黑键在鼓网格中选择鼓路，不再按旋律琴键理解。', '先看屏幕网格')),
        section('balance', '调整鼓路', p('短按 EDIT 翻到 LANES / LANES 2，在屏幕对应旋钮上调整各鼓路音量。要临时静音单一路鼓，长按 EDIT，按屏幕映射中的黑键。') + p('整条鼓轨的音量和静音在' + link('tracks', '混音器') + '中调整。')),
      ],
    },
    {
      id: 'tracks', group: '音序器与多轨', title: '多轨与混音', summary: '四个音轨分别使用自己的引擎、音色和音序，一起播放。', keywords: '音轨 多轨 混音 MIXER GLO LEVEL PAN MUTE SOLO ALGORITHM 4轨 声部', sources: ['features', 'ui', 'layer'],
      sections: [
        section('arrange', '做一个三轨循环', table(['音轨', '内容建议', '做法'], [
          ['1', '鼓点', link('drums', 'DRUM 编鼓')], ['2', '贝斯', '选 ANALOG 的 BASS 预设，录几个低音单音。'],
          ['3', '旋律', '选喜欢的 LEAD / KEYS 预设，再录一条旋律。'], ['4', '留空或铺底', '熟悉后再加入，避免一开始过于拥挤。'],
        ]) + p('每次换轨后先核对屏幕编号。切轨不会停止已经播放的其他轨。')),
        section('mixer', '调整音量、声像和静音', steps('从 HOME 再短按 HOME，到 MIXER。', 'ALGORITHM 选音轨。按屏幕标签用 KNOB 1–4 调 LEVEL、PAN、REV 和 MUTE。', '先降低音量过大的轨，再微调其他轨。MUTE 可以让某轨暂时不发声，音序仍保留。') + p('长按 GLO 也能快速操作四轨的静音、独奏和音量；按照快捷层屏幕映射使用。')),
        section('voices', '理解 8 个共享声部', p('声部是“同时发声的一个音”。四轨合计共用 8 个声部，不是每轨 8 个。和弦、长 RELEASE、UNISON 会增加占用。') + list('出现音符被截断时，先缩短 RELEASE。', '减少同时按下的音，或减少 UNISON。', '先完成鼓、贝斯和单音旋律，再增加和弦。')),
      ],
    },
    {
      id: 'saving', group: '保存', title: '保存与载入', summary: '保留一个声音用 USER；保留整段作品用 PROJECT。', keywords: 'SAVE USER PROJECT 工程 项目 保存 载入 覆盖 撤销 槽位 PHRASES 备份', sources: ['controls', 'features', 'input', 'ui', 'editor'],
      sections: [
        section('what-to-save', '三种保存对象', table(['对象', '用途', '数量'], [
          ['USER', '用户预设。保留音色；部分预设也可携带音型。不要用它代替整首工程。', '32 个槽'],
          ['PROJECT', '完整工程：四轨的音色、音序和工程设置。', 'A–D，共 4 个槽'],
          ['PHRASES', '向当前轨加载音型。加载音型与加载音色是两件事。', '按屏幕列表'],
        ])),
        section('save-sound', '保存用户音色', steps('停止播放，选择要保存的音轨。', '短按 SAVE 到 USER 页。KNOB 1 选择一个槽，先确认槽中是否已有内容。', '选择屏幕上的 SAVE 操作，按 OCT+。若出现覆盖确认，只在确认允许替换时继续。', '在命名页面按屏幕提示用琴键输入名字，按 OCT+ 完成写入。', '确认屏幕显示保存成功，再离开。') + note('空槽与已有槽的确认次数可能不同。以当前的 SAVE、OVERWRITE 和命名提示为准，OCT− 可取消。', '不要盲按确认')),
        section('save-project', '保存整个工程', steps('停止播放。重复短按 SAVE，直到 PROJECT 页。', '选择 A–D 中的目标槽，检查已有工程名称。', '选择 SAVE 操作，按 OCT+；若有覆盖提示，核对槽位后确认。', '输入工程名，再按 OCT+ 写入。确认成功提示。') + p('后续修改后，重新保存到同一槽会覆盖原工程。要保留两个版本，使用两个不同槽。')),
        section('load-backup', '载入、自动恢复与备份', list('载入工程：在 PROJECT 页选已用槽和 LOAD，按 OCT+。先保存当前未保存的修改。', 'RESTORE LAST 默认可在重启时恢复上次状态，但自动保存只在停止且空闲时写入。完成作品仍应手动保存 PROJECT。', '使用官方网页编辑器备份工程、用户预设、采样和设备设置；备份不包含 FM6 外部音色库，必须另外保留其 .syx 文件。', '加载音色通常不改音序；加载 PHRASES 会替换当前轨的音型。') + note('版本回退前先备份。包含条件步的新版工程不能保证在旧版打开。', '版本兼容')),
      ],
    },
    {
      id: 'effects', group: '进阶', title: '效果与现场操作', summary: '先学混响和延迟，再尝试临时效果。', keywords: 'FX 混响 延迟 失真 REVERB DELAY INSERT SLICER LATCH 现场 演奏', sources: ['engines', 'features', 'layer', 'menu'],
      sections: [
        section('send', '混响与延迟', steps('选定音轨，短按 FX，按屏幕标签翻到需要的效果页。', '小幅增加该轨的 REVERB 或 DELAY 发送量，边弹边听。', '调整效果的全局参数前，注意其他轨也可能在使用同一发送效果。') + table(['效果', '听感'], [['REVERB', '延长空间尾音。HALL / ROOM / SPRING 对应不同空间质感。'], ['DELAY', '重复回声，可跟随 BPM。'], ['CHORUS', '让声音更宽、更有晃动感。'], ['INSERT', '每轨的插入处理，如失真、压碎、移相、合唱；MIX 控制干湿比例。']])),
        section('perform', '按住 FX 表演', steps('播放一段循环，长按 FX。', '按屏幕映射中的白键，尝试 REPEAT、FILTER、FREEZE 等效果。', '松开效果键和 FX，回到原来的播放。') + note('FX LATCH = ON 时，效果键变成开关，松开后可能继续生效。按 FX 层的 OCT− 可关闭锁定效果。', '效果没有消失时')),
        section('slicer', 'SLICER 与 SLICE 的区别', table(['名称', '是什么'], [['SLICER', 'FX 中的节奏门控/重复效果，可用于任意轨。'], ['SLICE', '一种引擎，把采样切成片段，再用琴键触发。']]) + p('先掌握常规录音，再学习采样切片。')),
      ],
    },
    {
      id: 'modulation', group: '进阶', title: 'LFO 与参数变化', summary: '让参数随时间变化：循环变化用 LFO，按步骤变化用参数锁。', keywords: 'LFO MOD 调制 参数锁 自动化 AUTOMATION LOCK RATE DEPTH', sources: ['features', 'input', 'controls'],
      sections: [
        section('lfo', 'LFO：周期性变化', p('LFO 是自动来回变化的控制信号，例如让滤波器反复明暗变化。短按 LFO，查看 RATE / SYNC；再翻到 LFO DEST 选择目标和深度。') + list('RATE：独立速度；SYNC：跟随节拍的时值。', '先把深度调小，确认声音如何变化。', 'MOD 是四槽调制矩阵，熟悉单个 LFO 后再使用。')),
        section('locks', '只改变某一步', steps('先到 HOME 或音色参数页，选择想要锁定的那组四个参数。', '进入 SEQ > STEP。钢琴卷帘中先停止播放并短按 REC 启用步进输入，再按住要写入当前步的琴键；鼓网格直接按住对应步骤白键。', '保持步骤按住，转 KNOB 1–4，给这一步设置参数值。', '松开后回放，比较这一步与其他步骤。') + note('按住步骤时，四个旋钮对应最近使用的可锁定声音页，不是 STEP 页平常的四个编辑参数。', '看屏幕参数标签')),
        section('automation', '查看与清除自动化', p('重复短按 SEQ 到 AUTOMATION，查看各步的参数锁、自动化以及概率、力度等事件。按屏幕选中记录再修改；EDIT 可删除选中事件。') + list('按住步骤时短按 EDIT：清除这些步骤的参数锁。', '没有按住步骤时，在 STEP 页按 EDIT：清除当前步骤。', '四轨共用 128 条参数锁/自动化记录，避免不必要的密集变化。')),
      ],
    },
    {
      id: 'midi', group: '进阶', title: '连接电脑与 MIDI', summary: 'USB 可传输 MIDI 和设备输出的音频。二者用途不同。', keywords: '电脑 USB MIDI 音频 录制 DAW 编辑器 Web macOS 通道 导出', sources: ['features', 'menu', 'editor'],
      sections: [
        section('usb-audio', '把声音录进电脑', steps('用可传数据的 USB 线连接 FM-1 与电脑。', '在录音软件中选择 Felucca 作为音频输入设备，创建立体声音轨。', '先检查输入电平，再开始录音并播放 FM-1 工程。') + p('设备支持 44.1 / 48 kHz，采样率由电脑选择。SPEAKER EQ 会同时影响耳机和 USB 音频，录制时建议 FLAT。USB LEVEL = FIXED 可固定 USB 输出电平。') + note('macOS 13–15 若找不到音频输入，按官方说明尝试 SYSTEM > USB SERIAL = OFF，再重新连接。', 'macOS 兼容')),
        section('midi-channel', '用 MIDI 控制四轨', p('长按 HOME，在 MIDI 分类中设置 MIDI IN：') + table(['模式', '用途'], [['CH1-4', '通道 1–4 分别控制音轨 1–4。'], ['CH5-8 / CH9-12 / CH13-16', '用指定的连续四个通道分别控制音轨 1–4。'], [code('SEL'), '所有输入通道都控制当前选中音轨；这是路由模式名。'], ['TRACK', '用 T1–T4 CHANNEL 为每轨设置 1–16、OMNI 或 OFF。']]) + p('MIDI IN 与 T1–T4 CHANNEL 随工程保存。MIDI 传的是音符和控制消息，不是音频；导出声音用上面的 USB 音频流程。')),
        section('web-editor', '网页编辑器', p('<a href="' + sources.editor.url + '" target="_blank" rel="noopener noreferrer">打开官方编辑器</a>，使用支持 Web MIDI 的浏览器并允许设备访问。它可编辑参数、音序、采样和 FM6 音色，也可备份数据。') + p('没有设备时，可用<a href="' + sources.emulator.url + '" target="_blank" rel="noopener noreferrer">官方浏览器试玩</a>熟悉页面。试玩不是本手册内置模拟器。')),
      ],
    },
    {
      id: 'settings', group: '进阶', title: '常用设置', summary: '设置按 DISPLAY、CONTROL、AUDIO、MIDI、SYSTEM 分类。', keywords: '设置 菜单 HOME LARGE HELP BPM LOCK SCREEN OFF SELECT RESTORE LAST COLOR', sources: ['menu', 'ui', 'input'],
      sections: [
        section('navigate-menu', '操作菜单', steps('长按 HOME 打开菜单。', '转 ALGORITHM 选择分类，转 PRESETS 选择设置行。', '转任意 KNOB 1–4，或按 OCT− / OCT+ 改值。INFO 等条目用 OCT+ 打开。', '短按 HOME 关闭菜单。')),
        section('recommended', '入门时有用的设置', table(['位置', '设置', '作用'], [
          ['DISPLAY', 'LARGE = ON', '增大四个参数的标签与数值。'], ['SYSTEM', 'HELP = ON', '打开页面/快捷层时显示简短提示。'],
          ['CONTROL', 'BPM LOCK = ON', '避免普通转动 SELECT 意外改速度；GLO + SELECT 或 CLOCK 仍能调 BPM。'],
          ['CONTROL', 'STEP PREVIEW = ON', '停止状态下移动步进光标时试听该步。'], ['AUDIO', code('CLICK = REC'), '只在录音时响节拍器。'],
          ['AUDIO', 'COUNT-IN = 1 BAR', '录音开始前等待一小节。'],
        ])),
        section('home-view', '首页显示模式', table([code('DISPLAY > HOME'), '作用'], [['SCOPE', '默认波形示波器；四旋钮调整当前引擎参数。'], ['TRACKS', '显示四轨概况，四旋钮仍调整当前引擎参数。'], ['LEVELS', '显示四轨概况，KNOB 1–4 分别调整四轨音量。']])),
        section('settings-scope', '设置与工程', p('显示颜色、按键偏好等属于设备设置，不是工程内容。为了跟随教程，先确认 ' + code('CONTROL > SELECT') + '、' + code('DISPLAY > HOME') + ' 和 CHORD ENTRY 是否仍是默认行为。')),
      ],
    },
    {
      id: 'shortcuts', group: '查阅', title: '按键速查', summary: '常规页面、快捷层和菜单中，控件的含义不同。', keywords: '按键 快捷键 速查 HOME FX SAVE REC EDIT GLO SEL SCL LFO SEQ ARP ENV', sources: ['controls', 'input', 'layer'],
      sections: [
        section('buttons', '页面按钮', table(['按钮', '短按 / 连续翻页', '长按'], [
          [key('HOME'), 'HOME / MIXER / CLOCK', '菜单'], [key('SEQ'), 'STEP / DETAIL / AUTOMATION', 'SEQ TOOLS'],
          [key('SAVE'), 'USER / PRESETS / PHRASES / PROJECT / TOOLS', '撤销最近操作'], [key('GLO'), 'SONG', '四轨静音、独奏、音量等'],
          [key('EDIT'), 'EDIT / VOICE 系列；引擎专属页按情况出现', '引擎选择与专属快捷操作'],
          [key('FX'), '效果、SLICER、INSERT 等', '现场效果层'], [key('SEL'), '音阶 / CHORD', '音阶与和弦快捷层'],
          [key('REC'), '当前轨录音开关', 'CLEAR、CLICK、COUNT-IN、CLICK LEVEL'],
          [key('LFO'), 'LFO / LFO 2 / LFO DEST / MOD', '配合旋钮作临时参数变化'], [key('ENV'), '包络页面', '无常规快捷层'],
          [key('ARP'), '琶音器页面', '无常规快捷层'],
        ])),
        section('common-actions', '常用操作', table(['要做什么', '操作'], [
          ['切换音轨', '常规页面转 ALGORITHM。'], ['换预设', 'HOME 页转 PRESETS。'], ['播放 / 停止', '短按 PLAY。'],
          ['实时录音', 'HOME 页短按 REC；再按 REC 退出录音。'], ['步进输入', '停止播放，在非鼓轨 SEQ > STEP 页按 REC。'],
          ['保持快捷层打开', '双击 FX / GLO / SEL / EDIT / REC / SEQ；再短按同键关闭。'],
          ['确认 / 取消', '操作页和对话框内用 OCT+ / OCT−。'], ['恢复临时参数', '按住 LFO 转参数，松开后恢复。'],
        ])),
        section('context', '两个容易误按的地方', list('在 SEQ > STEP 页，EDIT 清除当前步；回 HOME 后 EDIT 才打开音色页。', '在菜单里，ALGORITHM 选分类、PRESETS 选设置行；先退出菜单再选音轨或预设。')),
      ],
    },
    {
      id: 'troubleshooting', group: '查阅', title: '常见问题', summary: '从当前页面、音轨和参数状态开始排查。', keywords: '问题 没声音 无声 黑屏 故障 录不进 录音 失灵 丢失 静音', sources: ['input', 'menu', 'scales', 'engines', 'troubleshooting'],
      sections: [
        section('no-sound', '按琴键没有声音', steps('检查主音量、耳机连接和当前轨的 LEVEL / MUTE。耳机插入后内置扬声器静音。', '按 HOME 回到常规演奏页。菜单、命名、快捷层和鼓网格中的琴键可能用于操作，而非演奏。', '若仅黑键无声，检查 ' + code('SCL > QNT') + ' 是否为 WHITE。', '换一个内置 ANALOG 预设试听，排除采样槽或特殊音色参数的影响。') + p('SAMPLE / GRAIN / SLICE 的采样缺失时可能显示 NO SAMPLE，并播放替代正弦音。')),
        section('recording', '录音行为和预期不同', table(['现象', '检查'], [['按 REC 后不播放', '是否在停止的 SEQ > STEP 钢琴卷帘页？这是步进输入，回 HOME 再录。'], ['越录音越多', '循环录音会叠加。录完再按 REC 退出；只按 PLAY 停止不等于取消录音待命。'], ['键盘在鼓页像按钮', '鼓网格白键是步骤，黑键是鼓路；属于正常映射。'], ['屏幕提示 STOP TO RECORD', '是否在 SONG 链式播放中？先停止，再进入常规音序录制。']])),
        section('controls-changed', '旋钮或效果“变了”', list('SELECT 不改速度：检查 BPM LOCK，以及 ' + code('CONTROL > SELECT') + ' 是否改成 PAGE / MODW / VEL。', '首页旋钮只改音量：检查 ' + code('DISPLAY > HOME') + ' 是否为 LEVELS。', 'FX 松开后仍有变化：检查 FX LATCH，或是否通过旋钮修改了常规效果参数。', 'NUDGE 改了但听不出：检查该轨 QUANTIZE；开启时播放仍对齐网格。')),
        section('lost-work', '重启后内容不对', p('RESTORE LAST 只在停止且空闲时写入恢复数据，不能替代手动保存。到 PROJECT 载入之前保存的工程。以后完成关键修改就保存，并定期在网页编辑器备份。')),
        section('black-screen', '屏幕黑了', list('音频仍播放：可能是 SCREEN OFF。碰一下按键或旋钮唤醒；第一次动作可能只唤醒屏幕。', '更新中断后完全无法开机：换数据线、关闭其他 MIDI 应用，再参考官方安装与恢复说明。') + p('固件恢复操作请按<a href="' + sources.troubleshooting.url + '" target="_blank" rel="noopener noreferrer">官方故障排查</a>执行。')),
      ],
    },
    {
      id: 'glossary', group: '查阅', title: '术语表', summary: '屏幕上的英文，对应什么操作。', keywords: '术语 英文 中文 翻译 BPM TRACK PRESET ENGINE PATTERN PROJECT 音序 量化', sources: ['features', 'engines', 'scales'],
      sections: [
        section('sound-terms', '声音', table(['英文', '中文', '含义'], [['ENGINE', '引擎', '产生声音的方法。'], ['PRESET', '预设', '已经调好的音色。'], ['VOICE', '声部', '同时发声的一个音；VOICE 引擎则是另一种名称含义。'], ['ENV', '包络', '声音或参数从开始到结束的变化。'], ['LFO', '低频振荡器', '让参数周期性变化的控制源。'], ['FX', '效果', '混响、延迟、失真等处理。'], ['LEVEL / PAN', '音量 / 声像', '声音大小 / 左右位置。']])),
        section('sequence-terms', '音序与时间', table(['英文', '中文', '含义'], [['TRACK', '音轨', '一个独立的声音与音序部分。'], ['PATTERN', '音型 / 音序', '按时间排列并循环播放的音符。'], ['STEP', '步', '音序中的一个时间格。'], ['LEN / DIV', '长度 / 时值', '步数 / 每步持续多久。'], ['BPM', '每分钟拍数', '整段的播放速度。'], ['SWING', '摇摆', '使部分步骤偏离均匀节奏。'], ['QUANTIZE', '时间量化', '把演奏的时间对齐到网格。'], ['CHANCE / RATCH', '概率 / 连击', '这一步多常触发 / 一步内重复次数。']])),
        section('save-terms', '保存与操作', table(['英文', '中文', '含义'], [['USER', '用户预设', '自己保存的声音槽。'], ['PROJECT', '工程', '四轨作品的完整状态。'], ['SAVE / LOAD', '保存 / 载入', '写入槽位 / 从槽位读取。'], ['CLEAR / ERASE', '清除 / 擦除', '删除指定内容，先看作用对象。'], ['UNDO', '撤销', '恢复最近一步操作。'], ['MUTE / SOLO', '静音 / 独奏', '让某轨不响 / 只听指定轨。']])),
      ],
    },
    {
      id: 'sources', group: '查阅', title: '资料与版本', summary: '本手册面向已安装 Felucca 的 FM-1 用户，依据官方 Wiki 与操作源码整理。', keywords: '官方 资料 版本 来源 教程 wiki 固件 模拟器 编辑器 GitHub', sources: ['firmware', 'controls', 'features', 'engines', 'menu', 'scales', 'releases', 'input', 'layer', 'ui'],
      sections: [
        section('version', '适用版本', p('适用设备：<strong>M-VAVE FM-1</strong>。内容基线：<strong>Felucca v1.6.1</strong>。核对日期：<strong>2026-10-28</strong>。') + p('操作源码链接固定到 v1.6.1；在线 Wiki 会更新。本手册不是固件发布页；使用不同版本时，以设备实际页面和对应版本发布说明为准。') + note('这是非官方中文学习资料，与 M-VAVE 及 Felucca 维护者无隶属关系。', '项目说明')),
        section('official', '官方手册', list(...['firmware', 'controls', 'features', 'engines', 'menu', 'scales', 'releases', 'troubleshooting'].map((id) => `<a href="${sources[id].url}" target="_blank" rel="noopener noreferrer">${sources[id].title}</a>`))),
        section('tools', '官方工具', list(...['editor', 'emulator'].map((id) => `<a href="${sources[id].url}" target="_blank" rel="noopener noreferrer">${sources[id].title}</a>`)) + p('这些工具需要联网，可能需要浏览器设备权限。手册本身可离线阅读。')),
        section('verification', '源码核对范围', list('ui_input.c：REC 的实时/步进输入差异、PLAY、旋钮、STEP 页编辑行为。', 'ui_layer.c：快捷层、双击保持、清除和现场效果。', 'ui.c：首页旋钮、预设加载及页面状态。') + p('手册内容为独立编写的中文操作说明，未复制固件代码。固件及其资源的许可见原仓库。')),
      ],
    },
  ];

  window.FeluccaManual = Object.freeze({ pages, sources, version: '1.6.1', checkedAt: '2026-10-28' });
})();

# FM-1 学习手册

面向 M-VAVE FM-1 新手。以目录—正文—本页目录布局，支持选择 **Felucca**、**SLOOP**、**JIANT** 或 **官方固件** 教程，四套内容均有完整中英文、双语全文搜索和按键速查。

Felucca 有 17 章，基线为 **v1.7.0**；SLOOP 有 18 章，基线为 **2.8.3** 发布版本；官方固件有 14 章，依据说明书修订。说明书未标明固件版本，不把修订日期当作版本号。四套教程均于 **2026-10-28** 复核。这是非官方学习资料。

Felucca 基线为 v1.7.0；SLOOP 基线为 v2.8.3（上游仍标为 beta），源码与指南链接固定到发布提交。JIANT 新增 10 章，以 main 提交 `c6e7aa1` 的 README 为主要依据，明确区分 0.9.18 开发线、公开安装器的 SAMPLE par13b / ADDITIVE par10 / STANDARD par12 和旧版 0.6.30 手册。官方教程仍依据提供的 PDF，未确认新的官方固件版本；官网产品页本次返回 HTTP 403。

来源核对记录：[Felucca](docs/felucca-fact-check.md)、[SLOOP](docs/sloop-source.md)、[JIANT](docs/jiant-source.md)。

## 阅读与开发

直接用现代浏览器打开 `index.html` 即可离线阅读。正文、样式和搜索均不请求外部服务；官方链接及 M-VAVE 官网标识需联网，标识无法加载时显示 M 图标。

在左侧目录顶部选择固件；手机端先打开“目录”。选择会保存在本机，重新切换时恢复该固件上次阅读的章节。目录、搜索、快捷操作和资料随固件切换，搜索同时匹配该固件的中英文内容。

右上角切换中文 / English，切换时保留章节和阅读位置。搜索支持 `Ctrl K` / `⌘ K` 或 `/`；上下键选择、Enter 打开、Esc 关闭。查询内容会保留，中文输入法组词期间不会触发跳转。

搜索入口在页头居中，搜索框保持固定位置和尺寸，结果区域独立滚动。手机与触屏布局隐藏 Ctrl K、Esc、方向键等提示，保留可点击的关闭操作。语言选择左侧的图标随固件切换：Felucca / SLOOP 进入各自 GitHub 仓库，官方固件进入 M-VAVE FM-1 产品页。

FM-1 Docs 标识使用方波与合成器面板细节。目录分组标题为 16px，明显大于章节链接；左右目录滚动条空闲时透明，滚动时显示，停止约 700ms 后隐藏，悬停不会触发。

可分享固件专属链接，例如 `#/official/step-recording/record`、`#/sloop/live-recording/free-take` 和 `#/felucca/saving/save-project`。浏览器前进 / 后退同时恢复固件与章节。旧链接 `#/saving/save-project` 仍指向 Felucca，不受本机固件偏好影响。

也可以使用 Node.js 20+ 启动预览，无需安装依赖：

```bash
npm run dev
```

默认地址：`http://127.0.0.1:4173`。支持 `--host`、`--port` 和 `--strictPort` 参数，端口占用时直接失败：

```bash
npm run dev -- --host 0.0.0.0 --port 4173 --strictPort
npm test
npm run build
npm run test:sites
npm run preview
```

构建输出在 `dist/client/`，可用于静态托管或 GitHub Pages；使用 hash 路由，刷新章节无需服务器重写。保留的 Product Design Worker 与 Sites 元数据在 `dist/server/` 和 `dist/.openai/`。

## 文件结构

- `index.html`：文档布局、导航与搜索对话框。
- `src/content.js`：章节、步骤、术语和来源链接。
- `src/content-en.js`：与中文章节对应的完整英文内容。
- `src/content-official.js`：基于官方 PDF 的完整中英文教程与页码来源。
- `src/content-sloop.js`：依据 SLOOP 2.8.3 发布资料独立编写的中英文教程。
- `src/content-jiant.js`：JIANT 的中英文教程，注明 main 与公开安装分支的适用范围。
- `src/firmwares.js`：四套固件的内容入口、版本信息和搜索建议。
- `src/locales.js`：中英文界面文案。
- `src/core.js`：路由解析、搜索与统一实体按键图标。
- `src/app.js`：章节渲染、目录、主题与键盘操作。
- `src/styles.css`：文档样式、移动端和打印布局。
- `scripts/`：无依赖开发服务器与构建。
- `tests/`：章节链接、搜索、请求处理和托管测试。
- `docs/official-manual-source.md`：官方说明书文件指纹、页码索引和核对范围。
- `docs/sloop-source.md`：SLOOP 2.8.3 来源与操作变化。
- `docs/felucca-fact-check.md`、`docs/other-guides-fact-check.md`：按已声明版本核对操作说明的记录。

## 内容维护

新增章节时提供唯一 `id`、章节组、摘要、搜索关键词、小节和来源。Felucca 先核对官方 Wiki，再用 `ui_input.c`、`ui_layer.c`、`ui.c` 确认上下文操作。官方固件以提供的说明书为准，在数据中保留 PDF 页码，并集中在“资料与适用范围”说明来源；各章不显示“本页来源”。未说明的操作不补造，修改教程时同步检查按键速查。

同一固件的两种语言保持相同的章节、小节 ID 和来源主题。当前开放四套教程；后续固件可扩展注册表与对应内容，不使用其他固件的教程代替。SLOOP 使用自己的 SEL 按键、HOME 锁层、REC 待命和 SECTION / A–D 操作。按键标签通过底色与细边框区分，不代表网页能遥控硬件。界面不使用入场、位移或缩放动效。

文案只保留操作、结果和必要提示；使用机身英文标签并给出中文含义。保持目录—正文—本页目录结构，不加入营销首屏、学习积分或装饰性硬件图。

实体音阶按键写作 **SEL**，编码器写作 **SELECT**；Felucca 屏幕中的 **SCL** 标签按实际显示保留。正文、标题、提示和表格中的实体按键及旋钮统一使用 Quick start 的按键图标，已有 `kbd` 不重复嵌套；屏幕参数值和源码标识可用 `code` 标记，保持原样。此处理覆盖三套固件的中英文页面，搜索索引和路由不受影响。

## 版本管理

远端：<https://github.com/itoyohane/fm1-learning-web>（原名 `felucca-learning-web`），主分支为 `main`。更改后运行测试和构建，再提交并推送；同步前先拉取远端历史，避免覆盖他人的修改。仓库包含自动验证工作流。

## 验证范围

自动检查覆盖四套固件、59 章的中英文结构与内部链接、固件路由兼容、阅读目的地、搜索隔离、SLOOP / 官方操作差异、静态资源和托管 Worker。2026-10-28 已按 Radix Slate / Indigo 色阶统一浅深主题，字号收敛为 12 / 16 / 24px，边框为 0.5px，移除冗余页头标签、装饰阴影和入场动效。本次通过 Chromium 检查桌面与手机尺寸的 JIANT 页面、双语搜索、语言切换和固件切换；无脚本错误或横向溢出。硬件刷写、音频和各安装器分支行为未实测，见 `design-qa.md`。

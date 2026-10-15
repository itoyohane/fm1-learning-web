# FM-1 学习手册

面向 M-VAVE FM-1 新手。以目录—正文—本页目录布局，支持选择 **Felucca** 或 **官方固件** 教程，两套内容均有完整中英文、双语全文搜索和按键速查。

Felucca 有 17 章，基线为 **v1.6.1**；官方固件有 14 章，依据说明书修订。说明书未标明固件版本，不把修订日期当作版本号。核对日期为 **2026-10-15**。这是非官方学习资料。

## 阅读与开发

直接用现代浏览器打开 `index.html` 即可离线阅读。正文、样式和搜索均不请求外部服务；官方链接及 M-VAVE 官网标识需联网，标识无法加载时显示 M 图标。

在左侧目录顶部选择固件；手机端先打开“目录”。选择会保存在本机，重新切换时恢复该固件上次阅读的章节。目录、搜索、快捷操作和资料随固件切换，搜索同时匹配该固件的中英文内容。

右上角切换中文 / English，切换时保留章节和阅读位置。搜索支持 `Ctrl K` / `⌘ K` 或 `/`；上下键选择、Enter 打开、Esc 关闭。查询内容会保留，中文输入法组词期间不会触发跳转。

搜索入口在页头居中，搜索框保持固定位置和尺寸，结果区域独立滚动。语言选择左侧的图标随固件切换：Felucca 进入 GitHub 项目仓库，官方固件进入 M-VAVE FM-1 产品页。

可分享固件专属链接，例如 `#/official/step-recording/record` 和 `#/felucca/saving/save-project`。浏览器前进 / 后退同时恢复固件与章节。旧链接 `#/saving/save-project` 仍指向 Felucca，不受本机固件偏好影响。

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
- `src/firmwares.js`：两套固件的内容入口、版本信息和搜索建议。
- `src/locales.js`：中英文界面文案。
- `src/core.js`：路由解析与搜索。
- `src/app.js`：章节渲染、目录、主题与键盘操作。
- `src/styles.css`：文档样式、移动端和打印布局。
- `scripts/`：无依赖开发服务器与构建。
- `tests/`：章节链接、搜索、请求处理和托管测试。
- `docs/official-manual-source.md`：官方说明书文件指纹、页码索引和核对范围。

## 内容维护

新增章节时提供唯一 `id`、章节组、摘要、搜索关键词、小节和来源。Felucca 先核对官方 Wiki，再用 `ui_input.c`、`ui_layer.c`、`ui.c` 确认上下文操作。官方固件以提供的说明书为准，在数据中保留 PDF 页码，并集中在“资料与适用范围”说明来源；各章不显示“本页来源”。未说明的操作不补造，修改教程时同步检查按键速查。

同一固件的两种语言保持相同的章节、小节 ID 和来源主题。当前仅开放两套教程；后续固件可扩展注册表与对应内容，不使用其他固件的教程代替。按键质感仅用于标签呈现，不代表网页能遥控硬件。交互动效遵循 `prefers-reduced-motion`。

文案只保留操作、结果和必要提示；使用机身英文标签并给出中文含义。保持目录—正文—本页目录结构，不加入营销首屏、学习积分或装饰性硬件图。

## 版本管理

远端：<https://github.com/itoyohane/fm1-learning-web>（原名 `felucca-learning-web`），主分支为 `main`。更改后运行测试和构建，再提交并推送；同步前先拉取远端历史，避免覆盖他人的修改。仓库包含自动验证工作流。

## 验证范围

自动检查覆盖两套固件、31 章的中英文结构与内部链接、固件路由兼容、阅读目的地、搜索隔离、官方操作差异、静态资源和托管 Worker。当前环境没有可用浏览器，且启动预览端口返回 EPERM；无法确认真实渲染、移动端交互或视觉效果。截图环节已按用户要求跳过，见 `design-qa.md`。

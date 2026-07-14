# 文化种草机 v3.0

## 产品简介
文化种草机 v3.0 是一个面向 C 端游客的文化旅行 AI Agent H5 Demo。它通过“种草内容、古画解码、体验推荐、个人沉淀”三条主路径，把景点、古画热点、非遗技艺和行程生成串联起来，帮助用户从内容兴趣进入可执行的文化体验方案。

当前版本是高保真静态原型，重点用于验证页面结构、视觉规范、交互链路和 AI 结果页的信息组织方式。

## 技术栈
- 纯 HTML / CSS / JavaScript
- 无前端框架，无构建工具
- ES Module：`index.html` 直接加载 `app.js`
- Node.js 内置测试：`node --test`
- 资源本地化：图片统一放在 `assets/` 目录，页面通过相对路径引用

## 文件结构
`index.html` — H5 Demo 根入口，挂载 `#app`、`#screen`、`#tabbar`，加载 `global.css` 与 `app.js`

`global.css` — 全局样式、页面布局、组件样式、响应式适配和视觉 token 变量

`app.js` — 页面渲染与交互控制，包含 Tab 切换、详情页、偏好选择、AI 结果页、侧边页、收藏点亮页和二级弹层逻辑

`model.js` — 产品数据模型与状态管理，包含种草内容、古画热点、体验路线、偏好选项、AI 结果生成逻辑、行程保存与点亮状态

`package.json` — 项目基础配置，声明 ES Module 与测试命令

`server.mjs` — 无依赖本地静态服务器，执行 `npm start` 后预览 H5 Demo

`README.md` — GitHub 首页说明，包含产品简介、快速开始、功能清单和部署方式

`GITHUB_UPLOAD.md` — GitHub 上传、另一台设备下载运行、GitHub Pages 部署说明

`.gitignore` — Git 忽略规则，排除系统缓存、依赖目录、环境变量文件和构建产物

`tests/model.test.js` — 数据模型与生成链路的 Node 测试用例

`assets/figma-seed-home/avatar.png` — 顶部头像与侧边页头像资源

`assets/figma-seed-home/hero-base.png` — 种草首页 Hero 底图资源

`assets/figma-seed-home/hero.png` — 种草首页 Hero 主视觉与多处卡片背景资源

`assets/figma-seed-home/article-1.png` — 种草内容卡片图片 1

`assets/figma-seed-home/article-2.png` — 种草内容卡片图片 2

`assets/figma-seed-home/article-3.png` — 种草内容卡片图片 3

`assets/figma-seed-home/article-4.png` — 种草内容卡片图片 4

`assets/figma-seed-home/article-5.png` — 种草内容卡片图片 5

`assets/figma-seed-home/article-6.png` — 种草内容卡片图片 6

`assets/figma-seed-home/img-01.png` — 通用内容、行程、推荐卡片图片 1

`assets/figma-seed-home/img-02.png` — 通用内容、行程、推荐卡片图片 2

`assets/figma-seed-home/img-03.png` — 通用内容、行程、推荐卡片图片 3

`assets/figma-seed-home/img-04.png` — 通用内容、行程、推荐卡片图片 4

`assets/figma-seed-home/img-05.png` — 通用内容、行程、推荐卡片图片 5

`assets/figma-seed-home/img-06.png` — 通用内容、行程、推荐卡片图片 6

`assets/figma-seed-home/detail-hero.png` — 内容详情页 Hero 图片

`assets/figma-seed-home/detail-hotspot.png` — 内容详情页古画热点拆解图片

`assets/figma-seed-home/detail-trip-1.png` — 内容详情页推荐行程卡片图片 1

`assets/figma-seed-home/detail-trip-2.png` — 内容详情页推荐行程卡片图片 2

`assets/figma-seed-home/detail-trip-3.png` — 内容详情页推荐行程卡片图片 3

`assets/figma-seed-home/detail-traveler-1.png` — 内容详情页旅客评价图片 1

`assets/figma-seed-home/detail-traveler-2.png` — 内容详情页旅客评价图片 2

`assets/figma-seed-home/detail-traveler-3.png` — 内容详情页旅客评价图片 3

`assets/figma-painting-tab/painting-shangyuan.png` — 探画 Tab 古画主视觉资源

`assets/figma-painting-tab/hotspot-aoshan.png` — 探画热点知识卡片图片

`assets/figma-painting-tab/spot-1.png` — 探画相关地点卡片图片 1

`assets/figma-painting-tab/spot-2.png` — 探画相关地点卡片图片 2

`assets/figma-painting-tab/spot-3.png` — 探画相关地点卡片图片 3

`assets/figma-painting-tab/spot-4.png` — 探画相关地点卡片图片 4

`assets/figma-painting-tab/spot-5.png` — 探画相关地点卡片图片 5

`assets/figma-painting-tab/spot-6.png` — 探画相关地点卡片图片 6

`assets/figma-ai-result/result-bg.png` — AI 生成结果页背景视觉

`assets/figma-ai-result/photo-1.png` — AI 结果页拍照点/记忆卡图片 1

`assets/figma-ai-result/photo-2.png` — AI 结果页拍照点/记忆卡图片 2

`assets/figma-ai-result/photo-3.png` — AI 结果页拍照点/记忆卡图片 3

## 核心功能
- 三 Tab 主架构：种草、探画、体验
- 顶部地址选择入口、头像侧边页入口、右上角收藏点亮入口
- 种草首页：内容推荐、筛选、热门内容卡片、内容详情跳转
- 探画 Tab：古画轮播、古画横向浏览、脉冲热点、热点知识卡片、已添加热点、带热点进入生成
- 体验 Tab：跟随当前地址的体验路线、节点进度、技艺卡片、商品跳转前确认
- 内容详情页：Hero、地点/类型/时间、标签、描述、古画拆解、推荐行程、旅客说、悬浮生成入口
- 首次生成配置：身份、天数、氛围三步偏好选择
- AI 生成结果页：调整偏好入口、行程时间线、必经打卡点、物/艺/人/景/情重点选择、物品/记忆/活动互动、拍照打卡点、实用小贴士、角色代入玩法
- 我的侧边页：头像、我的行程单、行程推荐、偏好调整、技艺点亮
- 收藏点亮页：按景点、古画、技艺展示用户整体点亮与收藏沉淀
- 二级承接页：地点切换、行程推荐、我的行程单、旅客说、收藏/分享等轻量弹层
- 行程保存：AI 结果可加入我的行程单，并触发景点、古画、技艺点亮

## 设计系统
使用 ReDs Tokens 2.2 的设计思路，颜色、字号、间距、圆角和阴影通过 CSS 变量集中维护，详见 `global.css`。当前 H5 Demo 已在 `:root` 中抽象基础视觉变量；后续如进入生产设计系统，应把这些变量进一步映射为 ReDs 的 Backgrounds / Labels / Fills / Separators 等语义 Token。

## AI 交互逻辑（如有）
当前版本没有调用真实 AI API，也没有暴露 API Key。AI Agent 输出由 `model.js` 中的规则函数模拟：

- `getGenerationRoute(state)`：判断首次生成进入偏好页，非首次直接进入结果页
- `getPreferenceGroups()`：提供身份、天数、氛围三组偏好选项
- `buildAiPlan(state)`：根据偏好、入口来源、已选古画热点生成 AI 结果页内容
- `saveCurrentGuide(state, options)`：保存当前生成结果到我的行程单，并写入点亮状态
- `restoreGuideAsResult(state, id)`：从我的行程单恢复历史结果页

生成逻辑会读取：
- 用户身份：游客、亲子、摄影爱好者、文化研究者等
- 行程天数：半天、一天、两天一夜等
- 体验氛围：出片打卡、安静文艺、热闹市集、亲手体验等
- 入口来源：内容详情、探画热点、行程推荐
- 重点维度：物、艺、人、景、情

如果后续接入真实 AI，建议保留当前 `buildAiPlan(state)` 的返回结构，把它改造成 API Adapter：前端仍消费同一份结构，后端负责生成内容。

## 待办 / 已知问题
- 当前是静态 Demo，数据不会写入服务端，也不会跨浏览器持久保存
- AI 结果为前端规则模拟，尚未接入真实大模型 API
- 商品跳转为模拟确认流程，未接真实淘宝 / 京东 / 小红书链接
- 地点切换、收藏、分享、行程推荐等二级页仍是 Demo 级交互
- 当前页面主要按手机 H5 容器设计，桌面端仅作为预览壳展示
- Figma 与 HTML 尚未建立自动同步机制，后续更新仍需要人工比对或再次导入
- 部分视觉变量已集中在 `global.css`，但还未完全替换为 ReDs 官方变量命名

## 部署信息（如有）
当前未部署到线上平台。可直接本地打开 `index.html` 预览，也可以用任意静态服务器托管整个项目目录。

本地测试命令：

```bash
npm test
```

本地静态服务示例：

```bash
python3 -m http.server 3000
```

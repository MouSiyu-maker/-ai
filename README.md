# 文化种草机 v3.0

一个面向 C 端游客的文化旅行 AI Agent H5 Demo。项目通过“种草内容、古画解码、体验推荐、个人沉淀”串联文化兴趣到可执行行程，适合用于产品设计汇报、交互链路验证和后续工程化改造。

当前版本是纯前端高保真静态原型，不依赖后端服务，也没有真实 AI API 调用。

## 在线/本地预览

下载项目后，在项目根目录执行：

```bash
npm start
```

然后打开：

```text
http://127.0.0.1:3000
```

如果 3000 端口被占用，启动脚本会自动尝试 3001、3002 等后续端口，请以终端输出的地址为准。

如果只想快速查看，也可以直接双击 `index.html` 打开；但推荐使用 `npm start`，这样在不同浏览器和设备上更稳定。

## 环境要求

- Node.js 18 或更高版本
- 不需要安装额外依赖
- 不需要 API Key

## 快速开始

```bash
git clone <你的 GitHub 仓库地址>
cd cultural-seeder-v3
npm start
```

运行测试：

```bash
npm test
```

完整检查：

```bash
npm run check
```

## 技术栈

- HTML
- CSS
- JavaScript ES Module
- Node.js 本地静态服务器
- Node.js 内置测试框架 `node:test`

## 项目结构

```text
.
├── index.html                 # H5 Demo 入口
├── global.css                 # 全局样式、视觉变量、页面与组件样式
├── app.js                     # 页面渲染与交互逻辑
├── model.js                   # 数据模型、状态管理、模拟 AI 生成逻辑
├── server.mjs                 # 本地静态预览服务器
├── package.json               # 项目脚本
├── CLAUDE.md                  # Claude Code 接手说明
├── GITHUB_UPLOAD.md           # GitHub 上传与下载运行说明
├── assets/                    # 图片等静态资源
│   ├── figma-seed-home/
│   ├── figma-painting-tab/
│   └── figma-ai-result/
└── tests/
    └── model.test.js          # 数据模型测试
```

## 已实现功能

- 三 Tab 主架构：种草、探画、体验
- 种草首页：内容推荐、筛选、热门卡片、内容详情跳转
- 探画 Tab：古画轮播、横向画卷、脉冲热点、热点知识卡片、带热点生成体验
- 体验 Tab：路线节点、技艺体验、商品跳转确认、跟随当前地址的体验推荐
- 内容详情页：Hero、标签、描述、古画拆解、推荐行程、旅客说、悬浮生成入口
- 首次生成配置：身份、天数、氛围三步偏好选择
- AI 生成结果页：行程时间线、必经打卡点、物艺人景情重点、互动任务、拍照点、小贴士、角色代入玩法
- 我的侧边页：我的行程单、行程推荐、偏好调整、技艺点亮
- 收藏点亮页：景点、古画、技艺的用户沉淀展示
- 二级承接页：地点切换、推荐行程、行程列表、旅客说、分享与收藏反馈

## AI 逻辑说明

当前没有接入真实大模型。AI 结果由 `model.js` 内部的规则函数模拟生成：

- `getGenerationRoute(state)` 判断首次/非首次生成链路
- `getPreferenceGroups()` 提供偏好选择项
- `buildAiPlan(state)` 根据身份、天数、氛围、入口来源和探画热点生成结果页内容
- `saveCurrentGuide(state, options)` 保存行程并触发点亮
- `restoreGuideAsResult(state, id)` 从已保存行程恢复结果页

后续接入真实 AI 时，建议保留 `buildAiPlan(state)` 的返回结构，把内部实现替换为 API Adapter，减少页面层改动。

## 设计说明

项目视觉以文化旅行 H5 为目标，使用温润卡片、柔和浮层、浅灰底和图文内容流。样式集中维护在 `global.css`，其中 `:root` 定义了基础颜色、字号、圆角、阴影等变量。

后续如果要对齐 ReDs Tokens 2.2，可以优先把 `global.css` 中的变量映射到 ReDs 的语义 Token。

## 部署方式

这是纯静态项目，可以部署到：

- GitHub Pages
- Vercel
- Netlify
- 任意静态资源服务器

GitHub Pages 推荐设置：

- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/root`

## 注意事项

- 当前数据为前端静态数据，不会写入服务端
- 当前 AI 结果为规则模拟，不是真实 AI API 返回
- 当前商品跳转为模拟确认流程
- 当前主要适配手机 H5 容器，桌面端作为预览壳展示

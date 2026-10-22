# 课题组官网（Astro · 中英双语）

视觉风格：深色编辑感首屏（参考 ISOMORPH.LAB）+ 浅色结构化内容区（参考 Quantia）。
纯静态站点，无数据库，可部署到任何静态托管（学校服务器、国内云对象存储 + CDN、GitHub Pages 等）。

## 本地运行

```bash
npm install
npm run dev        # 开发预览：http://localhost:4321
npm run build      # 生成静态文件到 dist/
npm run preview    # 预览构建结果
```

## 修改内容（不需要写代码）

所有内容都在 `src/data/` 下，中英文写在同一条记录里（`zh` 必填，`en` 缺省时回退到中文）：

| 文件 | 内容 |
|---|---|
| `site.ts` | 实验室名称、所属单位、首屏标题、简介、联系方式、外部链接 |
| `people.yaml` | 团队成员（role：pi / faculty / postdoc / phd / master / alumni） |
| `research.yaml` | 研究方向 |
| `publications.yaml` | 论文 |
| `collab.yaml` | “联系我们”页面 · 科研合作部分的介绍板块 |
| `join.yaml` | “联系我们”页面 · 课题组招募部分的介绍板块 |

- **成员照片**：放到 `public/people/` 下，在 `people.yaml` 里写 `avatar: /people/xxx.jpg`（建议 4:5 竖图）。不填会自动生成首字母头像。
- **论文作者加粗**：作者名与 `people.yaml` 中成员的中文或英文名一致时自动加粗。
- **界面文字**（导航、按钮等）：在 `src/i18n/index.ts` 的 `ui` 中修改。
- **Logo**：替换 `src/components/Logo.astro` 与 `public/favicon.svg`。
- **主题色/字体**：`src/styles/global.css` 顶部的 `:root` 变量。

## 目录结构

```
src/
  data/          内容数据（YAML / TS）
  i18n/          双语工具与界面文案
  components/    页头、页脚、卡片、首屏动画等组件
  layouts/       页面基础布局
  pages/[...lang]/  所有页面：中文在根路径 /，英文在 /en/
  styles/        全局设计系统
```

## 部署

线上地址：**https://falresearch.github.io/**

- **GitHub Pages（当前使用）**：推送到 `main` 分支后，GitHub Actions（`.github/workflows/deploy.yml`）会自动构建并发布，访问地址与子路径自动识别，无需改代码。部署进度见仓库的 Actions 页面。
- **其他服务器**：构建时通过环境变量指定地址，例如 `SITE=https://xx.edu.cn BASE=/lab/ npm run build`（放在域名根目录时 `BASE=/`），再把 `dist/` 目录上传即可。

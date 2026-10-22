// @ts-check
import { defineConfig } from 'astro/config';

// 部署地址：GitHub Actions 构建时自动传入 SITE / BASE（见 .github/workflows/deploy.yml）。
// 本地开发或部署到其他服务器时使用下面的默认值：
//   site —— 正式域名，用于生成 canonical / hreflang 等绝对地址
//   base —— 网站所在子路径；放在域名根目录时为 '/'，如 https://xx.github.io/fal-lab/ 则为 '/fal-lab/'
export default defineConfig({
  site: process.env.SITE || 'https://example.com',
  base: process.env.BASE || '/',
  trailingSlash: 'ignore',
});

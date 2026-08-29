# Literature Review Website（论文综述展示网站模板）

基于 Vue 3 + Vite 的静态论文综述展示网站模板，可直接部署到 GitHub Pages。

## 网站结构

- **标题 + 主图 + Abstract**：`src/App.vue`（`abstractContent` 变量）+ `public/main.svg`（主图）
- **Home 标签页**：三级可折叠分类体系（Category → Subcategory → Tag），内容在 `src/components/HomeTab.vue` 的 `categories` 数组；分类图在 `public/distribution.svg`
- **Exploration 标签页**：论文列表，支持标题检索、年份筛选、标签筛选；数据来自 `public/papers.json`，缩略图在 `public/thumbnails/<编号>.png`
- **Papers / OSF 导航项**：外链（`src/App.vue` 中 `navItems`），Papers 默认打开 `/paper.pdf`
- **Contact 标签页**：联系人表格，内容在 `src/components/ContactTab.vue` 的 `contacts` 数组
- **配色体系**：`src/config/colors.js`（设计依据见 `color-table.md`，样式修改指南见 `CSS-STYLE-GUIDE.md`）

## 本地运行

```bash
npm install
npm run dev      # 开发预览
npm run build    # 产出 dist/
```

## 数据文件

| 文件 | 说明 |
| --- | --- |
| `papers.txt` | 论文清单（约定格式的示例，见文件内注释），正式使用时整体替换 |
| `public/papers.json` | 网站实际读取的论文数据，由 `scripts/parse_papers.py` 从 `papers.txt` 生成 |
| `public/thumbnails/<编号>.png` | 论文缩略图，与论文编号一一对应，缺失时显示 `placeholder.png` |

```bash
python scripts/parse_papers.py   # papers.txt -> public/papers.json，自动给出警告清单
```

约定格式：两篇论文之间空一行；每行「字段名: 内容」；固定字段为 编号/标题/作者/年份/会议/链接；其余行是标签字段（字段名 = 二级分类名，多值用逗号分隔）；`#` 开头为注释。

## 部署到 GitHub Pages

仓库已内置 `.github/workflows/deploy.yml`：推送到 `main` 分支后自动构建并发布。
注意：`vite.config.js` 中的 `base` 必须设置为 `'/<仓库名>/'`（项目页部署时）。

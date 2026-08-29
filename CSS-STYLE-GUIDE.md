# CSS 样式修改完全指南

本文档详细介绍如何修改网站中每个元素的样式，包括字体、颜色、尺寸、位置等。

---

## 目录

1. [CSS 基础知识速查](#1-css-基础知识速查)
2. [文件位置导航](#2-文件位置导航)
3. [首页 (HomeTab) 元素修改指南](#3-首页-hometab-元素修改指南)
4. [论文列表页 (ExplorationTab) 元素修改指南](#4-论文列表页-explorationtab-元素修改指南)
5. [全局样式修改](#5-全局样式修改)
6. [颜色配置修改](#6-颜色配置修改)

---

## 1. CSS 基础知识速查

### 1.1 字体相关属性

| 属性 | 作用 | 示例 |
|------|------|------|
| `font-size` | 字体大小 | `font-size: 16px;` 或 `font-size: 1.2rem;` |
| `font-weight` | 字体粗细 | `font-weight: 400;`(正常) `600;`(半粗) `700;`(粗体) |
| `font-family` | 字体类型 | `font-family: 'Arial', sans-serif;` |
| `line-height` | 行高 | `line-height: 1.5;` 或 `line-height: 24px;` |
| `letter-spacing` | 字母间距 | `letter-spacing: 0.5px;` |
| `text-align` | 文字对齐 | `text-align: left;` / `center;` / `right;` |
| `color` | 文字颜色 | `color: #333333;` 或 `color: rgb(51,51,51);` |

### 1.2 尺寸相关属性

| 属性 | 作用 | 示例 |
|------|------|------|
| `width` | 宽度 | `width: 200px;` 或 `width: 50%;` |
| `height` | 高度 | `height: 100px;` 或 `height: auto;` |
| `min-width` | 最小宽度 | `min-width: 100px;` |
| `max-width` | 最大宽度 | `max-width: 800px;` |
| `min-height` | 最小高度 | `min-height: 200px;` |
| `max-height` | 最大高度 | `max-height: 500px;` |

### 1.3 间距相关属性

| 属性 | 作用 | 示例 |
|------|------|------|
| `margin` | 外边距(元素外部间距) | `margin: 10px;` (四周都是10px) |
| `margin-top` | 上外边距 | `margin-top: 20px;` |
| `margin-bottom` | 下外边距 | `margin-bottom: 20px;` |
| `margin-left` | 左外边距 | `margin-left: 15px;` |
| `margin-right` | 右外边距 | `margin-right: 15px;` |
| `padding` | 内边距(元素内部间距) | `padding: 10px;` |
| `padding-top` | 上内边距 | `padding-top: 20px;` |
| `padding-bottom` | 下内边距 | `padding-bottom: 20px;` |
| `padding-left` | 左内边距 | `padding-left: 15px;` |
| `padding-right` | 右内边距 | `padding-right: 15px;` |
| `gap` | 弹性布局子元素间距 | `gap: 12px;` |

**间距简写：**
- `margin: 10px 20px;` → 上下10px，左右20px
- `margin: 10px 20px 30px;` → 上10px，左右20px，下30px
- `margin: 10px 20px 30px 40px;` → 上10px，右20px，下30px，左40px

### 1.4 位置相关属性

| 属性 | 作用 | 示例 |
|------|------|------|
| `position` | 定位方式 | `relative;`(相对) `absolute;`(绝对) `fixed;`(固定) |
| `top` | 距顶部距离 | `top: 10px;` |
| `bottom` | 距底部距离 | `bottom: 10px;` |
| `left` | 距左侧距离 | `left: 10px;` |
| `right` | 距右侧距离 | `right: 10px;` |
| `z-index` | 层叠顺序 | `z-index: 10;` (数字越大越靠前) |
| `transform` | 变换 | `transform: translateX(10px);` (水平移动10px) |

**transform 常用值：**
- `translateX(10px)` - 水平向右移动10px（负值向左）
- `translateY(10px)` - 垂直向下移动10px（负值向上）
- `translate(10px, 20px)` - 水平移动10px，垂直移动20px
- `scale(1.1)` - 放大1.1倍
- `rotate(45deg)` - 旋转45度

### 1.5 背景相关属性

| 属性 | 作用 | 示例 |
|------|------|------|
| `background-color` | 背景颜色 | `background-color: #ffffff;` |
| `background` | 背景(简写) | `background: #fff;` 或 `background: linear-gradient(...)` |
| `opacity` | 透明度 | `opacity: 0.8;` (0完全透明，1完全不透明) |

### 1.6 边框相关属性

| 属性 | 作用 | 示例 |
|------|------|------|
| `border` | 边框 | `border: 1px solid #ddd;` |
| `border-radius` | 圆角 | `border-radius: 8px;` 或 `border-radius: 50%;`(圆形) |
| `border-top` | 上边框 | `border-top: 2px solid #000;` |
| `border-left` | 左边框 | `border-left: 3px solid #ccc;` |

### 1.7 阴影相关属性

| 属性 | 作用 | 示例 |
|------|------|------|
| `box-shadow` | 盒子阴影 | `box-shadow: -2px 4px 8px rgba(0,0,0,0.5);` |
| `text-shadow` | 文字阴影 | `text-shadow: 1px 1px 2px rgba(0,0,0,0.3);` |

**box-shadow 参数说明：**
`box-shadow: 水平偏移 垂直偏移 模糊半径 扩展半径 颜色;`
- **水平偏移**：负值=阴影在左侧，正值=阴影在右侧
- **垂直偏移**：负值=阴影在上侧，正值=阴影在下侧
- **模糊半径**：越大越模糊（晕染范围大），越小越清晰（晕染范围小）
- **颜色透明度**：0.5-0.6 为较深的阴影

**示例：**
- `box-shadow: -3px 4px 8px rgba(145,138,175,0.6);` 
  - 阴影在左侧（-3px）和下侧（4px）
  - 模糊半径8px（晕染范围不大）
  - 透明度0.6（颜色较深）

### 1.8 弹性布局 (Flexbox)

| 属性 | 作用 | 示例 |
|------|------|------|
| `display: flex;` | 启用弹性布局 | 必须先设置这个 |
| `flex-direction` | 排列方向 | `row;`(水平) `column;`(垂直) |
| `justify-content` | 主轴对齐 | `flex-start;` `center;` `flex-end;` `space-between;` |
| `align-items` | 交叉轴对齐 | `flex-start;` `center;` `flex-end;` `stretch;` |
| `flex-wrap` | 是否换行 | `nowrap;`(不换行) `wrap;`(换行) |
| `flex` | 弹性比例 | `flex: 1;` (占满剩余空间) |

---

## 2. 文件位置导航

### 2.1 主要样式文件

| 文件 | 路径 | 用途 |
|------|------|------|
| 全局样式 | `src/style.css` | 全局字体、背景色等 |
| 颜色配置 | `src/config/colors.js` | 所有分类颜色定义 |
| 首页样式 | `src/components/HomeTab.vue` | 首页分类展示 |
| 论文列表样式 | `src/components/ExplorationTab.vue` | 论文列表和筛选 |
| 主应用样式 | `src/App.vue` | 导航栏、整体布局 |

### 2.2 颜色配置参照表

详见 `color-table.md`，包含所有分类的颜色定义。

---

## 3. 首页 (HomeTab) 元素修改指南

文件位置：`src/components/HomeTab.vue`

### 3.1 整体容器卡片

```css
/* 文件位置：HomeTab.vue 的 <style scoped> 部分 */

.categorization-container {
  background: white;            /* 背景颜色 */
  border-radius: 20px;          /* 圆角大小 */
  padding: 40px;                /* 内边距 */
  box-shadow: 0 8px 25px rgba(80, 100, 180, 0.3);  /* 阴影 */
}
```

**修改示例：**
- 让容器更宽：增加 `max-width: 1400px;`
- 增大内边距：`padding: 60px;`
- 调整阴影：`box-shadow: 0 10px 30px rgba(0,0,0,0.2);`

### 3.2 主图区域

```css
.home-main-image {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;            /* 最小高度 */
  background: #f8f9ff;          /* 背景颜色 */
  border-radius: 12px;          /* 圆角 */
  margin-bottom: 40px;          /* 与下方元素的间距 */
}

.image-placeholder {
  font-size: 36px;              /* 占位文字大小 */
  font-weight: 600;             /* 文字粗细 */
  color: #666;                  /* 文字颜色 */
}
```

### 3.3 "Categorization" 标题

```css
.categorization-title {
  font-size: 28px;              /* 字体大小 */
  font-weight: 700;             /* 字体粗细 */
  color: #000;                  /* 文字颜色 */
  margin-bottom: 30px;          /* 下方间距 */
}
```

**修改示例：**
- 变大：`font-size: 32px;`
- 变粗：`font-weight: 800;`
- 改颜色：`color: #333;`
- 向左移：`margin-left: -10px;`

### 3.4 一级分类项（每个分类块）

```css
.category-item {
  margin-bottom: 25px;          /* 每个分类之间的间距 */
}

.category-wrapper {
  display: flex;
  align-items: stretch;
  gap: 12px;                    /* 图标和标题框之间的间距 */
}
```

### 3.5 展开/收缩图标

```css
.toggle-icon {
  width: 24px;                  /* 图标宽度 */
  height: 24px;                 /* 图标高度 */
  flex-shrink: 0;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.toggle-icon:hover {
  transform: scale(1.05);       /* 悬停时放大效果 */
}
```

**修改示例：**
- 放大图标：`width: 32px; height: 32px;`
- 向右移动：`margin-left: 10px;`

### 3.6 一级标题背景框（大圆角矩形）

```css
.category-header {
  flex: 1;
  display: flex;
  align-items: stretch;
  padding: 0;
  border-radius: 50px;          /* 圆角大小 */
  position: relative;
}
```

**阴影在 JavaScript 数据中动态设置（见 HomeTab.vue 的 template 部分）：**
```javascript
boxShadow: '-2px 4px 6px ' + category.descShadowColor
```
- `-2px`：阴影在左侧
- `4px`：阴影在下侧
- `6px`：模糊半径（较小，边缘清晰，类似 Figma Drop Shadow）
- `descShadowColor`：基于框原色加深的深色阴影（透明度0.85，非常不透明）

**Drop Shadow 特点：**
- 颜色深且鲜艳（透明度 0.85，接近不透明）
- 使用原始颜色的深色版本（保持色相）
- 边缘清晰（模糊半径小）
- 阴影与边框分割明显

**修改示例：**
- 减小圆角：`border-radius: 20px;`
- 添加边框：`border: 1px solid #ddd;`
- 调整阴影位置和强度（在 JavaScript 数据中修改，见 3.9 节）

### 3.7 一级标题名称（小圆角矩形）

```css
.category-name {
  /* 阴影通过内联样式动态设置 */
}
```

**阴影在 template 中动态设置：**
```javascript
boxShadow: '-3px 4px 6px ' + category.nameShadowColor
```
- `-3px`：阴影在左侧（更明显）
- `4px`：阴影在下侧
- `6px`：模糊半径（较小，边缘清晰，类似 Figma Drop Shadow）
- `nameShadowColor`：基于小框原色加深的深色阴影（透明度0.9，几乎不透明）

**Figma Drop Shadow 风格：**
- 阴影颜色非常深（透明度 0.9）
- 颜色鲜艳，保持原色调的深色版本
- 边缘清晰，阴影与框分割明显
- 不是模糊晕染，而是清晰投影

**调整高度方法：**
通过修改 `padding` 的上下值来调整高度：
- **降低高度**：`padding: 8px 20px;` 或 `padding: 6px 20px;`
- **增加高度**：`padding: 12px 20px;` 或 `padding: 15px 20px;`

**修改阴影方法（在 JavaScript 数据中修改，见 3.9 节）：**
- 调整阴影位置：修改 `-3px 4px`（水平和垂直偏移）
- 调整晕染范围：修改 `8px`（模糊半径）
- 调整阴影颜色深度：修改 `nameShadowColor` 的透明度
/* 更强阴影 */
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15), 0 8px 24px rgba(0, 0, 0, 0.12);
```

**修改示例：**
- 变大字体：`font-size: 16px;`
- 增加内边距：`padding: 15px 25px;`
- 调整阴影：修改 `box-shadow` 的值

### 3.8 一级标题介绍文字（大圆角矩形的文字部分）

```css
.category-description {
  flex: 1;
  font-size: 13px;              /* 字体大小 */
  line-height: 1.5;             /* 行高 */
  padding: 10px 20px;           /* 内边距：上下10px，左右20px */
  display: flex;
  align-items: center;
}
```

**调整大圆角矩形高度方法：**
修改 `padding` 的上下值来调整整个大圆角矩形的高度：
- **降低高度**：`padding: 8px 20px;` 或 `padding: 6px 20px;`
- **增加高度**：`padding: 12px 20px;` 或 `padding: 15px 20px;`

**注意**：
- 大圆角矩形的高度由 `.category-description` 的 `padding` 控制
- 小圆角矩形的高度由 `.category-name` 的 `padding` 控制
- 两者的 `padding` 上下值应保持一致，以确保视觉对齐
和阴影配置（JavaScript 数据）

在 `HomeTab.vue` 的 `<script setup>` 部分，找到 `categories` 数组：

```javascript
{
  id: 1,
  name: 'Display representation',
  description: '...',
  nameTextColor: '#341B8F',         // 小矩形文字颜色
  descTextColor: '#341B8F',         // 大矩形文字颜色
  nameBgColor: '#B5ACD7',           // 小矩形背景颜色
  descBgColor: '#CDC8DF',           // 大矩形背景颜色
  nameShadowColor: 'rgba(145, 138, 175, 0.6)',  // 小矩形阴影颜色（基于nameBgColor加深）
  descShadowColor: 'rgba(165, 160, 191, 0.55)', // 大矩形阴影颜色（基于descBgColor加深）
  secondaryColor: '#4E2C78',        // 二级标题颜色
  tertiaryColor: '#9B78CA',         // 三级标题和竖线颜色
  // ...
}
```

**颜色对应关系：**

| 字段 | 用途 | color-table.md 对应项 |
|------|------|----------------------|
| `nameTextColor` | 小矩形文字颜色 | 一级标题文字颜色 |
| `nameBgColor` | 小矩形背景颜色 | 一级标题文字背景颜色 |
| `nameShadowColor` | 小矩形阴影颜色 | nameBgColor 加深（透明度0.6） |
| `des Drop Shadow 阴影颜色：**
1. 查看框的背景颜色（例如 `#B5ACD7`）
2. 将十六进制转换为 RGB：`#B5ACD7` = `rgb(181, 172, 215)`
3. **深化颜色**（RGB 值减少约 30-40%）：`rgb(127, 120, 150)`
   - 保持颜色的色相，只降低亮度
4. 添加**极低透明度**（0.85-0.9，接近不透明）：`rgba(127, 120, 150, 0.9)`
（Drop Shadow）：**
```javascript
// 小矩形阴影：在 template 中
boxShadow: '-3px 4px 6px ' + category.nameShadowColor
// -3px: 左侧偏移  4px: 下侧偏移  6px: 小模糊半径（边缘清晰）

// 大矩形阴影：在 template 中  
boxShadow: '-2px 4px 6px ' + category.descShadowColor
// -2px: 左侧偏移  4px: 下侧偏移  6px: 小模糊半径
```

**调整阴影位置和强度：**
- 修改偏移量：`-3px`（左侧）、`4px`（下侧）
- 修改模糊半径：`6px`（数值越小边缘越清晰，4-8px 为 Drop Shadow 范围）
- 修改透明度：`0.85-0.9`（数值越大阴影越深，接近1.0几乎不透明7`）
2. 将十六进制转换为 RGB：`#B5ACD7` = `rgb(181, 172, 215)`
3. 加深颜色（RGB 值减少约 20-30）：`rgb(145, 138, 175)`
4. 添加较高透明度（0.55-0.6）：`rgba(145, 138, 175, 0.6)`

**阴影效果设置示例：**
```javascript
// 小矩形阴影：在 template 中
boxShadow: '-3px 4px 8px ' + category.nameShadowColor

// 大矩形阴影：在 template 中  
boxShadow: '-2px 4px 8px ' + category.descShadowColor
```

**调整阴影位置和强度：**
- 修改偏移量：`-3px`（左侧）、`4px`（下侧）
- 修改模糊半径：`8px`（数值越小晕染越少）
- 修改透明度：`0.6`（数值越大阴影越深）
| `tertiaryColor` | 三级标题颜色及竖线颜色 |

### 3.10 二级标题区域

```css
.subcategory-item {
  margin-bottom: 30px;          /* 二级分类之间的间距 */
}

.subcategory-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;                    /* 图标与文字间距 */
  margin-bottom: 20px;          /* 与三级标题的间距 */
}

.subcategory-icon {
  width: 24px;                  /* 图标尺寸 */
  height: 24px;
  flex-shrink: 0;
  margin-top: 2px;              /* 微调垂直位置 */
}

.subcategory-text {
  flex: 1;
  font-size: 14px;              /* 字体大小 */
  color: #333;                  /* 介绍文字颜色 */
  line-height: 1.6;             /* 行高 */
}

.subcategory-name {
  font-weight: 700;             /* 二级标题名称粗细 */
  /* 颜色由 :style 动态设置，使用 category.secondaryColor */
}
```

### 3.11 三级标题区域

```css
.tertiary-container {
  display: flex;
  gap: 12px;                    /* 竖线与文字间距 */
  padding-left: 36px;           /* 左侧缩进 */
}

.tertiary-line-unified {
  width: 3px;                   /* 竖线宽度 */
  flex-shrink: 0;
  border-radius: 2px;           /* 竖线圆角 */
  align-self: stretch;
  /* 颜色由 :style 动态设置，使用 category.tertiaryColor */
}

.tertiary-list {
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
}

.tertiary-item {
  margin-bottom: 12px;          /* 三级项目之间的间距 */
}

.tertiary-text {
  font-size: 14px;              /* 字体大小 */
  color: #333;                  /* 介绍文字颜色 */
  line-height: 1.6;             /* 行高 */
  display: inline;
}

.tertiary-name {
  font-weight: 600;             /* 三级标题名称粗细 */
  /* 颜色由 :style 动态设置，使用 category.tertiaryColor */
}
```

### 3.12 可折叠内容区域

```css
.category-content {
  padding: 20px 0 0 36px;       /* 上20px，左36px的缩进 */
  animation: slideDown 0.3s ease;
}
```

---

## 4. 论文列表页 (ExplorationTab) 元素修改指南

文件位置：`src/components/ExplorationTab.vue`

### 4.1 筛选区域

筛选区域的颜色配置在 `src/config/colors.js` 中定义：

```javascript
// 筛选区文字颜色
filterTextColor: '#341B8F',

// 每个二级分类的筛选标签
subcategories: {
  'Display Form': {
    filterTextColor: '#75599A',     // 筛选区文字颜色
    filterTagBgColor: '#F4ECFF',    // 筛选区标签背景颜色
  }
}
```

### 4.2 Time Filter 颜色

在 `src/config/colors.js` 中：

```javascript
export const timeFilterColor = '#7B9CEE';
```

---

## 5. 全局样式修改

文件位置：`src/style.css`

### 5.1 全局字体

```css
body {
  font-family: 'JetBrains Mono', monospace;  /* 字体 */
  background-color: #F2F5FF;                  /* 页面背景色 */
  min-height: 100vh;
}
```

**修改示例：**
- 更换字体：`font-family: 'Inter', 'Helvetica', sans-serif;`
- 更换背景色：`background-color: #f5f5f5;`

### 5.2 App.vue 中的导航栏样式

如需修改导航栏，查看 `src/App.vue` 中的 `<style>` 部分。

---

## 6. 颜色配置修改

### 6.1 颜色配置文件

文件位置：`src/config/colors.js`

这是所有分类颜色的集中配置点，与 `color-table.md` 对应。

### 6.2 配置结构

```javascript
export const categoryColors = {
  'Display representation': {
    primaryTextColor: '#341B8F',      // 一级标题文字颜色
    primaryBgColor: '#B5ACD7',        // 一级标题文字背景颜色
    primaryDescBgColor: '#CDC8DF',    // 一级标题介绍背景颜色
    filterTextColor: '#341B8F',       // 筛选区文字颜色
    subcategories: {
      'Display Form': {
        secondaryTextColor: '#4E2C78',   // 二级标题文字颜色
        tertiaryColor: '#9B78CA',        // 三级标题颜色及竖线颜色
        filterTextColor: '#75599A',      // 筛选区文字颜色
        filterTagBgColor: '#F4ECFF',     // 筛选区标签颜色
        icon: '/icons/display-form.svg'  // 图标路径
      }
    }
  }
};
```

### 6.3 修改颜色步骤

1. 打开 `color-table.md` 确认需要的颜色值
2. 修改 `src/config/colors.js` 中对应的颜色值
3. **重要**：同时修改 `src/components/HomeTab.vue` 中的 `categories` 数组
4. 保存并刷新页面查看效果

---

## 附录：常用修改场景速查

### 场景1：让某个文字变大/变粗

找到对应的 CSS 类，修改：
```css
font-size: 18px;    /* 变大 */
font-weight: 700;   /* 变粗 */
```

### 场景2：让某个元素向右/向下移动

```css
/* 方法1：使用 margin */
margin-left: 20px;   /* 向右 */
margin-top: 10px;    /* 向下 */

/* 方法2：使用 transform（不影响其他元素） */
transform: translateX(20px);  /* 向右 */
transform: translateY(10px);  /* 向下 */
```
（新版：集中在下部和左侧）

**当前阴影设置：**
- 阴影集中在框的**左侧和下部**
- 晕染范围**较小**（模糊半径 8px）
- 颜色**较深**（透明度 0.55-0.6）
- 颜色基于框的颜色加深

**修改小矩形阴影（在 HomeTab.vue 的 template 中）：**
```javascript
// 当前设置
boxShadow: '-3px 4px 8px ' + category.nameShadowColor

// 增强左侧阴影
boxShadow: '-5px 4px 8px ' + category.nameShadowColor

// 增强下部阴影  
boxShadow: '-3px 6px 8px ' + category.nameShadowColor

// 增大晕染范围
boxShadow: '-3px 4px 12px ' + category.nameShadowColor

// 减弱晕染范围（更锐利）
boxShadow: '-3px 4px 5px ' + category.nameShadowColor
```

**修改大矩形阴影（在 HomeTab.vue 的 template 中）：**
```javascript
// 当前设置
boxShadow: '-2px 4px 8px ' + category.descShadowColor

// 调整同小矩形
```

**修改阴影颜色深度（在 categories 数组中）：**
```javascript
// 当前设置（较深）
nameShadowColor: 'rgba(145, 138, 175, 0.6)',

// 更深
nameShadowColor: 'rgba(145, 138, 175, 0.75)',

// 更浅
nameShadowColor: 'rgba(145, 138, 175, 0.4)',

// 完全不透明（Drop Shadow）：**
```javascript
// 小矩形
boxShadow: '-3px 4px 6px ' + category.nameShadowColor
// -3px：阴影向左偏移3px（阴影在左侧）
// 4px：阴影向下偏移4px（阴影在下部）
// 6px：模糊半径6px（边缘清晰，类似 Figma Drop Shadow）
// nameShadowColor: rgba(127,120,150,0.9) - 深色且几乎不透明

// 大矩形
boxShadow: '-2px 4px 6px ' + category.descShadowColor
// -2px：阴影向左偏移2px（阴影在左侧）
// 4px：阴影向下偏移4px（阴影在下部）
// 6px：模糊半径6px
// descShadowColor: rgba(143,140,156,0.85) - 深色且高度不透明明 |
|--------|------|------|
| `-3px 4px` | 阴影在**左下** | 负X=左侧，正Y=下侧 |
| `3px 4px` | 阴影在右下 | 正X=右侧，正Y=下侧 |
| `-3px -4px` | 阴影在左上 | 负X=左侧，负Y=上侧 |
| `0 4px` | 阴影在正下 | X为0=居中，正Y=下侧 |

**当前设置解析：**
```javascript
// 小矩形
boxShadow: '-3px 4px 8px ' + category.nameShadowColor
// -3px：阴影向左偏移3px（阴影在左侧）
// 4px：阴影向下偏移4px（阴影在下部）
// 8px：模糊半径8px（晕染范围适中）

// 大矩形
boxShadow: '-2px 4px 8px ' + category.descShadowColor
// -2px：阴影向左偏移2px（阴影在左侧）
// 4px：阴影向下偏移4px（阴影在下部）
// 8px：模糊半径8px
```

**修改阴影方向示例：**
```javascript
// 只在下部有阴影
boxShadow: '0 5px 8px ' + category.nameShadowColor

// 只在左侧有阴影
boxShadow: '-5px 0 8px ' + category.nameShadowColor

// 均匀四周阴影
boxShadow: '0 0 8px ' + category.nameShadowColor
### 场景6：修改圆角

```css
border-radius: 0;       /* 直角 */
border-radius: 8px;     /* 小圆角 */
border-radius: 20px;    /* 大圆角 */
border-radius: 50%;     /* 圆形（需要宽高相等） */
border-radius: 50px;    /* 药丸形状 */
```

### 场景7：调整一级分类圆角矩形的高度

**调整小圆角矩形（标题名称）高度：**
修改 `.category-name` 的 `padding` 上下值：
```css
.category-name {
  padding: 10px 20px;    /* 当前设置：上下10px */
  /* 更矮：padding: 8px 20px; 或 6px 20px; */
  /* 更高：padding: 12px 20px; 或 15px 20px; */
}
```

**调整大圆角矩形（整体）高度：**
修改 `.category-description` 的 `padding` 上下值：
```css
.category-description {
  padding: 10px 20px;    /* 当前设置：上下10px */
  /* 更矮：padding: 8px 20px; 或 6px 20px; */
  /* 更高：padding: 12px 20px; 或 15px 20px; */
}
```

**重要提示：** 两者的 `padding` 上下值应保持一致，以确保视觉对齐！

### 场景8：调整小圆角矩形的阴影

在 `.category-name` 中修改 `box-shadow`：
```css
/* 当前设置：双层阴影，有立体感 */
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08);

/* 无阴影 */
box-shadow: none;

/* 单层轻微阴影 */
box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

/* 更强烈的阴影 */
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15), 0 8px 24px rgba(0, 0, 0, 0.12);
```

---

## 调试技巧

1. **使用浏览器开发者工具**：按 F12 打开，可以实时修改样式预览效果
2. **右键点击元素 → "检查"**：直接定位到该元素的 CSS
3. **在开发者工具中修改**：修改后复制样式到代码文件中保存

---

如有问题，请参考 `color-table.md` 查看正确的颜色值。

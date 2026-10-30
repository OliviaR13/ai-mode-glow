---
name: ai-mode-glow
description: 鼠标跟随的彩虹光晕按钮效果（类似 Google 搜索「AI 模式」按钮：悬停时蓝/绿/黄/红柔光只出现在离鼠标最近的边缘，移开淡出）。Use this skill whenever the user wants a cursor-following glow, rainbow/gradient glow border, spotlight hover effect, or asks to recreate the Google "AI Mode" button hover effect on a button, card, input or pill. 凡是提到 鼠标跟随光效、悬停彩色光边、渐变发光边框、AI 模式按钮、流光按钮、spotlight hover，即使没有明确说"skill"也应使用。
---

# ai-mode-glow

纯 CSS + 约 20 行 JS 实现的「鼠标跟随彩虹光晕」。无依赖，可直接复制进任何网页或 React 项目。

## 原理（一句话）
按钮背后垫一层 `conic-gradient` 彩色渐变并虚化成光晕 → 用以鼠标为中心的 `radial-gradient` 做 mask，只留鼠标附近那一段 → `::after` 用底色盖住按钮中间，只让边缘的光漏出来 → JS 把鼠标坐标写进 `--glow-x/--glow-y`。

## 使用步骤
1. 把 `assets/glow-button.css` 的内容放进用户项目的样式里（或直接 `<link>`）。
2. 需要纯 HTML 用法时，引入 `assets/glow-button.js`；React 项目用 `references/customization.md` 里的组件写法，不需要 JS 文件。
3. 给目标元素加 `class="glow-btn"`：
   ```html
   <button class="glow-btn">AI 模式</button>
   ```
4. 按用户需求调 CSS 变量：`--glow-bg`（**必须与按钮底色一致**）、`--glow-size`、`--glow-blur`、`--glow-spread`、`--glow-colors`、`--glow-duration`。
5. 完整可运行示例见 `assets/demo.html`。

## 必须注意
- `--glow-bg` 要和按钮实际底色一致；底色透明会导致光透进按钮中间。
- 父容器不能 `overflow:hidden`，否则溢出的光会被裁掉。
- `--glow-spread` 请用 px 单位，JS 需要读取它来修正坐标。
- 触屏（`hover:none`）默认不显示，减少动态效果偏好下去掉过渡，已内置。
- 深色模式只需覆盖 `--glow-bg` 和文字色。

## 进阶
颜色随鼠标角度旋转、React 组件、非按钮元素、排错清单：读 `references/customization.md`。

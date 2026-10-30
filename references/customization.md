# 自定义与变体

## 目录
1. 换颜色 / 大小
2. 颜色随鼠标角度旋转
3. React 写法
4. 用在非按钮元素（卡片、输入框）
5. 常见问题

## 1. 换颜色 / 大小
所有参数都是 CSS 变量，直接在元素上覆盖：
```html
<button class="glow-btn" style="--glow-colors:#ff6ec4,#7873f5,#4ade80,#ff6ec4;--glow-size:100px">
```
- `--glow-size` 越大，亮的边缘越长；`--glow-blur` 越大越柔。
- `--glow-spread` 控制光溢出多少，同时要保证父容器没有 `overflow:hidden` 把光裁掉。
- 改了按钮底色必须同步改 `--glow-bg`，否则中间遮罩颜色对不上。

## 2. 颜色随鼠标角度旋转
想要「光走到哪、起始色就转到哪」，把渐变改成跟随角度：
```css
.glow-btn::before{ background:conic-gradient(from var(--glow-angle,0deg), var(--glow-colors)); }
```
并在 JS 的 `update` 里追加：
```js
var a = Math.atan2(e.clientY - r.top - r.height/2, e.clientX - r.left - r.width/2) * 180/Math.PI + 90;
el.style.setProperty('--glow-angle', a + 'deg');
```

## 3. React 写法
```jsx
function GlowButton({children, ...p}) {
  const move = e => {
    const el = e.currentTarget, r = el.getBoundingClientRect();
    const s = parseFloat(getComputedStyle(el).getPropertyValue('--glow-spread')) || 0;
    el.style.setProperty('--glow-x', e.clientX - r.left + s + 'px');
    el.style.setProperty('--glow-y', e.clientY - r.top + s + 'px');
  };
  return <button className="glow-btn" onPointerEnter={move} onPointerMove={move} {...p}>{children}</button>;
}
```
CSS 原样引入即可，不需要 glow-button.js。

## 4. 用在其他元素
任何有圆角的元素都行：加 `.glow-btn`，再把 `border-radius`、`padding` 改成自己要的。
`display:inline-flex` 可改成 `block` / `flex`。

## 5. 常见问题
- **光不显示**：检查是否引入了 JS；父级是否 `overflow:hidden`；`isolation:isolate` 是否被覆盖。
- **光位置偏**：自定义了 `--glow-spread` 但写成了非 px 单位，JS 读不出来，请用 px。
- **按钮底色透明**：`::after` 需要实色遮罩，透明底色会让光透进按钮中间。
- **手机上没效果**：设计如此（`hover:none` 时隐藏）。

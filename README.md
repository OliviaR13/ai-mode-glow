# ai-mode-glow

鼠标跟随的彩虹光晕按钮 —— 复刻 Google 搜索「AI 模式」按钮的悬停效果。
一个 Claude Skill，也可以当普通前端片段直接用。纯 CSS + ~20 行 JS，无依赖。

## 效果
鼠标悬停时，蓝 / 绿 / 黄 / 红的柔光只出现在离鼠标最近的那一段边缘，鼠标移开后淡出。

## 目录
```
ai-mode-glow/
├── SKILL.md                    # Skill 入口（触发描述 + 使用步骤）
├── assets/
│   ├── glow-button.css         # 样式
│   ├── glow-button.js          # 鼠标坐标 → CSS 变量
│   └── demo.html               # 自包含演示页，双击即可预览
└── references/customization.md # 换色 / 角度旋转 / React / 排错
```

## 作为 Claude Skill 安装
1. 下载本仓库 zip（或 Release 里的 `ai-mode-glow.skill`）。
2. Claude → 设置 → 能力 / Skills → 上传 zip。
3. 对话里说「给这个按钮加鼠标跟随的彩虹光晕」即可触发。

## 直接用在网页
```html
<link rel="stylesheet" href="assets/glow-button.css">
<script src="assets/glow-button.js"></script>
<button class="glow-btn">AI 模式</button>
```

## 可调参数（CSS 变量）
| 变量 | 默认 | 说明 |
| --- | --- | --- |
| `--glow-bg` | `#f0f2f5` | 按钮底色，需与实际底色一致 |
| `--glow-size` | `72px` | 光斑半径 |
| `--glow-blur` | `9px` | 虚化程度 |
| `--glow-spread` | `5px` | 光溢出边缘的距离（用 px） |
| `--glow-duration` | `.35s` | 淡入淡出时长 |
| `--glow-colors` | Google 四色 | conic-gradient 颜色列表 |

## 原理
`conic-gradient` 彩色底 → `blur` 虚化 → 以鼠标为中心的 `radial-gradient` mask → `::after` 底色遮罩 → JS 更新 `--glow-x/--glow-y`。

## License
MIT

# CPer 导航页

个人导航页：[www.510904.xyz](https://www.510904.xyz)，托管于 GitHub Pages。

纯静态页面，无构建步骤，推送到 `main` 分支后由 GitHub Actions 自动部署。

## 目录结构

```
├── index.html            # 页面主体与导航链接配置
├── static/
│   ├── style.css         # 样式
│   ├── main.js           # 交互逻辑：按钮跳转、一言、特效懒加载
│   ├── effects.js        # 点击爱心特效（首次交互时按需加载）
│   └── images/           # 静态图片
├── BingSiteAuth.xml      # 必应站点验证文件，请勿删除
├── 7819f0bb2ec8a9b3cfe10edfbfeca807.txt  # 站点验证文件，请勿删除
└── .github/workflows/static.yml  # Pages 自动部署
```

## 自定义

### 添加 / 修改导航按钮

在 `index.html` 中复制一个按钮并按需修改：

- `data-href`：目标链接
- `data-window`：`newtab`（新标签页）或 `current`（当前页）
- 配色类：`btn-primary` / `btn-success` / `btn-info` / `btn-outline-*`（Bootstrap 4）

### 背景图

背景图地址统一收敛在 `index.html` 内联样式的 CSS 变量中，换图只改一处：

```css
:root {
    --bg-image: url("https://t.alcy.cc/fj");         /* PC 全屏背景 */
    --bg-image-mobile: url("https://t.alcy.cc/ycy"); /* 手机端全屏背景 */
}
```

- PC 端还包含左侧卡片图 `.photo-bg`（默认 `static/images/miku.webp`）
- 手机端为「全屏背景 + 浅色毛玻璃内容卡」布局：色系延续 PC 端白卡浅色风格，
  深色文字保证高可读性，彩色图标块与 PC 端彩色按钮一一对应；
  若浏览器不支持 `backdrop-filter`（极少数老机型），会自动退化为半透明浅底，不影响使用

### 一言

修改 `<head>` 内联脚本中的 `hitokoto_api` 变量。

### 视频背景（可选）

需要在 `index.html` 中取消注释 `.kz-video` 结构并填写 `src`，同时在 `style.css` 中补充：

```css
.kz-video {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    overflow: hidden;
}
.kz-video video {
    min-width: 100%;
    min-height: 100%;
    object-fit: cover;
}
```

注意：视频体积大，建议用外部链接（图床 / CDN），避免拖慢首屏加载。
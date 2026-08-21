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

修改 `<head>` 内联样式中 `body` 或 `.photo-bg` 的 `background-image`，可使用随机图 API。

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
# X Japan 粉丝网站部署说明

## 📦 项目文件说明

### 核心文件
- `index.html` - 主网站首页
- `admin-login.html` - 后台登录页面
- `admin-dashboard.html` - 后台管理界面

### 样式文件
- `styles.css` - 主网站样式
- `enhanced-styles.css` - 增强视觉效果
- `admin-styles.css` - 后台管理样式

### 脚本文件
- `script.js` - 主网站功能
- `enhanced-script.js` - 增强交互效果
- `admin-script.js` - 后台管理功能

### 资源文件
- `assets/` - 图片和媒体资源文件夹

## 🚀 部署方案

### 方案一：Netlify（推荐）
1. 访问 https://netlify.com 注册账号
2. 点击 "Sites" → "Add new site" → "Deploy manually"
3. 将整个 `deployment-package` 文件夹拖拽到部署区域
4. 等待部署完成，获得免费域名
5. 可在 Site settings 中绑定自定义域名

**优点**：
- ✅ 完全免费
- ✅ 自动 HTTPS
- ✅ 全球 CDN 加速
- ✅ 支持自定义域名

### 方案二：Vercel
1. 访问 https://vercel.com 注册账号
2. 点击 "New Project"
3. 选择 "Browse all templates" → "Other"
4. 上传项目文件
5. 一键部署

### 方案三：GitHub Pages
1. 在 GitHub 创建新仓库
2. 上传所有文件到仓库
3. 进入 Settings → Pages
4. 选择 "Deploy from a branch" → "main"
5. 访问 `https://用户名.github.io/仓库名`

### 方案四：传统虚拟主机
适合企业级部署：
- 阿里云虚拟主机
- 腾讯云轻量应用服务器
- GoDaddy 主机服务

## 🔐 后台管理

### 登录信息
- **用户名**：`admin`
- **密码**：`xjapan2024`

### 访问方式
部署完成后访问：`你的域名/admin-login.html`

### 功能说明
- 演出管理：添加/编辑演出信息
- 新闻管理：发布/管理新闻内容
- 社交媒体：管理社交平台动态
- 媒体库：上传/管理图片和音频
- 网站设置：配置英雄区域文案、背景图片、音乐
- 链接管理：管理页脚快速链接和社交链接

## 📱 功能特点

### 前端网站
- 响应式设计，支持手机/平板/电脑
- 视觉系摇滚风格设计
- 粒子动画效果
- 音频播放控制
- 平滑滚动导航
- 弹窗展示详细信息

### 后台管理
- 实时内容管理
- 媒体文件预览
- 数据统计展示
- 用户友好界面
- 前后端实时同步

## 🔧 自定义配置

### 修改登录密码
编辑 `admin-script.js` 文件第4-7行：
```javascript
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: '你的新密码'
};
```

### 更换默认图片
将新图片放入 `assets/` 文件夹，然后在后台管理的【网站设置】中更新路径。

### 修改网站标题
编辑 `index.html` 文件的 `<title>` 标签。

## 📞 技术支持

如遇到部署问题，请检查：
1. 所有文件是否完整上传
2. 文件路径是否正确
3. 浏览器是否支持现代 JavaScript 特性

## 🌐 域名绑定

### Netlify 自定义域名
1. 在 Netlify 控制台选择站点
2. 进入 "Domain settings"
3. 点击 "Add custom domain"
4. 按提示配置 DNS 记录

### 购买域名推荐
- 阿里云：https://wanwang.aliyun.com
- 腾讯云：https://dnspod.cloud.tencent.com
- GoDaddy：https://godaddy.com

---

🎸 **X Japan 永远的传说，不朽的音乐！** 🎸
#!/bin/bash

# X Japan 网站部署脚本
echo "🎸 X Japan 网站部署助手 🎸"
echo "================================"

# 检查必要文件
echo "📋 检查项目文件..."
required_files=("index.html" "admin-login.html" "admin-dashboard.html" "styles.css" "script.js" "admin-script.js")

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file - 文件缺失！"
        exit 1
    fi
done

echo ""
echo "🚀 部署选项："
echo "1. 创建 ZIP 压缩包（用于手动上传）"
echo "2. 显示 Netlify 部署指南"
echo "3. 显示 GitHub Pages 部署指南"
echo "4. 显示 Vercel 部署指南"
echo ""

read -p "请选择部署方式 (1-4): " choice

case $choice in
    1)
        echo "📦 创建部署压缩包..."
        zip -r "xjapan-website-$(date +%Y%m%d).zip" . -x "*.sh" "README-部署说明.md"
        echo "✅ 压缩包已创建: xjapan-website-$(date +%Y%m%d).zip"
        echo "📤 您可以将此文件上传到任何支持静态网站的主机服务"
        ;;
    2)
        echo "🌐 Netlify 部署指南："
        echo "1. 访问 https://netlify.com 注册账号"
        echo "2. 点击 'Sites' → 'Add new site' → 'Deploy manually'"
        echo "3. 将当前文件夹拖拽到部署区域"
        echo "4. 等待部署完成"
        echo "5. 获得免费域名: https://xxx.netlify.app"
        ;;
    3)
        echo "📚 GitHub Pages 部署指南："
        echo "1. 在 GitHub 创建新仓库"
        echo "2. 上传所有文件到仓库"
        echo "3. 进入 Settings → Pages"
        echo "4. 选择 'Deploy from a branch' → 'main'"
        echo "5. 访问: https://用户名.github.io/仓库名"
        ;;
    4)
        echo "⚡ Vercel 部署指南："
        echo "1. 访问 https://vercel.com 注册账号"
        echo "2. 点击 'New Project'"
        echo "3. 选择 'Browse all templates' → 'Other'"
        echo "4. 上传项目文件"
        echo "5. 一键部署完成"
        ;;
    *)
        echo "❌ 无效选择"
        exit 1
        ;;
esac

echo ""
echo "🔐 后台管理信息："
echo "登录地址: 你的域名/admin-login.html"
echo "用户名: admin"
echo "密码: xjapan2024"
echo ""
echo "🎸 部署完成！X Japan 永远的传说！🎸"
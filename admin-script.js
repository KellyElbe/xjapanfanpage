// 管理后台 JavaScript 功能

// 登录验证
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'xjapan2024'
};

// 模拟数据存储
let contentData = {
    concerts: [
        {
            id: 1,
            title: '东京巨蛋演唱会',
            date: '2024-12-25',
            venue: '东京巨蛋',
            description: 'X JAPAN 30周年纪念演唱会，重现经典曲目',
            status: 'published',
            created: '2024-10-16'
        },
        {
            id: 2,
            title: '大阪城音乐厅',
            date: '2024-11-15',
            venue: '大阪城音乐厅',
            description: '特别演出，包含未发表新曲首演',
            status: 'draft',
            created: '2024-10-15'
        }
    ],
    news: [
        {
            id: 1,
            title: 'X JAPAN 30周年纪念专辑发布',
            content: '乐队宣布将发布30周年纪念专辑，收录重新编排的经典曲目...',
            category: '专辑发布',
            status: 'published',
            created: '2024-10-16'
        },
        {
            id: 2,
            title: '新单曲《Forever Love 2024》制作中',
            content: '乐队正在制作全新版本的《Forever Love》，预计年底发布...',
            category: '新闻动态',
            status: 'draft',
            created: '2024-10-15'
        }
    ],
    social: [
        {
            id: 1,
            platform: 'Twitter',
            content: '感谢所有粉丝的支持！新专辑制作进展顺利 🎸 #XJAPAN',
            status: 'published',
            created: '2024-10-16'
        },
        {
            id: 2,
            platform: 'Instagram',
            content: '录音室花絮照片分享，敬请期待新作品！',
            status: 'published',
            created: '2024-10-15'
        }
    ],
    media: [
        {
            id: 1,
            name: 'x-japan-hero.jpg',
            type: 'image',
            size: '2.5MB',
            uploaded: '2024-10-16',
            url: 'assets/x-japan-hero.svg',
            isHeroImage: true
        },
        {
            id: 2,
            name: 'background-music.mp3',
            type: 'audio',
            size: '4.2MB',
            uploaded: '2024-10-15',
            url: '#',
            isBackgroundMusic: true
        }
    ],
    settings: {
        heroImage: 'assets/x-japan-hero.svg',
        backgroundMusic: '#',
        heroMainTitle: 'X JAPAN',
        heroSubTitle: '永远的传说',
        heroDescription: '视觉系摇滚的开拓者，音乐史上的不朽传奇',
        footerSlogan: '永远的传说，不朽的音乐',
        latestConcerts: {
            title: '最新演出',
            content: '东京巨蛋演唱会即将开始，这将是X JAPAN历史上最重要的演出之一。我们将演奏所有经典曲目，包括《Forever Love》、《Tears》、《Silent Jealousy》等。',
            image: 'assets/concert-placeholder.svg'
        },
        bandHistory: {
            title: '乐队历史',
            content: 'X JAPAN成立于1982年，是日本视觉系摇滚的先驱乐队。由YOSHIKI和TOSHI创立，后来加入了HIDE、PATA和TAIJI。乐队以其华丽的视觉形象和强烈的音乐风格闻名世界。',
            image: 'assets/news-placeholder.svg'
        }
    },
    links: {
        quickLinks: [
            { name: '官方网站', url: 'https://www.xjapan.com' },
            { name: '演出信息', url: 'https://www.xjapan.com/live' },
            { name: '商品购买', url: 'https://www.xjapan.com/shop' },
            { name: '粉丝俱乐部', url: 'https://www.xjapan.com/fanclub' }
        ],
        socialLinks: [
            { name: 'Twitter', url: 'https://twitter.com/xjapanofficial' },
            { name: 'Instagram', url: 'https://instagram.com/xjapanofficial' },
            { name: 'YouTube', url: 'https://youtube.com/xjapanofficial' },
            { name: 'Facebook', url: 'https://facebook.com/xjapanofficial' }
        ]
    }
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 检查当前页面
    if (document.getElementById('loginForm')) {
        initLogin();
    } else if (document.getElementById('adminSidebar')) {
        initDashboard();
    }
});

// 登录页面初始化
function initLogin() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe').checked;
        
        // 显示加载状态
        showLoading(true);
        
        // 模拟登录验证
        setTimeout(() => {
            if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
                // 登录成功
                if (rememberMe) {
                    localStorage.setItem('adminLoggedIn', 'true');
                } else {
                    sessionStorage.setItem('adminLoggedIn', 'true');
                }
                
                // 跳转到仪表板
                window.location.href = 'admin-dashboard.html';
            } else {
                // 登录失败
                showError('用户名或密码错误，请重试');
                showLoading(false);
            }
        }, 1500);
    });
}

// 仪表板初始化
function initDashboard() {
    // 检查登录状态
    if (!isLoggedIn()) {
        window.location.href = 'admin-login.html';
        return;
    }
    
    // 初始化导航
    initNavigation();
    
    // 更新统计数据
    updateDashboardStats();
    
    // 加载默认内容
    loadContent('concerts');
}

// 更新仪表板统计数据
function updateDashboardStats() {
    const stats = document.querySelectorAll('.stat-card h3');
    if (stats.length >= 4) {
        stats[0].textContent = contentData.concerts.filter(c => c.status === 'published').length;
        stats[1].textContent = contentData.news.filter(n => n.status === 'published').length;
        stats[2].textContent = contentData.social.filter(s => s.status === 'published').length;
        stats[3].textContent = contentData.media.length;
    }
}

// 检查登录状态
function isLoggedIn() {
    return localStorage.getItem('adminLoggedIn') === 'true' || 
           sessionStorage.getItem('adminLoggedIn') === 'true';
}

// 显示加载状态
function showLoading(show) {
    const btnText = document.querySelector('.btn-text');
    const btnLoading = document.querySelector('.btn-loading');
    const loginBtn = document.querySelector('.login-btn');
    
    if (show) {
        btnText.style.display = 'none';
        btnLoading.style.display = 'block';
        loginBtn.disabled = true;
    } else {
        btnText.style.display = 'block';
        btnLoading.style.display = 'none';
        loginBtn.disabled = false;
    }
}

// 显示错误信息
function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    
    // 3秒后自动隐藏
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 3000);
}

// 初始化导航
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有活动状态
            navLinks.forEach(l => l.classList.remove('active'));
            
            // 添加当前活动状态
            this.classList.add('active');
            
            // 获取目标部分
            const section = this.getAttribute('data-section');
            
            // 更新页面标题
            const titles = {
                'dashboard': '仪表板',
                'concerts': '演出管理',
                'news': '新闻管理',
                'social': '社交媒体',
                'media': '媒体库',
                'settings': '网站设置',
                'links': '链接管理'
            };
            
            document.getElementById('pageTitle').textContent = titles[section];
            
            // 显示对应内容
            showSection(section);
            
            // 加载内容
            if (section !== 'dashboard') {
                if (section === 'settings') {
                    loadSettings();
                } else if (section === 'links') {
                    loadLinks();
                } else {
                    loadContent(section);
                }
            }
        });
    });
}

// 显示指定部分
function showSection(sectionName) {
    const sections = document.querySelectorAll('.content-section');
    
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    const targetSection = document.getElementById(sectionName + '-section');
    if (targetSection) {
        targetSection.style.display = 'block';
    }
}

// 加载内容
function loadContent(type) {
    const data = contentData[type] || [];
    const gridId = type + 'Grid';
    const grid = document.getElementById(gridId);
    
    if (!grid) return;
    
    if (type === 'media') {
        loadMediaContent(grid, data);
    } else {
        loadRegularContent(grid, data, type);
    }
}

// 加载常规内容
function loadRegularContent(grid, data, type) {
    grid.innerHTML = '';
    
    data.forEach(item => {
        const card = createContentCard(item, type);
        grid.appendChild(card);
    });
}

// 加载媒体内容
function loadMediaContent(grid, data) {
    grid.innerHTML = '';
    
    data.forEach(item => {
        const mediaCard = createMediaCard(item);
        grid.appendChild(mediaCard);
    });
}

// 创建内容卡片
function createContentCard(item, type) {
    const card = document.createElement('div');
    card.className = 'content-card';
    
    const statusClass = item.status === 'published' ? 'status-published' : 'status-draft';
    const statusText = item.status === 'published' ? '已发布' : '草稿';
    
    let contentPreview = '';
    if (type === 'concerts') {
        contentPreview = `
            <p><strong>日期：</strong>${item.date}</p>
            <p><strong>场地：</strong>${item.venue}</p>
            <p>${item.description}</p>
        `;
    } else if (type === 'news') {
        contentPreview = `
            <p><strong>分类：</strong>${item.category}</p>
            <p>${item.content.substring(0, 100)}...</p>
        `;
    } else if (type === 'social') {
        contentPreview = `
            <p><strong>平台：</strong>${item.platform}</p>
            <p>${item.content}</p>
        `;
    }
    
    card.innerHTML = `
        <div class="card-header">
            <div>
                <h3 class="card-title">${item.title || item.content.substring(0, 30) + '...'}</h3>
                <div class="card-meta">创建时间：${item.created}</div>
            </div>
            <div class="card-actions">
                <button class="action-btn edit" onclick="editContent('${type}', ${item.id})">编辑</button>
                <button class="action-btn delete" onclick="deleteContent('${type}', ${item.id})">删除</button>
            </div>
        </div>
        <div class="card-content">
            ${contentPreview}
        </div>
        <div class="card-footer">
            <span class="card-status ${statusClass}">${statusText}</span>
        </div>
    `;
    
    return card;
}

// 创建媒体卡片
function createMediaCard(item) {
    const card = document.createElement('div');
    card.className = 'media-card';
    card.style.cssText = `
        background: var(--card-black);
        border: 1px solid var(--border-gray);
        border-radius: 12px;
        padding: 15px;
        text-align: center;
        transition: var(--transition);
        cursor: pointer;
    `;
    
    let icon = '📄';
    if (item.type === 'image') icon = '🖼️';
    else if (item.type === 'video') icon = '🎥';
    else if (item.type === 'audio') icon = '🎵';
    
    card.innerHTML = `
        <div style="font-size: 2rem; margin-bottom: 10px;">${icon}</div>
        <h4 style="color: var(--text-white); margin-bottom: 5px; font-size: 0.9rem;">${item.name}</h4>
        <p style="color: var(--text-gray); font-size: 0.8rem; margin-bottom: 5px;">${item.size}</p>
        <p style="color: var(--text-light-gray); font-size: 0.7rem;">${item.uploaded}</p>
        <div style="margin-top: 10px; display: flex; gap: 5px; justify-content: center;">
            <button class="action-btn" onclick="previewMedia(${item.id})" style="font-size: 0.7rem;">预览</button>
            <button class="action-btn delete" onclick="deleteMedia(${item.id})" style="font-size: 0.7rem;">删除</button>
        </div>
    `;
    
    return card;
}

// 打开编辑器
function openEditor(type, id = null) {
    const modal = document.getElementById('editorModal');
    const title = document.getElementById('editorTitle');
    const fieldsContainer = document.getElementById('editorFields');
    
    // 设置标题
    const titles = {
        'concert': id ? '编辑演出' : '添加演出',
        'news': id ? '编辑新闻' : '添加新闻',
        'social': id ? '编辑动态' : '添加动态'
    };
    
    title.textContent = titles[type];
    
    // 生成表单字段
    fieldsContainer.innerHTML = generateFormFields(type, id);
    
    // 显示模态框
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    modal.style.zIndex = '1000';
    
    // 绑定表单提交事件
    const form = document.getElementById('contentForm');
    form.onsubmit = (e) => saveContent(e, type, id);
}

// 生成表单字段
function generateFormFields(type, id) {
    const item = id ? contentData[type + 's'].find(i => i.id == id) : {};
    
    const commonStyle = `
        background: var(--secondary-black);
        border: 1px solid var(--border-gray);
        border-radius: 8px;
        padding: 12px;
        color: var(--text-white);
        width: 100%;
        margin-bottom: 15px;
    `;
    
    const labelStyle = `
        color: var(--text-gray);
        display: block;
        margin-bottom: 5px;
        font-weight: 500;
    `;
    
    if (type === 'concert') {
        return `
            <div>
                <label style="${labelStyle}">演出标题</label>
                <input type="text" name="title" value="${item.title || ''}" style="${commonStyle}" required>
            </div>
            <div>
                <label style="${labelStyle}">演出日期</label>
                <input type="date" name="date" value="${item.date || ''}" style="${commonStyle}" required>
            </div>
            <div>
                <label style="${labelStyle}">演出场地</label>
                <input type="text" name="venue" value="${item.venue || ''}" style="${commonStyle}" required>
            </div>
            <div>
                <label style="${labelStyle}">演出描述</label>
                <textarea name="description" style="${commonStyle} height: 100px;" required>${item.description || ''}</textarea>
            </div>
            <div>
                <label style="${labelStyle}">状态</label>
                <select name="status" style="${commonStyle}">
                    <option value="draft" ${item.status === 'draft' ? 'selected' : ''}>草稿</option>
                    <option value="published" ${item.status === 'published' ? 'selected' : ''}>发布</option>
                </select>
            </div>
        `;
    } else if (type === 'news') {
        return `
            <div>
                <label style="${labelStyle}">新闻标题</label>
                <input type="text" name="title" value="${item.title || ''}" style="${commonStyle}" required>
            </div>
            <div>
                <label style="${labelStyle}">新闻分类</label>
                <input type="text" name="category" value="${item.category || ''}" style="${commonStyle}" required>
            </div>
            <div>
                <label style="${labelStyle}">新闻内容</label>
                <textarea name="content" style="${commonStyle} height: 150px;" required>${item.content || ''}</textarea>
            </div>
            <div>
                <label style="${labelStyle}">状态</label>
                <select name="status" style="${commonStyle}">
                    <option value="draft" ${item.status === 'draft' ? 'selected' : ''}>草稿</option>
                    <option value="published" ${item.status === 'published' ? 'selected' : ''}>发布</option>
                </select>
            </div>
        `;
    } else if (type === 'social') {
        return `
            <div>
                <label style="${labelStyle}">社交平台</label>
                <select name="platform" style="${commonStyle}">
                    <option value="Twitter" ${item.platform === 'Twitter' ? 'selected' : ''}>Twitter</option>
                    <option value="Instagram" ${item.platform === 'Instagram' ? 'selected' : ''}>Instagram</option>
                    <option value="YouTube" ${item.platform === 'YouTube' ? 'selected' : ''}>YouTube</option>
                </select>
            </div>
            <div>
                <label style="${labelStyle}">动态内容</label>
                <textarea name="content" style="${commonStyle} height: 100px;" required>${item.content || ''}</textarea>
            </div>
            <div>
                <label style="${labelStyle}">状态</label>
                <select name="status" style="${commonStyle}">
                    <option value="draft" ${item.status === 'draft' ? 'selected' : ''}>草稿</option>
                    <option value="published" ${item.status === 'published' ? 'selected' : ''}>发布</option>
                </select>
            </div>
        `;
    }
}

// 保存内容
function saveContent(e, type, id) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // 添加时间戳
    data.created = new Date().toISOString().split('T')[0];
    
    if (id) {
        // 编辑现有内容
        const index = contentData[type + 's'].findIndex(item => item.id == id);
        if (index !== -1) {
            contentData[type + 's'][index] = { ...contentData[type + 's'][index], ...data };
        }
    } else {
        // 添加新内容
        const newId = Math.max(...contentData[type + 's'].map(item => item.id)) + 1;
        data.id = newId;
        contentData[type + 's'].push(data);
    }
    
    // 同步到前端
    syncToFrontend();
    
    // 关闭编辑器
    closeEditor();
    
    // 重新加载内容
    loadContent(type + 's');
    
    // 更新统计数据
    updateDashboardStats();
    
    // 显示成功消息
    showSuccessMessage(id ? '内容已更新' : '内容已添加');
}

// 关闭编辑器
function closeEditor() {
    const modal = document.getElementById('editorModal');
    modal.style.display = 'none';
}

// 编辑内容
function editContent(type, id) {
    openEditor(type, id);
}

// 删除内容
function deleteContent(type, id) {
    if (confirm('确定要删除这个内容吗？')) {
        const index = contentData[type].findIndex(item => item.id == id);
        if (index !== -1) {
            contentData[type].splice(index, 1);
            
            // 同步到前端
            syncToFrontend();
            
            loadContent(type);
            
            // 更新统计数据
            updateDashboardStats();
            
            showSuccessMessage('内容已删除');
        }
    }
}

// 删除媒体文件
function deleteMedia(id) {
    if (confirm('确定要删除这个文件吗？')) {
        const index = contentData.media.findIndex(item => item.id == id);
        if (index !== -1) {
            contentData.media.splice(index, 1);
            loadContent('media');
            showSuccessMessage('文件已删除');
        }
    }
}

// 打开媒体上传
function openMediaUpload() {
    // 创建文件输入元素
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = 'image/*,video/*';
    
    input.onchange = function(e) {
        const files = Array.from(e.target.files);
        
        files.forEach(file => {
            const newMedia = {
                id: Math.max(...contentData.media.map(item => item.id)) + 1,
                name: file.name,
                type: file.type.startsWith('image/') ? 'image' : 'video',
                size: formatFileSize(file.size),
                uploaded: new Date().toISOString().split('T')[0]
            };
            
            contentData.media.push(newMedia);
        });
        
        loadContent('media');
        showSuccessMessage(`已上传 ${files.length} 个文件`);
    };
    
    input.click();
}

// 格式化文件大小
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 显示成功消息
function showSuccessMessage(message) {
    // 创建成功提示
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--gradient-red);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 10000;
        font-weight: 600;
        box-shadow: var(--shadow-glow);
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // 3秒后移除
    setTimeout(() => {
        document.body.removeChild(toast);
    }, 3000);
}

// 退出登录
function logout() {
    if (confirm('确定要退出登录吗？')) {
        localStorage.removeItem('adminLoggedIn');
        sessionStorage.removeItem('adminLoggedIn');
        window.location.href = 'admin-login.html';
    }
}

// 用户下拉菜单切换
function toggleUserDropdown() {
    const dropdown = document.getElementById('userDropdown');
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
}

// 媒体预览功能
function previewMedia(id) {
    const media = contentData.media.find(m => m.id === id);
    if (!media) return;
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    let content = '';
    if (media.type === 'image') {
        content = `<img src="${media.url || 'assets/placeholder.svg'}" style="max-width: 90%; max-height: 90%; border-radius: 8px;">`;
    } else if (media.type === 'video') {
        content = `<video controls style="max-width: 90%; max-height: 90%; border-radius: 8px;">
            <source src="${media.url || '#'}" type="video/mp4">
            您的浏览器不支持视频播放
        </video>`;
    } else if (media.type === 'audio') {
        content = `<div style="background: var(--card-black); padding: 30px; border-radius: 12px; text-align: center;">
            <h3 style="color: var(--text-white); margin-bottom: 20px;">${media.name}</h3>
            <audio controls style="width: 300px;">
                <source src="${media.url || '#'}" type="audio/mpeg">
                您的浏览器不支持音频播放
            </audio>
        </div>`;
    }
    
    modal.innerHTML = `
        <div style="position: relative;">
            ${content}
            <button onclick="this.parentElement.parentElement.remove()" style="
                position: absolute;
                top: -40px;
                right: 0;
                background: var(--accent-red);
                border: none;
                color: white;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                cursor: pointer;
                font-size: 18px;
            ">&times;</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.onclick = function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    };
}

// 加载网站设置
function loadSettings() {
    const settings = contentData.settings;
    
    document.getElementById('heroImageInput').value = settings.heroImage || '';
    document.getElementById('backgroundMusicInput').value = settings.backgroundMusic || '';
    
    // 加载英雄区域文案设置
    document.getElementById('heroMainTitle').value = settings.heroMainTitle || 'X JAPAN';
    document.getElementById('heroSubTitle').value = settings.heroSubTitle || '永远的传说';
    document.getElementById('heroDescription').value = settings.heroDescription || '视觉系摇滚的开拓者，音乐史上的不朽传奇';
    document.getElementById('footerSlogan').value = settings.footerSlogan || '永远的传说，不朽的音乐';
    
    document.getElementById('latestConcertTitle').value = settings.latestConcerts.title || '';
    document.getElementById('latestConcertContent').value = settings.latestConcerts.content || '';
    document.getElementById('latestConcertImage').value = settings.latestConcerts.image || '';
    
    document.getElementById('bandHistoryTitle').value = settings.bandHistory.title || '';
    document.getElementById('bandHistoryContent').value = settings.bandHistory.content || '';
    document.getElementById('bandHistoryImage').value = settings.bandHistory.image || '';
}

// 保存网站设置
function saveSettings() {
    contentData.settings.heroImage = document.getElementById('heroImageInput').value;
    contentData.settings.backgroundMusic = document.getElementById('backgroundMusicInput').value;
    
    // 保存英雄区域文案设置
    contentData.settings.heroMainTitle = document.getElementById('heroMainTitle').value || 'X JAPAN';
    contentData.settings.heroSubTitle = document.getElementById('heroSubTitle').value || '永远的传说';
    contentData.settings.heroDescription = document.getElementById('heroDescription').value || '视觉系摇滚的开拓者，音乐史上的不朽传奇';
    contentData.settings.footerSlogan = document.getElementById('footerSlogan').value || '永远的传说，不朽的音乐';
    
    contentData.settings.latestConcerts.title = document.getElementById('latestConcertTitle').value;
    contentData.settings.latestConcerts.content = document.getElementById('latestConcertContent').value;
    contentData.settings.latestConcerts.image = document.getElementById('latestConcertImage').value;
    
    contentData.settings.bandHistory.title = document.getElementById('bandHistoryTitle').value;
    contentData.settings.bandHistory.content = document.getElementById('bandHistoryContent').value;
    contentData.settings.bandHistory.image = document.getElementById('bandHistoryImage').value;
    
    // 同步到前端
    syncToFrontend();
    
    showSuccessMessage('网站设置已保存');
}

// 选择英雄图片
function selectHeroImage() {
    const images = contentData.media.filter(m => m.type === 'image');
    if (images.length === 0) {
        alert('请先上传图片文件');
        return;
    }
    
    const imageList = images.map(img => `<div onclick="selectImage('${img.url}', 'hero')" style="cursor: pointer; padding: 10px; border: 1px solid var(--border-gray); margin: 5px 0; border-radius: 8px; background: var(--secondary-black);">${img.name}</div>`).join('');
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    modal.innerHTML = `
        <div style="background: var(--card-black); padding: 30px; border-radius: 12px; max-width: 500px; width: 90%; max-height: 80vh; overflow-y: auto;">
            <h3 style="color: var(--text-white); margin-bottom: 20px;">选择英雄背景图</h3>
            ${imageList}
            <button onclick="this.parentElement.parentElement.remove()" style="background: var(--border-gray); border: none; color: white; padding: 10px 20px; border-radius: 8px; cursor: pointer; margin-top: 15px;">取消</button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// 选择背景音乐
function selectBackgroundMusic() {
    const audios = contentData.media.filter(m => m.type === 'audio');
    if (audios.length === 0) {
        alert('请先上传音频文件');
        return;
    }
    
    const audioList = audios.map(audio => `<div onclick="selectImage('${audio.url}', 'music')" style="cursor: pointer; padding: 10px; border: 1px solid var(--border-gray); margin: 5px 0; border-radius: 8px; background: var(--secondary-black);">${audio.name}</div>`).join('');
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    modal.innerHTML = `
        <div style="background: var(--card-black); padding: 30px; border-radius: 12px; max-width: 500px; width: 90%; max-height: 80vh; overflow-y: auto;">
            <h3 style="color: var(--text-white); margin-bottom: 20px;">选择背景音乐</h3>
            ${audioList}
            <button onclick="this.parentElement.parentElement.remove()" style="background: var(--border-gray); border: none; color: white; padding: 10px 20px; border-radius: 8px; cursor: pointer; margin-top: 15px;">取消</button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// 选择弹窗图片
function selectPopupImage(type) {
    const images = contentData.media.filter(m => m.type === 'image');
    if (images.length === 0) {
        alert('请先上传图片文件');
        return;
    }
    
    const imageList = images.map(img => `<div onclick="selectImage('${img.url}', '${type}')" style="cursor: pointer; padding: 10px; border: 1px solid var(--border-gray); margin: 5px 0; border-radius: 8px; background: var(--secondary-black);">${img.name}</div>`).join('');
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    modal.innerHTML = `
        <div style="background: var(--card-black); padding: 30px; border-radius: 12px; max-width: 500px; width: 90%; max-height: 80vh; overflow-y: auto;">
            <h3 style="color: var(--text-white); margin-bottom: 20px;">选择图片</h3>
            ${imageList}
            <button onclick="this.parentElement.parentElement.remove()" style="background: var(--border-gray); border: none; color: white; padding: 10px 20px; border-radius: 8px; cursor: pointer; margin-top: 15px;">取消</button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// 选择图片回调
function selectImage(url, type) {
    if (type === 'hero') {
        document.getElementById('heroImageInput').value = url;
    } else if (type === 'music') {
        document.getElementById('backgroundMusicInput').value = url;
    } else if (type === 'latestConcert') {
        document.getElementById('latestConcertImage').value = url;
    } else if (type === 'bandHistory') {
        document.getElementById('bandHistoryImage').value = url;
    }
    
    // 关闭模态框
    document.querySelectorAll('div[style*="position: fixed"]').forEach(modal => {
        if (modal.innerHTML.includes('选择')) {
            modal.remove();
        }
    });
}

// 加载链接管理
function loadLinks() {
    loadQuickLinks();
    loadSocialLinks();
}

// 加载快速链接
function loadQuickLinks() {
    const container = document.getElementById('quickLinksContainer');
    container.innerHTML = '';
    
    contentData.links.quickLinks.forEach((link, index) => {
        const linkItem = document.createElement('div');
        linkItem.style.cssText = 'display: flex; gap: 10px; margin-bottom: 10px; align-items: center;';
        linkItem.innerHTML = `
            <input type="text" value="${link.name}" onchange="updateQuickLink(${index}, 'name', this.value)" style="flex: 1; background: var(--secondary-black); border: 1px solid var(--border-gray); border-radius: 8px; padding: 8px; color: var(--text-white);">
            <input type="url" value="${link.url}" onchange="updateQuickLink(${index}, 'url', this.value)" style="flex: 2; background: var(--secondary-black); border: 1px solid var(--border-gray); border-radius: 8px; padding: 8px; color: var(--text-white);">
            <button onclick="removeQuickLink(${index})" style="background: var(--accent-red); border: none; color: white; padding: 8px 12px; border-radius: 8px; cursor: pointer;">删除</button>
        `;
        container.appendChild(linkItem);
    });
}

// 加载社交链接
function loadSocialLinks() {
    const container = document.getElementById('socialLinksContainer');
    container.innerHTML = '';
    
    contentData.links.socialLinks.forEach((link, index) => {
        const linkItem = document.createElement('div');
        linkItem.style.cssText = 'display: flex; gap: 10px; margin-bottom: 10px; align-items: center;';
        linkItem.innerHTML = `
            <input type="text" value="${link.name}" onchange="updateSocialLink(${index}, 'name', this.value)" style="flex: 1; background: var(--secondary-black); border: 1px solid var(--border-gray); border-radius: 8px; padding: 8px; color: var(--text-white);">
            <input type="url" value="${link.url}" onchange="updateSocialLink(${index}, 'url', this.value)" style="flex: 2; background: var(--secondary-black); border: 1px solid var(--border-gray); border-radius: 8px; padding: 8px; color: var(--text-white);">
            <button onclick="removeSocialLink(${index})" style="background: var(--accent-red); border: none; color: white; padding: 8px 12px; border-radius: 8px; cursor: pointer;">删除</button>
        `;
        container.appendChild(linkItem);
    });
}

// 添加快速链接
function addQuickLink() {
    contentData.links.quickLinks.push({ name: '新链接', url: 'https://' });
    loadQuickLinks();
}

// 添加社交链接
function addSocialLink() {
    contentData.links.socialLinks.push({ name: '新平台', url: 'https://' });
    loadSocialLinks();
}

// 更新快速链接
function updateQuickLink(index, field, value) {
    contentData.links.quickLinks[index][field] = value;
    syncToFrontend();
}

// 更新社交链接
function updateSocialLink(index, field, value) {
    contentData.links.socialLinks[index][field] = value;
    syncToFrontend();
}

// 删除快速链接
function removeQuickLink(index) {
    contentData.links.quickLinks.splice(index, 1);
    loadQuickLinks();
    syncToFrontend();
}

// 删除社交链接
function removeSocialLink(index) {
    contentData.links.socialLinks.splice(index, 1);
    loadSocialLinks();
    syncToFrontend();
}

// 同步数据到前端
function syncToFrontend() {
    // 将后台数据保存到localStorage，前端页面会监听这个变化
    localStorage.setItem('adminContentData', JSON.stringify(contentData));
    
    // 触发storage事件通知前端页面更新
    window.dispatchEvent(new StorageEvent('storage', {
        key: 'adminContentData',
        newValue: JSON.stringify(contentData)
    }));
}

// 点击模态框外部关闭
document.addEventListener('click', function(e) {
    const modal = document.getElementById('editorModal');
    if (e.target === modal) {
        closeEditor();
    }
    
    // 关闭用户下拉菜单
    const userMenu = document.querySelector('.user-menu');
    const dropdown = document.getElementById('userDropdown');
    if (dropdown && !userMenu.contains(e.target)) {
        dropdown.style.display = 'none';
    }
});
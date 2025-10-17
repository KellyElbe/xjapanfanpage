// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 移动端菜单切换
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 点击菜单项关闭移动端菜单
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// 粒子效果
class ParticleSystem {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.init();
    }

    init() {
        for (let i = 0; i < 50; i++) {
            this.createParticle();
        }
        this.animate();
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(192, 192, 192, 0.6);
            border-radius: 50%;
            pointer-events: none;
        `;
        
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const vx = (Math.random() - 0.5) * 0.5;
        const vy = (Math.random() - 0.5) * 0.5;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        particle.vx = vx;
        particle.vy = vy;
        particle.x = x;
        particle.y = y;
        
        this.container.appendChild(particle);
        this.particles.push(particle);
    }

    animate() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > window.innerWidth) {
                particle.vx *= -1;
            }
            if (particle.y < 0 || particle.y > window.innerHeight) {
                particle.vy *= -1;
            }
            
            particle.style.left = particle.x + 'px';
            particle.style.top = particle.y + 'px';
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// 初始化粒子系统
document.addEventListener('DOMContentLoaded', () => {
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        new ParticleSystem(particlesContainer);
    }
});

// 滚动指示器点击事件
document.querySelector('.scroll-indicator')?.addEventListener('click', () => {
    document.querySelector('.latest-updates').scrollIntoView({
        behavior: 'smooth'
    });
});

// 卡片悬停效果增强
document.querySelectorAll('.update-card').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', x + 'px');
        card.style.setProperty('--mouse-y', y + 'px');
    });
});

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 导航栏活动状态更新
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// 懒加载图片
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px 50px 0px'
};

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// 添加页面加载动画
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// 错误处理 - 图片加载失败时显示占位符
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.background = 'linear-gradient(135deg, #1A1A1A, #0A0A0A)';
        this.style.display = 'flex';
        this.style.alignItems = 'center';
        this.style.justifyContent = 'center';
        this.style.color = '#CCCCCC';
        this.style.fontSize = '14px';
        this.innerHTML = '<span>图片加载中...</span>';
    });
});

// 社交媒体链接处理
document.querySelectorAll('.social-link, .card-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        // 这里可以添加实际的链接逻辑
        console.log('链接点击:', link.textContent);
    });
});

// 按钮点击效果
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // 创建涟漪效果
        const ripple = document.createElement('span');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        btn.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// 添加涟漪动画CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .loaded {
        animation: fadeIn 0.5s ease-in;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .update-card {
        position: relative;
        overflow: hidden;
    }
    
    .update-card::before {
        content: '';
        position: absolute;
        top: var(--mouse-y, 50%);
        left: var(--mouse-x, 50%);
        width: 0;
        height: 0;
        background: radial-gradient(circle, rgba(139, 0, 0, 0.1) 0%, transparent 70%);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: width 0.3s ease, height 0.3s ease;
        pointer-events: none;
        z-index: 1;
    }
    
    .update-card:hover::before {
        width: 300px;
        height: 300px;
    }
`;
document.head.appendChild(style);

// 网站配置数据（从后台管理同步）
let siteConfig = {
    settings: {
        heroImage: 'assets/x-japan-hero.svg',
        backgroundMusic: '#',
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

// 弹窗功能
function openPopup(type) {
    const overlay = document.getElementById('popupOverlay');
    const title = document.getElementById('popupTitle');
    const content = document.getElementById('popupContent');
    const image = document.getElementById('popupImage');
    
    if (type === 'latestConcerts') {
        title.textContent = siteConfig.settings.latestConcerts.title;
        content.textContent = siteConfig.settings.latestConcerts.content;
        image.src = siteConfig.settings.latestConcerts.image;
    } else if (type === 'bandHistory') {
        title.textContent = siteConfig.settings.bandHistory.title;
        content.textContent = siteConfig.settings.bandHistory.content;
        image.src = siteConfig.settings.bandHistory.image;
    }
    
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closePopup() {
    const overlay = document.getElementById('popupOverlay');
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// 点击遮罩关闭弹窗
document.getElementById('popupOverlay')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closePopup();
    }
});

// ESC键关闭弹窗
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closePopup();
    }
});

// 初始化页脚链接
function initFooterLinks() {
    // 更新快速链接
    const quickLinksContainer = document.getElementById('quickLinksFooter');
    if (quickLinksContainer) {
        quickLinksContainer.innerHTML = '';
        siteConfig.links.quickLinks.forEach(link => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${link.url}" target="_blank">${link.name}</a>`;
            quickLinksContainer.appendChild(li);
        });
    }
    
    // 更新社交媒体链接
    const socialLinksContainer = document.getElementById('socialLinksFooter');
    if (socialLinksContainer) {
        socialLinksContainer.innerHTML = '';
        siteConfig.links.socialLinks.forEach(link => {
            const a = document.createElement('a');
            a.href = link.url;
            a.target = '_blank';
            a.className = `social-link ${link.name.toLowerCase()}`;
            a.textContent = link.name;
            socialLinksContainer.appendChild(a);
        });
    }
}

// 从后台管理系统同步配置
function syncConfigFromAdmin() {
    // 检查localStorage中是否有后台管理的配置数据
    const adminConfig = localStorage.getItem('adminContentData');
    if (adminConfig) {
        try {
            const adminData = JSON.parse(adminConfig);
            if (adminData.settings) {
                siteConfig.settings = { ...siteConfig.settings, ...adminData.settings };
            }
            if (adminData.links) {
                siteConfig.links = { ...siteConfig.links, ...adminData.links };
            }
            
            // 更新页面内容
            updatePageContent();
        } catch (e) {
            console.log('配置同步失败:', e);
        }
    }
}

// 更新页面内容
function updatePageContent() {
    // 更新英雄背景图
    const heroImage = document.querySelector('.hero-image');
    if (heroImage && siteConfig.settings.heroImage) {
        heroImage.src = siteConfig.settings.heroImage;
    }
    
    // 更新英雄区域文案
    updateHeroText();
    
    // 更新页脚链接
    initFooterLinks();
}

// 更新英雄区域文案
function updateHeroText() {
    if (!siteConfig.settings) return;
    
    // 更新主标题
    const mainTitle = document.querySelector('.title-main');
    if (mainTitle && siteConfig.settings.heroMainTitle) {
        mainTitle.textContent = siteConfig.settings.heroMainTitle;
    }
    
    // 更新副标题
    const subTitle = document.querySelector('.title-sub');
    if (subTitle && siteConfig.settings.heroSubTitle) {
        subTitle.textContent = siteConfig.settings.heroSubTitle;
    }
    
    // 更新描述文字
    const description = document.querySelector('.hero-description');
    if (description && siteConfig.settings.heroDescription) {
        description.textContent = siteConfig.settings.heroDescription;
    }
    
    // 更新左下角标语（页脚中的标语）
    const footerSlogan = document.querySelector('.footer-section p');
    if (footerSlogan && siteConfig.settings.footerSlogan) {
        footerSlogan.textContent = siteConfig.settings.footerSlogan;
    }
}

// 导航锚点滚动增强
function enhanceNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            let targetElement = null;
            
            // 根据导航项找到对应的目标元素
            switch(targetId) {
                case 'home':
                    targetElement = document.getElementById('home');
                    break;
                case 'concerts':
                    targetElement = document.getElementById('concerts');
                    break;
                case 'news':
                    targetElement = document.getElementById('news');
                    break;
                case 'media':
                    targetElement = document.getElementById('media');
                    break;
                case 'social':
                    targetElement = document.getElementById('social');
                    break;
            }
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // 考虑导航栏高度
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 页面加载完成后执行初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化页脚链接
    initFooterLinks();
    
    // 从后台管理系统同步配置
    syncConfigFromAdmin();
    
    // 初始化英雄区域文案
    updateHeroText();
    
    // 增强导航功能
    enhanceNavigation();
});

// 监听后台管理系统的配置更新
window.addEventListener('storage', function(e) {
    if (e.key === 'adminContentData') {
        syncConfigFromAdmin();
    }
});
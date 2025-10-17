// 增强版 JavaScript - X Japan 粉丝网站

// 页面加载动画
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.classList.add('loaded');
        
        // 启动粒子系统
        initParticleSystem();
        
        // 启动滚动动画
        initScrollAnimations();
    }, 1500);
});

// 滚动进度条
function updateScrollProgress() {
    const scrollProgress = document.getElementById('scroll-progress');
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// 增强粒子系统
function initParticleSystem() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    // 清除现有粒子
    particlesContainer.innerHTML = '';
    
    for (let i = 0; i < 80; i++) {
        createEnhancedParticle(particlesContainer, i);
    }
}

function createEnhancedParticle(container, index) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 4 + 1;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const duration = Math.random() * 4 + 4;
    const delay = Math.random() * 2;
    
    particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
    `;
    
    container.appendChild(particle);
}

// 音频控制器功能
class AudioController {
    constructor() {
        this.isPlaying = false;
        this.playButton = document.getElementById('play-button');
        this.visualizer = document.getElementById('music-visualizer');
        this.init();
    }
    
    init() {
        this.playButton.addEventListener('click', () => this.togglePlay());
        this.updateVisualizerVisibility();
    }
    
    togglePlay() {
        this.isPlaying = !this.isPlaying;
        this.updatePlayButton();
        this.updateVisualizerVisibility();
        
        // 模拟音频播放（实际项目中会连接真实音频）
        if (this.isPlaying) {
            console.log('播放 Forever Love - X Japan');
        } else {
            console.log('暂停播放');
        }
    }
    
    updatePlayButton() {
        const svg = this.playButton.querySelector('svg path');
        if (this.isPlaying) {
            // 暂停图标
            svg.setAttribute('d', 'M6 19h4V5H6v14zm8-14v14h4V5h-4z');
        } else {
            // 播放图标
            svg.setAttribute('d', 'M8 5v14l11-7z');
        }
    }
    
    updateVisualizerVisibility() {
        if (this.isPlaying) {
            this.visualizer.style.opacity = '1';
        } else {
            this.visualizer.style.opacity = '0.3';
        }
    }
}

// 滚动动画系统
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    document.querySelectorAll('.update-card, .timeline-item, .section-title').forEach(el => {
        observer.observe(el);
    });
}

// 增强导航栏效果
function enhanceNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 滚动方向检测
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 向下滚动，隐藏导航栏
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // 向上滚动，显示导航栏
            navbar.style.transform = 'translateY(0)';
        }
        
        // 滚动效果
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
}

// 增强卡片交互
function enhanceCardInteractions() {
    document.querySelectorAll('.update-card').forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', x + 'px');
            card.style.setProperty('--mouse-y', y + 'px');
        });
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', x + 'px');
            card.style.setProperty('--mouse-y', y + 'px');
        });
        
        // 点击效果
        card.addEventListener('click', (e) => {
            createRippleEffect(e, card);
        });
    });
}

// 涟漪效果
function createRippleEffect(e, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(139, 0, 0, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: 10;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// 键盘快捷键
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // 空格键控制音频播放
        if (e.code === 'Space' && e.target === document.body) {
            e.preventDefault();
            audioController.togglePlay();
        }
        
        // ESC 键返回顶部
        if (e.code === 'Escape') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}

// 触摸设备优化
function initTouchOptimizations() {
    // 检测触摸设备
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        document.body.classList.add('touch-device');
        
        // 触摸反馈
        document.querySelectorAll('.btn, .update-card, .nav-link').forEach(element => {
            element.addEventListener('touchstart', () => {
                element.classList.add('touch-active');
            });
            
            element.addEventListener('touchend', () => {
                setTimeout(() => {
                    element.classList.remove('touch-active');
                }, 150);
            });
        });
    }
}

// 性能监控
function initPerformanceMonitoring() {
    // 监控 FPS
    let fps = 0;
    let lastTime = performance.now();
    
    function measureFPS() {
        const currentTime = performance.now();
        fps = 1000 / (currentTime - lastTime);
        lastTime = currentTime;
        
        // 如果 FPS 过低，减少动画效果
        if (fps < 30) {
            document.body.classList.add('low-performance');
        } else {
            document.body.classList.remove('low-performance');
        }
        
        requestAnimationFrame(measureFPS);
    }
    
    requestAnimationFrame(measureFPS);
}

// 错误处理
function initErrorHandling() {
    window.addEventListener('error', (e) => {
        console.error('页面错误:', e.error);
        // 可以在这里添加错误报告逻辑
    });
    
    // 图片加载错误处理
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.background = 'linear-gradient(135deg, #1A1A1A, #0A0A0A)';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.style.color = '#CCCCCC';
            this.style.fontSize = '14px';
            this.innerHTML = '<span>图片加载失败</span>';
        });
    });
}

// 主初始化函数
let audioController;

document.addEventListener('DOMContentLoaded', () => {
    // 初始化所有功能
    audioController = new AudioController();
    enhanceNavbar();
    enhanceCardInteractions();
    initKeyboardShortcuts();
    initTouchOptimizations();
    initPerformanceMonitoring();
    initErrorHandling();
    
    // 原有功能
    initMobileMenu();
    initSmoothScrolling();
    initActiveNavigation();
});

// 移动端菜单
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });
}

// 平滑滚动
function initSmoothScrolling() {
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
    
    // 滚动指示器
    document.querySelector('.scroll-indicator')?.addEventListener('click', () => {
        document.querySelector('.latest-updates')?.scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// 活动导航
function initActiveNavigation() {
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
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
}

// 添加样式
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .touch-active {
        transform: scale(0.95);
        opacity: 0.8;
    }
    
    .low-performance * {
        animation-duration: 0.1s !important;
        transition-duration: 0.1s !important;
    }
    
    .touch-device .update-card:hover {
        transform: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(enhancedStyles);
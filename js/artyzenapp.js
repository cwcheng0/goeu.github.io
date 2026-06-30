/* ==========================================
   上海前灘雅辰酒店 - 互動邏輯 (JS)
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. 滾動時變更導航欄樣式 (Sticky Scroll Header & Body class)
    const header = document.getElementById('site-header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            document.body.classList.add('scrolled-active');
        } else {
            header.classList.remove('scrolled');
            document.body.classList.remove('scrolled-active');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始化


    // 2. 手機版選單切換 (Mobile Hamburger Menu)
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // 選單打開時防止背景滾動
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // 點擊導航連結後關閉選單
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }


    // 3. 滾動淡入動畫 (Scroll Reveal with Intersection Observer)
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        animateElements.forEach(el => observer.observe(el));
    } else {
        // 退路方案
        animateElements.forEach(el => el.classList.add('appear'));
    }


    // 4. 旅人相簿與時間軸互動燈箱 (Lightbox Gallery Modal)
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    
    // 彙整頁面上 11 張代表照片的檔案位置與介紹文字
    const galleryItems = [
        {
            src: 'file:///C:/Users/cchen/Downloads/Artyzen_202606/IMG_20260624_095447.jpg',
            caption: '第一天 09:54 抵達大堂登記入住：上海前灘雅辰酒店挑高大堂設計，木質格欄與溫暖日光交織，拉開靜謐的藝術奢旅序幕。'
        },
        {
            src: 'file:///C:/Users/cchen/Downloads/Artyzen_202606/IMG_20260624_100157.jpg',
            caption: '第一天 10:01 休憩長檯：大堂共享客廳與休閒社交長檯，提供住客與周邊鄰里進行工作交流與小休。'
        },
        {
            src: 'file:///C:/Users/cchen/Downloads/Artyzen_202606/IMG_20260624_163146.jpg',
            caption: '第一天 16:31 入住客房：寬敞的雅辰特色客房，大地色系侘寂佈置與木紋理材質，是旅途中的溫馨私人避風港。'
        },
        {
            src: 'file:///C:/Users/cchen/Downloads/Artyzen_202606/IMG_20260624_164410.jpg',
            caption: '第一天 16:44 衛浴細節：高雅大方的乾濕分離客房浴室，配備精選洗浴備品，流露精緻生活質感。'
        },
        {
            src: 'file:///C:/Users/cchen/Downloads/Artyzen_202606/IMG_20260624_164837.jpg',
            caption: '第一天 16:48 天際暮色景觀：站在客房大落地窗前俯瞰前灘，欣賞亮起霓虹的繁華城市街景，璀璨迷人。'
        },
        {
            src: 'file:///C:/Users/cchen/Downloads/Artyzen_202606/IMG_20260624_182214.jpg',
            caption: '第一天 18:30 思方匯主廚晚餐：在燈光溫婉的思方匯 Bistro 享用主廚特製歐陸盤餐晚宴，開啟精彩的味蕾饗宴。'
        },
        {
            src: 'file:///C:/Users/cchen/Downloads/Artyzen_202606/IMG_20260624_190818.jpg',
            caption: '第一天 19:08 飯後調酒微醺：在酒店酒吧來一杯調酒師特調，享受屬於前灘的微醺寧靜夜晚。'
        },
        {
            src: 'file:///C:/Users/cchen/Downloads/Artyzen_202606/IMG_20260625_072009.jpg',
            caption: '第二天 07:20 思方匯自助早餐餐檯：精緻擺放的手工烘焙麵包、精選冷盤肉類與芝士，提供晨間豐盛美味。'
        },
        {
            src: 'file:///C:/Users/cchen/Downloads/Artyzen_202606/IMG_20260625_072122.jpg',
            caption: '第二天 07:30 元氣晨食：手作煎雙蛋、香脆培根與時蔬，佐以現沖滴濾熱咖啡，開啟能量滿滿的一天。'
        },
        {
            src: 'file:///C:/Users/cchen/Downloads/Artyzen_202606/IMG_20260625_132132.jpg',
            caption: '第二天 13:21 午後悠悠：在思方匯點一杯香甜果香夏日特調，搭配精緻簡餐，體驗像家一般的悠然生活。'
        },
        {
            src: 'file:///C:/Users/cchen/Downloads/Artyzen_202606/IMG_20260625_160837.jpg',
            caption: '第二天 16:08 旅程收尾：在酒店大堂與社交休憩椅前留下美好回憶，圓滿結束這場前灘雅辰美學之旅。'
        }
    ];
    
    let currentImageIndex = 0;
    
    // 開啟燈箱
    const openLightbox = (index) => {
        currentImageIndex = parseInt(index, 10);
        updateLightboxContent();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    
    // 關閉燈箱
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    // 更新大圖及文字
    const updateLightboxContent = () => {
        const item = galleryItems[currentImageIndex];
        if (item) {
            lightboxImg.src = item.src;
            lightboxImg.alt = item.caption;
            lightboxCaption.textContent = item.caption;
        }
    };
    
    // 下一張
    const showNextImage = (e) => {
        if (e) e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
        updateLightboxContent();
    };
    
    // 上一張
    const showPrevImage = (e) => {
        if (e) e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
        updateLightboxContent();
    };
    
    // 監聽時間軸內觸發圖片
    const triggers = document.querySelectorAll('.gallery-trigger');
    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const index = trigger.getAttribute('data-index');
            openLightbox(index);
        });
    });
    
    // 監聽相簿網格內圖片
    const galleryItemsElements = document.querySelectorAll('.gallery-item');
    galleryItemsElements.forEach(item => {
        item.addEventListener('click', () => {
            const index = item.getAttribute('data-index');
            openLightbox(index);
        });
    });
    
    // 綁定控制鈕事件
    if (lightbox) {
        closeBtn.addEventListener('click', closeLightbox);
        nextBtn.addEventListener('click', showNextImage);
        prevBtn.addEventListener('click', showPrevImage);
        
        // 點擊背景關閉
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // 鍵盤導航 (ESC、左右鍵)
        document.addEventListener('keydown', (e) => {
            if (lightbox.classList.contains('active')) {
                if (e.key === 'Escape') {
                    closeLightbox();
                } else if (e.key === 'ArrowRight') {
                    showNextImage();
                } else if (e.key === 'ArrowLeft') {
                    showPrevImage();
                }
            }
        });
    }
});

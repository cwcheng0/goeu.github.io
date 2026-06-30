/* ==========================================
   曼谷藍毗尼公園皇冠假日酒店 - 互動邏輯 (JS)
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. 滾動時變更導航欄樣式 (Sticky Scroll Header)
    const header = document.getElementById('site-header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始化執行，避免重新整理時狀態錯誤


    // 2. 手機版選單切換 (Mobile Hamburger Menu)
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // 當選單打開時，防止背景滾動
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
            threshold: 0.15
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                    // 觸發後便取消監聽該元素，保持網頁效能
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        animateElements.forEach(el => observer.observe(el));
    } else {
        // 瀏覽器不支援時的退路方案
        animateElements.forEach(el => el.classList.add('appear'));
    }


    // 4. 尊榮相簿互動燈箱 (Lightbox Gallery Modal)
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    
    // 彙整頁面上所有可供放大的相片資料
    const galleryItems = [
        {
            src: '../../brain/3842c47a-b40d-4247-b10f-498df6a30a07/media__1782736510951.jpg',
            caption: 'IHG One Rewards 會員專屬歡迎禮：主廚特製 Pride 彩虹馬卡龍，精緻細膩的法式經典甜點伴隨真摯謝卡，為您的旅程增添繽紛甜蜜。'
        },
        {
            src: '../../brain/3842c47a-b40d-4247-b10f-498df6a30a07/media__1782736511283.jpg',
            caption: '精緻迎賓甜品：玫瑰花瓣黑巧克力煎餅，口感濃郁扎實，佐以鮮豔玫瑰花瓣，呈現視覺與味覺的雙重享受。'
        },
        {
            src: '../../brain/3842c47a-b40d-4247-b10f-498df6a30a07/media__1782736511293.jpg',
            caption: '元氣個人朝食套組：產地直送的新鮮熱帶水果（芒果、紅龍果、木瓜）、滑嫩現煎歐姆蛋、香濃熱拿鐵與優格穀物，健康又充滿能量。'
        },
        {
            src: '../../brain/3842c47a-b40d-4247-b10f-498df6a30a07/media__1782736511304.jpg',
            caption: 'Panorama 餐廳自助餐檯：冰鎮容器中擺放著多種風味優格與麥片點心，木桶中盛裝著產地直送的冰鎮多汁西瓜，細節滿分。'
        },
        {
            src: '../../brain/3842c47a-b40d-4247-b10f-498df6a30a07/media__1782736511490.jpg',
            caption: '豐盛的中西式自助早餐饗宴：包含熱騰騰的亞洲麵食、蒸籠點心、精緻西式烘焙可頌、香甜穀物牛奶、日式納豆、現煎歐姆蛋以及會員馬卡龍，極致滿足。'
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
    
    // 更新燈箱內的相片與文字
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
    
    // 綁定觸發事件 - 會員卡片與展示卡片
    const triggers = document.querySelectorAll('.gallery-trigger');
    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const index = trigger.getAttribute('data-index');
            openLightbox(index);
        });
    });
    
    // 綁定觸發事件 - 相簿網格
    const galleryItemsElements = document.querySelectorAll('.gallery-item');
    galleryItemsElements.forEach(item => {
        item.addEventListener('click', () => {
            const index = item.getAttribute('data-index');
            openLightbox(index);
        });
    });
    
    // 燈箱事件監聽
    if (lightbox) {
        // 點擊關閉按鈕
        closeBtn.addEventListener('click', closeLightbox);
        
        // 點擊左右按鈕
        nextBtn.addEventListener('click', showNextImage);
        prevBtn.addEventListener('click', showPrevImage);
        
        // 點擊燈箱背景關閉
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // 鍵盤操控 (ESC 鍵、左右方向鍵)
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

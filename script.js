document.addEventListener('DOMContentLoaded', function() {
  // 平滑滾動導航
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // 滾動時導航欄高亮
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  function highlightNavigation() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === '#' + current) {
        item.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', highlightNavigation);

  // 數字動畫效果
  const stats = document.querySelectorAll('.stat-number[data-target]');
  stats.forEach(stat => animateNumber(stat));

  function animateNumber(element) {
    if (element.dataset.animated === "true") return;
    const target = parseFloat(element.getAttribute('data-target'));
    const unit = element.getAttribute('data-unit') || '';
    const duration = 2500;
    const frameRate = 30;
    const totalFrames = Math.round(duration / (1000 / frameRate));
    let frame = 0;
    const step = target / totalFrames;
    const timer = setInterval(() => {
      frame++;
      const current = Math.min(step * frame, target);
      element.innerText = unit ? Math.round(current).toLocaleString() + unit : Math.round(current).toLocaleString();
      if (frame >= totalFrames) {
        clearInterval(timer);
        element.innerText = unit ? Math.round(target).toLocaleString() + unit : Math.round(target).toLocaleString();
        element.dataset.animated = "true";
      }
    }, 1000 / frameRate);
  }

  // 警示條閃爍
  const warningBanner = document.querySelector('.warning-banner');
  if (warningBanner) {
    setInterval(() => {
      warningBanner.style.opacity = warningBanner.style.opacity === '0.7' ? '1' : '0.7';
    }, 1500);
  }

  // 卡片懸停動畫
  const cards = document.querySelectorAll('.pollution-card, .rights-card, .worker-card, .industry-card, .action-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // 表單提交監聽（若有表單）
  const reportForm = document.querySelector('.report-form');
  if (reportForm) {
    reportForm.addEventListener('submit', handleFormSubmit);
  }

  // ========== 🔧 Accordion 展開/收合功能修復 🔧 ==========
  function initAccordion() {
    console.log('🔧 開始初始化Accordion功能...');
    
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    console.log('📋 找到', accordionHeaders.length, '個accordion header');
    
    if (accordionHeaders.length === 0) {
      console.warn('⚠️ 沒有找到 .accordion-header 元素');
      return;
    }
    
    accordionHeaders.forEach((header, index) => {
      console.log('🔨 處理第', index + 1, '個header:', header.textContent.trim());
      
      // 移除可能存在的舊事件監聽器
      header.removeEventListener('click', accordionClickHandler);
      
      // 添加新的事件監聽器
      header.addEventListener('click', accordionClickHandler);
      
      // 確保初始狀態正確
      const content = header.nextElementSibling;
      if (content && content.classList.contains('accordion-content')) {
        if (!header.classList.contains('active')) {
          content.style.maxHeight = '0';
          content.style.padding = '0 20px';
          content.style.overflow = 'hidden';
        }
      }
    });
    
    console.log('✅ Accordion功能初始化完成！');
  }

  // Accordion點擊處理函數
  function accordionClickHandler() {
    const content = this.nextElementSibling;
    
    if (!content || !content.classList.contains('accordion-content')) {
      console.log('❌ 找不到對應的accordion-content元素');
      return;
    }
    
    // 切換 active 狀態
    const isActive = this.classList.contains('active');
    
    if (isActive) {
      // 收合
      console.log('📤 收合:', this.textContent.trim());
      this.classList.remove('active');
      content.classList.remove('active');
      content.style.maxHeight = '0';
      content.style.padding = '0 20px';
      content.style.overflow = 'hidden';
      content.style.transition = 'max-height 0.3s ease, padding 0.3s ease';
    } else {
      // 展開
      console.log('📥 展開:', this.textContent.trim());
      this.classList.add('active');
      content.classList.add('active');
      content.style.maxHeight = content.scrollHeight + 'px';
      content.style.padding = '15px 20px';
      content.style.overflow = 'visible';
      content.style.transition = 'max-height 0.3s ease, padding 0.3s ease';
    }
  }

  // 立即初始化accordion功能
  initAccordion();
  
  // 備用初始化（延遲執行，確保DOM完全載入）
  setTimeout(function() {
    console.log('🔄 執行備用accordion初始化...');
    initAccordion();
  }, 1000);
  
  // 再次備用初始化（更長延遲，處理動態載入的內容）
  setTimeout(function() {
    console.log('🔄 執行最終accordion初始化...');
    initAccordion();
  }, 3000);

  // ========== 🔧 Accordion修復結束 🔧 ==========

});

// 檢舉表單開關函數
function openReportForm() {
  const modal = document.getElementById('reportModal');
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeReportForm() {
  const modal = document.getElementById('reportModal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

window.addEventListener('click', function(event) {
  const modal = document.getElementById('reportModal');
  if (event.target === modal) {
    closeReportForm();
  }
});

// 點擊模態框外部關閉
window.addEventListener('click', function(event) {
    const modal = document.getElementById('reportModal');
    if (event.target === modal) {
        closeReportForm();
    }
});

// 修正 warningBanner 相關 setInterval 應在 DOMContentLoaded 外部
// 若 warningBanner 需動畫，請確保 warningBanner 已正確定義
const warningBanner = document.querySelector('.warning-banner');

if (warningBanner) {
  setInterval(() => {
    warningBanner.style.opacity = warningBanner.style.opacity === '0.7' ? '1' : '0.7';
  }, 1500);
}
// 表單提交處理
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // 這裡可以添加實際的表單提交邏輯
    // 例如發送到後端API或郵件服務
    
    alert('檢舉已提交！我們會盡快處理您的檢舉。感謝您為公眾健康發聲！');
    closeReportForm();
    e.target.reset();
}

// 社交分享功能
function shareToFacebook() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent('🚨 臭氧機的致命真相：被隱瞞的NO₂毒害');
    const description = encodeURIComponent('臭氧機產生的二氧化氮比臭氧更致命，卻被刻意隱瞞！立即了解真相，保護自己和家人的健康。');
    
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title} - ${description}`, '_blank', 'width=600,height=400');
}

function shareToLine() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('🚨 臭氧機的致命真相：被隱瞞的NO₂毒害\n\n臭氧機產生的二氧化氮比臭氧更致命，卻被刻意隱瞞！立即了解真相，保護自己和家人的健康。');
    
    window.open(`https://social-plugins.line.me/lineit/share?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(function() {
        // 創建提示訊息
        const toast = document.createElement('div');
        toast.textContent = '連結已複製到剪貼簿！';
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.remove();
        }, 1800);
    });
}

// NO₂檢測指南彈窗
function showTestingGuide() {
    const guideContent = `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; background: white; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
        <h3 style="color: #dc3545; margin-bottom: 20px; text-align: center;">NO₂檢測指南</h3>
        <div style="margin-bottom: 25px;">
            <h4 style="color: #007bff; margin-bottom: 10px;">推薦檢測設備：</h4>
            <ul style="padding-left: 20px;">
                <li>便攜式NO₂檢測儀（價格約3000-8000元）</li>
                <li>多氣體檢測儀（可同時檢測NO₂、O₃等）</li>
                <li>專業級空氣品質監測儀</li>
            </ul>
        </div>
        <div style="margin-bottom: 25px;">
            <h4 style="color: #007bff; margin-bottom: 10px;">檢測步驟：</h4>
            <ol style="padding-left: 20px;">
                <li>在臭氧機運作前測量背景濃度</li>
                <li>開啟臭氧機後每5分鐘記錄一次數據</li>
                <li>在不同距離和高度進行測量</li>
                <li>記錄溫度、濕度等環境條件</li>
                <li>持續監測至少30分鐘</li>
            </ol>
        </div>
        <div style="margin-bottom: 25px;">
            <h4 style="color: #dc3545; margin-bottom: 10px;">危險濃度警示：</h4>
            <ul style="padding-left: 20px; color: #dc3545;">
                <li><strong>15-25ppm：</strong>立即停止暴露</li>
                <li><strong>25-100ppm：</strong>緊急撤離</li>
                <li><strong>超過150ppm：</strong>致命危險，立即求救</li>
            </ul>
        </div>
        <div style="text-align: center;">
            <button onclick="closeGuide()" style="background: #dc3545; color: white; border: none; padding: 12px 25px; border-radius: 8px; font-weight: 600; cursor: pointer;">關閉</button>
        </div>
    </div>
    `;
    const overlay = document.createElement('div');
    overlay.id = 'guideOverlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    `;
    overlay.innerHTML = guideContent;
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
}

function closeGuide() {
    const overlay = document.getElementById('guideOverlay');
    if (overlay) {
        overlay.remove();
        document.body.style.overflow = 'auto';
    }
}

// 職業醫學科門診資訊
function showOccupationalClinics() {
    const clinicsContent = `
    <div style='max-width:700px;margin:0 auto;padding:20px;background:white;border-radius:15px;box-shadow:0 10px 30px rgba(0,0,0,0.2);'>
        <h3 style='color:#dc3545;margin-bottom:20px;text-align:center;'>職業醫學科門診資訊</h3>
        <div style='margin-bottom:25px;'>
            <h4 style='color:#007bff;margin-bottom:15px;'>主要醫院職業醫學科：</h4>
            <div style='display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:15px;'>
                <div style='padding:15px;background:#f8f9fa;border-radius:8px;border-left:4px solid #007bff;'>
                    <strong>台大醫院</strong><br />
                    職業醫學科<br />
                    電話: (02) 2312-3456
                </div>
                <div style='padding:15px;background:#f8f9fa;border-radius:8px;border-left:4px solid #007bff;'>
                    <strong>榮總醫院</strong><br />
                    職業醫學科<br />
                    電話: (02) 2875-7524
                </div>
                <div style='padding:15px;background:#f8f9fa;border-radius:8px;border-left:4px solid #007bff;'>
                    <strong>長庚醫院</strong><br />
                    職業醫學科<br />
                    電話: (03) 328-1200
                </div>
                <div style='padding:15px;background:#f8f9fa;border-radius:8px;border-left:4px solid #007bff;'>
                    <strong>中國醫藥大學附醫</strong><br />
                    職業醫學科<br />
                    電話: (04) 2205-2121
                </div>
            </div>
        </div>
        <div style='margin-bottom:25px;'>
            <h4 style='color:#007bff;margin-bottom:10px;'>就診前準備：</h4>
            <ul style='padding-left:20px;'>
                <li>工作場所照片和設備資訊</li>
                <li>症狀記錄和時間軸</li>
                <li>工作時間和暴露頻率</li>
                <li>相關檢測數據（如有）</li>
                <li>勞保卡和身分證</li>
            </ul>
        </div>
        <div style='margin-bottom:25px;padding:15px;background:#fff3cd;border-radius:8px;border-left:4px solid #ffc107;'>
            <strong>重要提醒：</strong><br />
            職業病診斷需要專業醫師評估，請詳細描述工作環境和症狀，有助於正確診斷和後續維權。
        </div>
        
        <div style="text-align: center;">
            <button onclick="closeClinics()" style="background: #dc3545; color: white; border: none; padding: 12px 25px; border-radius: 8px; font-weight: 600; cursor: pointer;">關閉</button>
        </div>
    </div>
    `;
    
    const overlay = document.createElement('div');
    overlay.id = 'clinicsOverlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        overflow-y: auto;
    `;
    
    overlay.innerHTML = clinicsContent;
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
}

function closeClinics() {
    const overlay = document.getElementById('clinicsOverlay');
    if (overlay) {
        overlay.remove();
        document.body.style.overflow = 'auto';
    }
}

// 法律扶助資訊
function showLegalAid() {
    const legalContent = `
    <div style="max-width: 700px; margin: 0 auto; padding: 20px; background: white; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
        <h3 style="color: #dc3545; margin-bottom: 20px; text-align: center;">法律扶助資源</h3>
        
        <div style="margin-bottom: 25px;">
            <h4 style="color: #007bff; margin-bottom: 15px;">法律扶助基金會：</h4>
            <div style="padding: 20px; background: #e3f2fd; border-radius: 8px; border-left: 4px solid #007bff;">
                <strong>免費法律諮詢專線：412-8518</strong><br>
                服務時間：週一至週五 09:00-17:00<br>
                網站：<a href="https://www.laf.org.tw" target="_blank">www.laf.org.tw</a>
            </div>
        </div>
        
        <div style="margin-bottom: 25px;">
            <h4 style="color: #007bff; margin-bottom: 15px;">勞工法律支援：</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 15px;">
                <div style="padding: 15px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #28a745;">
                    <strong>勞動部法律諮詢</strong><br>
                    電話: 1955<br>
                    24小時免費服務
                </div>
                <div style="padding: 15px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #28a745;">
                    <strong>各縣市勞工局</strong><br>
                    提供勞資爭議調解<br>
                    職業災害協助
                </div>
            </div>
        </div>
        
        <div style="margin-bottom: 25px;">
            <h4 style="color: #007bff; margin-bottom: 10px;">可能的法律行動：</h4>
            <ul style="padding-left: 20px;">
                <li><strong>刑事告發：</strong>業務過失傷害、危害公共安全</li>
                <li><strong>民事求償：</strong>醫療費用、精神損害賠償</li>
                <li><strong>勞資爭議：</strong>職業災害補償、工作環境改善</li>
                <li><strong>行政檢舉：</strong>違反職業安全衛生法</li>
            </ul>
        </div>
        
        <div style="margin-bottom: 25px;">
            <h4 style="color: #007bff; margin-bottom: 10px;">準備文件：</h4>
            <ul style="padding-left: 20px;">
                <li>醫療診斷證明書</li>
                <li>工作證明和薪資單</li>
                <li>現場照片和設備資訊</li>
                <li>證人聯絡資料</li>
                <li>相關檢測報告</li>
            </ul>
        </div>
        
        <div style="margin-bottom: 25px; padding: 15px; background: #d4edda; border-radius: 8px; border-left: 4px solid #28a745;">
            <strong>集體訴訟優勢：</strong><br>
            如果有多位受害者，建議組織集體訴訟，可以分攤費用、增強證據力度，提高勝訴機會。
        </div>
        
        <div style="text-align: center;">
            <button onclick="closeLegalAid()" style="background: #dc3545; color: white; border: none; padding: 12px 25px; border-radius: 8px; font-weight: 600; cursor: pointer;">關閉</button>
        </div>
    </div>
    `;
    
    const overlay = document.createElement('div');
    overlay.id = 'legalOverlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        overflow-y: auto;
    `;
    
    overlay.innerHTML = legalContent;
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
}

function closeLegalAid() {
    const overlay = document.getElementById('legalOverlay');
    if (overlay) {
        overlay.remove();
        document.body.style.overflow = 'auto';
    }
}

// 滾動動畫效果
function addScrollAnimations() {
    const animatedElements = document.querySelectorAll('.pollution-card, .rights-card, .worker-card, .industry-card, .action-card');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animationObserver.observe(element);
    });
}

// 頁面載入完成後執行動畫
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addScrollAnimations, 500);
});

// 緊急聯絡功能
function callEmergency() {
    if (confirm('即將撥打119緊急救護電話，確定要撥打嗎？')) {
        window.location.href = 'tel:119';
    }
}

// 鍵盤快捷鍵
document.addEventListener('keydown', function(e) {
    // ESC 鍵關閉所有模態框
    if (e.key === 'Escape') {
        closeReportForm();
        closeGuide();
        closeClinics();
        closeLegalAid();
    }
    
    // Ctrl+S 快速分享
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        copyLink();
    }
});

// 頁面可見性變化時的處理
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        document.title = '🚨 回來了解臭氧機的致命真相！';
    } else {
        document.title = '🚨 臭氧機的致命真相：被隱瞞的NO₂毒害';
    }
});

// 添加CSS動畫樣式
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .nav-link.active {
        background: #dc3545 !important;
        color: white !important;
    }
    
    .scroll-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #dc3545;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.2em;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
    }
    
    .scroll-to-top.visible {
        opacity: 1;
    }
    
    .scroll-to-top:hover {
        background: #c82333;
        transform: translateY(-2px);
    }
`;
document.head.appendChild(style);

// 回到頂部按鈕
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
document.body.appendChild(scrollToTopBtn);

// 顯示/隱藏回到頂部按鈕
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

// 頁面載入進度條
window.addEventListener('load', function() {
    const loader = document.createElement('div');
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: linear-gradient(90deg, #dc3545, #ff6b6b);
        z-index: 10001;
        animation: loadingComplete 0.5s ease forwards;
    `;
    
    const loadingKeyframes = `
        @keyframes loadingComplete {
            0% { width: 100%; }
            100% { width: 0%; }
        }
    `;
    
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = loadingKeyframes;
    document.head.appendChild(loadingStyle);
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.remove();
        loadingStyle.remove();
    }, 500);
});

// ========== 🔧 手動Accordion修復工具（備用方案） 🔧 ==========
// 如果上述方法無效，可以在控制台執行以下函數

// 強制修復函數（可在控制台手動執行）
function forceFixAccordion() {
    console.log('🚨 執行強制Accordion修復...');
    
    const buttons = document.querySelectorAll('.accordion-header');
    console.log('📋 找到', buttons.length, '個accordion按鈕');
    
    buttons.forEach((button, index) => {
        button.onclick = function() {
            const content = this.nextElementSibling;
            
            if (!content || !content.classList.contains('accordion-content')) {
                console.log('❌ 按鈕', index + 1, '沒有對應的content');
                return;
            }
            
            const isActive = this.classList.contains('active');
            
            if (isActive) {
                // 收合
                console.log('📤 收合按鈕', index + 1);
                this.classList.remove('active');
                content.classList.remove('active');
                content.style.maxHeight = '0';
                content.style.padding = '0 20px';
            } else {
                // 展開
                console.log('📥 展開按鈕', index + 1);
                this.classList.add('active');
                content.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.padding = '15px 20px';
            }
        };
        
        console.log('✅ 已為按鈕', index + 1, '添加onclick事件');
    });
    
    console.log('🎉 強制修復完成！');
}

// 診斷函數（可在控制台手動執行）
function diagnoseAccordion() {
    console.log('🔍 ========== Accordion診斷報告 ==========');
    console.log('📊 accordion-header數量：', document.querySelectorAll('.accordion-header').length);
    console.log('📊 accordion-content數量：', document.querySelectorAll('.accordion-content').length);
    console.log('📊 accordion-item數量：', document.querySelectorAll('.accordion-item').length);
    
    const headers = document.querySelectorAll('.accordion-header');
    headers.forEach((header, index) => {
        const hasClickEvent = header.onclick !== null;
        const content = header.nextElementSibling;
        const hasContent = content && content.classList.contains('accordion-content');
        
        console.log(`📋 按鈕 ${index + 1}:`);
        console.log(`   📝 文字: "${header.textContent.trim()}"`);
        console.log(`   🖱️ 有點擊事件: ${hasClickEvent}`);
        console.log(`   📄 有對應內容: ${hasContent}`);
        console.log(`   🎯 當前狀態: ${header.classList.contains('active') ? '展開' : '收合'}`);
    });
    
    console.log('🔍 ========== 診斷完成 ==========');
}

// 將修復函數暴露到全域，方便控制台使用
window.forceFixAccordion = forceFixAccordion;
window.diagnoseAccordion = diagnoseAccordion;

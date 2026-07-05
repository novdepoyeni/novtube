// ==========================================
// ANA SAYFA AKILLI RİTİM MOTORU (script.js)
// ==========================================

const feedContainer = document.getElementById('home-feed');

// 1. Uzun Video Şablonu (Küçük Resim Eklendi)
function createLongVideoCard(video) {
    if (!video) return ''; 
    const videoSrc = video.videoSrc ? video.videoSrc : '';
    const thumbSrc = video.thumbnail ? video.thumbnail : ''; // Kapak fotoğrafı
    const videoId = video.id ? video.id : 1;
    const title = video.title ? video.title : 'Başlıksız Video';
    const customerName = (video.customer && video.customer.name) ? video.customer.name : 'NOV Ajans';

    return `
        <div class="video-card">
            <div class="preview-container">
                <img class="video-thumbnail" src="${thumbSrc}" alt="${title}">
                <video class="preview-video long-video" src="${videoSrc}" muted loop playsinline preload="none"></video>
                <button class="unmute-btn"><i class="fas fa-volume-mute"></i></button>
                <div class="click-overlay" onclick="window.location.href='video.html?id=${videoId}'"></div>
            </div>
            <div class="video-info">
                <div class="video-details">
                    <h3 class="video-title">${title}</h3>
                    <p class="video-channel">${customerName}</p>
                </div>
            </div>
        </div>
    `;
}

// 2. Kısa Video Şablonu (Sürekli Oynar, Küçük Resim Yok)
function createShortsShelf(shortsArray) {
    if (!shortsArray || shortsArray.length === 0) return ''; 
    let cardsHtml = '';
    
    shortsArray.forEach(short => {
        if (!short) return;
        cardsHtml += `
            <div class="short-shelf-card" onclick="window.location.href='shorts.html'">
                <video class="short-shelf-video preview-video shorts-video" src="${short.videoSrc || ''}" muted loop playsinline preload="none"></video>
                <div class="short-shelf-title">${short.title || 'Shorts'}</div>
            </div>
        `;
    });

    return `
        <div class="shorts-shelf-container">
            <div class="shorts-shelf-header">
                <i class="fas fa-bolt"></i> Kısa Videolar
            </div>
            <div class="shorts-scroll-area">
                ${cardsHtml}
            </div>
        </div>
    `;
}

// 3. Akışı Çizme
function renderCustomFeed() {
    if (!feedContainer) return;
    let html = '';

    const safeLong = (start, end) => {
        if (typeof videosData !== 'undefined' && videosData.length > 0) {
            const slice = videosData.slice(start, end);
            if (slice.length > 0) return `<div class="video-grid">${slice.map(v => createLongVideoCard(v)).join('')}</div>`;
        }
        return '';
    };

    const safeShorts = (start, end) => {
        if (typeof shortsData !== 'undefined' && shortsData.length > 0) {
             const slice = shortsData.slice(start, end);
             if (slice.length > 0) return createShortsShelf(slice);
        }
        return '';
    };

    html += safeLong(0, 3);
    html += safeShorts(0, 4);
    html += safeLong(3, 5);
    html += safeShorts(4, 7);
    html += safeLong(5, 9);

    html += `
        <div style="padding: 40px 20px; text-align: center; border-top: 1px solid #1a1a1a; margin-top: 10px; background: #080808; margin-bottom: 20px;">
            <h3 style="color: #fff; font-size: 18px; margin-bottom: 10px;">NOV Medya Ajansı</h3>
            <p style="color: #666; font-size: 12px; margin-bottom: 25px; letter-spacing: 2px;">BİZİ SOSYAL MEDYADA TAKİP EDİN</p>
            <div style="display: flex; justify-content: center; gap: 20px;">
                <a href="#" style="color: #fff; background: #111; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 22px; border: 1px solid #333; transition: 0.3s; text-decoration: none; box-shadow: 0 4px 10px rgba(0,0,0,0.5);" onmouseover="this.style.background='#d62976'; this.style.transform='translateY(-5px)'; this.style.borderColor='#d62976'" onmouseout="this.style.background='#111'; this.style.transform='translateY(0)'; this.style.borderColor='#333'"><i class="fab fa-instagram"></i></a>
                <a href="#" style="color: #fff; background: #111; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 22px; border: 1px solid #333; transition: 0.3s; text-decoration: none; box-shadow: 0 4px 10px rgba(0,0,0,0.5);" onmouseover="this.style.background='#ff0000'; this.style.transform='translateY(-5px)'; this.style.borderColor='#ff0000'" onmouseout="this.style.background='#111'; this.style.transform='translateY(0)'; this.style.borderColor='#333'"><i class="fab fa-youtube"></i></a>
                <a href="#" style="color: #fff; background: #111; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 22px; border: 1px solid #333; transition: 0.3s; text-decoration: none; box-shadow: 0 4px 10px rgba(0,0,0,0.5);" onmouseover="this.style.background='#1877f2'; this.style.transform='translateY(-5px)'; this.style.borderColor='#1877f2'" onmouseout="this.style.background='#111'; this.style.transform='translateY(0)'; this.style.borderColor='#333'"><i class="fab fa-facebook-f"></i></a>
            </div>
        </div>
    `;
    // Döngü tetikleyici kaldırıldı.

    feedContainer.innerHTML = html;
    setTimeout(attachInteractiveFeatures, 100);
}

// 4. Etkileşimler: Ses ve Oynatma Zekası
function attachInteractiveFeatures() {
    
    // Ses Kontrolü
    document.querySelectorAll('.unmute-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const vid = e.target.closest('.preview-container').querySelector('video');
            if(vid) {
                vid.muted = !vid.muted;
                btn.innerHTML = vid.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
            }
        });
    });

    // Zeka 1: UZUN VİDEOLAR (1 Saniye Bekler, Resmi Eritir, Oynatır)
    const longVideoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const vid = entry.target;
            const container = vid.closest('.preview-container');
            const thumb = container.querySelector('.video-thumbnail');
            const unmuteBtn = container.querySelector('.unmute-btn');

            if (entry.isIntersecting) {
                clearTimeout(vid.playTimeout);
                vid.playTimeout = setTimeout(() => {
                    vid.play().then(() => {
                        if (thumb) thumb.style.opacity = '0'; // Oynamaya başlayınca resmi erit
                    }).catch(e => console.log("Otomatik Oynatma Bekliyor"));
                }, 1000); // Tam 1 saniye (1000ms) bekle
            } else {
                clearTimeout(vid.playTimeout);
                vid.pause();
                vid.currentTime = 0; // Başa sar
                vid.muted = true;
                if(unmuteBtn) unmuteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
                if (thumb) thumb.style.opacity = '1'; // Ekrandan çıkınca resmi geri getir
            }
        });
    }, { threshold: 0.6 });

    // Zeka 2: KISA VİDEOLAR (Beklemeden Hemen Oynar)
    const shortsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.play().catch(e => console.log("Otomatik Oynatma Bekliyor"));
            } else {
                entry.target.pause();
            }
        });
    }, { threshold: 0.6 });

    // İlgili videolara gözlemcileri ata
    document.querySelectorAll('.long-video').forEach(vid => longVideoObserver.observe(vid));
    document.querySelectorAll('.shorts-video').forEach(vid => shortsObserver.observe(vid));
}

document.addEventListener('DOMContentLoaded', renderCustomFeed);

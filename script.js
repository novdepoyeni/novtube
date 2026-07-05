// ==========================================
// ANA SAYFA RİTİM KURGUSU VE DÖNGÜ (script.js)
// ==========================================

const feedContainer = document.getElementById('home-feed');

// Uzun Video Kartı HTML Üretici
function createLongVideoCard(video) {
    if (!video) return '';
    return `
        <div class="video-card">
            <div class="preview-container">
                <video class="preview-video" src="${video.videoSrc}" muted loop playsinline preload="metadata"></video>
                <button class="unmute-btn"><i class="fas fa-volume-mute"></i></button>
                <div class="click-overlay" onclick="window.location.href='video.html?id=${video.id}'"></div>
            </div>
            <div class="video-info">
                <div class="video-details">
                    <h3 class="video-title">${video.title}</h3>
                    <p class="video-channel">${video.customer.name}</p>
                </div>
            </div>
        </div>
    `;
}

// Shorts Rafı HTML Üretici (Yatay Kaydırmalı)
function createShortsShelf(shortsArray) {
    let cardsHtml = '';
    shortsArray.forEach(short => {
        if (!short) return;
        cardsHtml += `
            <div class="short-shelf-card" onclick="window.location.href='shorts.html'">
                <video class="short-shelf-video preview-video" src="${short.videoSrc}" muted loop playsinline preload="metadata"></video>
                <div class="short-shelf-title">${short.title}</div>
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

// Tüm Ana Sayfa Akışını Çizme İşlemi
function renderCustomFeed() {
    if (!feedContainer) return;
    let html = '';

    // 1. Blok: 3 Uzun Video (Nov, Nergis, Klip)
    html += `<div class="video-grid">
                ${createLongVideoCard(videosData[0])}
                ${createLongVideoCard(videosData[1])}
                ${createLongVideoCard(videosData[2])}
             </div>`;

    // 2. Blok: 4 Adet Shorts Videoları
    html += createShortsShelf(shortsData.slice(0, 4));

    // 3. Blok: 2 Uzun Video (Little Caesars, Araba)
    html += `<div class="video-grid">
                ${createLongVideoCard(videosData[3])}
                ${createLongVideoCard(videosData[4])}
             </div>`;

    // 4. Blok: 3 Adet Shorts Videoları
    html += createShortsShelf(shortsData.slice(4, 7));

    // 5. Blok: 4 Uzun Video (Parfüm, Telefon, Dükkan, Sinematik)
    html += `<div class="video-grid">
                ${createLongVideoCard(videosData[5])}
                ${createLongVideoCard(videosData[6])}
                ${createLongVideoCard(videosData[7])}
                ${createLongVideoCard(videosData[8])}
             </div>`;

    // 6. En Alt Kısım: Başa Sarma (Döngü) Hedefi
    html += `<div id="loop-trigger" style="height: 50px; display: flex; align-items: center; justify-content: center; color: #444; font-size: 12px; margin-bottom: 20px;">Döngü Yenileniyor...</div>`;

    feedContainer.innerHTML = html;

    // JavaScript'i sayfaya yerleştirdikten sonra özellikleri aktifleştirme:
    attachInteractiveFeatures();
}

// Oynatma, Ses ve Döngü Özellikleri
function attachInteractiveFeatures() {
    // 1. Sesi Aç/Kapat Butonları (Sadece Uzun Videolar İçin)
    document.querySelectorAll('.unmute-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const vid = e.target.closest('.preview-container').querySelector('video');
            vid.muted = !vid.muted;
            btn.innerHTML = vid.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
        });
    });

    // 2. Akıllı Oynatıcı (Ekranda olan tüm videolar - Uzun ve Kısa - otomatik oynasın)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.play().catch(e => console.log("Otomatik Oynatma Beklemede"));
            } else {
                entry.target.pause();
                entry.target.muted = true; // Ekrandan çıkınca sesi mutlaka kapat
                const unmuteBtn = entry.target.parentElement.querySelector('.unmute-btn');
                if(unmuteBtn) unmuteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            }
        });
    }, { threshold: 0.6 });

    document.querySelectorAll('.preview-video').forEach(vid => observer.observe(vid));

    // 3. En Alta Gelince En Başa Kusursuz Kaydırma (Sonsuz Döngü)
    const loopObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            // Kullanıcı en alta indiğinde, home-feed alanını yumuşakça en başa kaydır
            feedContainer.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, { threshold: 0.1 });

    const trigger = document.getElementById('loop-trigger');
    if (trigger) loopObserver.observe(trigger);
}

// Sayfa yüklendiğinde akışı oluştur
document.addEventListener('DOMContentLoaded', renderCustomFeed);

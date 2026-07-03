// ==========================================
// İZLEME SAYFASI VE ÖZEL PLAYER (video-script.js)
// Not: Videolar ve müşteri bilgileri data.js'den otomatik çekilir.
// ==========================================

// URL'den ID'yi çek ve videoyu bul (Eğer direkt sayfaya girilirse ilk videoyu açar)
const urlParams = new URLSearchParams(window.location.search);
const videoId = parseInt(urlParams.get('id'));
const currentVideo = videosData.find(v => v.id === videoId) || videosData[0];

// --- 1. ARAYÜZÜ DOLDURMA VE SEO BÖLÜMÜ ---
function updateUI() {
    if (!currentVideo) return;

    // Arayüz metinlerini doldur
    document.getElementById('watch-title').textContent = currentVideo.title;
    document.getElementById('watch-date').textContent = `${currentVideo.date} tarihinde eklendi`;
    document.getElementById('watch-description').textContent = currentVideo.description;
    
    // Müşteri Künyesini doldur
    document.getElementById('customer-name').textContent = currentVideo.customer.name;
    document.getElementById('customer-initial').textContent = currentVideo.customer.name.charAt(0);
    document.getElementById('customer-address').textContent = currentVideo.customer.address;
    document.getElementById('customer-phone').textContent = currentVideo.customer.phone;

    // Hizmet etiketlerini bas
    const servicesContainer = document.getElementById('customer-services');
    if (servicesContainer) {
        servicesContainer.innerHTML = '';
        currentVideo.customer.services.forEach(service => {
            const span = document.createElement('span');
            span.classList.add('service-tag');
            span.textContent = service;
            servicesContainer.appendChild(span);
        });
    }
    
    // Sekme Başlığı (SEO)
    document.title = `${currentVideo.title} | NovTube Referanslar`;
}

function injectSEO() {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": currentVideo.title,
        "description": currentVideo.description,
        "uploadDate": currentVideo.date,
        "contentUrl": `https://novtube.com/${currentVideo.videoSrc}`,
        "author": {
            "@type": "LocalBusiness",
            "name": currentVideo.customer.name,
            "address": currentVideo.customer.address,
            "telephone": currentVideo.customer.phone
        }
    };
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);
}

function loadSuggested() {
    const container = document.getElementById('suggested-videos');
    if (!container) return;
    
    // Şu an izlenen video dışındakileri listele
    const others = videosData.filter(v => v.id !== currentVideo.id);
    others.forEach(video => {
        const div = document.createElement('div');
        div.classList.add('suggested-card');
        div.onclick = () => window.location.href = `video.html?id=${video.id}`;
        div.innerHTML = `
            <div class="suggested-thumbnail">
                <div style="background: #1a1a1a; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; border-radius: 8px;">
                    NOV
                </div>
            </div>
            <div class="suggested-info">
                <h4 class="suggested-title">${video.title}</h4>
                <span class="suggested-channel">${video.customer.name}</span>
            </div>
        `;
        container.appendChild(div);
    });
}

// Sol Menü Tıklama İşlevi (İzleme sayfası için)
const menuToggle = document.getElementById('menu-toggle');
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        document.querySelector('.sidebar')?.classList.toggle('active');
    });
}

// --- 2. ÖZEL PLAYER (OYNATICI) BÖLÜMÜ ---
const video = document.getElementById('main-video');
const playerWrapper = document.getElementById('custom-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const progressBar = document.querySelector('.progress-area');
const progressFilled = document.querySelector('.progress-filled');
const timeDisplay = document.getElementById('time-display');
const skipEffect = document.getElementById('skip-effect');
const sOptions = document.querySelectorAll('.s-option');
const currentSBtn = document.getElementById('current-speed');

if (video) {
    // Videoyu Yükle
    video.src = currentVideo.videoSrc;

    // Oynat / Durdur Mantığı
    function togglePlay() {
        if (video.paused) {
            video.play();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            playerWrapper.classList.remove('paused');
        } else {
            video.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            playerWrapper.classList.add('paused');
        }
    }
    playPauseBtn?.addEventListener('click', togglePlay);

    // Süre Güncelleme ve İlerleme Çubuğu
    video.addEventListener('timeupdate', () => {
        const percent = (video.currentTime / video.duration) * 100;
        if(progressFilled) progressFilled.style.width = `${percent}%`;
        
        let currentMins = Math.floor(video.currentTime / 60) || 0;
        let currentSecs = Math.floor(video.currentTime % 60) || 0;
        let durMins = Math.floor(video.duration / 60) || 0;
        let durSecs = Math.floor(video.duration % 60) || 0;
        
        currentSecs = currentSecs < 10 ? `0${currentSecs}` : currentSecs;
        durSecs = durSecs < 10 ? `0${durSecs}` : durSecs;
        
        if(timeDisplay) timeDisplay.textContent = `${currentMins}:${currentSecs} / ${durMins}:${durSecs}`;
    });

    progressBar?.addEventListener('click', (e) => {
        const newTime = (e.offsetX / progressBar.offsetWidth) * video.duration;
        video.currentTime = newTime;
    });

    // Hız (Speed) Seçimi
    sOptions.forEach(option => {
        option.addEventListener('click', () => {
            sOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            const speed = parseFloat(option.getAttribute('data-speed'));
            video.playbackRate = speed;
            currentSBtn.textContent = speed + 'x';
        });
    });

    // Çift Tıklama ve Klavye Algılama (İleri/Geri Sarma)
    function skipTime(amount, direction) {
        video.currentTime += amount;
        if(skipEffect) {
            skipEffect.innerHTML = direction === 'right' ? '<i class="fas fa-forward"></i><span>10s</span>' : '<i class="fas fa-backward"></i><span>10s</span>';
            skipEffect.style.left = direction === 'right' ? '75%' : '25%';
            skipEffect.classList.add('show');
            setTimeout(() => skipEffect.classList.remove('show'), 500);
        }
    }

    let lastTap = 0;
    video.addEventListener('click', (e) => {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        
        if (tapLength < 300 && tapLength > 0) { // Çift tıklama algılandı
            const rect = video.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            if (clickX > rect.width / 2) {
                skipTime(10, 'right');
            } else {
                skipTime(-10, 'left');
            }
        } else {
            setTimeout(() => {
                if (new Date().getTime() - lastTap >= 300) togglePlay();
            }, 300);
        }
        lastTap = currentTime;
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            skipTime(10, 'right');
        } else if (e.key === 'ArrowLeft') {
            skipTime(-10, 'left');
        } else if (e.key === ' ') {
            e.preventDefault();
            togglePlay();
        }
    });

    // Tam Ekran
    document.getElementById('fullscreen-btn')?.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            playerWrapper.requestFullscreen().catch(err => console.log("Tam ekran desteklenmiyor."));
        } else {
            document.exitFullscreen();
        }
    });
}

// Tüm fonksiyonları sayfa açıldığında başlat
document.addEventListener('DOMContentLoaded', () => {
    updateUI();
    injectSEO();
    loadSuggested();
});

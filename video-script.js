// Adım 5.2: Özel Oynatıcı İşlevleri (video-script.js)

// Veritabanımız (BaseSrc mantığına geçtik)
const videosData = [
    {
        id: 1,
        title: "Görele Pide - Özel Tanıtım Filmi ve Dijital Menü",
        baseSrc: "videos/gorele", 
        // Not: Bilgisayarında 'videos' klasöründe gorele_1080p.mp4, gorele_720p.mp4 vb. olmalı.
        date: "2026-06-15",
        description: "Görele Pide için hazırlanan yüksek çözünürlüklü mekan tanıtım filmi.",
        customer: { name: "Görele Pide", address: "Darıca, Kocaeli", phone: "+90 555 000 0000", services: ["Video", "QR Menü"] }
    }
];

const urlParams = new URLSearchParams(window.location.search);
const videoId = parseInt(urlParams.get('id'));
const currentVideo = videosData.find(v => v.id === videoId) || videosData[0];

// Player Elemanları
const video = document.getElementById('main-video');
const playerWrapper = document.getElementById('custom-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const progressBar = document.querySelector('.progress-area');
const progressFilled = document.querySelector('.progress-filled');
const timeDisplay = document.getElementById('time-display');
const skipEffect = document.getElementById('skip-effect');
const qOptions = document.querySelectorAll('.q-option');
const currentQBtn = document.getElementById('current-quality');

let currentQuality = '1080p'; // Varsayılan kalite

// 1. Videoyu Yükle
function loadVideoSource() {
    const time = video.currentTime;
    const isPaused = video.paused;
    
    // Klasördeki dosyayı kalitesine göre çeker: Örn: videos/gorele_1080p.mp4
    video.src = `${currentVideo.baseSrc}_${currentQuality}.mp4`;
    
    video.currentTime = time; // Kalite değiştiğinde süreyi kaybetmemek için
    if(!isPaused) video.play();
}

// 2. Oynat / Durdur Mantığı
function togglePlay() {
    if(video.paused) {
        video.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        playerWrapper.classList.remove('paused');
    } else {
        video.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        playerWrapper.classList.add('paused');
    }
}
playPauseBtn.addEventListener('click', togglePlay);

// 3. Süre Güncelleme ve Bar
video.addEventListener('timeupdate', () => {
    const percent = (video.currentTime / video.duration) * 100;
    progressFilled.style.width = `${percent}%`;
    
    let currentMins = Math.floor(video.currentTime / 60);
    let currentSecs = Math.floor(video.currentTime % 60);
    let durMins = Math.floor(video.duration / 60) || 0;
    let durSecs = Math.floor(video.duration % 60) || 0;
    
    currentSecs = currentSecs < 10 ? `0${currentSecs}` : currentSecs;
    durSecs = durSecs < 10 ? `0${durSecs}` : durSecs;
    
    timeDisplay.textContent = `${currentMins}:${currentSecs} / ${durMins}:${durSecs}`;
});

progressBar.addEventListener('click', (e) => {
    const newTime = (e.offsetX / progressBar.offsetWidth) * video.duration;
    video.currentTime = newTime;
});

// 4. Kalite Seçimi
qOptions.forEach(option => {
    option.addEventListener('click', () => {
        qOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        currentQuality = option.getAttribute('data-q');
        currentQBtn.textContent = currentQuality;
        loadVideoSource();
    });
});

// 5. ÇİFT TIKLAMA VE KLAVYE (Atlama Efektli)
function skipTime(amount, direction) {
    video.currentTime += amount;
    
    // Efekti Göster
    skipEffect.innerHTML = direction === 'right' ? '<i class="fas fa-forward"></i><span>10s</span>' : '<i class="fas fa-backward"></i><span>10s</span>';
    skipEffect.style.left = direction === 'right' ? '75%' : '25%'; // Sağa tıklarsa sağda, sola tıklarsa solda çıksın
    
    skipEffect.classList.add('show');
    setTimeout(() => skipEffect.classList.remove('show'), 500);
}

// Mobilde/Ekranda Çift Tıklama
let lastTap = 0;
video.addEventListener('click', (e) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    
    if (tapLength < 300 && tapLength > 0) { // Çift tıklandıysa
        const rect = video.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        if (clickX > rect.width / 2) {
            skipTime(10, 'right'); // Sağ yarıya tıklandı
        } else {
            skipTime(-10, 'left'); // Sol yarıya tıklandı
        }
    } else {
        // Tek tıklama gecikmeli olarak durdur/başlat yapsın (çift tık ile çakışmaması için)
        setTimeout(() => {
            if (new Date().getTime() - lastTap >= 300) togglePlay();
        }, 300);
    }
    lastTap = currentTime;
});

// Bilgisayar Sağ/Sol Yön Tuşları
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        skipTime(10, 'right');
    } else if (e.key === 'ArrowLeft') {
        skipTime(-10, 'left');
    } else if (e.key === ' ') { // Boşluk tuşu ile durdur
        e.preventDefault();
        togglePlay();
    }
});

// 6. Tam Ekran
document.getElementById('fullscreen-btn').addEventListener('click', () => {
    if (!document.fullscreenElement) {
        playerWrapper.requestFullscreen().catch(err => alert("Tam ekran desteklenmiyor."));
    } else {
        document.exitFullscreen();
    }
});

// Sayfa ilk yüklendiğinde kaliteyi basıp SEO'yu güncelle (Önceki SEO scriptleri aynen durabilir)
document.addEventListener('DOMContentLoaded', () => {
    loadVideoSource();
    video.play();
});

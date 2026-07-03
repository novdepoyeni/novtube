// ==========================================
// ANA SAYFA DİNAMİKLERİ (script.js)
// Not: Veriler artık data.js dosyasından otomatik çekilmektedir.
// ==========================================

const videoGrid = document.getElementById('video-grid');

// Ana Sayfaya Videoları Yükleme Fonksiyonu
function loadHomepageVideos() {
    if (!videoGrid) return;
    
    videoGrid.innerHTML = ''; // İçeriği temizle

    // "videosData" dizisi data.js dosyasından geliyor
    videosData.forEach(video => {
        const card = document.createElement('div');
        card.classList.add('video-card');
        
        // Kart İçeriği (Küçük resim yerine doğrudan video)
        card.innerHTML = `
            <div class="preview-container">
                <video class="preview-video" src="${video.videoSrc}" muted loop playsinline></video>
                <button class="unmute-btn"><i class="fas fa-volume-mute"></i></button>
                <div class="click-overlay"></div> </div>
            <div class="video-info">
                <div class="video-details">
                    <h3 class="video-title">${video.title}</h3>
                    <p class="video-channel">${video.customer.name}</p>
                </div>
            </div>
        `;

        const vidEl = card.querySelector('.preview-video');
        const unmuteBtn = card.querySelector('.unmute-btn');
        const overlay = card.querySelector('.click-overlay');

        // Tıklama ile izleme sayfasına yönlendirme
        overlay.addEventListener('click', () => {
            window.location.href = `video.html?id=${video.id}`;
        });

        // Sesi Aç/Kapat Butonu İşlevi
        unmuteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            vidEl.muted = !vidEl.muted;
            unmuteBtn.innerHTML = vidEl.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
        });

        // Masaüstü: Fare üzerine gelince oynat, çıkınca durdur ve sesi kapat
        card.addEventListener('mouseenter', () => vidEl.play());
        card.addEventListener('mouseleave', () => {
            vidEl.pause();
            vidEl.muted = true; 
            unmuteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        });

        videoGrid.appendChild(card);
    });

    // Mobil: Ekranın görünür alanına girince (scroll yaparken) otomatik oynat
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const vid = entry.target.querySelector('.preview-video');
            if (entry.isIntersecting) {
                vid.play();
            } else {
                vid.pause();
            }
        });
    }, { threshold: 0.5 }); // Videonun %50'si ekranda görünürse tetiklenir

    document.querySelectorAll('.video-card').forEach(card => observer.observe(card));
}

// Sol Menü (Hamburger) İşlevi (Masaüstü için)
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.querySelector('.sidebar');
if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}

// Sayfa yüklendiğinde videoları ekrana bas
document.addEventListener('DOMContentLoaded', loadHomepageVideos);

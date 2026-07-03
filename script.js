// Adım 1: Ana Sayfa Dinamikleri (script.js) - Eski kodun yerine bunu koyabilirsin

// Ana Sayfa Verileri (Artık kapak fotoğrafı değil, video önizlemesi var)
const videosData = [
    {
        id: 1,
        title: "Görele Pide - Özel Tanıtım Filmi",
        baseSrc: "videos/gorele", // Kalite ayarı için artık sadece dosyanın adını veriyoruz (.mp4 hariç)
        customerName: "Görele Pide",
        views: "1.2 B Görüntülenme"
    },
    {
        id: 2,
        title: "Hero's Pizza - Reklam Filmi",
        baseSrc: "videos/heros",
        customerName: "Hero's Pizza",
        views: "3.4 B Görüntülenme"
    }
];

const videoGrid = document.getElementById('video-grid');

function loadHomepageVideos() {
    if (!videoGrid) return;
    videoGrid.innerHTML = '';

    videosData.forEach(video => {
        const card = document.createElement('div');
        card.classList.add('video-card');
        
        // Kart İçeriği
        card.innerHTML = `
            <div class="preview-container">
                <video class="preview-video" src="${video.baseSrc}_240p.mp4" muted loop playsinline></video>
                <button class="unmute-btn" data-muted="true"><i class="fas fa-volume-mute"></i></button>
                <div class="click-overlay"></div> </div>
            <div class="video-info">
                <div class="video-details">
                    <h3 class="video-title">${video.title}</h3>
                    <p class="video-channel">${video.customerName}</p>
                </div>
            </div>
        `;

        const vidEl = card.querySelector('.preview-video');
        const unmuteBtn = card.querySelector('.unmute-btn');
        const overlay = card.querySelector('.click-overlay');

        // Yönlendirme: Sadece overlay'e tıklanırsa izleme sayfasına git
        overlay.addEventListener('click', () => {
            window.location.href = `video.html?id=${video.id}`;
        });

        // Ses Aç/Kapat Butonu
        unmuteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Sayfa değişimini engelle
            vidEl.muted = !vidEl.muted;
            unmuteBtn.innerHTML = vidEl.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
        });

        // Masaüstü: Fare üzerine gelince oynat
        card.addEventListener('mouseenter', () => vidEl.play());
        card.addEventListener('mouseleave', () => {
            vidEl.pause();
            vidEl.muted = true; // Çıkınca sesi hep kapat
            unmuteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        });

        videoGrid.appendChild(card);
    });

    // Mobil: Ekranda (ViewPort) Göründüğünde Otomatik Oynat
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const vid = entry.target.querySelector('.preview-video');
            if (entry.isIntersecting) {
                vid.play();
            } else {
                vid.pause();
            }
        });
    }, { threshold: 0.5 }); // Videonun %50'si ekrana girince çalışır

    document.querySelectorAll('.video-card').forEach(card => observer.observe(card));
}

document.addEventListener('DOMContentLoaded', loadHomepageVideos);

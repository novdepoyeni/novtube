// ==========================================
// ANA SAYFA DİNAMİKLERİ (script.js)
// ==========================================

// 1. Veritabanı (Tüm videoların ve müşteri bilgilerinin tutulduğu yer)
const videosData = [
    {
        id: 1,
        title: "Görele Pide - Özel Tanıtım Filmi",
        videoSrc: "videos/gorele.mp4",
        date: "2026-06-15",
        description: "Görele Pide için hazırlanan yüksek çözünürlüklü mekan tanıtım filmi.",
        customer: {
            name: "Görele Pide",
            address: "Darıca, Kocaeli",
            phone: "+90 555 000 0000",
            services: ["Video Prodüksiyon", "Dijital QR Menü", "SEO"]
        }
    },
    {
        id: 2,
        title: "Hero's Pizza - Satış Odaklı Reklam Filmi",
        videoSrc: "videos/heros.mp4",
        date: "2026-06-20",
        description: "Hero's Pizza şubeleri için hazırlanan dinamik reklam filmi.",
        customer: {
            name: "Hero's Pizza",
            address: "Darıca, Kocaeli",
            phone: "+90 555 111 1111",
            services: ["Reklam Filmi", "Web Tasarım", "SEO"]
        }
    },
    {
        id: 3,
        title: "Marley Döner - Marka İntro & Ürün Çekimi",
        videoSrc: "videos/marley.mp4",
        date: "2026-07-01",
        description: "Marley Döner Zurna ve Hatay dürümleri için özel siyah-kırmızı konseptli tanıtım.",
        customer: {
            name: "Marley Döner",
            address: "Kocaeli",
            phone: "+90 555 222 2222",
            services: ["Web Tasarım", "Ürün Çekimi", "SEO"]
        }
    }
];

const videoGrid = document.getElementById('video-grid');

// 2. Ana Sayfaya Videoları Yükleme Fonksiyonu
function loadHomepageVideos() {
    if (!videoGrid) return;
    videoGrid.innerHTML = ''; // Örnek HTML'i temizle

    videosData.forEach(video => {
        const card = document.createElement('div');
        card.classList.add('video-card');
        
        // Kart İçeriği (Küçük resim yerine doğrudan video)
        card.innerHTML = `
            <div class="preview-container">
                <video class="preview-video" src="${video.videoSrc}" muted loop playsinline></video>
                <button class="unmute-btn"><i class="fas fa-volume-mute"></i></button>
                <div class="click-overlay"></div> <!-- Sayfaya gitmek için görünmez tıklama alanı -->
            </div>
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

// 3. Sol Menü (Hamburger) İşlevi
const menuToggle = document.querySelector('.menu-icon');
const sidebar = document.querySelector('.sidebar');
if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}

// Sayfa yüklendiğinde çalıştır
document.addEventListener('DOMContentLoaded', loadHomepageVideos);

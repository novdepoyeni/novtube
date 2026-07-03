// Adım 2: NovTube Dinamik Veri ve Yönlendirme Altyapısı

// 'videos' ve 'images' klasöründe olduğunu varsaydığımız içeriklerin veri tabanı
const videosData = [
    {
        id: 1,
        title: "NOV - Kurumsal Marka Tanıtımı",
        thumbnail: "images/thumb1.jpg", // Kapak fotoğrafları için
        videoSrc: "videos/video1.mp4",  // Videoların çekileceği kaynak
        duration: "01:45",
        views: "1.2 B Görüntülenme",
        date: "2 gün önce"
    },
    {
        id: 2,
        title: "Minimalist Animasyon Projesi",
        thumbnail: "images/thumb2.jpg",
        videoSrc: "videos/video2.mp4",
        duration: "00:30",
        views: "850 Görüntülenme",
        date: "1 hafta önce"
    },
    {
        id: 3,
        title: "Ürün Lansman Reklamı",
        thumbnail: "images/thumb3.jpg",
        videoSrc: "videos/video3.mp4",
        duration: "02:15",
        views: "3.4 B Görüntülenme",
        date: "1 ay önce"
    },
    {
        id: 4,
        title: "Sinematik İntro Çalışması",
        thumbnail: "images/thumb4.jpg",
        videoSrc: "videos/video4.mp4",
        duration: "00:15",
        views: "5.1 B Görüntülenme",
        date: "2 ay önce"
    }
];

// DOM Elementlerini Seçme
const videoGrid = document.getElementById('video-grid');

// Ana Sayfada Videoları Render Etme (Oluşturma) Fonksiyonu
function loadVideos() {
    // Eğer bulunduğumuz sayfada 'video-grid' yoksa (örn: izleme sayfasındaysak) bu kod çalışmasın
    if (!videoGrid) return;

    videoGrid.innerHTML = ''; // İçerideki statik/örnek HTML'i temizle

    videosData.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.classList.add('video-card');
        
        // Tıklama Olayı: URL'ye video ID'sini parametre olarak ekle ve izleme sayfasına yönlendir
        videoCard.onclick = () => {
            window.location.href = `video.html?id=${video.id}`;
        };

        // Kartın İçeriği (Siyah-Beyaz temaya uygun yapı)
        videoCard.innerHTML = `
            <div class="thumbnail">
                <div class="thumbnail-placeholder" style="background: #1a1a1a; border: 1px solid #333;">
                    ${video.title.substring(0, 15)}...
                </div>
                <span class="video-duration">${video.duration}</span>
            </div>
            <div class="video-info">
                <div class="video-details">
                    <h3 class="video-title">${video.title}</h3>
                    <p class="video-channel">NOV</p>
                    <p class="video-views">${video.views} • ${video.date}</p>
                </div>
            </div>
        `;
        
        videoGrid.appendChild(videoCard);
    });
}

// Sayfa yüklendiğinde loadVideos fonksiyonunu çalıştır
document.addEventListener('DOMContentLoaded', loadVideos);

// Hamburger Menü (Üç Çizgi) İşlevi
const menuIcon = document.querySelector('.menu-icon');
const sidebar = document.querySelector('.sidebar');

if (menuIcon && sidebar) {
    menuIcon.addEventListener('click', () => {
        // 'active' sınıfını ekle veya çıkar
        sidebar.classList.toggle('active');
    });
}
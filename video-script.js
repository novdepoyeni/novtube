// Adım 5: NovTube İzleme Sayfası Dinamikleri (video-script.js)

// Veri bütünlüğü için ana sayfadaki video listesinin aynısını burada da tanımlıyoruz
const videosData = [
    {
        id: 1,
        title: "NOV - Kurumsal Marka Tanıtımı",
        thumbnail: "images/thumb1.jpg",
        videoSrc: "videos/video1.mp4",
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

// 1. URL'den gelen 'id' parametresini yakalama
const urlParams = new URLSearchParams(window.location.search);
const videoId = parseInt(urlParams.get('id'));

// 2. DOM Elemanlarını Seçme
const mainVideo = document.getElementById('main-video');
const watchTitle = document.getElementById('watch-title');
const watchViews = document.getElementById('watch-views');
const watchDate = document.getElementById('watch-date');
const suggestedVideosContainer = document.getElementById('suggested-videos');

// 3. URL'den gelen ID'ye ait videoyu bulma (Eğer ID yoksa veya geçersizse ilk videoyu aç)
const currentVideo = videosData.find(v => v.id === videoId) || videosData[0];

// 4. Sayfa İçeriğini Seçilen Videoya Göre Güncelleme
if (currentVideo) {
    mainVideo.src = currentVideo.videoSrc; // 'videos/' klasöründeki gerçek mp4 yolunu basar
    watchTitle.textContent = currentVideo.title;
    watchViews.textContent = ` ${currentVideo.views}`;
    watchDate.textContent = `${currentVideo.date} tarihinde yüklendi`;
    
    // SEO ve Tarayıcı Sekme Başlığı Güncellemesi
    document.title = `${currentVideo.title} | NovTube`;
}

// 5. Sağ Sütuna Diğer Videoları (Önerilenler) Listeleme Fonksiyonu
function loadSuggestedVideos() {
    if (!suggestedVideosContainer) return;

    suggestedVideosContainer.innerHTML = ''; // Temizle

    // Şu an izlenen videoyu listeden hariç tut (Kullanıcı zaten onu izliyor)
    const suggestedVideos = videosData.filter(v => v.id !== currentVideo.id);

    suggestedVideos.forEach(video => {
        const card = document.createElement('div');
        card.classList.add('suggested-card');
        
        // Önerilen videoya tıklanınca sayfayı o video ID'si ile yenile
        card.onclick = () => {
            window.location.href = `video.html?id=${video.id}`;
        };

        card.innerHTML = `
            <div class="suggested-thumbnail">
                <div style="background: #1a1a1a; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; border: 1px solid #333; border-radius: 8px;">
                    ${video.title.substring(0, 12)}...
                </div>
            </div>
            <div class="suggested-info">
                <h4 class="suggested-title">${video.title}</h4>
                <span class="suggested-channel">NOV</span>
                <span class="suggested-views">${video.views}</span>
            </div>
        `;
        suggestedVideosContainer.appendChild(card);
    });
}

// Sayfa yüklendiğinde önerilen videoları getir
document.addEventListener('DOMContentLoaded', loadSuggestedVideos);
// Adım 5.1: Gelişmiş Müşteri Veritabanı ve Dinamik SEO
const videosData = [
    {
        id: 1,
        title: "Görele Pide - Özel Tanıtım Filmi ve Dijital Menü",
        thumbnail: "images/gorele-thumb.jpg",
        videoSrc: "videos/gorele.mp4",
        date: "2026-06-15",
        description: "Görele Pide için hazırlanan yüksek çözünürlüklü mekan tanıtım filmi.",
        customer: {
            name: "Görele Pide",
            address: "Darıca, Kocaeli",
            phone: "+90 555 000 0000",
            services: ["Video Prodüksiyon", "Dijital QR Menü", "SEO Optimizasyonu"]
        }
    },
    {
        id: 2,
        title: "Hero's Pizza - Satış Odaklı Reklam Filmi",
        thumbnail: "images/heros-thumb.jpg",
        videoSrc: "videos/heros.mp4",
        date: "2026-06-20",
        description: "Hero's Pizza şubeleri için hazırlanan, modern kurgu teknikleri içeren dinamik reklam filmi.",
        customer: {
            name: "Hero's Pizza",
            address: "Darıca, Kocaeli",
            phone: "+90 555 111 1111",
            services: ["Reklam Filmi", "Web Tasarım", "SEO"]
        }
    }
];

const urlParams = new URLSearchParams(window.location.search);
const videoId = parseInt(urlParams.get('id'));
const currentVideo = videosData.find(v => v.id === videoId) || videosData[0];

// 1. Arayüzü Doldurma Fonksiyonu
function updateUI() {
    if (!currentVideo) return;

    // Video Bilgileri
    document.getElementById('main-video').src = currentVideo.videoSrc;
    document.getElementById('watch-title').textContent = currentVideo.title;
    document.getElementById('watch-date').textContent = `${currentVideo.date} tarihinde eklendi`;
    document.getElementById('watch-description').textContent = currentVideo.description;
    
    // Müşteri Künyesi (Kanal) Bilgileri
    document.getElementById('customer-name').textContent = currentVideo.customer.name;
    document.getElementById('customer-initial').textContent = currentVideo.customer.name.charAt(0);
    document.getElementById('customer-address').textContent = currentVideo.customer.address;
    document.getElementById('customer-phone').textContent = currentVideo.customer.phone;

    // Sağlanan Hizmetleri Etiket Olarak Basma
    const servicesContainer = document.getElementById('customer-services');
    servicesContainer.innerHTML = '';
    currentVideo.customer.services.forEach(service => {
        const span = document.createElement('span');
        span.classList.add('service-tag');
        span.textContent = service;
        servicesContainer.appendChild(span);
    });

    // Sayfa Sekme Başlığını SEO Uyumlu Yapma
    document.title = `${currentVideo.title} | NovTube Referanslar`;
}

// 2. Google Botları İçin Dinamik SEO (Schema Markup) Enjeksiyonu
// Bu kod ekranda görünmez, sadece arama motorları okur ve siteni indeksler.
function injectSEO() {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    
    // VideoObject Şeması
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": currentVideo.title,
        "description": currentVideo.description,
        "thumbnailUrl": `https://novtube.com/${currentVideo.thumbnail}`,
        "uploadDate": currentVideo.date,
        "contentUrl": `https://novtube.com/${currentVideo.videoSrc}`,
        "publisher": {
            "@type": "Organization",
            "name": "NOV",
            "logo": {
                "@type": "ImageObject",
                "url": "https://novtube.com/logo.png"
            }
        },
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

// 3. Sağ Sütun Diğer Videolar
function loadSuggested() {
    const container = document.getElementById('suggested-videos');
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

// Tüm fonksiyonları sayfa yüklendiğinde tetikle
document.addEventListener('DOMContentLoaded', () => {
    updateUI();
    injectSEO();
    loadSuggested();
});

// Sol Menü Tıklama İşlevi (Temizlenmiş Haliyle)
document.getElementById('menu-toggle')?.addEventListener('click', () => {
    document.querySelector('.sidebar')?.classList.toggle('active');
});

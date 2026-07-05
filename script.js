// ==========================================
// ANA SAYFA DİNAMİKLERİ VE SEO (script.js)
// ==========================================

const videoGrid = document.getElementById('video-grid');

// 1. Google İçin Yapısal Veri (JSON-LD) Enjeksiyonu
// Bu kod sayesinde Google görseller ve arama sonuçlarında videoların çıkacak
function injectHomepageSEO() {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    
    const itemList = videosData.map((video, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
            "@type": "VideoObject",
            "name": video.title,
            "description": video.description,
            "contentUrl": `https://novtube.com/${video.videoSrc}`,
            "uploadDate": video.date,
            "publisher": { "@type": "Organization", "name": video.customer.name }
        }
    }));

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": itemList
    };

    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);
}

// 2. Videoları Yükle ve Akıllı Oynatıcıyı Kur
function loadHomepageVideos() {
    if (!videoGrid) return;
    videoGrid.innerHTML = ''; 

    videosData.forEach(video => {
        const card = document.createElement('div');
        card.classList.add('video-card');
        card.innerHTML = `
            <div class="preview-container">
                <video class="preview-video" src="${video.videoSrc}" muted loop playsinline preload="metadata"></video>
                <button class="unmute-btn"><i class="fas fa-volume-mute"></i></button>
                <div class="click-overlay"></div>
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
        
        card.querySelector('.click-overlay').addEventListener('click', () => {
            window.location.href = `video.html?id=${video.id}`;
        });

        unmuteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            vidEl.muted = !vidEl.muted;
            unmuteBtn.innerHTML = vidEl.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
        });

        videoGrid.appendChild(card);
    });

    // SADECE EKRANDAKİ VİDEOYU OYNATMA MANTIĞI (Akıllı Scroll)
    // threshold: 0.7 demek, videonun en az %70'i ekrandaysa çalıştır demektir.
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const vid = entry.target.querySelector('.preview-video');
            if (entry.isIntersecting) {
                // Video ekrana geldi, oynat
                vid.play().catch(e => console.log("Otomatik oynatma engellendi:", e));
            } else {
                // Video ekrandan çıktı, durdur ve sesi kapat
                vid.pause();
                vid.muted = true;
                entry.target.querySelector('.unmute-btn').innerHTML = '<i class="fas fa-volume-mute"></i>';
            }
        });
    }, { threshold: 0.7 }); 

    document.querySelectorAll('.video-card').forEach(card => observer.observe(card));
}

document.addEventListener('DOMContentLoaded', () => {
    loadHomepageVideos();
    injectHomepageSEO(); // SEO verisini bas
});

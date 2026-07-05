// ==========================================
// MERKEZİ VERİTABANI VE SEO KAYNAĞI (data.js) - Final Sürüm
// ==========================================

const videosData = [
    // --- 1. BLOK: 3 UZUN VİDEO ---
    {
        id: 1, title: "Nov Reklam Tanıtımı", 
        videoSrc: "videos/nov-reklam-tanitimi.mp4", thumbnail: "images/nov-reklam-kapak.jpg", date: "2026-07-05", 
        description: "NOV Ajans kurumsal marka tanıtım filmi. Gebze ve Kocaeli bölgesi profesyonel video prodüksiyon hizmetleri.", 
        customer: { name: "NOV Ajans", address: "Osman Yılmaz Mah. Yunus Emre Parkı Karşısı, Gebze / Kocaeli", phone: "0533 140 04 19", services: ["Video Prodüksiyon", "Kurumsal Kimlik", "SEO"] }
    },
    {
        id: 2, title: "Nergis Çiçekçilik Sinematik Tanıtım", 
        videoSrc: "videos/nergis-cicekcilik-tanitim.mp4", thumbnail: "images/nergis-cicekcilik-kapak.jpg", date: "2026-07-04", 
        description: "Nergis Çiçekçilik için hazırlanan 4K çözünürlüklü, premium sinematik mekan tanıtım filmi.", 
        customer: { name: "Nergis Çiçekçilik", address: "Çolakoğlu Kız Meslek Lisesi Karşısı, Hacıhalil, Atatürk Cd. No:28 D:E, 41440 Gebze/Kocaeli", phone: "(0262) 646 13 74", services: ["Sinematik Tanıtım", "Sosyal Medya"] }
    },
    {
        id: 3, title: "Sinematik Klip Çalışması", 
        videoSrc: "videos/sinematik-klip-calismasi.mp4", thumbnail: "images/sinematik-klip-kapak.jpg", date: "2026-07-03", 
        description: "NOV Ajans imzalı özel sanatçı klip çalışması ve profesyonel renk kurgusu (Color Grading).", 
        customer: { name: "NOV Ajans", address: "Osman Yılmaz Mah. Yunus Emre Parkı Karşısı, Gebze / Kocaeli", phone: "0533 140 04 19", services: ["Klip Çekimi", "Renk Kurgusu"] }
    },

    // --- 2. BLOK: 2 UZUN VİDEO ---
    {
        id: 4, title: "Little Caesars Pizza Reklamı", 
        videoSrc: "videos/little-caesars-reklam.mp4", thumbnail: "images/little-caesars-kapak.jpg", date: "2026-06-25", 
        description: "Little Caesars Gebze şubesi için iştah açıcı görsel efektlerle hazırlanmış dinamik pizza reklamı.", 
        customer: { name: "Little Caesars", address: "Osman Yılmaz, İstanbul Cd. No:66, 41400 Gebze/Kocaeli", phone: "(0262) 888 65 90", services: ["Reklam Filmi", "Ürün Çekimi"] }
    },
    {
        id: 5, title: "Söğüşçü Restoran Video Tanıtımı", 
        videoSrc: "videos/soguscu-restoran-tanitim.mp4", thumbnail: "images/soguscu-kapak.jpg", date: "2026-06-20", 
        description: "Geleneksel lezzetleri modern bir dille anlatan Söğüşçü restoran özel video tanıtımı.", 
        customer: { name: "NOV Ajans", address: "Osman Yılmaz Mah. Yunus Emre Parkı Karşısı, Gebze / Kocaeli", phone: "0533 140 04 19", services: ["Mekan Tanıtımı", "Gurme Çekim"] }
    },

    // --- 3. BLOK: 4 UZUN VİDEO ---
    {
        id: 6, title: "Sinematik Mekan Tanıtımı", 
        videoSrc: "videos/sinematik-mekan-tanitim.mp4", thumbnail: "images/mekan-tanitim-kapak.jpg", date: "2026-06-15", 
        description: "Mekanların mimari detaylarını ön plana çıkaran, yavaş çekim ve özel ışıklandırmalı mekan reklamı.", 
        customer: { name: "NOV Ajans", address: "Osman Yılmaz Mah. Yunus Emre Parkı Karşısı, Gebze / Kocaeli", phone: "0533 140 04 19", services: ["Mimari Çekim", "Mekan Reklamı"] }
    },
    {
        id: 7, title: "Yeni Nesil Telefon Tanıtımı", 
        videoSrc: "videos/telefon-tanitim.mp4", thumbnail: "images/telefon-tanitim-kapak.jpg", date: "2026-06-10", 
        description: "Yüksek teknoloji ürünleri için makro çekim teknikleriyle hazırlanmış yeni nesil telefon reklamı.", 
        customer: { name: "NOV Ajans", address: "Osman Yılmaz Mah. Yunus Emre Parkı Karşısı, Gebze / Kocaeli", phone: "0533 140 04 19", services: ["Makro Çekim", "Teknoloji Reklamı"] }
    },
    {
        id: 8, title: "Nov Reklam 2", 
        videoSrc: "videos/nov-reklam-2.mp4", thumbnail: "images/nov-reklam-2-kapak.jpg", date: "2026-06-05", 
        description: "NOV Ajans'ın yaratıcı yeteneklerini sergileyen hızlı kurgu ve geçişlere sahip tanıtım filmi.", 
        customer: { name: "NOV Ajans", address: "Osman Yılmaz Mah. Yunus Emre Parkı Karşısı, Gebze / Kocaeli", phone: "0533 140 04 19", services: ["Kreatif Kurgu", "Post Prodüksiyon"] }
    },
    {
        id: 9, title: "Nov Reklam 3", 
        videoSrc: "videos/nov-reklam-3.mp4", thumbnail: "images/nov-reklam-3-kapak.jpg", date: "2026-06-01", 
        description: "Marka kimliği ve dijital vizyonu anlatan, sosyal medya odaklı estetik reklam çalışması.", 
        customer: { name: "NOV Ajans", address: "Osman Yılmaz Mah. Yunus Emre Parkı Karşısı, Gebze / Kocaeli", phone: "0533 140 04 19", services: ["Marka Yönetimi", "Sosyal Medya"] }
    }
];

// ==========================================
// KISA VİDEOLAR (SHORTS) VERİTABANI
// ==========================================

const shortsData = [
    // --- İLK 4 SHORTS ---
    { id: 1, title: "Başak Kapı Reklamı", videoSrc: "videos/shorts/basak-kapi-reklam.mp4", customerName: "Başak Kapı", address: "Onur, 2. Hayıt. Sk. No:12, 35330 Balçova/İzmir", phone: "0530 052 01 35" },
    { id: 2, title: "Oreo'lu Dondurma Tanıtımı", videoSrc: "videos/shorts/oreolu-dondurma.mp4", customerName: "Uğur Usta Dondurma", address: "Kocaeli", phone: "İletişim Hattı" },
    { id: 3, title: "Reeder Telefon Tanıtımı", videoSrc: "videos/shorts/reeder-telefon.mp4", customerName: "Barlas Ticaret", address: "Abdi İpekçi, Battalgazi Cad No:194/B, 41700 Darıca/Kocaeli", phone: "0553 663 53 63" },
    { id: 4, title: "Dönerci Çalışması", videoSrc: "videos/shorts/donerci-calismasi.mp4", customerName: "Erhan Usta Döner", address: "Kazım Karabekir, Battal Gazi Cd. 92/A, 41700 Darıca/Kocaeli", phone: "0506 906 19 61" },
    
    // --- SONRAKİ 3 SHORTS ---
    { id: 5, title: "İnşaat Reklamı", videoSrc: "videos/shorts/insaat-reklam.mp4", customerName: "NOV Ajans", address: "Gebze / Kocaeli", phone: "0533 140 04 19" },
    { id: 6, title: "Araba Reklamı", videoSrc: "videos/shorts/araba-reklam.mp4", customerName: "NOV Ajans", address: "Gebze / Kocaeli", phone: "0533 140 04 19" },
    { id: 7, title: "Parfüm Reklamı", videoSrc: "videos/shorts/parfum-reklam.mp4", customerName: "NOV Ajans", address: "Gebze / Kocaeli", phone: "0533 140 04 19" }
];


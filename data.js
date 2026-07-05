// ==========================================
// MERKEZİ VERİTABANI (data.js)
// Tüm sayfalar verileri buradan çeker. Kanal mantığı korundu!
// ==========================================

const videosData = [
    {
        id: 1,
        title: "NOV Reklamı",
        videoSrc: "videos/nov_reklam.mp4",
        date: "2026-07-05",
        description: "NOV Ajans resmi marka tanıtım filmi.",
        customer: {
            name: "NOV Ajans",
            address: "Darıca, Kocaeli",
            phone: "0533 140 04 19",
            services: ["Reklam Filmi", "Kurumsal Kimlik", "SEO"]
        }
    },
    {
        id: 2,
        title: "Nergis Çiçekçilik - Kurumsal",
        videoSrc: "videos/nergis.mp4",
        date: "2026-07-01",
        description: "Nergis Çiçekçilik için hazırlanan premium mekan tanıtımı.",
        customer: {
            name: "Nergis Çiçekçilik",
            address: "Gebze, Kocaeli",
            phone: "+90 555 111 2233",
            services: ["Video Prodüksiyon", "Sosyal Medya"]
        }
    },
    {
        id: 3,
        title: "Klip Çalışması - 2026",
        videoSrc: "videos/klip.mp4",
        date: "2026-06-25",
        description: "Özel sanatçı klip çalışması, sinematik renk kurgusu.",
        customer: {
            name: "Müzik Yapım",
            address: "İstanbul",
            phone: "+90 555 222 3344",
            services: ["Klip Çekimi", "Renk Kurgusu"]
        }
    },
    {
        id: 4,
        title: "Little Caesars Pizza - Lezzet Şov",
        videoSrc: "videos/little_caesars.mp4",
        date: "2026-06-20",
        description: "Little Caesars için özel hazırlanan dinamik reklam kurgusu.",
        customer: {
            name: "Little Caesars",
            address: "Darıca, Kocaeli",
            phone: "+90 555 333 4455",
            services: ["Reklam Filmi", "SEO"]
        }
    },
    {
        id: 5,
        title: "Premium Araba Tanıtımı",
        videoSrc: "videos/araba.mp4",
        date: "2026-06-15",
        description: "Lüks segment araçlar için hazırlanan heyecan verici tanıtım.",
        customer: {
            name: "Auto Gallery",
            address: "Gebze, Kocaeli",
            phone: "+90 555 444 5566",
            services: ["Araç Çekimi", "Sosyal Medya"]
        }
    },
    {
        id: 6,
        title: "Lüks Parfüm Tanıtımı",
        videoSrc: "videos/parfum.mp4",
        date: "2026-06-10",
        description: "Kozmetik sektörü için ürün odaklı, detaylı reklam filmi.",
        customer: {
            name: "Kozmetik Markası",
            address: "İstanbul",
            phone: "+90 555 555 6677",
            services: ["Ürün Çekimi", "Reklam Filmi"]
        }
    },
    {
        id: 7,
        title: "Yeni Nesil Telefon Tanıtımı",
        videoSrc: "videos/telefon.mp4",
        date: "2026-06-05",
        description: "Teknoloji mağazası için hazırlanan yüksek tempolu teknoloji reklamı.",
        customer: {
            name: "Teknoloji Mağazası",
            address: "Gebze, Kocaeli",
            phone: "+90 555 666 7788",
            services: ["Tanıtım Filmi", "Kurgu"]
        }
    },
    {
        id: 8,
        title: "Dükkan Tanıtımı Sinematik",
        videoSrc: "videos/dukkan.mp4",
        date: "2026-06-01",
        description: "Yerel işletmeler için özel olarak hazırlanan 4K mekan tanıtımı.",
        customer: {
            name: "Yerel İşletme",
            address: "Darıca, Kocaeli",
            phone: "+90 555 777 8899",
            services: ["Mekan Çekimi", "SEO"]
        }
    },
    {
        id: 9,
        title: "Özel Sinematik Video",
        videoSrc: "videos/sinematik.mp4",
        date: "2026-05-20",
        description: "Görsel efektler ve ağır çekim teknikleri ile hazırlanan şov.",
        customer: {
            name: "Özel Proje",
            address: "Kocaeli",
            phone: "0533 140 04 19",
            services: ["Prodüksiyon", "Özel Efekt"]
        }
    }
];

// ==========================================
// KISA VİDEOLAR (SHORTS) VERİTABANI
// ==========================================
// Bu videolar 'videos/shorts/' klasörünün içinden çekilir.
const shortsData = [
    {
        id: 1,
        title: "Kamera Arkası",
        videoSrc: "videos/shorts/short1.mp4",
        customerName: "NOV Ajans"
    },
    {
        id: 2,
        title: "Çiçek Detayı",
        videoSrc: "videos/shorts/short2.mp4",
        customerName: "Nergis Çiçekçilik"
    },
    {
        id: 3,
        title: "Klip Özeti",
        videoSrc: "videos/shorts/short3.mp4",
        customerName: "Müzik Yapım"
    },
    {
        id: 4,
        title: "Pizza Fırında!",
        videoSrc: "videos/shorts/short4.mp4",
        customerName: "Little Caesars"
    },
    {
        id: 5,
        title: "Egzoz Sesi",
        videoSrc: "videos/shorts/short5.mp4",
        customerName: "Auto Gallery"
    },
    {
        id: 6,
        title: "Parfüm Şişesi",
        videoSrc: "videos/shorts/short6.mp4",
        customerName: "Kozmetik Markası"
    },
    {
        id: 7,
        title: "Makro Çekim",
        videoSrc: "videos/shorts/short7.mp4",
        customerName: "Teknoloji Mağazası"
    }
];

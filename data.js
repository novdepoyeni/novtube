// ==========================================
// MERKEZİ VERİTABANI (data.js)
// Tüm sayfalar verileri buradan çeker.
// ==========================================

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

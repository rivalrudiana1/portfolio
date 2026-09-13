export const personalInfo = {
  name: "Rival Rudiana Putra",
  role: "Full-Stack Developer & Data Architecture Specialist",
  summary:
    "Lulusan D3 Teknik Informatika ULBI (IPK 3.79). Spesialis arsitektur data kompleks (fuzzy matching, time-overlap query, algoritma prediktif) dengan pengalaman memimpin organisasi legislatif mahasiswa.",
  location: "Kota Bandung, Jawa Barat",
  photo: "/images/profile.svg", // Ganti dengan /images/profile.jpg jika sudah ada foto asli
  siteUrl: "https://portfolio-eight-brown-x3erim3vum.vercel.app",
  metrics: [
    { value: 46973, display: "46.973+", label: "Baris Data Operasional Disinkronisasi" },
    { value: 700, display: "700+", label: "Pengguna Aktif E-Voting" },
    { value: 3.79, display: "3.79", label: "IPK Teknik Informatika", decimals: 2 },
  ],
  projects: [
    {
      title: "Sistem Audit & Sinkronisasi Data Pemakaman",
      tech: ["Laravel", "React", "MySQL"],
      image: "/images/projects/audit-pemakaman.svg",
      desc: "Sistem skala produksi memproses 46.973 baris data. Normalisasi data serta implementasi Exact & Fuzzy Matching.",
      fullDesc:
        "Aplikasi enterprise-grade untuk Dinas Ciptabintar yang mengatasi duplikasi dan asinkronisasi data pemakaman antara sistem lama dan pendataan lapangan terbaru.",
      challenge:
        "Puluhan ribu data historis dengan inkonsistensi format penamaan dan typo yang sulit disatukan secara manual.",
      solution:
        "Mengimplementasikan algoritma Levenshtein distance untuk Fuzzy Matching yang dikombinasikan dengan Exact Matching untuk menyelaraskan nama dan blok makam secara otomatis.",
      impact:
        "Meningkatkan efisiensi audit data hingga 80% dan mengonsolidasikan 46.973+ baris data ke satu database terpusat.",
      githubUrl: "https://github.com/rivalrudiana1/Audit",
      liveUrl: null,
    },
    {
      title: "Warehouse Management System (WMS)",
      tech: ["Laravel", "React", "Recharts", "WMA", "ROP"],
      image: "/images/projects/wms.svg",
      desc: "Fitur prediksi inventaris menggunakan Weighted Moving Average (WMA) & Reorder Point (ROP) dengan dashboard analitik real-time.",
      fullDesc:
        "Sistem manajemen gudang full-stack yang mendigitalkan alur B2B, purchase order, dan pelacakan inventaris end-to-end, dilengkapi dashboard analitik interaktif dan simulasi WMA/ROP.",
      challenge:
        "Perusahaan sering kehabisan barang kritis tanpa peringatan atau menimbun barang yang perputarannya lambat.",
      solution:
        "Menerapkan WMA untuk peramalan permintaan berbasis bobot historis dan ROP untuk notifikasi otomatis kapan barang harus dipesan kembali, divisualkan via Recharts.",
      impact:
        "Mengurangi risiko stockout dan mengoptimalkan belanja modal inventaris dengan keputusan berbasis data.",
      repoLinks: [
        { label: "Frontend", url: "https://github.com/rivalrudiana1/WMA-ROP" },
        { label: "Backend", url: "https://github.com/rivalrudiana1/WMA-ROP-BE" },
      ],
      liveUrl: null,
    },
    {
      title: "Campus Facility Booking System",
      tech: ["Laravel 11", "PHP 8.2", "MySQL", "RBAC"],
      image: "/images/projects/facility-booking.svg",
      desc: "Validasi real-time dengan time-overlap query, RBAC, dan approval workflow berjenjang untuk mencegah double booking.",
      fullDesc:
        "Sistem pemesanan fasilitas kampus yang memfasilitasi mahasiswa dan dosen meminjam ruangan, lab, dan peralatan. Arsitektur database relasional terstruktur dengan foreign key, server-side validation, dan filter tipe dokumen.",
      challenge:
        "Sistem manual sebelumnya rentan konflik jadwal peminjaman di waktu yang sama.",
      solution:
        "Membangun validasi time-overlap query yang presisi memfilter reservasi berstatus disetujui, plus Role-Based Access Control untuk alur persetujuan birokrasi kampus.",
      impact:
        "Mencegah double booking secara sistemik dan mengotomatisasi alur birokrasi persetujuan peminjaman.",
      githubUrl: null,
      liveUrl: null,
    },
    {
      title: "E-Voting PEMIRA ULBI",
      tech: ["Laravel", "Tailwind CSS", "Alpine.js"],
      image: "/images/projects/evoting.svg",
      desc: "Aplikasi pemilihan kampus untuk 700+ mahasiswa, dibangun bersama tim 3 orang dengan tata tertib dewan yang ketat.",
      fullDesc:
        "Platform pemilihan raya mahasiswa (PEMIRA) digital ULBI. Memprogram logika pemilihan dari tata tertib dewan mahasiswa menjadi alur verifikasi digital untuk menjaga integritas data dan mencegah pemilih ganda.",
      challenge:
        "Menerjemahkan regulasi pemilihan yang ketat menjadi sistem digital yang transparan, aman, dan diadopsi jangka panjang.",
      solution:
        "Membangun alur verifikasi anti-double-voter, validasi server-side ketat, dan kolaborasi lintas fungsi 3 orang untuk logika inti pemilihan.",
      impact:
        "Memfasilitasi 700+ suara mahasiswa secara transparan dan aman; sistem diadopsi untuk penggunaan jangka panjang di kampus.",
      githubUrl: "https://github.com/rivalrudiana1/pemira24",
      liveUrl: null,
    },
    {
      title: "IoT Hydroponic Monitoring Dashboard",
      tech: ["ESP32", "React", "Express", "REST API"],
      image: "/images/projects/iot-hydroponic.svg",
      desc: "Dashboard pemantauan pH, suhu, dan TDS secara real-time dari mikrokontroler ESP32 untuk perawatan hidroponik.",
      fullDesc:
        "Dashboard yang memproses dan mengintegrasikan aliran data kontinu dari ESP32, memvisualkan 3 sensor (pH, suhu, TDS) secara real-time untuk mengoptimalkan keputusan perawatan tanaman.",
      challenge:
        "Data sensor kontinu perlu diolah dan divisualkan agar mudah dibaca petani/operator secara real-time.",
      solution:
        "Merancang arsitektur ingest data ESP32 via REST API dan visualisasi real-time di dashboard web.",
      impact:
        "Memudahkan pemantauan kondisi nutrisi dan suhu tanaman secara real-time.",
      githubUrl: null,
      liveUrl: null,
    },
    {
      title: "CUKIMAI — Konsultasi Mahasiswa dengan AI",
      tech: ["Python", "Streamlit", "scikit-learn", "Groq"],
      image: "/images/projects/cukimai.svg",
      desc: "Aplikasi konsultasi mahasiswa bertenaga AI: klasifikasi keluhan ke kategori utama, pendukung, dan tingkat, lalu LLM menyusun solusi + to-do list.",
      fullDesc:
        "Aplikasi Streamlit bernama CUKIMAI (repo: Mahasense). Pengguna menuliskan permasalahannya dalam teks bebas; tiga model klasifikasi terlatih (vectorizer TF-IDF + label encoder) memetakan keluhan ke kategori utama, kategori pendukung, dan tingkat permasalahan, kemudian Groq LLM menyusun solusi personal dan daftar tindakan.",
      challenge:
        "Keluhan mahasiswa tidak terstruktur dan sulit dikategorikan manual agar mendapat saran yang relevan.",
      solution:
        "Melatih pipeline klasifikasi (auto_train.py + dataset.csv) dengan tiga head prediksi dan mengorkestrasikannya dengan prompt LLM yang menerima hasil klasifikasi sebagai konteks.",
      impact:
        "Mengubah curhatan bebas menjadi analisis terstruktur plus rencana aksi konkret dalam sekali klik.",
      githubUrl: "https://github.com/rivalrudiana1/Mahasense",
      liveUrl: null,
    },
    {
      title: "SIPADU — Full-Stack Information System",
      tech: ["Express", "Prisma", "React", "Tailwind CSS"],
      image: "/images/projects/sipadu.svg",
      desc: "Sistem informasi full-stack: backend Express + Prisma dengan autentikasi JWT & bcrypt, frontend React + router + Tailwind.",
      fullDesc:
        "Monorepo SIPADU berisi Backend (Node.js, Express 5, Prisma ORM, autentikasi JWT dengan hashing bcrypt, CORS, dotenv) dan Frontend (React 18, Vite, Tailwind CSS, react-router-dom, axios, SweetAlert2, Material Tailwind) yang terhubung via REST API.",
      challenge:
        "Dibutuhkan fondasi sistem informasi yang aman (login/session) dengan pemisahan frontend-backend yang rapi.",
      solution:
        "Membangun REST API terautentikasi JWT di backend dengan skema Prisma, dan SPA React dengan routing serta client HTTP terpusat di frontend.",
      impact:
        "Fondasi reusable untuk sistem informasi kampus/organisasi dengan login aman dan UI modern.",
      repoLinks: [
        { label: "Monorepo", url: "https://github.com/rivalrudiana1/SIPADU" },
        { label: "Frontend", url: "https://github.com/rivalrudiana1/Frontend_SIPADU" },
      ],
      liveUrl: null,
    },
    {
      title: "TASTY_FOOD — Company Profile Resto",
      tech: ["Laravel 10", "PHP 8.1", "MySQL", "Blade"],
      image: "/images/projects/tasty-food.svg",
      desc: "Website company profile resto Laravel 10: berita + detail, galeri, form kontak, dashboard admin dengan auth dan trash/restore.",
      fullDesc:
        "Website profil perusahaan kuliner berbasis Laravel 10 (PHP 8.1, Sanctum). Halaman publik: home, tentang, daftar & detail berita, galeri, dan form kontak tersimpan ke database. Panel admin: dashboard, autentikasi, manajemen konten, dan fitur trash untuk restore data terhapus.",
      challenge:
        "Konten resto (berita, galeri, info) harus bisa dikelola pemilik tanpa menyentuh kode, dengan aman dari penghapusan tak sengaja.",
      solution:
        "Memisahkan route publik dan admin dengan middleware auth, CRUD lengkap plus soft-delete (TrashController) sehingga data terhapus bisa dikembalikan.",
      impact:
        "Pemilik resto mandiri mengelola konten website; data aman berkat pola trash/restore.",
      githubUrl: "https://github.com/rivalrudiana1/TASTY_FOOD",
      liveUrl: null,
    },
    {
      title: "Tidur.in — Rekomendasi Jam Tidur",
      tech: ["Python", "Streamlit", "scikit-learn"],
      image: "/images/projects/tidur.svg",
      desc: "Mini-app machine learning: regresi linear merekomendasikan jam tidur ideal dari jam bangun dan durasi aktivitas harian.",
      fullDesc:
        "Aplikasi Streamlit edukatif yang melatih model LinearRegression dari dataset kecil (jam bangun dan durasi aktivitas sebagai fitur, jam tidur sebagai target). Pengguna memasukkan dua angka dan mendapat rekomendasi jam tidur format HH:MM, lengkap dengan expander data latih yang transparan.",
      challenge:
        "Menunjukkan cara kerja ML regresi secara interaktif dan mudah dipahami orang awam.",
      solution:
        "Menyatukan training dan inferensi dalam satu file app.py dengan visualisasi data latih langsung di UI.",
      impact:
        "Demo ML yang approachable: pengguna melihat data, model, dan hasil dalam satu layar.",
      githubUrl: "https://github.com/rivalrudiana1/Tidur.in",
      liveUrl: null,
    },
    {
      title: "Aplikasi Form Flutter (UTS Mobile Programming)",
      tech: ["Flutter", "Dart"],
      image: "/images/projects/flutter-uts.svg",
      desc: "Aplikasi mobile Flutter untuk UTS: form tervalidasi, dialog konfirmasi, halaman terima kasih, transisi slide+fade, responsif mobile & tablet.",
      fullDesc:
        "Tugas Ujian Tengah Semester mata kuliah Pemrograman Perangkat Bergerak (D3 TI ULBI). Fitur: form nama & email dengan validasi (wajib isi, format email), pesan error inline, dialog konfirmasi setelah submit, navigasi ke halaman Terima Kasih, transisi slide + fade, dan layout adaptif satu kolom (mobile) vs dua kolom (tablet).",
      challenge:
        "Memenuhi rubrik UTS: validasi, feedback error, dialog, navigasi, animasi, dan responsivitas dalam satu aplikasi kecil.",
      solution:
        "Menyusun widget form reusable dengan validator, route transisi kustom, dan layout builder berbasis lebar layar.",
      impact:
        "Lulus UTS dengan aplikasi yang mendemonstrasikan fundamental Flutter secara lengkap; screenshot tersedia di repo.",
      githubUrl: "https://github.com/rivalrudiana1/ATS-MP",
      liveUrl: null,
    },
  ],
  experience: [
    {
      role: "Software Engineer Intern",
      company: "Dinas Ciptabintar Kota Bandung — UPTD TPU Pandu",
      period: "2026",
      desc: "Mengembangkan sistem audit dan sinkronisasi data pemakaman (~47rb entri) dengan arsitektur MVC Laravel (PHP 8), Tailwind CSS, Alpine.js, dan Vite.",
    },
    {
      role: "Full-Stack Developer",
      company: "PEMIRA ULBI",
      period: "Nov 2024 — Jan 2025",
      desc: "Membangun sistem E-Voting dan manajemen PEMIRA bersama tim 3 orang; menerjemahkan tata tertib dewan menjadi verifikasi digital anti double-voter untuk 700+ mahasiswa.",
    },
    {
      role: "Freelance Web Developer",
      company: "Klien Independen",
      period: "2025 — Sekarang",
      desc: "Membangun company profile dinamis dengan Laravel 10 dalam 3 hari, landing page interaktif, dan query database relasional.",
    },
    {
      role: "Network Installer Intern",
      company: "GraPari Telkom Group Lembong",
      period: "Jan 2022 — Jun 2022",
      desc: "Instalasi kabel fiber optik dan troubleshooting jaringan untuk menjaga stabilitas koneksi pengguna akhir.",
    },
  ],
  organization: [
    {
      role: "Wakil Ketua Umum",
      company: "Majelis Permusyawaratan Mahasiswa (MPM) ULBI",
      period: "Mar 2025 — Apr 2026",
      desc: "Mengarahkan strategi dan operasional legislatif; menjembatani badan mahasiswa dan birokrasi universitas.",
    },
    {
      role: "Anggota Komisi 3 Aspirasi & Advokasi",
      company: "MPM ULBI",
      period: "Mei 2024 — Feb 2025",
      desc: "Mengadvokasi aspirasi mahasiswa dan menyusun rancangan UU Pemilihan Raya.",
    },
    {
      role: "Wakil Ketua Pelaksana",
      company: "Kepanitiaan Legislatif Muda",
      period: "Okt 2024 — Jan 2025",
      desc: "Mengeksekusi pengkaderan anggota legislatif baru dari perencanaan hingga penutupan.",
    },
  ],
  education: [
    {
      school: "Universitas Logistik dan Bisnis Internasional",
      degree: "Diploma III (D3), Teknik Informatika — IPK 3.79",
      period: "Sep 2023 — Sep 2026",
      desc: "Fokus pada rekayasa perangkat lunak, basis data relasional, dan arsitektur aplikasi full-stack.",
    },
    {
      school: "SMK Negeri 2 Bandung",
      degree: "Teknik Komputer Jaringan — Rata-rata 85",
      period: "Jul 2020 — Jun 2023",
      desc: 'Meraih predikat "Kompeten" dalam teknik komputer jaringan.',
    },
  ],
  contact: {
    email: "rivalrudiana@gmail.com",
    phone: "+62 895-3151-5489",
    github: "https://github.com/rivalrudiana1",
    linkedin: "https://linkedin.com/in/rival-rudiana-411858429",
  },
  certifications: [
    {
      title: "Teknisi Jaringan Muda",
      issuer: "BNSP / Lembaga Sertifikasi",
      year: "2026",
    },
    {
      title: "SAP Certification",
      issuer: "SAP",
      year: "2025",
    },
    {
      title: "Praktik Kerja Lapangan (PKL)",
      issuer: "GraPari Telkom Group",
      year: "2022",
    },
  ],
  languages: [
    { name: "Bahasa Indonesia", level: "Penutur Asli" },
    { name: "Bahasa Inggris", level: "Menengah / Conversational" },
  ],
};

export const skillsData = [
  {
    category: "Languages & Core",
    skills: ["PHP 8.2", "JavaScript", "HTML5/CSS3", "Node.js"],
  },
  {
    category: "Frameworks & Libs",
    skills: ["Laravel 11", "React.js", "Express.js", "Tailwind CSS", "Alpine.js", "Vite"],
  },
  {
    category: "Databases & IoT",
    skills: ["MySQL", "PostgreSQL", "RESTful API", "ESP32"],
  },
  {
    category: "Architecture & Logic",
    skills: ["Fuzzy Matching", "Time-Overlap Query", "WMA / ROP", "Data Normalization", "RBAC", "Git/GitHub"],
  },
];

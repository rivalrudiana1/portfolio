export const personalInfo = {
  name: "Rival Rudiana Putra",
  role: "Full-Stack Developer & Data Architecture Specialist",
  summary: "Mahasiswa tingkat akhir D3 Teknik Informatika ULBI (IPK 3.79). Spesialis arsitektur data kompleks (fuzzy matching, time-overlap query, algoritma prediktif) dipadukan dengan pengalaman kepemimpinan legislatif mahasiswa.",
  metrics: [
    { value: "46.973+", label: "Baris Data Operasional Disinkronisasi" },
    { value: "700+", label: "Pengguna Aktif E-Voting" },
    { value: "3.79", label: "IPK Teknik Informatika" }
  ],
  projects: [
    { 
      title: "Sistem Audit & Sinkronisasi Data Pemakaman", 
      tech: ["Laravel", "React", "MySQL"], 
      desc: "Sistem skala produksi memproses 46.973 baris data. Melakukan normalisasi data, serta implementasi Exact & Fuzzy Matching.",
      fullDesc: "Aplikasi enterprise-grade untuk Dinas Ciptabintar yang dirancang untuk mengatasi masalah duplikasi dan asinkronisasi data pemakaman antara sistem lama dan pendataan lapangan terbaru.",
      challenge: "Terdapat puluhan ribu data historis dengan inkonsistensi format penamaan dan typo yang sulit disatukan secara manual.",
      solution: "Mengimplementasikan algoritma Levenshtein distance untuk Fuzzy Matching yang dikombinasikan dengan Exact Matching untuk menyelaraskan nama dan blok makam secara otomatis dengan akurasi tinggi.",
      impact: "Meningkatkan efisiensi audit data hingga 80% dan membersihkan 46.973+ baris data ke dalam satu database terpusat.",
      githubUrl: "https://github.com/rivalrudiana/audit-pemakaman",
      liveUrl: "#"
    },
    { 
      title: "Warehouse Management System (WMS)", 
      tech: ["WMA", "ROP", "React"], 
      desc: "Fitur prediksi inventaris tingkat lanjut menggunakan metode Weighted Moving Average (WMA) & Reorder Point (ROP).",
      fullDesc: "Sistem manajemen gudang cerdas yang tidak hanya mencatat inventaris, namun juga memberikan analitik prediktif untuk mencegah terjadinya overstock atau understock.",
      challenge: "Perusahaan sering kehabisan barang kritis tanpa peringatan atau justru menimbun barang yang perputarannya lambat.",
      solution: "Menerapkan algoritma prediktif WMA untuk peramalan permintaan barang berdasarkan bobot historis, dan ROP untuk memberikan notifikasi otomatis kapan barang harus dipesan kembali.",
      impact: "Mengurangi risiko stockout sebesar 40% dan mengoptimalkan capital expenditure perusahaan pada inventory.",
      githubUrl: "https://github.com/rivalrudiana/smart-wms",
      liveUrl: "https://wms-demo.example.com"
    },
    { 
      title: "Campus Facility Booking System", 
      tech: ["PostgreSQL", "Express", "React"], 
      desc: "Validasi real-time menggunakan time-overlap query untuk mencegah masalah double booking secara presisi.",
      fullDesc: "Sistem pemesanan fasilitas kampus berbasis web yang memfasilitasi mahasiswa dan dosen untuk meminjam ruangan, lab, dan peralatan dengan mudah.",
      challenge: "Sistem sebelumnya berbasis manual yang rentan terhadap konflik jadwal peminjaman di waktu yang sama.",
      solution: "Membangun sistem dengan validasi level database menggunakan Time-Overlap Query constraints pada PostgreSQL, memastikan konsistensi data absolut terhadap konflik jadwal.",
      impact: "Zero double-booking incidents sejak diluncurkan, melayani rata-rata 50+ peminjaman fasilitas per hari.",
      githubUrl: "https://github.com/rivalrudiana/facility-booking",
      liveUrl: "#"
    },
    { 
      title: "E-Voting PEMIRA ULBI", 
      tech: ["Laravel", "Tailwind CSS"], 
      desc: "Aplikasi pemilihan kampus yang tangguh, melayani 700+ user secara konkuren dengan logika regulasi ketat.",
      fullDesc: "Platform pemilihan raya mahasiswa (PEMIRA) digital untuk Universitas Logistik dan Bisnis Internasional dengan keamanan tinggi.",
      challenge: "Membutuhkan sistem yang dapat menahan lonjakan trafik saat jam pemilihan serentak dan memastikan asas LUBER JURDIL secara elektronik.",
      solution: "Optimasi query database, implementasi caching, dan penggunaan antrian (queues) untuk memproses ribuan request secara asinkron tanpa memberatkan server utama.",
      impact: "Sukses memfasilitasi lebih dari 700+ suara mahasiswa dalam waktu 4 jam tanpa downtime, meningkatkan partisipasi pemilih sebesar 30%.",
      githubUrl: "https://github.com/rivalrudiana/evoting-pemira",
      liveUrl: "https://pemira.ulbi.ac.id"
    }
  ],
  experience: [
    {
      role: "Software Engineer Intern",
      company: "Dinas Ciptabintar Kota Bandung - UPTD TPU Pandu",
      period: "Maret 2026 - Juni 2026",
      desc: "Mengembangkan sistem audit dan sinkronisasi data pemakaman untuk ~47k entri data."
    },
    {
      role: "Freelance Full-Stack Developer",
      company: "Pemira ULBI",
      period: "2025 - 2026",
      desc: "Membangun sistem E-Voting kampus yang handal dengan regulasi keamanan ketat."
    },
    {
      role: "Freelance Web Developer",
      company: "Klien Independen",
      period: "2024 - Sekarang",
      desc: "Menyediakan solusi web kustom full-stack untuk berbagai kebutuhan klien."
    },
    {
      role: "Network Installer Intern",
      company: "GraPari Telkom",
      period: "2023",
      desc: "Instalasi dan troubleshooting jaringan telekomunikasi tingkat dasar."
    }
  ],
  contact: {
    email: "rivalrudiana@example.com",
    github: "https://github.com/rivalrudiana",
    linkedin: "https://linkedin.com/in/rivalrudiana"
  }
};

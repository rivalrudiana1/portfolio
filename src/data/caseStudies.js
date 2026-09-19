// Detail studi kasus per project slug — bilingual { id, en }.
// Diagram dirender oleh ArchitectureDiagram via field `diagram`.
// Untuk project tanpa detail khusus, halaman memakai template generik
// dari portfolioData (fullDesc/challenge/solution/impact) + learnings fallback.

export const caseStudyDetails = {
  'audit-sinkronisasi-pemakaman': {
    diagram: 'fuzzy',
    architecture: {
      id: 'CSV lapangan + DB legacy → normalisasi → Exact Match → Fuzzy Match (Levenshtein) → review manual → DB terpusat MySQL.',
      en: 'Field CSV + legacy DB → normalization → Exact Match → Fuzzy Match (Levenshtein) → manual review → centralized MySQL.',
    },
    steps: {
      id: [
        'Normalisasi nama & blok makam (case folding, trim, singkatan standar).',
        'Exact matching untuk pasangan identik 1:1.',
        'Fuzzy matching Levenshtein dengan threshold untuk typo & variasi penulisan.',
        'Review manual untuk skor ambigu sebelum merge final.',
        'Konsolidasi 46.973+ baris ke satu database terpusat.',
      ],
      en: [
        'Normalized grave names & blocks (case folding, trim, standard abbreviations).',
        'Exact matching for identical 1:1 pairs.',
        'Levenshtein fuzzy matching with thresholds for typos & spelling variants.',
        'Manual review for ambiguous scores before final merge.',
        'Consolidated 46,973+ rows into one central database.',
      ],
    },
    learnings: {
      id: [
        'Fuzzy matching butuh threshold per kolom, bukan satu angka global.',
        'Audit trail (siapa merge apa) sama pentingnya dengan algoritmanya.',
        'Batch processing + indeks DB menentukan-cepat-tidaknya 47rb baris.',
      ],
      en: [
        'Fuzzy matching needs per-column thresholds, not one global number.',
        'An audit trail (who merged what) matters as much as the algorithm.',
        'Batch processing + DB indexes decide how fast 47k rows run.',
      ],
    },
  },
  'warehouse-management-system': {
    diagram: 'wma',
    architecture: {
      id: 'Transaksi gudang → histori permintaan → WMA (bobot) → forecast → ROP (lead time + safety stock) → notifikasi reorder → dashboard Recharts.',
      en: 'Warehouse transactions → demand history → WMA (weighted) → forecast → ROP (lead time + safety stock) → reorder alerts → Recharts dashboard.',
    },
    steps: {
      id: [
        'Hitung forecast WMA dari histori dengan bobot periode terbaru lebih besar.',
        'Hitung ROP = (rata-rata pemakaian × lead time) + safety stock.',
        'Trigger notifikasi saat stok ≤ ROP.',
        'Visualisasikan forecast vs aktual di dashboard Recharts real-time.',
      ],
      en: [
        'Computed WMA forecast from history with higher weights on recent periods.',
        'Computed ROP = (avg usage × lead time) + safety stock.',
        'Triggered alerts when stock ≤ ROP.',
        'Visualized forecast vs actual on a real-time Recharts dashboard.',
      ],
    },
    learnings: {
      id: [
        'WMA sederhana mengalahkan model kompleks saat data histori pendek.',
        'ROP hanya sebagus data lead time-nya — validasi input itu wajib.',
        'Dashboard yang dipakai harian > akurasi 1% lebih baik.',
      ],
      en: [
        'Simple WMA beats complex models when history is short.',
        'ROP is only as good as its lead-time data — input validation is mandatory.',
        'A dashboard used daily beats 1% extra accuracy.',
      ],
    },
  },
  'campus-facility-booking': {
    diagram: 'rbac',
    architecture: {
      id: 'User → RBAC (mhs/dosen/admin) → time-overlap query (approved only) → approval berjenjang → reservasi final.',
      en: 'User → RBAC (student/lecturer/admin) → time-overlap query (approved only) → tiered approval → final reservation.',
    },
    steps: {
      id: [
        'Skema relasional dengan foreign key + status reservasi eksplisit.',
        'Query overlap: (start < existing.end) AND (end > existing.start) pada slot approved.',
        'RBAC + approval workflow berjenjang sesuai birokrasi kampus.',
        'Server-side validation ganda agar tidak ada double booking.',
      ],
      en: [
        'Relational schema with foreign keys + explicit reservation status.',
        'Overlap query: (start < existing.end) AND (end > existing.start) on approved slots.',
        'RBAC + tiered approval matching campus bureaucracy.',
        'Double server-side validation so double booking is impossible.',
      ],
    },
    learnings: {
      id: [
        'Cek overlap harus di DB (query), bukan di memori aplikasi.',
        'Status reservasi adalah state machine — jangan boolean.',
        'UX konflik yang jelas (slot alternatif) menurunkan komplain.',
      ],
      en: [
        'Overlap checks belong in the DB (query), not app memory.',
        'Reservation status is a state machine — not a boolean.',
        'Clear conflict UX (alternative slots) reduces complaints.',
      ],
    },
  },
  'e-voting-pemira-ulbi': {
    diagram: 'voting',
    architecture: {
      id: 'Tata tertib dewan → verifikasi anti-double-voter → surat suara digital → rekap transparan.',
      en: 'Council regulations → anti-double-voter verification → digital ballot → transparent tally.',
    },
    steps: {
      id: [
        'Terjemahkan tata tertib menjadi aturan verifikasi digital.',
        'Cegah double voter via token + status sudah-memilih.',
        'Validasi server-side ketat untuk setiap suara masuk.',
        'Rekap transparan untuk 700+ mahasiswa.',
      ],
      en: [
        'Translated council rules into digital verification rules.',
        'Prevented double voting via tokens + voted status.',
        'Strict server-side validation for every ballot.',
        'Transparent tally for 700+ students.',
      ],
    },
    learnings: {
      id: [
        'Kepercayaan pemilih = UX sederhana + aturan transparan.',
        'Idempotency penting: klik ganda tidak boleh jadi suara ganda.',
        'Kolaborasi 3 orang butuh kontrak API sejak hari pertama.',
      ],
      en: [
        'Voter trust = simple UX + transparent rules.',
        'Idempotency matters: double clicks must never become double votes.',
        'A 3-person team needs an API contract from day one.',
      ],
    },
  },
  'iot-hydroponic-dashboard': {
    diagram: 'iot',
    architecture: {
      id: 'ESP32 (pH/suhu/TDS) → REST API → agregasi → dashboard React real-time.',
      en: 'ESP32 (pH/temp/TDS) → REST API → aggregation → real-time React dashboard.',
    },
    steps: {
      id: [
        'ESP32 kirim 3 sensor via REST secara periodik.',
        'Backend agregasi + validasi rentang sensor.',
        'Dashboard visualisasikan tren real-time.',
      ],
      en: [
        'ESP32 pushed 3 sensors over REST periodically.',
        'Backend aggregated + validated sensor ranges.',
        'Dashboard visualized real-time trends.',
      ],
    },
    learnings: {
      id: [
        'Data sensor kotor — smoothing & validasi rentang itu wajib.',
        'Polling sederhana cukup sebelum butuh WebSocket/MQTT.',
        'Tampilkan satuan + ambang batas, bukan angka mentah.',
      ],
      en: [
        'Sensor data is noisy — smoothing & range checks are mandatory.',
        'Simple polling is enough before needing WebSocket/MQTT.',
        'Show units + thresholds, not raw numbers.',
      ],
    },
  },
  'cukimai-ai-konsultasi': {
    diagram: 'ai',
    architecture: {
      id: 'Curhat bebas → TF-IDF + 3 classifier (utama/pendukung/tingkat) → prompt Groq LLM → solusi + to-do list.',
      en: 'Free-text vent → TF-IDF + 3 classifiers (main/supporting/severity) → Groq LLM prompt → solution + to-do list.',
    },
    steps: {
      id: [
        'Latih 3 head klasifikasi dari dataset.csv (auto_train.py).',
        'Petakan keluhan ke kategori utama, pendukung, dan tingkat.',
        'Suntikkan hasil klasifikasi sebagai konteks prompt LLM.',
        'LLM susun solusi personal + daftar tindakan.',
      ],
      en: [
        'Trained 3 classification heads from dataset.csv (auto_train.py).',
        'Mapped complaints to main, supporting, and severity categories.',
        'Injected classification results as LLM prompt context.',
        'LLM composed a personal solution + action list.',
      ],
    },
    learnings: {
      id: [
        'Klasifikasi kecil + LLM besar = kombinasi hemat & relevan.',
        'Kualitas dataset mengalahkan tuning model.',
        'Selalu tampilkan kategori agar output bisa diverifikasi.',
      ],
      en: [
        'Small classifiers + big LLM = cheap & relevant combo.',
        'Dataset quality beats model tuning.',
        'Always show categories so output stays verifiable.',
      ],
    },
  },
  'sipadu-information-system': {
    diagram: 'auth',
    architecture: {
      id: 'React SPA → REST API Express + Prisma → JWT + bcrypt → MySQL/Postgres.',
      en: 'React SPA → Express REST API + Prisma → JWT + bcrypt → MySQL/Postgres.',
    },
    steps: {
      id: [
        'Skema Prisma + migrasi untuk domain kampus/organisasi.',
        'Auth JWT dengan hashing bcrypt + middleware route.',
        'Client HTTP terpusat (axios) + routing React.',
      ],
      en: [
        'Prisma schema + migrations for campus/org domain.',
        'JWT auth with bcrypt hashing + route middleware.',
        'Centralized HTTP client (axios) + React routing.',
      ],
    },
    learnings: {
      id: [
        'Pisahkan auth, validasi, dan logic bisnis sejak awal.',
        'Kontrak REST yang konsisten menghemat waktu frontend.',
        'Monorepo butuh README per paket, bukan satu global.',
      ],
      en: [
        'Separate auth, validation, and business logic early.',
        'A consistent REST contract saves frontend time.',
        'A monorepo needs per-package READMEs, not one global file.',
      ],
    },
  },
  'tasty-food-resto': {
    diagram: 'cms',
    architecture: {
      id: 'Route publik (home/berita/galeri/kontak) + route admin (auth + CRUD + trash/restore) → MySQL.',
      en: 'Public routes (home/news/gallery/contact) + admin routes (auth + CRUD + trash/restore) → MySQL.',
    },
    steps: {
      id: [
        'Pisahkan route publik & admin dengan middleware auth.',
        'CRUD konten + soft-delete (TrashController).',
        'Form kontak tersimpan ke database.',
      ],
      en: [
        'Split public & admin routes with auth middleware.',
        'Content CRUD + soft-delete (TrashController).',
        'Contact form persisted to the database.',
      ],
    },
    learnings: {
      id: [
        'Soft-delete menyelamatkan pemilik dari hapus tak sengaja.',
        'Admin yang sederhana lebih dipakai daripada yang kaya fitur.',
        'SEO dasar (slug + meta) penting untuk resto.',
      ],
      en: [
        'Soft-delete saves owners from accidental deletes.',
        'A simple admin gets used more than a feature-rich one.',
        'Basic SEO (slugs + meta) matters for restaurants.',
      ],
    },
  },
  'tidur-in-sleep-recommender': {
    diagram: 'ml',
    architecture: {
      id: 'Input jam bangun + aktivitas → LinearRegression (scikit-learn) → rekomendasi HH:MM.',
      en: 'Wake-up + activity input → LinearRegression (scikit-learn) → HH:MM recommendation.',
    },
    steps: {
      id: [
        'Siapkan dataset kecil fitur → target jam tidur.',
        'Latih LinearRegression dalam satu file app.py.',
        'Tampilkan data latih transparan + hasil HH:MM.',
      ],
      en: [
        'Prepared a tiny feature → bedtime dataset.',
        'Trained LinearRegression inside a single app.py.',
        'Showed transparent training data + HH:MM result.',
      ],
    },
    learnings: {
      id: [
        'Demo kecil yang transparan > model besar yang buram.',
        'Validasi input (format jam) adalah setengah pekerjaan.',
        'Visualisasi data membuat ML mudah dipercaya.',
      ],
      en: [
        'A small transparent demo beats a big opaque model.',
        'Input validation (time format) is half the work.',
        'Data visualization makes ML trustworthy.',
      ],
    },
  },
  'flutter-form-uts': {
    diagram: 'mobile',
    architecture: {
      id: 'Form tervalidasi → dialog konfirmasi → halaman terima kasih (slide+fade) → layout adaptif.',
      en: 'Validated form → confirmation dialog → thank-you page (slide+fade) → adaptive layout.',
    },
    steps: {
      id: [
        'Widget form reusable dengan validator (wajib isi, email).',
        'Error inline + dialog konfirmasi setelah submit.',
        'Transisi slide + fade + layout 1/2 kolom adaptif.',
      ],
      en: [
        'Reusable form widgets with validators (required, email).',
        'Inline errors + confirmation dialog after submit.',
        'Slide + fade transitions + adaptive 1/2-column layout.',
      ],
    },
    learnings: {
      id: [
        'Validasi dini + feedback jelas = UX mobile yang baik.',
        'Navigasi eksplisit (pop/push) menghindari state nyasar.',
        'LayoutBuilder sederhana cukup untuk mobile + tablet.',
      ],
      en: [
        'Early validation + clear feedback = good mobile UX.',
        'Explicit navigation (pop/push) avoids lost state.',
        'A simple LayoutBuilder covers mobile + tablet.',
      ],
    },
  },
};

export function getCaseDetail(slug) {
  return caseStudyDetails[slug] ?? null;
}

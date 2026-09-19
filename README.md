# Rival Rudiana Putra — Portfolio

Portfolio Full-Stack Developer & Data Architecture Specialist. React 19 + Vite 8 + Tailwind CSS v4.

## Jalankan lokal

```bash
npm install
npm run dev
```

## Script

- `npm run dev` — development server
- `npm run build` — production build ke `dist/`
- `npm run lint` — ESLint
- `npm run preview` — preview hasil build

## Struktur

- `src/data/portfolioData.js` — single source of truth (profil, metrics, projects + `repoLinks`, experience, organization, education, certifications, languages, skills, contact, siteUrl)
- `src/components/sections/` — Hero, MetricsBanner, Skills, Projects (search + filter tech), Experience, Education, Certifications, Contact
- `src/components/ui/` — ProjectCard, ProjectModal, Badge, Reveal (spring), BackToTop, WelcomeScreen, AnimatedBackground, GlowButton, TechMarquee
- `src/components/layout/` — Navbar, Footer
- `src/context/` — ThemeContext (dark/light, tersimpan di localStorage) & LanguageContext (ID/EN, tersimpan di localStorage)
- `src/i18n/translations.js` — kamus string UI ID/EN
- `src/data/portfolioData.en.js` — mirror data portfolio dalam bahasa Inggris
- `src/hooks/useInView.js` — reveal-on-scroll + trigger count-up
- `public/cv-rival-rudiana.pdf` — file CV untuk tombol Unduh CV

## Animasi interaktif (ala Portofolio_V5)

- `WelcomeScreen` — splash intro sekali per sesi (monogram spring + typewriter + progress bar, keluar blur+scale).
- `AnimatedBackground` — blob brand yang bergerak mengikuti scroll + grid overlay (nonaktif saat reduced-motion).
- Hero — typewriter peran (ID/EN), badge melayang + ping, tombol glow dengan shine sweep.
- `TechMarquee` — strip tech marquee tanpa henti (pause saat hover).
- `Reveal` — spring reveal via framer-motion (`MotionConfig reducedMotion="user"`).
- `ProjectCard` — tilt 3D mengikuti mouse (pointer halus saja).
- `ProjectModal` — spring scale + fade via AnimatePresence.
- Navbar — sembunyi saat scroll ke bawah, muncul saat scroll ke atas.
- Sertifikasi — rel swipeable (snap di mobile, panah di desktop).

## Tema & bahasa

- Toggle matahari/bulan di navbar untuk dark/light mode (mengikuti preferensi OS saat pertama kali, lalu diingat; tanpa flash saat load).
- Toggle ID/EN di navbar untuk dua bahasa. Seluruh konten (10 project, experience, education, form, validasi) ikut berganti; pilihan diingat dan atribut `lang` HTML diperbarui.

## Ganti foto & screenshot

- Foto profil: simpan sebagai `public/images/profile.jpg` (persegi, min 512px),
  lalu ubah `photo` di `src/data/portfolioData.js` menjadi `/images/profile.jpg`.
- Screenshot project: simpan di `public/images/projects/<nama>.jpg/png`,
  lalu ubah field `image` tiap project di `portfolioData.js`.
  File SVG saat ini (`profile.svg`, `projects/*.svg`) adalah placeholder siap ganti.

## Contact form

Tanpa konfigurasi, form memakai fallback `mailto:` (membuka aplikasi email).
Untuk pengiriman langsung:

```bash
cp .env.example .env
# isi VITE_FORMSPREE_FORM_ID dengan ID dari https://formspree.io
npm run dev
```

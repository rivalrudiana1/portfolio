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
- `src/components/ui/` — ProjectCard, ProjectModal, Badge, Reveal, BackToTop
- `src/components/layout/` — Navbar, Footer
- `src/hooks/useInView.js` — reveal-on-scroll + trigger count-up
- `public/cv-rival-rudiana.pdf` — file CV untuk tombol Unduh CV

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

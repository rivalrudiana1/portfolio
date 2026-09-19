// English mirror of portfolioData.js — same shape, translated content.
// Contact links, images, metric values stay identical.

export const personalInfoEn = {
  name: "Rival Rudiana Putra",
  role: "Full-Stack Developer & Data Architecture Specialist",
  summary:
    "Fresh D3 Informatics Engineering graduate from ULBI (GPA 3.79). Specialist in complex data architectures (fuzzy matching, time-overlap queries, predictive algorithms) with student-legislative leadership experience.",
  location: "Bandung, West Java",
  photo: "/images/profile.svg",
  siteUrl: "https://portfolio-eight-brown-x3erim3vum.vercel.app",
  metrics: [
    { value: 46973, display: "46,973+", label: "Operational Data Rows Synchronized" },
    { value: 700, display: "700+", label: "Active E-Voting Users" },
    { value: 3.79, display: "3.79", label: "Informatics GPA", decimals: 2 },
  ],
  projects: [
    {
      slug: "audit-sinkronisasi-pemakaman",
      title: "Cemetery Data Audit & Synchronization System",
      tech: ["Laravel", "React", "MySQL"],
      image: "/images/projects/audit-pemakaman.svg",
      desc: "Production-scale system processing 46,973 data rows. Data normalization with Exact & Fuzzy Matching.",
      fullDesc:
        "Enterprise-grade application for the Bandung Ciptabintar agency, resolving duplication and desynchronization of cemetery records between the legacy system and the latest field survey.",
      challenge:
        "Tens of thousands of historical records with inconsistent naming formats and typos, impossible to reconcile manually.",
      solution:
        "Implemented Levenshtein-distance Fuzzy Matching combined with Exact Matching to automatically align grave names and blocks with high accuracy.",
      impact:
        "Boosted data-audit efficiency by up to 80% and consolidated 46,973+ rows into a single central database.",
      githubUrl: "https://github.com/rivalrudiana1/Audit",
      liveUrl: null,
    },
    {
      slug: "warehouse-management-system",
      title: "Warehouse Management System (WMS)",
      tech: ["Laravel", "React", "Recharts", "WMA", "ROP"],
      image: "/images/projects/wms.svg",
      desc: "Inventory forecasting with Weighted Moving Average (WMA) & Reorder Point (ROP), plus a real-time analytics dashboard.",
      fullDesc:
        "Full-stack warehouse management system digitizing B2B workflows, purchase orders, and end-to-end inventory tracking, with an interactive analytics dashboard and WMA/ROP simulation.",
      challenge:
        "The company kept running out of critical stock without warning — or overstocking slow-moving items.",
      solution:
        "Applied WMA for demand forecasting based on historical weights and ROP for automatic reorder notifications, visualized with Recharts.",
      impact:
        "Reduced stockout risk and optimized inventory capital expenditure through data-driven decisions.",
      repoLinks: [
        { label: "Frontend", url: "https://github.com/rivalrudiana1/WMA-ROP" },
        { label: "Backend", url: "https://github.com/rivalrudiana1/WMA-ROP-BE" },
      ],
      liveUrl: null,
    },
    {
      slug: "campus-facility-booking",
      title: "Campus Facility Booking System",
      tech: ["Laravel 11", "PHP 8.2", "MySQL", "RBAC"],
      image: "/images/projects/facility-booking.svg",
      desc: "Real-time validation with time-overlap queries, RBAC, and tiered approval workflows to prevent double booking.",
      fullDesc:
        "Campus facility booking system letting students and lecturers reserve rooms, labs, and equipment. Structured relational database with foreign keys, strict server-side validation, and document-type filtering.",
      challenge:
        "The previous manual system was prone to scheduling conflicts for the same time slots.",
      solution:
        "Built precise time-overlap query validation filtering approved reservations, plus Role-Based Access Control for tiered campus approval workflows.",
      impact:
        "Systematically eliminated double booking and automated the bureaucratic approval flow.",
      githubUrl: null,
      liveUrl: null,
    },
    {
      slug: "e-voting-pemira-ulbi",
      title: "E-Voting PEMIRA ULBI",
      tech: ["Laravel", "Tailwind CSS", "Alpine.js"],
      image: "/images/projects/evoting.svg",
      desc: "Campus election app serving 700+ students, built with a 3-person team under strict council regulations.",
      fullDesc:
        "Digital student general-election (PEMIRA) platform for ULBI. Translated strict student-council election rules into a digital verification flow that preserves data integrity and prevents double voting.",
      challenge:
        "Turning rigid election regulations into a transparent, secure digital system adopted for the long term.",
      solution:
        "Built an anti-double-voter verification flow with strict server-side validation, in a 3-person cross-functional team owning the core election logic.",
      impact:
        "Facilitated 700+ student votes transparently and securely; the system was adopted for long-term campus use.",
      githubUrl: "https://github.com/rivalrudiana1/pemira24",
      liveUrl: null,
    },
    {
      slug: "iot-hydroponic-dashboard",
      title: "IoT Hydroponic Monitoring Dashboard",
      tech: ["ESP32", "React", "Express", "REST API"],
      image: "/images/projects/iot-hydroponic.svg",
      desc: "Real-time dashboard for pH, temperature, and TDS readings streamed from an ESP32 microcontroller.",
      fullDesc:
        "Dashboard ingesting and integrating a continuous data stream from an ESP32, visualizing 3 sensors (pH, temperature, TDS) in real time to optimize hydroponic care decisions.",
      challenge:
        "Continuous sensor data needed processing and visualization readable by farmers/operators in real time.",
      solution:
        "Designed an ESP32 data-ingest architecture over REST API with real-time web dashboard visualization.",
      impact:
        "Made real-time monitoring of nutrient and temperature conditions effortless.",
      githubUrl: null,
      liveUrl: null,
    },
    {
      slug: "cukimai-ai-konsultasi",
      title: "CUKIMAI — AI Student Counseling",
      tech: ["Python", "Streamlit", "scikit-learn", "Groq"],
      image: "/images/projects/cukimai.svg",
      desc: "AI-powered student counseling app: classifies concerns into main, supporting, and severity categories, then an LLM drafts solutions + to-do list.",
      fullDesc:
        "Streamlit app named CUKIMAI (repo: Mahasense). Users write their problem in free text; three trained classifiers (TF-IDF vectorizer + label encoders) map it to a main category, supporting category, and severity level, then a Groq LLM composes a personalized solution and action list.",
      challenge:
        "Unstructured student complaints are hard to categorize manually for relevant advice.",
      solution:
        "Trained a classification pipeline (auto_train.py + dataset.csv) with three prediction heads, orchestrated with an LLM prompt that receives the classification as context.",
      impact:
        "Turns free-form venting into structured analysis plus a concrete action plan in one click.",
      githubUrl: "https://github.com/rivalrudiana1/Mahasense",
      liveUrl: null,
    },
    {
      slug: "sipadu-information-system",
      title: "SIPADU — Full-Stack Information System",
      tech: ["Express", "Prisma", "React", "Tailwind CSS"],
      image: "/images/projects/sipadu.svg",
      desc: "Full-stack information system: Express + Prisma backend with JWT & bcrypt auth, React + router + Tailwind frontend.",
      fullDesc:
        "SIPADU monorepo with a Backend (Node.js, Express 5, Prisma ORM, JWT authentication with bcrypt hashing, CORS, dotenv) and Frontend (React 18, Vite, Tailwind CSS, react-router-dom, axios, SweetAlert2, Material Tailwind) connected via REST API.",
      challenge:
        "Needed a secure information-system foundation (login/sessions) with a clean frontend-backend split.",
      solution:
        "Built a JWT-authenticated REST API on the backend with a Prisma schema, and a React SPA with routing and a centralized HTTP client on the frontend.",
      impact:
        "Reusable foundation for campus/organization information systems with secure login and a modern UI.",
      repoLinks: [
        { label: "Monorepo", url: "https://github.com/rivalrudiana1/SIPADU" },
        { label: "Frontend", url: "https://github.com/rivalrudiana1/Frontend_SIPADU" },
      ],
      liveUrl: null,
    },
    {
      slug: "tasty-food-resto",
      title: "TASTY_FOOD — Restaurant Company Profile",
      tech: ["Laravel 10", "PHP 8.1", "MySQL", "Blade"],
      image: "/images/projects/tasty-food.svg",
      desc: "Laravel 10 restaurant company profile: news + detail pages, gallery, contact form, admin dashboard with auth and trash/restore.",
      fullDesc:
        "Culinary business profile website on Laravel 10 (PHP 8.1, Sanctum). Public pages: home, about, news list & detail, gallery, and a contact form stored in the database. Admin panel: dashboard, authentication, content management, and trash for restoring deleted data.",
      challenge:
        "Restaurant content (news, gallery, info) had to be manageable by the owner without touching code, safe from accidental deletion.",
      solution:
        "Separated public and admin routes with auth middleware, full CRUD plus soft-delete (TrashController) so deleted data can be recovered.",
      impact:
        "The owner independently manages website content; data is safe thanks to the trash/restore pattern.",
      githubUrl: "https://github.com/rivalrudiana1/TASTY_FOOD",
      liveUrl: null,
    },
    {
      slug: "tidur-in-sleep-recommender",
      title: "Tidur.in — Sleep Time Recommender",
      tech: ["Python", "Streamlit", "scikit-learn"],
      image: "/images/projects/tidur.svg",
      desc: "Tiny machine-learning app: linear regression recommends your ideal bedtime from wake-up time and daily activity.",
      fullDesc:
        "Educational Streamlit app training a LinearRegression model on a small dataset (wake-up time and activity duration as features, bedtime as target). Users enter two numbers and get a bedtime recommendation in HH:MM format, with a transparent training-data expander.",
      challenge:
        "Demonstrating how regression ML works interactively in a way anyone can grasp.",
      solution:
        "Bundled training and inference in a single app.py with the training data visualized right in the UI.",
      impact:
        "An approachable ML demo: users see data, model, and result on one screen.",
      githubUrl: "https://github.com/rivalrudiana1/Tidur.in",
      liveUrl: null,
    },
    {
      slug: "flutter-form-uts",
      title: "Flutter Form App (Mobile Programming Midterm)",
      tech: ["Flutter", "Dart"],
      image: "/images/projects/flutter-uts.svg",
      desc: "Flutter mobile app for the midterm exam: validated form, confirmation dialog, thank-you page, slide+fade transitions, mobile & tablet responsive.",
      fullDesc:
        "Midterm project for the Mobile Programming course (D3 Informatics, ULBI). Features: name & email form with validation (required, email format), inline error messages, confirmation dialog after submit, navigation to a Thank You page, slide + fade transitions, and adaptive single-column (mobile) vs two-column (tablet) layout.",
      challenge:
        "Meeting the exam rubric: validation, error feedback, dialogs, navigation, animation, and responsiveness in one small app.",
      solution:
        "Composed reusable form widgets with validators, custom route transitions, and a screen-width-based layout builder.",
      impact:
        "Passed the midterm with an app demonstrating complete Flutter fundamentals; screenshots available in the repo.",
      githubUrl: "https://github.com/rivalrudiana1/ATS-MP",
      liveUrl: null,
    },
  ],
  experience: [
    {
      role: "Software Engineer Intern",
      company: "Dinas Ciptabintar Kota Bandung — UPTD TPU Pandu",
      period: "2026",
      desc: "Developed a cemetery data audit & synchronization system (~47k entries) with a Laravel MVC architecture (PHP 8), Tailwind CSS, Alpine.js, and Vite.",
    },
    {
      role: "Full-Stack Developer",
      company: "PEMIRA ULBI",
      period: "Nov 2024 — Jan 2025",
      desc: "Built the PEMIRA e-voting and election management system with a 3-person team; translated council rules into anti-double-voter digital verification for 700+ students.",
    },
    {
      role: "Freelance Web Developer",
      company: "Independent Clients",
      period: "2025 — Present",
      desc: "Built a dynamic company profile with Laravel 10 in 3 days, interactive landing pages, and relational database queries.",
    },
    {
      role: "Network Installer Intern",
      company: "GraPari Telkom Group Lembong",
      period: "Jan 2022 — Jun 2022",
      desc: "Installed fiber-optic cabling and troubleshot networks to keep end-user connections stable.",
    },
  ],
  organization: [
    {
      role: "Vice Chairperson",
      company: "Student Consultative Assembly (MPM) ULBI",
      period: "Mar 2025 — Apr 2026",
      desc: "Directed legislative strategy and operations; bridged student bodies and university bureaucracy.",
    },
    {
      role: "Commission 3 Member — Aspiration & Advocacy",
      company: "MPM ULBI",
      period: "May 2024 — Feb 2025",
      desc: "Advocated student aspirations and drafted the General Election Bill.",
    },
    {
      role: "Vice Chief Executive",
      company: "Young Legislators Committee",
      period: "Oct 2024 — Jan 2025",
      desc: "Executed new-legislator onboarding from planning to closing.",
    },
  ],
  education: [
    {
      school: "Universitas Logistik dan Bisnis Internasional",
      degree: "Diploma III (D3), Informatics Engineering — GPA 3.79",
      period: "Sep 2023 — Sep 2026",
      desc: "Focused on software engineering, relational databases, and full-stack application architecture.",
    },
    {
      school: "SMK Negeri 2 Bandung",
      degree: "Computer & Network Engineering — Average 85",
      period: "Jul 2020 — Jun 2023",
      desc: 'Earned a "Competent" predicate in computer network engineering.',
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
      title: "Public Lecture — Large Language Models (LLMs) and Advanced Algorithms",
      issuer: "ULBI / HIMATIF-23",
      year: "2025",
      file: "/certificates/kuliah-umum-llm-2025.png",
      type: "image",
    },
    {
      title: "PEMIRA ULBI 2025 — Logistics Division Member",
      issuer: "PEMIRA ULBI",
      year: "2025",
      file: "/certificates/pemira-2025.jpeg",
      type: "image",
    },
    {
      title: "MPM ULBI Board 2024/2025 — Commission 3 Member (Aspiration)",
      issuer: "Student Consultative Assembly ULBI",
      year: "2025",
      file: "/certificates/kepengurusan-mpm-2024-2025.pdf",
      thumb: "/certificates/thumbs/kepengurusan-mpm-2024-2025.jpg",
      type: "pdf",
    },
    {
      title: "Internship — Bandung Ciptabintar Agency",
      issuer: "Bandung Ciptabintar Agency",
      year: "2026",
      file: "/certificates/magang-ciptabintar.pdf",
      thumb: "/certificates/thumbs/magang-ciptabintar.jpg",
      type: "pdf",
    },
    {
      title: "ULBI Grand Inauguration — Committee (May 22, 2024)",
      issuer: "MPM ULBI",
      year: "2024",
      file: "/certificates/pelantikan-akbar-2024-2025.pdf",
      thumb: "/certificates/thumbs/pelantikan-akbar-2024-2025.jpg",
      type: "pdf",
    },
    {
      title: "PKKMB ULBI 2024 — Participant",
      issuer: "Universitas Logistik dan Bisnis Internasional",
      year: "2024",
      file: "/certificates/pkkmb.pdf",
      thumb: "/certificates/thumbs/pkkmb.jpg",
      type: "pdf",
    },
    {
      title: "TOEIC Prediction Test — Score 580",
      issuer: "ULBI Language Center",
      year: "2026",
      file: "/certificates/toeic.pdf",
      thumb: "/certificates/thumbs/toeic.jpg",
      type: "pdf",
    },
    {
      title: "ACAD CSIRT Summit 2025 — Participant",
      issuer: "ACAD CSIRT × BSSN",
      year: "2025",
      file: "/certificates/acad-csirt-summit-2025.pdf",
      thumb: "/certificates/thumbs/acad-csirt-summit-2025.jpg",
      type: "pdf",
    },
  ],
  languages: [
    { name: "Indonesian", level: "Native" },
    { name: "English", level: "Intermediate / Conversational" },
  ],
};

export { skillsData as skillsDataEn } from './portfolioData.js';

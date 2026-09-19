import { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import TechMarquee from './components/ui/TechMarquee';
import MetricsBanner from './components/sections/MetricsBanner';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';
import Certifications from './components/sections/Certifications';
import Contact from './components/sections/Contact';
import BackToTop from './components/ui/BackToTop';
import AnimatedBackground from './components/ui/AnimatedBackground';
import WelcomeScreen from './components/ui/WelcomeScreen';
import { useLanguage } from './context/LanguageContext';

const CaseStudyPage = lazy(() => import('./components/sections/CaseStudyPage'));

function isWelcomed() {
  try {
    return sessionStorage.getItem('rival-welcomed') === '1';
  } catch {
    return false;
  }
}

// Scroll ke anchor #id setelah navigasi client-side (mis. /#projects → #projects)
function ScrollToHash() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      // Tunggu lazy/home render dulu
      const t = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
      return () => clearTimeout(t);
    }
  }, [pathname, hash]);
  return null;
}

function HomePage() {
  return (
    <main>
      <Hero />
      <TechMarquee />
      <MetricsBanner />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Certifications />
      <Contact />
    </main>
  );
}

function Shell() {
  const { t } = useLanguage();
  const [welcomed, setWelcomed] = useState(isWelcomed);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const handleWelcomeDone = useCallback(() => {
    try {
      sessionStorage.setItem('rival-welcomed', '1');
    } catch {
      /* ignore */
    }
    setWelcomed(true);
  }, []);

  return (
    <div className="min-h-screen overflow-x-clip bg-ulbi-grey text-ulbi-blue font-sans selection:bg-ulbi-orange selection:text-white dark:bg-zinc-950 dark:text-zinc-100">
      <AnimatedBackground />

      <AnimatePresence>
        {isHome && !welcomed && <WelcomeScreen key="welcome" onDone={handleWelcomeDone} />}
      </AnimatePresence>

      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[70] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-ulbi-blue focus:text-white"
      >
        {t('app.skip')}
      </a>

      <div className="relative z-10">
        <Navbar />
        <ScrollToHash />
        <Suspense fallback={<div className="pt-32 pb-20 text-center text-sm opacity-60">Loading…</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects/:slug" element={<CaseStudyPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Suspense>
        <Footer />
        <BackToTop />
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}

export default App;

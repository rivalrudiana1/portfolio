import { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState('home');
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLanguage();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const hrefFor = (id) => (isHome ? `#${id}` : `/#${id}`);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY || 0;
      setScrolled(y > 20);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(y / total, 1) : 0);
      // Sembunyi saat scroll ke bawah, muncul saat scroll ke atas
      setHidden(y > 320 && y > lastY.current && !open);
      lastY.current = y;
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [open]);

  // Scrollspy: tandai section yang sedang terlihat
  useEffect(() => {
    const ids = ['home', 'skills', 'projects', 'experience', 'education', 'certifications', 'contact'];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open ]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const navLinks = [
    { name: t('nav.home'), href: hrefFor('home'), id: 'home' },
    { name: t('nav.skills'), href: hrefFor('skills'), id: 'skills' },
    { name: t('nav.projects'), href: hrefFor('projects'), id: 'projects' },
    { name: t('nav.experience'), href: hrefFor('experience'), id: 'experience' },
    { name: t('nav.education'), href: hrefFor('education'), id: 'education' },
  ];

  const linkClass = (id, mobile = false) => {
    const isActive = active === id;
    if (mobile) {
      return `block px-3 py-3 rounded-xl text-base font-medium transition-colors ${
        isActive
          ? 'bg-ulbi-orange/10 text-ulbi-orange'
          : 'text-ulbi-blue hover:bg-ulbi-grey hover:text-ulbi-orange dark:text-zinc-100 dark:hover:bg-white/10'
      }`;
    }
    return `text-sm font-medium transition-colors ${
      isActive ? 'text-ulbi-orange' : 'text-ulbi-blue/70 hover:text-ulbi-orange dark:text-zinc-400 dark:hover:text-ulbi-orange'
    }`;
  };

  const iconBtn =
    'inline-flex items-center justify-center w-10 h-10 rounded-full border border-ulbi-silver bg-white text-ulbi-blue hover:border-ulbi-orange hover:text-ulbi-orange transition-colors dark:border-white/15 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-ulbi-orange dark:hover:text-ulbi-orange';

  return (
    <nav
      aria-label={t('nav.main')}
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        hidden && !open ? '-translate-y-full' : 'translate-y-0'
      } ${
        scrolled || open
          ? 'bg-white/90 backdrop-blur-md border-ulbi-silver shadow-sm py-3 dark:bg-zinc-950/90 dark:border-white/10'
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      {/* Scroll progress */}
      <div className="absolute top-0 left-0 h-[3px] bg-ulbi-orange transition-[width] duration-100" style={{ width: `${progress * 100}%` }} aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-2">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="text-xl font-extrabold tracking-tighter text-ulbi-blue hover:text-ulbi-orange transition-colors dark:text-white"
        >
          RIVAL<span className="text-ulbi-orange">.</span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                aria-current={active === link.id ? 'location' : undefined}
                className={linkClass(link.id)}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={hrefFor('contact')}
            onClick={() => setOpen(false)}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2 text-sm font-medium rounded-full bg-ulbi-orange text-white hover:bg-[#c94520] transition-colors shadow-sm"
          >
            {t('nav.cta')}
          </a>

          {/* Language toggle */}
          <button
            type="button"
            onClick={toggleLang}
            title={t('nav.lang')}
            aria-label={t('nav.lang')}
            className="inline-flex items-center rounded-full border border-ulbi-silver bg-white text-xs font-bold overflow-hidden dark:border-white/15 dark:bg-zinc-900"
          >
            <span className={`px-2.5 py-2 transition-colors ${lang === 'id' ? 'bg-ulbi-blue text-white dark:bg-ulbi-orange' : 'text-ulbi-blue/50 dark:text-zinc-400'}`}>
              ID
            </span>
            <span className={`px-2.5 py-2 transition-colors ${lang === 'en' ? 'bg-ulbi-blue text-white dark:bg-ulbi-orange' : 'text-ulbi-blue/50 dark:text-zinc-400'}`}>
              EN
            </span>
          </button>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            title={theme === 'dark' ? t('nav.themeLight') : t('nav.themeDark')}
            aria-label={theme === 'dark' ? t('nav.themeLight') : t('nav.themeDark')}
            className={iconBtn}
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0012 21.75a9.753 9.753 0 009.752-6.748z" />
              </svg>
            )}
          </button>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? t('nav.close') : t('nav.open')}
            className={`${iconBtn} md:hidden`}
          >
            {open ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-ulbi-silver dark:bg-zinc-950/95 dark:border-white/10">
          <ul className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={active === link.id ? 'location' : undefined}
                  className={linkClass(link.id, true)}
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={hrefFor('contact')}
                onClick={() => setOpen(false)}
                className="flex items-center justify-center px-5 py-3 text-sm font-semibold rounded-full bg-ulbi-orange text-white hover:bg-[#c94520] transition-colors"
              >
                {t('nav.cta')}
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

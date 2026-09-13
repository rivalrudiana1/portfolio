import { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(window.scrollY / total, 1) : 0);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Education', href: '#education', id: 'education' },
  ];

  const linkClass = (id, mobile = false) => {
    const isActive = active === id;
    if (mobile) {
      return `block px-3 py-3 rounded-xl text-base font-medium transition-colors ${
        isActive ? 'bg-ulbi-orange/10 text-ulbi-orange' : 'text-ulbi-blue hover:bg-ulbi-grey hover:text-ulbi-orange'
      }`;
    }
    return `text-sm font-medium transition-colors ${
      isActive ? 'text-ulbi-orange' : 'text-ulbi-blue/70 hover:text-ulbi-orange'
    }`;
  };

  return (
    <nav
      aria-label="Navigasi utama"
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled || open
          ? 'bg-white/90 backdrop-blur-md border-ulbi-silver shadow-sm py-3'
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      {/* Scroll progress */}
      <div className="absolute top-0 left-0 h-[3px] bg-ulbi-orange transition-[width] duration-100" style={{ width: `${progress * 100}%` }} aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#home"
          onClick={() => setOpen(false)}
          className="text-xl font-extrabold tracking-tighter text-ulbi-blue hover:text-ulbi-orange transition-colors"
        >
          RIVAL<span className="text-ulbi-orange">.</span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
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

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2 text-sm font-medium rounded-full bg-ulbi-orange text-white hover:bg-[#c94520] transition-colors shadow-sm"
          >
            Hubungi Saya
          </a>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-ulbi-silver bg-white text-ulbi-blue hover:border-ulbi-orange hover:text-ulbi-orange transition-colors"
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
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-ulbi-silver">
          <ul className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.name}>
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
                href="#contact"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center px-5 py-3 text-sm font-semibold rounded-full bg-ulbi-orange text-white hover:bg-[#c94520] transition-colors"
              >
                Hubungi Saya
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

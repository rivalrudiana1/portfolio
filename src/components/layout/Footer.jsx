import { useLanguage } from '../../context/LanguageContext';
import { normalizeTel } from '../../data/projectUtils';

const socialBtn =
  'inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/15 text-white/70 hover:text-white hover:border-ulbi-orange hover:bg-ulbi-orange/10 transition-all duration-300 hover:-translate-y-0.5';

const GitHubIcon = (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const LinkedInIcon = (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
);

const MailIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const Footer = () => {
  const { data, t } = useLanguage();

  const menuLinks = [
    { href: '/#skills', label: t('nav.skills') },
    { href: '/#projects', label: t('nav.projects') },
    { href: '/#experience', label: t('nav.experience') },
    { href: '/#education', label: t('nav.education') },
    { href: '/#certifications', label: t('footer.certs') },
    { href: '/#contact', label: t('contact.eyebrow') },
  ];

  const socials = [
    { href: data.contact.github, label: 'GitHub', icon: GitHubIcon, external: true },
    { href: data.contact.linkedin, label: 'LinkedIn', icon: LinkedInIcon, external: true },
    { href: `mailto:${data.contact.email}`, label: 'Email', icon: MailIcon, external: false },
  ];

  return (
    <footer className="bg-ulbi-blue py-14 sm:py-16 relative overflow-hidden dark:bg-zinc-950 dark:border-t dark:border-white/10">
      {/* Glow dekoratif simetris */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[480px] h-48 bg-ulbi-orange/15 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* 3 kolom setara, semua rata tengah */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 text-center">
          {/* Brand */}
          <div className="flex flex-col items-center">
            <a href="/#home" className="text-2xl font-extrabold tracking-tighter text-white hover:text-ulbi-orange transition-colors">
              RIVAL<span className="text-ulbi-orange">.</span>
            </a>
            <p className="text-white/50 text-sm mt-3 leading-relaxed max-w-[26ch] dark:text-zinc-500">
              {data.role}
            </p>
            <p className="text-white/40 text-xs mt-1 dark:text-zinc-600">{data.location}</p>
          </div>

          {/* Menu */}
          <nav aria-label={t('footer.nav')} className="flex flex-col items-center">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-ulbi-orange mb-5">
              {t('footer.menu')}
            </h2>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-x-8 gap-y-2.5 text-sm">
              {menuLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-white/60 hover:text-ulbi-orange transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Kontak */}
          <div className="flex flex-col items-center">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-ulbi-orange mb-5">
              {t('footer.contact')}
            </h2>
            <a
              href={`mailto:${data.contact.email}`}
              className="text-sm text-white/70 hover:text-ulbi-orange transition-colors break-all max-w-full"
            >
              {data.contact.email}
            </a>
            <a
              href={`tel:${normalizeTel(data.contact.phone)}`}
              className="text-sm text-white/60 hover:text-ulbi-orange transition-colors mt-2"
            >
              {data.contact.phone}
            </a>
            <div className="flex items-center justify-center gap-3 mt-5">
              {socials.map((s) => (
                <a key={s.label} href={s.href} {...(s.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} aria-label={s.label} title={s.label} className={socialBtn}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bar bawah simetris */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-center">
          <p className="text-white/40 text-sm dark:text-zinc-600">
            © {new Date().getFullYear()} {data.name}
          </p>
          <span className="hidden sm:inline text-white/20" aria-hidden="true">•</span>
          <p className="text-white/40 text-sm dark:text-zinc-600">{t('footer.rights')}</p>
          <span className="hidden sm:inline text-white/20" aria-hidden="true">•</span>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-sm text-white/60 hover:text-ulbi-orange transition-colors"
          >
            {t('top.label')} ↑
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const BackToTop = () => {
  const { t } = useLanguage();

  return (
    <BackToTopButton label={t('top.label')} />
  );
};

const BackToTopButton = ({ label }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label={label}
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 w-11 h-11 rounded-full bg-ulbi-blue text-white shadow-lg hover:bg-ulbi-orange transition-colors flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ulbi-orange dark:bg-white dark:text-zinc-950 dark:hover:bg-ulbi-orange dark:hover:text-white"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
};

export default BackToTop;

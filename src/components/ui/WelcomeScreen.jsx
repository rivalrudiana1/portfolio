import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useTypewriter } from '../../hooks/useTypewriter';

// Layar pembuka ala Portofolio_V5: ikon spring + typewriter + progress bar,
// keluar dengan blur+scale. Parent membungkus dengan AnimatePresence.
const WelcomeScreen = ({ onDone }) => {
  const { t, data } = useLanguage();
  const { text } = useTypewriter(t('welcome.greeting'));
  const doneRef = useRef(false);

  const handleDone = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    onDone();
  };

  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const timer = setTimeout(handleDone, reduced ? 400 : 2700);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-ulbi-grey px-4 dark:bg-zinc-950"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.08, filter: 'blur(12px)' }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      role="status"
      aria-label={t('welcome.loading')}
    >
      {/* Glow dekoratif */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-r from-ulbi-blue/15 to-ulbi-orange/15 blur-3xl animate-glow-pan" />
      </div>

      <div className="relative w-full max-w-2xl mx-auto text-center">
        {/* Monogram */}
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.15 }}
          className="relative inline-flex mb-8"
        >
          <div className="absolute -inset-3 bg-gradient-to-r from-ulbi-blue to-ulbi-orange rounded-full blur-lg opacity-40 animate-pulse" aria-hidden="true" />
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-ulbi-blue text-white flex items-center justify-center text-3xl sm:text-4xl font-extrabold dark:bg-zinc-900 dark:border dark:border-white/15">
            RR<span className="text-ulbi-orange">.</span>
          </div>
        </motion.div>

        {/* Typewriter */}
        <p className="min-h-[2.5rem] text-lg sm:text-2xl font-medium text-ulbi-blue dark:text-zinc-100">
          {text}
          <span className="caret-blink text-ulbi-orange" aria-hidden="true">|</span>
        </p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-3 text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-br from-ulbi-blue via-ulbi-blue to-ulbi-orange bg-clip-text text-transparent dark:from-white dark:via-white dark:to-ulbi-orange"
        >
          {data.name}
        </motion.h1>

        {/* Progress bar */}
        <div className="mt-8 h-1.5 rounded-full bg-ulbi-blue/10 overflow-hidden dark:bg-white/10" aria-hidden="true">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-ulbi-blue to-ulbi-orange"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.1, ease: 'linear', delay: 0.2 }}
          />
        </div>
        <p className="mt-3 text-xs uppercase tracking-[0.25em] text-ulbi-blue/50 dark:text-zinc-500">
          {t('welcome.loading')}
        </p>

        <button
          type="button"
          onClick={handleDone}
          className="mt-6 text-sm font-medium text-ulbi-blue/60 underline underline-offset-4 hover:text-ulbi-orange transition-colors dark:text-zinc-400"
        >
          {t('welcome.skip')}
        </button>
      </div>
    </motion.div>
  );
};

export default WelcomeScreen;

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import Reveal from '../ui/Reveal';

function useVisibleCount() {
  const [count, setCount] = useState(1);
  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setCount(3);
      else if (window.innerWidth >= 640) setCount(2);
      else setCount(1);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return count;
}

const Certifications = () => {
  const { data, t } = useLanguage();
  const certs = data.certifications ?? [];
  const visible = useVisibleCount();
  const maxIndex = Math.max(0, certs.length - visible);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightbox, setLightbox] = useState(null); // index or null
  const touchX = useRef(null);

  // Clamp otomatis tanpa setState di effect (aman untuk lint + resize)
  const safeIndex = Math.min(index, maxIndex);

  const goTo = useCallback((i) => {
    setIndex(() => {
      if (i < 0) return maxIndex;
      if (i > maxIndex) return 0;
      return i;
    });
  }, [maxIndex]);

  const next = useCallback(() => goTo(safeIndex + 1), [goTo, safeIndex]);
  const prev = useCallback(() => goTo(safeIndex - 1), [goTo, safeIndex]);

  // Autoplay 5 detik, berhenti saat hover / lightbox terbuka
  useEffect(() => {
    if (paused || lightbox !== null || certs.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i >= maxIndex ? 0 : i + 1));
    }, 5000);
    return () => clearInterval(id);
  }, [paused, lightbox, maxIndex, certs.length]);

  // Keyboard: panah + ESC
  useEffect(() => {
    const onKey = (e) => {
      if (lightbox !== null) {
        if (e.key === 'Escape') setLightbox(null);
        if (e.key === 'ArrowRight') setLightbox((v) => (v + 1) % certs.length);
        if (e.key === 'ArrowLeft') setLightbox((v) => (v - 1 + certs.length) % certs.length);
        return;
      }
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, certs.length, next, prev]);

  // Kunci scroll body saat lightbox terbuka
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) {
      if (dx < 0) next();
      else prev();
    }
    touchX.current = null;
  };

  const active = lightbox !== null ? certs[lightbox] : null;

  return (
    <section id="certifications" className="py-20 sm:py-24 bg-ulbi-grey/20 scroll-mt-20 dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="mb-10 sm:mb-12 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-ulbi-orange mb-3">{t('cert.eyebrow')}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-ulbi-blue mb-4 tracking-tight dark:text-white">{t('cert.title')}</h2>
            <p className="text-ulbi-blue/70 text-base sm:text-lg font-light max-w-2xl mx-auto dark:text-zinc-400">
              {t('cert.desc')}
            </p>
          </div>
        </Reveal>

        {/* Slider + tombol pinggir (simetris kiri-kanan) */}
        <div className="relative px-10 sm:px-14">
          {/* Tombol kiri */}
          <button
            type="button"
            onClick={prev}
            aria-label={t('cert.prev')}
            className="absolute z-10 left-0 top-[calc(50%-56px)] -translate-y-1/2 w-9 h-9 sm:w-12 sm:h-12 rounded-full border border-ulbi-silver bg-white/95 backdrop-blur text-ulbi-blue shadow-md hover:border-ulbi-orange hover:text-ulbi-orange hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-ulbi-orange transition-all flex items-center justify-center dark:border-white/15 dark:bg-zinc-900/95 dark:text-zinc-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {/* Tombol kanan */}
          <button
            type="button"
            onClick={next}
            aria-label={t('cert.next')}
            className="absolute z-10 right-0 top-[calc(50%-56px)] -translate-y-1/2 w-9 h-9 sm:w-12 sm:h-12 rounded-full border border-ulbi-silver bg-white/95 backdrop-blur text-ulbi-blue shadow-md hover:border-ulbi-orange hover:text-ulbi-orange hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-ulbi-orange transition-all flex items-center justify-center dark:border-white/15 dark:bg-zinc-900/95 dark:text-zinc-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

        <div
          className="overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex -mx-2 sm:-mx-3 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${safeIndex * (100 / visible)}%)` }}
          >
            {certs.map((cert, i) => {
              const preview = cert.thumb ?? (cert.type === 'image' ? cert.file : null);
              return (
              <div
                key={cert.file ?? i}
                className="shrink-0 px-2 sm:px-3"
                style={{ width: `${100 / visible}%` }}
              >
                <article
                  onClick={() => setLightbox(i)}
                  className="group h-full rounded-2xl bg-white border border-ulbi-silver hover:border-ulbi-orange hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer overflow-hidden dark:bg-zinc-900 dark:border-white/10 dark:hover:border-ulbi-orange"
                >
                  {/* Preview */}
                  <div className="relative aspect-[4/3] bg-ulbi-grey/40 dark:bg-zinc-800 overflow-hidden">
                    {preview ? (
                      <img
                        src={preview}
                        alt={cert.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-6 text-center">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest bg-red-600 text-white px-2.5 py-1 rounded-md">
                          PDF
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-ulbi-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                        <span className="text-xs text-ulbi-blue/60 dark:text-zinc-400">{t('cert.tapToView')}</span>
                      </div>
                    )}
                    <span className="absolute top-3 left-3 text-xs font-semibold uppercase tracking-widest text-white bg-black/55 backdrop-blur px-3 py-1 rounded-full">
                      {cert.year}
                    </span>
                    {cert.type === 'pdf' && preview && (
                      <span className="absolute top-3 right-3 text-[11px] font-bold uppercase tracking-widest bg-red-600 text-white px-2.5 py-1 rounded-md">
                        PDF
                      </span>
                    )}
                    <span className="absolute bottom-3 right-3 text-[11px] font-semibold bg-ulbi-orange text-white px-3 py-1 rounded-full opacity-0 group-hover:opacity-100">
                      {t('cert.view')}
                    </span>
                  </div>
                  {/* Info (tinggi tetap agar semua kartu sejajar) */}
                  <div className="p-5 min-h-[112px] flex flex-col justify-start">
                    <h3 className="text-sm sm:text-base font-bold text-ulbi-blue leading-snug mb-1 line-clamp-2 dark:text-white">{cert.title}</h3>
                    <p className="text-sm text-ulbi-blue/70 truncate dark:text-zinc-400">{cert.issuer}</p>
                  </div>
                </article>
              </div>
              );
            })}
          </div>
        </div>
        </div>

        {/* Dots + counter */}
        <div className="mt-5 flex items-center justify-center gap-3">
          <div className="flex items-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, d) => (
              <button
                key={d}
                type="button"
                onClick={() => goTo(d)}
                aria-label={`${t('cert.next')} ${d + 1}`}
                className={`h-2 rounded-full transition-all ${d === safeIndex ? 'w-6 bg-ulbi-orange' : 'w-2 bg-ulbi-blue/20 hover:bg-ulbi-blue/40 dark:bg-white/20'}`}
              />
            ))}
          </div>
          <span className="text-xs text-ulbi-blue/50 tabular-nums dark:text-zinc-500">
            {safeIndex + 1} / {maxIndex + 1}
          </span>
        </div>
        <p className="mt-3 text-xs text-ulbi-blue/50 sm:hidden text-center dark:text-zinc-500">
          ← {t('cert.swipe')} →
        </p>

        {/* Lightbox */}
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setLightbox(null)}
            >
              <motion.div
                initial={{ scale: 0.94, y: 12 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.96, y: 8 }}
                transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                className="w-full max-w-4xl max-h-[90vh] rounded-2xl bg-white dark:bg-zinc-900 overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label={active.title}
              >
                <div className="flex items-start justify-between gap-4 p-4 sm:p-5 border-b border-black/10 dark:border-white/10">
                  <div>
                    <h3 className="font-bold text-ulbi-blue dark:text-white leading-snug">{active.title}</h3>
                    <p className="text-sm text-ulbi-blue/60 dark:text-zinc-400">{active.issuer} • {active.year}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setLightbox(null)}
                    aria-label={t('cert.close')}
                    className="w-9 h-9 shrink-0 rounded-full border border-black/10 hover:border-ulbi-orange hover:text-ulbi-orange flex items-center justify-center dark:border-white/15 dark:text-zinc-200"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex-1 overflow-auto bg-black/5 dark:bg-black/40 min-h-[40vh]">
                  {active.type === 'image' ? (
                    <img src={active.file} alt={active.title} className="w-full h-auto object-contain max-h-[65vh] mx-auto" />
                  ) : (
                    <iframe src={active.file} title={active.title} className="w-full h-[65vh] bg-white" />
                  )}
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5 border-t border-black/10 dark:border-white/10">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setLightbox((lightbox - 1 + certs.length) % certs.length)}
                      className="px-4 py-2 rounded-full border text-sm font-semibold hover:border-ulbi-orange hover:text-ulbi-orange dark:border-white/15 dark:text-zinc-200"
                    >
                      ← {t('cert.prev')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setLightbox((lightbox + 1) % certs.length)}
                      className="px-4 py-2 rounded-full border text-sm font-semibold hover:border-ulbi-orange hover:text-ulbi-orange dark:border-white/15 dark:text-zinc-200"
                    >
                      {t('cert.next')} →
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={active.file}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-full border text-sm font-semibold hover:border-ulbi-orange hover:text-ulbi-orange dark:border-white/15 dark:text-zinc-200"
                    >
                      {t('cert.open')}
                    </a>
                    <a
                      href={active.file}
                      download
                      className="px-4 py-2 rounded-full bg-ulbi-orange text-white text-sm font-semibold hover:brightness-95"
                    >
                      {t('cert.download')}
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Languages */}
        <Reveal delay={100}>
          <div className="mt-8 sm:mt-10 p-5 sm:p-6 rounded-2xl bg-white border border-ulbi-silver flex flex-col sm:flex-row sm:items-center gap-4 dark:bg-zinc-900 dark:border-white/10">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-ulbi-orange shrink-0">{t('cert.lang')}</h3>
            <div className="flex flex-wrap gap-2">
              {data.languages.map((lang) => (
                <span key={lang.name} className="inline-flex items-center gap-2 rounded-full border border-ulbi-blue/20 bg-ulbi-blue/5 px-4 py-1.5 text-sm font-medium text-ulbi-blue dark:border-white/15 dark:bg-white/5 dark:text-zinc-200">
                  {lang.name}
                  <span className="text-ulbi-blue/50 font-normal dark:text-zinc-500">• {lang.level}</span>
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Certifications;

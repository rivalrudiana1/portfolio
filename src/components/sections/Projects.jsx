import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import ProjectCard from '../ui/ProjectCard';
import ProjectModal from '../ui/ProjectModal';
import Reveal from '../ui/Reveal';

function useVisibleCount() {
  const [count, setCount] = useState(1);
  useEffect(() => {
    const update = () => setCount(window.innerWidth >= 768 ? 2 : 1);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return count;
}

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [query, setQuery] = useState('');
  // null = "Semua/All" — sengaja tidak menyimpan label agar aman saat bahasa berganti
  const [activeTech, setActiveTech] = useState(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef(null);
  const { data, t } = useLanguage();
  const visible = useVisibleCount();

  const allLabel = t('projects.all');

  const uniqueTechs = useMemo(() => {
    const set = new Set();
    data.projects.forEach((p) => p.tech.forEach((tech) => set.add(tech)));
    return Array.from(set);
  }, [data]);

  const techs = [allLabel, ...uniqueTechs];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.projects.filter((p) => {
      const matchTech = activeTech === null || p.tech.includes(activeTech);
      if (!matchTech) return false;
      if (!q) return true;
      const haystack = `${p.title} ${p.desc} ${p.fullDesc ?? ''} ${p.tech.join(' ')}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [query, activeTech, data]);

  const maxIndex = Math.max(0, filtered.length - visible);
  // Clamp otomatis tanpa setState di effect (aman untuk lint + resize)
  const safeIndex = Math.min(index, maxIndex);
  const showNav = maxIndex > 0;

  const goTo = useCallback((i) => {
    setIndex(() => {
      if (i < 0) return maxIndex;
      if (i > maxIndex) return 0;
      return i;
    });
  }, [maxIndex]);

  const next = useCallback(() => goTo(safeIndex + 1), [goTo, safeIndex]);
  const prev = useCallback(() => goTo(safeIndex - 1), [goTo, safeIndex]);

  // Reset posisi slide setiap filter berubah (via handler, bukan effect)
  const handleQuery = (v) => {
    setQuery(v);
    setIndex(0);
  };

  const handleTech = (v) => {
    setActiveTech(v);
    setIndex(0);
  };

  const resetFilter = () => {
    setQuery('');
    setActiveTech(null);
    setIndex(0);
  };

  const isAll = activeTech === null;

  // Autoplay 7 detik, berhenti saat hover / modal terbuka
  useEffect(() => {
    if (paused || selectedProject || filtered.length <= visible) return;
    const id = setInterval(() => {
      setIndex((i) => (i >= maxIndex ? 0 : i + 1));
    }, 7000);
    return () => clearInterval(id);
  }, [paused, selectedProject, filtered.length, visible, maxIndex]);

  // Keyboard: panah (nonaktif saat modal terbuka)
  useEffect(() => {
    if (selectedProject) return;
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, selectedProject]);

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

  return (
    <section id="projects" className="py-20 sm:py-24 bg-ulbi-grey/20 scroll-mt-20 dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-ulbi-orange mb-3">{t('projects.eyebrow')}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-ulbi-blue mb-4 tracking-tight dark:text-white">{t('projects.title')}</h2>
            <p className="text-ulbi-blue/70 text-base sm:text-lg max-w-2xl mx-auto font-light dark:text-zinc-400">
              {t('projects.desc')}
            </p>
          </div>
        </Reveal>

        {/* Filter */}
        <div className="mb-10 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <label htmlFor="project-search" className="sr-only">{t('projects.searchLabel')}</label>
            <input
              id="project-search"
              type="search"
              value={query}
              onChange={(e) => handleQuery(e.target.value)}
              placeholder={t('projects.searchPh')}
              className="flex-1 px-4 py-2.5 rounded-xl border border-ulbi-silver bg-white text-ulbi-blue placeholder:text-ulbi-blue/40 focus:outline-2 focus:outline-offset-1 focus:outline-ulbi-orange dark:border-white/15 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500"
            />
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label={t('projects.filterLabel')}>
            {techs.map((tech) => {
              const value = tech === allLabel ? null : tech;
              const pressed = isAll ? tech === allLabel : activeTech === tech;
              return (
                <button
                  key={tech}
                  type="button"
                  onClick={() => handleTech(value)}
                  aria-pressed={pressed}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                    pressed
                      ? 'bg-ulbi-blue text-white border-ulbi-blue dark:bg-ulbi-orange dark:border-ulbi-orange'
                      : 'bg-white text-ulbi-blue/70 border-ulbi-silver hover:border-ulbi-orange hover:text-ulbi-orange dark:bg-zinc-900 dark:text-zinc-400 dark:border-white/15 dark:hover:border-ulbi-orange dark:hover:text-ulbi-orange'
                  }`}
                >
                  {tech}
                </button>
              );
            })}
          </div>
          <p role="status" className="text-sm text-ulbi-blue/60 dark:text-zinc-500">
            {t('projects.showing')} {filtered.length} {t('projects.of')} {data.projects.length} {t('projects.countNoun')}
            {(query || !isAll) && (
              <button type="button" onClick={resetFilter} className="ml-3 underline hover:text-ulbi-orange">
                {t('projects.reset')}
              </button>
            )}
          </p>
        </div>

        {filtered.length > 0 ? (
          <>
            {/* Slider + tombol pinggir (simetris kiri-kanan, seperti sertifikat) */}
            <div className="relative px-10 sm:px-14">
              {showNav && (
                <button
                  type="button"
                  onClick={prev}
                  aria-label={t('projects.prev')}
                  className="absolute z-10 left-0 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-12 sm:h-12 rounded-full border border-ulbi-silver bg-white/95 backdrop-blur text-ulbi-blue shadow-md hover:border-ulbi-orange hover:text-ulbi-orange hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-ulbi-orange transition-all flex items-center justify-center dark:border-white/15 dark:bg-zinc-900/95 dark:text-zinc-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              {showNav && (
                <button
                  type="button"
                  onClick={next}
                  aria-label={t('projects.next')}
                  className="absolute z-10 right-0 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-12 sm:h-12 rounded-full border border-ulbi-silver bg-white/95 backdrop-blur text-ulbi-blue shadow-md hover:border-ulbi-orange hover:text-ulbi-orange hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-ulbi-orange transition-all flex items-center justify-center dark:border-white/15 dark:bg-zinc-900/95 dark:text-zinc-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}

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
                  className="flex -mx-2 sm:-mx-3 items-stretch transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${safeIndex * (100 / visible)}%)` }}
                >
                  {filtered.map((project) => (
                    <div
                      key={project.slug ?? project.title}
                      className="shrink-0 px-2 sm:px-3 flex"
                      style={{ width: `${100 / visible}%` }}
                    >
                      <div className="w-full">
                        <ProjectCard
                          project={project}
                          onSelect={setSelectedProject}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Dots + counter */}
            {showNav && (
              <div className="mt-5 flex items-center justify-center gap-3">
                <div className="flex items-center gap-2">
                  {Array.from({ length: maxIndex + 1 }).map((_, d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => goTo(d)}
                      aria-label={`${t('projects.next')} ${d + 1}`}
                      className={`h-2 rounded-full transition-all ${d === safeIndex ? 'w-6 bg-ulbi-orange' : 'w-2 bg-ulbi-blue/20 hover:bg-ulbi-blue/40 dark:bg-white/20'}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-ulbi-blue/50 tabular-nums dark:text-zinc-500">
                  {safeIndex + 1} / {maxIndex + 1}
                </span>
              </div>
            )}
            <p className="mt-3 text-xs text-ulbi-blue/50 sm:hidden text-center dark:text-zinc-500">
              ← {t('projects.swipe')} →
            </p>
          </>
        ) : (
          <div className="p-10 rounded-2xl bg-white border border-ulbi-silver text-center dark:bg-zinc-900 dark:border-white/10">
            <p className="text-ulbi-blue font-semibold mb-2 dark:text-white">{t('projects.emptyTitle')}</p>
            <p className="text-ulbi-blue/60 text-sm mb-6 dark:text-zinc-400">{t('projects.emptyDesc')}</p>
            <button
              type="button"
              onClick={resetFilter}
              className="px-6 py-2.5 rounded-full bg-ulbi-blue text-white text-sm font-medium hover:bg-[#001b59] transition-colors"
            >
              {t('projects.showAll')}
            </button>
          </div>
        )}
      </div>

      {/* Render the modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;

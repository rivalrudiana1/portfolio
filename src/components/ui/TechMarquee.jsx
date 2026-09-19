import { useLanguage } from '../../context/LanguageContext';

// Strip tech berjalan tanpa henti (marquee). Berhenti saat hover, mati saat reduced-motion.
const TechMarquee = () => {
  const { skills } = useLanguage();
  const items = [...new Set(skills.flatMap((g) => g.skills))];

  const row = (hidden) => (
    <div className="flex shrink-0 items-center gap-3 pr-3" aria-hidden={hidden || undefined}>
      {items.map((tech) => (
        <span
          key={`${hidden ? 'b-' : ''}${tech}`}
          className="inline-flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full border border-ulbi-blue/15 bg-white/70 text-sm font-medium text-ulbi-blue/80 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:text-zinc-300"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-ulbi-orange" aria-hidden="true" />
          {tech}
        </span>
      ))}
    </div>
  );

  return (
    <div className="relative border-y border-ulbi-silver/60 bg-white/60 py-4 overflow-hidden dark:border-white/10 dark:bg-zinc-950/60">
      <div className="marquee-mask marquee-paused overflow-hidden">
        <div className="animate-marquee flex w-max">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </div>
  );
};

export default TechMarquee;

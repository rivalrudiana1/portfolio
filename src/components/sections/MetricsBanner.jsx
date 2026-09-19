import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useInView } from '../../hooks/useInView';

function formatNumber(value, decimals = 0, lang = 'id') {
  return value.toLocaleString(lang === 'en' ? 'en-US' : 'id-ID', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

const MetricItem = ({ metric, lang }) => {
  const { ref, inView } = useInView();
  // Jika reduced-motion, langsung nilai akhir — tanpa animasi & tanpa setState di effect
  const [display, setDisplay] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
      ? metric.display
      : '0'
  );

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const target = metric.value;
    const decimals = metric.decimals ?? 0;
    const duration = 1400;
    const start = performance.now();

    let raf;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      // ease-out
      const eased = 1 - Math.pow(1 - p, 3);
      const current = target * eased;
      setDisplay(formatNumber(current, decimals, lang));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDisplay(metric.display);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, metric, lang]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center pt-8 md:pt-0 px-4 first:pt-0">
      <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight tabular-nums">
        {display}
      </div>
      <div className="text-xs md:text-sm font-semibold text-ulbi-orange uppercase tracking-widest max-w-[220px]">
        {metric.label}
      </div>
    </div>
  );
};

const MetricsBanner = () => {
  const { data, lang, t } = useLanguage();

  return (
    <section aria-label={t('metrics.label')} className="py-12 border-y border-ulbi-blue/10 bg-ulbi-blue dark:border-white/10 dark:bg-[#0a1633] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-ulbi-orange" aria-hidden="true"></div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/20">
          {data.metrics.map((metric) => (
            <MetricItem key={metric.label} metric={metric} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsBanner;

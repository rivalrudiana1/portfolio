import { useState, useEffect } from 'react';
import { personalInfo } from '../../data/portfolioData';
import { useInView } from '../../hooks/useInView';

function formatID(value, decimals = 0) {
  return value.toLocaleString('id-ID', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

const MetricItem = ({ metric }) => {
  const { ref, inView } = useInView();
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) return;
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
      setDisplay(formatID(current, decimals));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDisplay(metric.display);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, metric]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center pt-8 md:pt-0 px-4 first:pt-0">
      <div className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight tabular-nums">
        {display}
      </div>
      <div className="text-xs md:text-sm font-semibold text-ulbi-orange uppercase tracking-widest max-w-[200px]">
        {metric.label}
      </div>
    </div>
  );
};

const MetricsBanner = () => {
  return (
    <section aria-label="Pencapaian utama" className="py-12 border-y border-ulbi-blue/10 bg-ulbi-blue">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/20">
          {personalInfo.metrics.map((metric, index) => (
            <MetricItem key={index} metric={metric} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsBanner;

import { personalInfo } from '../../data/portfolioData';

const MetricsBanner = () => {
  return (
    <section className="py-12 border-y border-ulbi-blue/10 bg-ulbi-blue">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/20">
          {personalInfo.metrics.map((metric, index) => (
            <div key={index} className="flex flex-col items-center text-center pt-8 md:pt-0 px-4 first:pt-0">
              <div className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
                {metric.value}
              </div>
              <div className="text-xs md:text-sm font-semibold text-ulbi-orange uppercase tracking-widest max-w-[200px]">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsBanner;

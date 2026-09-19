import { useLanguage } from '../../context/LanguageContext';
import Reveal from '../ui/Reveal';

const Experience = () => {
  const { data, t } = useLanguage();

  return (
    <section id="experience" className="py-20 sm:py-24 bg-ulbi-grey/50 border-y border-ulbi-silver/50 scroll-mt-20 dark:bg-zinc-900/40 dark:border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="mb-12 sm:mb-16 text-center md:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-ulbi-orange mb-3">{t('exp.eyebrow')}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-ulbi-blue mb-4 tracking-tight dark:text-white">{t('exp.title')}</h2>
            <p className="text-ulbi-blue/70 text-base sm:text-lg font-light dark:text-zinc-400">{t('exp.desc')}</p>
          </div>
        </Reveal>

        <div className="space-y-10 sm:space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[1px] before:bg-gradient-to-b before:from-transparent before:via-ulbi-silver before:to-transparent dark:before:via-white/15">
          {data.experience.map((exp, index) => (
            <Reveal key={index} delay={Math.min(index * 80, 240)}>
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                {/* Timeline marker */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-white bg-ulbi-grey text-ulbi-blue shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:bg-ulbi-orange/10 group-hover:border-ulbi-orange transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-300" aria-hidden="true">
                  <div className="w-2.5 h-2.5 bg-ulbi-blue/50 rounded-full group-hover:bg-ulbi-orange transition-colors dark:bg-zinc-500"></div>
                </div>

                {/* Content box */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 sm:p-6 md:p-8 rounded-2xl bg-white border border-ulbi-silver hover:border-ulbi-orange shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 dark:bg-zinc-900 dark:border-white/10 dark:hover:border-ulbi-orange">
                  <div className="flex flex-col mb-3">
                    <span className="text-xs font-semibold text-ulbi-orange mb-2 uppercase tracking-wider">{exp.period}</span>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-ulbi-blue mb-1 dark:text-white">{exp.role}</h3>
                    <h4 className="text-sm sm:text-base font-medium text-ulbi-blue/80 dark:text-zinc-300">{exp.company}</h4>
                  </div>
                  <p className="text-ulbi-blue/60 text-sm md:text-base leading-relaxed dark:text-zinc-400">{exp.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

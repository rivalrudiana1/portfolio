import { useLanguage } from '../../context/LanguageContext';
import Reveal from '../ui/Reveal';

const Education = () => {
  const { data, t } = useLanguage();

  return (
    <section id="education" className="py-20 sm:py-24 bg-white border-y border-ulbi-silver/50 scroll-mt-20 dark:bg-zinc-950 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="mb-10 sm:mb-12 text-center md:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-ulbi-orange mb-3">{t('edu.eyebrow')}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-ulbi-blue mb-4 tracking-tight dark:text-white">{t('edu.title')}</h2>
            <p className="text-ulbi-blue/70 text-base sm:text-lg font-light max-w-2xl dark:text-zinc-400">
              {t('edu.desc')}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Education */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-ulbi-orange mb-6">{t('edu.school')}</h3>
            <div className="space-y-5">
              {data.education.map((edu, i) => (
                <Reveal key={i} delay={Math.min(i * 80, 160)}>
                  <article className="p-5 sm:p-6 rounded-2xl bg-ulbi-grey/30 border border-ulbi-silver hover:border-ulbi-orange hover:-translate-y-0.5 hover:shadow-md transition-all dark:bg-zinc-900/60 dark:border-white/10 dark:hover:border-ulbi-orange">
                    <p className="text-xs font-semibold text-ulbi-orange uppercase tracking-wider mb-2">{edu.period}</p>
                    <h4 className="text-base sm:text-lg font-bold text-ulbi-blue dark:text-white">{edu.school}</h4>
                    <p className="text-sm font-medium text-ulbi-blue/80 mt-1 dark:text-zinc-300">{edu.degree}</p>
                    <p className="text-sm text-ulbi-blue/60 mt-3 leading-relaxed dark:text-zinc-400">{edu.desc}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Organization */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-ulbi-orange mb-6">{t('edu.org')}</h3>
            <div className="space-y-5">
              {data.organization.map((org, i) => (
                <Reveal key={i} delay={Math.min(i * 80, 160)}>
                  <article className="p-5 sm:p-6 rounded-2xl bg-white border border-ulbi-silver hover:border-ulbi-orange hover:shadow-md hover:-translate-y-0.5 transition-all dark:bg-zinc-900 dark:border-white/10 dark:hover:border-ulbi-orange">
                    <p className="text-xs font-semibold text-ulbi-orange uppercase tracking-wider mb-2">{org.period}</p>
                    <h4 className="text-base sm:text-lg font-bold text-ulbi-blue dark:text-white">{org.role}</h4>
                    <p className="text-sm font-medium text-ulbi-blue/80 mt-1 dark:text-zinc-300">{org.company}</p>
                    <p className="text-sm text-ulbi-blue/60 mt-3 leading-relaxed dark:text-zinc-400">{org.desc}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;

import Badge from '../ui/Badge';
import Reveal from '../ui/Reveal';
import { useLanguage } from '../../context/LanguageContext';

const Skills = () => {
  const { skills, t } = useLanguage();

  return (
    <section id="skills" className="py-20 sm:py-24 bg-white border-y border-ulbi-silver/50 scroll-mt-20 dark:bg-zinc-950 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="mb-12 sm:mb-16 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-ulbi-orange mb-3">{t('skills.eyebrow')}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-ulbi-blue mb-4 tracking-tight dark:text-white">{t('skills.title')}</h2>
            <p className="text-ulbi-blue/70 text-base sm:text-lg max-w-2xl mx-auto font-light dark:text-zinc-400">
              {t('skills.desc')}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
          {skills.map((group, index) => (
            <Reveal key={index} delay={Math.min(index * 80, 240)}>
              <div className="h-full bg-ulbi-grey/30 p-6 rounded-2xl border border-ulbi-silver hover:border-ulbi-orange hover:-translate-y-1 hover:shadow-lg transition-all duration-300 shadow-sm dark:bg-zinc-900/60 dark:border-white/10 dark:hover:border-ulbi-orange">
                <h3 className="text-lg sm:text-xl font-semibold text-ulbi-blue mb-6 flex items-center gap-2 dark:text-white">
                  <span className="w-8 h-0.5 bg-ulbi-orange/60 rounded-full shrink-0" aria-hidden="true"></span>
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, idx) => (
                    <Badge key={idx} variant="default">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

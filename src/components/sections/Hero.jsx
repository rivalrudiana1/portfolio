import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTypewriter } from '../../hooks/useTypewriter';
import Reveal from '../ui/Reveal';
import GlowButton from '../ui/GlowButton';

const DownloadIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

const ArrowIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const Hero = () => {
  const [imgError, setImgError] = useState(false);
  const { data, t } = useLanguage();
  const { text: typedRole } = useTypewriter(t('hero.roles'));

  return (
    <section id="home" className="pt-32 pb-16 sm:pb-20 md:pt-44 md:pb-24 flex flex-col items-center justify-center relative overflow-hidden bg-white/70 backdrop-blur-[2px] dark:bg-zinc-950/70 scroll-mt-20">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <Reveal>
          {/* Floating status badge */}
          <div className="animate-float inline-flex mb-7">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-ulbi-blue to-ulbi-orange rounded-full blur opacity-30 group-hover:opacity-60 transition duration-700" aria-hidden="true" />
              <div className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-xl border border-ulbi-blue/15 dark:bg-zinc-900/80 dark:border-white/10">
                <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ulbi-orange opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-ulbi-orange" />
                </span>
                <span className="text-xs font-semibold tracking-wider text-ulbi-blue uppercase dark:text-zinc-200">
                  {t('hero.openToWork')}
                </span>
              </div>
            </div>
          </div>

          {(!imgError && data.photo) ? (
            <img
              src={data.photo}
              alt={`${t('hero.photoAlt')} ${data.name}`}
              width={128}
              height={128}
              onError={() => setImgError(true)}
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full object-cover mx-auto mb-6 border-4 border-white shadow-xl ring-2 ring-ulbi-orange/30 dark:border-zinc-800"
              loading="eager"
            />
          ) : (
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full mx-auto mb-6 bg-ulbi-blue text-white flex items-center justify-center text-3xl sm:text-4xl font-extrabold shadow-xl ring-2 ring-ulbi-orange/30" aria-hidden="true">
              RR<span className="text-ulbi-orange">.</span>
            </div>
          )}
          <p className="text-sm text-ulbi-blue/60 mb-4 font-medium dark:text-zinc-400">{data.location}</p>
          {/* Role label */}
          <div className="inline-flex max-w-full items-center justify-center px-4 py-1.5 mb-6 rounded-full border border-ulbi-blue/20 bg-ulbi-blue/5 backdrop-blur-sm dark:border-white/15 dark:bg-white/5">
            <span className="text-[11px] sm:text-xs font-semibold tracking-widest text-ulbi-orange uppercase text-center">
              {data.role}
            </span>
          </div>
        </Reveal>

        {/* Main Name */}
        <Reveal delay={100}>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-4 drop-shadow-sm break-words bg-gradient-to-br from-ulbi-blue via-ulbi-blue to-ulbi-orange bg-clip-text text-transparent dark:from-white dark:via-white dark:to-ulbi-orange">
            {data.name}
          </h1>
        </Reveal>

        {/* Typewriter roles */}
        <Reveal delay={160}>
          <p className="min-h-[2rem] sm:min-h-[2.25rem] text-lg sm:text-xl md:text-2xl font-semibold text-ulbi-blue dark:text-zinc-100" aria-live="polite">
            <span className="bg-gradient-to-r from-ulbi-orange to-[#c94520] bg-clip-text text-transparent">{typedRole}</span>
            <span className="caret-blink text-ulbi-orange" aria-hidden="true">|</span>
          </p>
        </Reveal>

        {/* Summary */}
        <Reveal delay={200}>
          <p className="text-base sm:text-lg md:text-xl text-ulbi-blue/70 max-w-3xl mx-auto font-light mt-4 mb-10 sm:mb-12 leading-relaxed dark:text-zinc-400">
            {data.summary}
          </p>
        </Reveal>

        {/* Action Buttons */}
        <Reveal delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <GlowButton
              href="/cv-rival-rudiana.pdf"
              variant="primary"
              icon={DownloadIcon}
              download
            >
              {t('hero.downloadCv')}
            </GlowButton>
            <GlowButton href="#contact" variant="outline" icon={ArrowIcon}>
              {t('hero.contact')}
            </GlowButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Hero;

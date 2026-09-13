import { personalInfo } from '../../data/portfolioData';
import Reveal from '../ui/Reveal';

const Certifications = () => {
  return (
    <section id="certifications" className="py-24 bg-ulbi-grey/20 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-ulbi-blue mb-4 tracking-tight">Sertifikasi</h2>
            <p className="text-ulbi-blue/70 text-lg font-light max-w-2xl">
              Kredensial profesional yang mendukung keahlian teknis saya.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {personalInfo.certifications.map((cert, i) => (
            <Reveal key={i} delay={Math.min(i * 100, 200)}>
              <article className="h-full p-6 rounded-2xl bg-white border border-ulbi-silver hover:border-ulbi-orange hover:shadow-md transition-all">
                <div className="w-11 h-11 rounded-xl bg-ulbi-orange/10 text-ulbi-orange flex items-center justify-center mb-5" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-ulbi-blue mb-1">{cert.title}</h3>
                <p className="text-sm text-ulbi-blue/70">{cert.issuer}</p>
                <p className="mt-3 inline-block text-xs font-semibold uppercase tracking-widest text-ulbi-orange bg-ulbi-orange/10 px-3 py-1 rounded-full">
                  {cert.year}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Languages */}
        <Reveal delay={100}>
          <div className="mt-10 p-6 rounded-2xl bg-white border border-ulbi-silver flex flex-col sm:flex-row sm:items-center gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-ulbi-orange shrink-0">Bahasa</h3>
            <div className="flex flex-wrap gap-2">
              {personalInfo.languages.map((lang) => (
                <span key={lang.name} className="inline-flex items-center gap-2 rounded-full border border-ulbi-blue/20 bg-ulbi-blue/5 px-4 py-1.5 text-sm font-medium text-ulbi-blue">
                  {lang.name}
                  <span className="text-ulbi-blue/50 font-normal">• {lang.level}</span>
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

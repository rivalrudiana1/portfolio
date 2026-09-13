import { personalInfo } from '../../data/portfolioData';

const Education = () => {
  return (
    <section id="education" className="py-24 bg-white border-y border-ulbi-silver/50 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-ulbi-blue mb-4 tracking-tight">Education & Organisasi</h2>
          <p className="text-ulbi-blue/70 text-lg font-light max-w-2xl">
            Latar pendidikan formal dan pengalaman kepemimpinan yang membentuk cara saya bekerja.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Education */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-ulbi-orange mb-6">Pendidikan</h3>
            <div className="space-y-5">
              {personalInfo.education.map((edu, i) => (
                <article key={i} className="p-6 rounded-2xl bg-ulbi-grey/30 border border-ulbi-silver hover:border-ulbi-orange transition-colors">
                  <p className="text-xs font-semibold text-ulbi-orange uppercase tracking-wider mb-2">{edu.period}</p>
                  <h4 className="text-lg font-bold text-ulbi-blue">{edu.school}</h4>
                  <p className="text-sm font-medium text-ulbi-blue/80 mt-1">{edu.degree}</p>
                  <p className="text-sm text-ulbi-blue/60 mt-3 leading-relaxed">{edu.desc}</p>
                </article>
              ))}
            </div>
          </div>

          {/* Organization */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-ulbi-orange mb-6">Organisasi</h3>
            <div className="space-y-5">
              {personalInfo.organization.map((org, i) => (
                <article key={i} className="p-6 rounded-2xl bg-white border border-ulbi-silver hover:border-ulbi-orange hover:shadow-md transition-all">
                  <p className="text-xs font-semibold text-ulbi-orange uppercase tracking-wider mb-2">{org.period}</p>
                  <h4 className="text-lg font-bold text-ulbi-blue">{org.role}</h4>
                  <p className="text-sm font-medium text-ulbi-blue/80 mt-1">{org.company}</p>
                  <p className="text-sm text-ulbi-blue/60 mt-3 leading-relaxed">{org.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;

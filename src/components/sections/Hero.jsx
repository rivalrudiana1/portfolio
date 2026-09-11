import { personalInfo } from '../../data/portfolioData';

const Hero = () => {
  return (
    <section id="home" className="pt-36 pb-20 md:pt-48 md:pb-24 flex flex-col items-center justify-center relative overflow-hidden bg-white">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[400px] md:h-[600px] bg-ulbi-orange/10 rounded-full blur-[100px] md:blur-[150px] pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Role label */}
        <div className="inline-flex items-center justify-center px-4 py-1.5 mb-8 rounded-full border border-ulbi-blue/20 bg-ulbi-blue/5 backdrop-blur-sm">
          <span className="text-xs font-semibold tracking-widest text-ulbi-orange uppercase">
            {personalInfo.role}
          </span>
        </div>

        {/* Main Name */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-ulbi-blue mb-6 drop-shadow-sm">
          {personalInfo.name}
        </h1>

        {/* Summary */}
        <p className="text-lg md:text-xl text-ulbi-blue/70 max-w-3xl mx-auto font-light mb-12 leading-relaxed">
          {personalInfo.summary}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/cv-rival-rudiana.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-ulbi-orange text-white font-semibold hover:bg-[#c94520] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-ulbi-orange/20"
          >
            Unduh CV
          </a>
          <a
            href={`mailto:${personalInfo.contact.email}?subject=Opportunity%20Discussion`}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-transparent border-2 border-ulbi-blue text-ulbi-blue font-medium hover:bg-ulbi-blue hover:text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            Kontak Saya
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;

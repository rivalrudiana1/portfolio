import { personalInfo } from '../../data/portfolioData';

const Contact = () => {
  return (
    <section id="contact" className="py-32 relative overflow-hidden bg-white">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-ulbi-orange/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-ulbi-blue mb-6 tracking-tight">Mari Berkolaborasi!</h2>
        <p className="text-lg text-ulbi-blue/70 mb-10 leading-relaxed font-light">
          Tertarik untuk bekerja sama, diskusi tentang arsitektur data, atau sekadar menyapa? 
          Saya selalu terbuka untuk peluang baru dan diskusi teknikal.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a 
            href={`mailto:${personalInfo.contact.email}`} 
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-ulbi-orange text-white font-semibold hover:bg-[#c94520] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-ulbi-orange/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            Kirim Email
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;

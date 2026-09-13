import { personalInfo } from '../../data/portfolioData';

const Footer = () => {
  return (
    <footer className="bg-ulbi-blue py-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <a href="#home" className="text-xl font-extrabold tracking-tighter text-white hover:text-ulbi-orange transition-colors">
              RIVAL<span className="text-ulbi-orange">.</span>
            </a>
            <p className="text-white/50 text-sm mt-2">
              {personalInfo.role} — {personalInfo.location}
            </p>
          </div>

          <nav aria-label="Navigasi footer" className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <a href="#skills" className="text-white/60 hover:text-ulbi-orange transition-colors">Skills</a>
            <a href="#projects" className="text-white/60 hover:text-ulbi-orange transition-colors">Projects</a>
            <a href="#experience" className="text-white/60 hover:text-ulbi-orange transition-colors">Experience</a>
            <a href="#education" className="text-white/60 hover:text-ulbi-orange transition-colors">Education</a>
            <a href="#certifications" className="text-white/60 hover:text-ulbi-orange transition-colors">Sertifikasi</a>
            <a href="#contact" className="text-white/60 hover:text-ulbi-orange transition-colors">Contact</a>
          </nav>

          <div className="flex gap-5 text-sm">
            <a href={personalInfo.contact.github} target="_blank" rel="noreferrer" className="text-white/60 hover:text-ulbi-orange transition-colors">GitHub</a>
            <a href={personalInfo.contact.linkedin} target="_blank" rel="noreferrer" className="text-white/60 hover:text-ulbi-orange transition-colors">LinkedIn</a>
            <a href={`mailto:${personalInfo.contact.email}`} className="text-white/60 hover:text-ulbi-orange transition-colors">Email</a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-center md:text-left">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

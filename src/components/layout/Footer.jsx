import { personalInfo } from '../../data/portfolioData';

const Footer = () => {
  return (
    <footer className="border-t border-ulbi-blue/20 bg-ulbi-blue py-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <div className="text-white/60 text-sm">
          © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </div>
        <div className="flex gap-6">
          <a href={personalInfo.contact.github} target="_blank" rel="noreferrer" className="text-white/60 hover:text-ulbi-orange transition-colors text-sm">GitHub</a>
          <a href={personalInfo.contact.linkedin} target="_blank" rel="noreferrer" className="text-white/60 hover:text-ulbi-orange transition-colors text-sm">LinkedIn</a>
          <a href={`mailto:${personalInfo.contact.email}`} className="text-white/60 hover:text-ulbi-orange transition-colors text-sm">Email</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

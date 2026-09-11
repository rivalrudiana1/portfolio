import { useState, useEffect } from 'react';
import { personalInfo } from '../../data/portfolioData';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-white/90 backdrop-blur-md border-ulbi-silver shadow-sm' : 'bg-transparent border-transparent py-6'}`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="text-xl font-extrabold tracking-tighter text-ulbi-blue hover:text-ulbi-orange transition-colors">
          RIVAL<span className="text-ulbi-orange">.</span>
        </a>
        
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={link.href} 
                className="text-sm font-medium text-ulbi-blue/70 hover:text-ulbi-orange transition-colors"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
        
        <a 
          href="#contact" 
          className="inline-flex items-center justify-center px-5 py-2 text-sm font-medium rounded-full bg-ulbi-orange text-white hover:bg-[#c94520] transition-colors shadow-sm"
        >
          Hubungi Saya
        </a>
      </div>
    </nav>
  );
};

export default Navbar;

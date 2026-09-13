import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import MetricsBanner from './components/sections/MetricsBanner';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';
import Certifications from './components/sections/Certifications';
import Contact from './components/sections/Contact';
import BackToTop from './components/ui/BackToTop';

function App() {
  return (
    <div className="min-h-screen bg-ulbi-grey text-ulbi-blue font-sans selection:bg-ulbi-orange selection:text-white">
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[70] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-ulbi-blue focus:text-white"
      >
        Lewati ke konten
      </a>
      <Navbar />
      <main>
        <Hero />
        <MetricsBanner />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;

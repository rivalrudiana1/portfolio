import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import MetricsBanner from './components/sections/MetricsBanner';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Contact from './components/sections/Contact';

function App() {
  return (
    <div className="min-h-screen bg-ulbi-grey text-ulbi-blue font-sans selection:bg-ulbi-orange selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <MetricsBanner />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;

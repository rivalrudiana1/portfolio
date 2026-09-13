import { useMemo, useState } from 'react';
import { personalInfo } from '../../data/portfolioData';
import ProjectCard from '../ui/ProjectCard';
import ProjectModal from '../ui/ProjectModal';
import Reveal from '../ui/Reveal';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [query, setQuery] = useState('');
  const [activeTech, setActiveTech] = useState('Semua');

  const techs = useMemo(() => {
    const set = new Set();
    personalInfo.projects.forEach((p) => p.tech.forEach((t) => set.add(t)));
    return ['Semua', ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return personalInfo.projects.filter((p) => {
      const matchTech = activeTech === 'Semua' || p.tech.includes(activeTech);
      if (!matchTech) return false;
      if (!q) return true;
      const haystack = `${p.title} ${p.desc} ${p.fullDesc ?? ''} ${p.tech.join(' ')}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [query, activeTech]);

  const resetFilter = () => {
    setQuery('');
    setActiveTech('Semua');
  };

  return (
    <section id="projects" className="py-24 bg-ulbi-grey/20 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-ulbi-blue mb-4 tracking-tight">Featured Projects</h2>
            <p className="text-ulbi-blue/70 text-lg max-w-2xl font-light">
              Solusi inovatif yang berfokus pada arsitektur data, performa tinggi, dan skalabilitas skala produksi. Klik kartu untuk detail.
            </p>
          </div>
        </Reveal>

        {/* Filter */}
        <div className="mb-10 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <label htmlFor="project-search" className="sr-only">Cari project</label>
            <input
              id="project-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari project, mis. voting, WMA, ESP32..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-ulbi-silver bg-white text-ulbi-blue placeholder:text-ulbi-blue/40 focus:outline-2 focus:outline-offset-1 focus:outline-ulbi-orange"
            />
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter berdasarkan teknologi">
            {techs.map((tech) => (
              <button
                key={tech}
                type="button"
                onClick={() => setActiveTech(tech)}
                aria-pressed={activeTech === tech}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  activeTech === tech
                    ? 'bg-ulbi-blue text-white border-ulbi-blue'
                    : 'bg-white text-ulbi-blue/70 border-ulbi-silver hover:border-ulbi-orange hover:text-ulbi-orange'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
          <p role="status" className="text-sm text-ulbi-blue/60">
            Menampilkan {filtered.length} dari {personalInfo.projects.length} project
            {(query || activeTech !== 'Semua') && (
              <button type="button" onClick={resetFilter} className="ml-3 underline hover:text-ulbi-orange">
                Reset filter
              </button>
            )}
          </p>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
            {filtered.map((project) => (
              <Reveal key={project.title} delay={0}>
                <ProjectCard
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="p-10 rounded-2xl bg-white border border-ulbi-silver text-center">
            <p className="text-ulbi-blue font-semibold mb-2">Tidak ada project yang cocok.</p>
            <p className="text-ulbi-blue/60 text-sm mb-6">Coba kata kunci atau teknologi lain.</p>
            <button
              type="button"
              onClick={resetFilter}
              className="px-6 py-2.5 rounded-full bg-ulbi-blue text-white text-sm font-medium hover:bg-[#001b59] transition-colors"
            >
              Tampilkan semua
            </button>
          </div>
        )}
      </div>

      {/* Render the modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default Projects;

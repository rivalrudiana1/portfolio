import { useState } from 'react';
import { personalInfo } from '../../data/portfolioData';
import ProjectCard from '../ui/ProjectCard';
import ProjectModal from '../ui/ProjectModal';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="py-24 bg-ulbi-grey/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-ulbi-blue mb-4 tracking-tight">Featured Projects</h2>
          <p className="text-ulbi-blue/70 text-lg max-w-2xl font-light">
            Solusi inovatif yang berfokus pada arsitektur data, performa tinggi, dan skalabilitas skala produksi.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
          {personalInfo.projects.map((project, index) => (
            <ProjectCard 
              key={index} 
              project={project} 
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
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

import Badge from './Badge';

const ProjectCard = ({ project, onClick }) => {
  return (
    <div 
      className="group flex flex-col justify-between p-6 md:p-8 rounded-2xl bg-white border border-ulbi-silver hover:border-ulbi-orange hover:shadow-xl transition-all duration-300 relative overflow-hidden cursor-pointer h-full"
      onClick={onClick}
    >
      {/* Subtle hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-ulbi-orange/0 via-ulbi-orange/0 to-ulbi-orange/0 group-hover:from-ulbi-orange/5 group-hover:to-transparent transition-all duration-500 pointer-events-none"></div>
      
      <div className="relative z-10">
        <h3 className="text-xl md:text-2xl font-bold text-ulbi-blue mb-3 group-hover:text-ulbi-orange transition-colors">
          {project.title}
        </h3>
        <p className="text-ulbi-blue/70 text-sm md:text-base leading-relaxed mb-6 font-light">
          {project.desc}
        </p>
      </div>
      
      <div className="flex flex-col gap-4 relative z-10 mt-auto">
        <div className="flex flex-wrap gap-2">
          {project.tech.map((techItem, index) => (
            <Badge key={index} variant="outline">
              {techItem}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center gap-3 pt-5 border-t border-ulbi-silver/60 mt-2">
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded-md text-ulbi-blue/60 hover:text-white hover:bg-ulbi-blue transition-colors"
              title="View Source Code"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"></path>
              </svg>
            </a>
          )}
          {project.liveUrl && project.liveUrl !== '#' && (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded-md text-ulbi-blue/60 hover:text-ulbi-orange hover:bg-ulbi-orange/10 transition-colors"
              title="Live Demo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
            </a>
          )}
          
          <span className="ml-auto text-sm text-ulbi-orange font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            Detail 
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

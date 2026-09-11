import React, { useEffect } from 'react';
import Badge from './Badge';

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-ulbi-blue/80 backdrop-blur-md transition-opacity cursor-pointer"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white border border-ulbi-silver rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-ulbi-grey/80 border border-ulbi-silver text-ulbi-blue/60 hover:text-ulbi-blue hover:bg-ulbi-silver transition-colors z-10"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 sm:p-8 md:p-10">
          <div className="mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-ulbi-blue mb-4 pr-10">{project.title}</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((techItem, index) => (
                <Badge key={index} variant="outline">
                  {techItem}
                </Badge>
              ))}
            </div>
            <p className="text-lg text-ulbi-blue/80 leading-relaxed font-light">
              {project.fullDesc || project.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 mb-8 border-t border-ulbi-silver/60 pt-8">
            <div className="space-y-8">
              {project.challenge && (
                <div>
                  <h3 className="text-lg font-semibold text-ulbi-blue mb-3 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-ulbi-orange" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Tantangan Utama
                  </h3>
                  <p className="text-ulbi-blue/70 leading-relaxed font-light">{project.challenge}</p>
                </div>
              )}
              
              {project.solution && (
                <div>
                  <h3 className="text-lg font-semibold text-ulbi-blue mb-3 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#001b59]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M11.3 1.046A120.1 120.1 0 0112.084 10a119.9 119.9 0 01-3.394 5.053 2 2 0 01-3.38 0A119.9 119.9 0 012 10a119.9 119.9 0 013.31-4.954 2 2 0 013.38 0 120.1 120.1 0 012.61 4.053V1.046a2 2 0 014 0zM10 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    Solusi Teknis
                  </h3>
                  <p className="text-ulbi-blue/70 leading-relaxed font-light">{project.solution}</p>
                </div>
              )}
            </div>
            
            <div className="flex flex-col">
              {project.impact && (
                <div className="bg-ulbi-blue/5 border border-ulbi-blue/20 rounded-xl p-6 mb-8">
                  <h3 className="text-lg font-semibold text-ulbi-blue mb-3 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                    </svg>
                    Dampak Bisnis
                  </h3>
                  <p className="text-ulbi-blue/80 leading-relaxed font-light">{project.impact}</p>
                </div>
              )}

              {/* Links */}
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-ulbi-blue hover:bg-[#001b59] text-white font-medium transition-colors shadow-md w-full sm:w-auto"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"></path>
                    </svg>
                    Source Code
                  </a>
                )}
                {project.liveUrl && project.liveUrl !== '#' && (
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-ulbi-orange hover:bg-[#c94520] text-white font-medium transition-colors shadow-lg shadow-ulbi-orange/20 w-full sm:w-auto"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;

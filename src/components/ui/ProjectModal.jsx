import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Badge from './Badge';
import { useLanguage } from '../../context/LanguageContext';
import { getRepos } from '../../data/projectUtils';

const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const ProjectModal = ({ project, onClose }) => {
  const closeRef = useRef(null);
  const dialogRef = useRef(null);
  const prevFocusRef = useRef(null);
  const { t } = useLanguage();
  const repos = getRepos(project);

  useEffect(() => {
    prevFocusRef.current = document.activeElement;
    const dialog = dialogRef.current;

    const handleKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      // Focus trap sederhana: loop Tab di dalam dialog
      if (e.key === 'Tab' && dialog) {
        const nodes = Array.from(dialog.querySelectorAll(FOCUSABLE)).filter(
          (el) => !el.hasAttribute('disabled') && el.offsetParent !== null
        );
        if (nodes.length === 0) {
          e.preventDefault();
          return;
        }
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKey, true);
    document.body.style.overflow = 'hidden';
    // Focus close button for keyboard users
    closeRef.current?.focus();

    return () => {
      window.removeEventListener('keydown', handleKey, true);
      document.body.style.overflow = '';
      prevFocusRef.current?.focus?.();
    };
  }, [onClose]);

  if (!project) return null;

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-ulbi-blue/80 backdrop-blur-md cursor-pointer dark:bg-black/80"
        onClick={onClose}
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      />

      {/* Modal Content */}
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="relative bg-white border border-ulbi-silver rounded-2xl w-full max-w-4xl max-h-[92dvh] overflow-y-auto shadow-2xl dark:bg-zinc-900 dark:border-white/10"
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
      >
        {project.image && (
          <img
            src={project.image}
            alt={`Cover ${project.title}`}
            className="w-full aspect-video object-cover"
            loading="lazy"
          />
        )}
        <button
          ref={closeRef}
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-ulbi-grey/80 border border-ulbi-silver text-ulbi-blue/60 hover:text-ulbi-blue hover:bg-ulbi-silver transition-colors z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ulbi-orange dark:bg-zinc-800/90 dark:border-white/15 dark:text-zinc-300 dark:hover:text-white"
          aria-label={t('modal.close')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-5 sm:p-8 md:p-10">
          <div className="mb-6">
            <h2 id="project-modal-title" className="text-2xl sm:text-3xl md:text-4xl font-bold text-ulbi-blue mb-4 pr-10 dark:text-white">{project.title}</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((techItem) => (
                <Badge key={techItem} variant="outline">
                  {techItem}
                </Badge>
              ))}
            </div>
            <p className="text-base sm:text-lg text-ulbi-blue/80 leading-relaxed font-light dark:text-zinc-300">
              {project.fullDesc || project.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 mb-8 border-t border-ulbi-silver/60 pt-8 dark:border-white/10">
            <div className="space-y-8">
              {project.challenge && (
                <div>
                  <h3 className="text-lg font-semibold text-ulbi-blue mb-3 flex items-center gap-2 dark:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-ulbi-orange shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {t('modal.challenge')}
                  </h3>
                  <p className="text-ulbi-blue/70 leading-relaxed font-light dark:text-zinc-400">{project.challenge}</p>
                </div>
              )}

              {project.solution && (
                <div>
                  <h3 className="text-lg font-semibold text-ulbi-blue mb-3 flex items-center gap-2 dark:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#001b59] shrink-0 dark:text-ulbi-orange" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M11.3 1.046A120.1 120.1 0 0112.084 10a119.9 119.9 0 01-3.394 5.053 2 2 0 01-3.38 0A119.9 119.9 0 012 10a119.9 119.9 0 013.31-4.954 2 2 0 013.38 0 120.1 120.1 0 012.61 4.053V1.046a2 2 0 014 0zM10 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    {t('modal.solution')}
                  </h3>
                  <p className="text-ulbi-blue/70 leading-relaxed font-light dark:text-zinc-400">{project.solution}</p>
                </div>
              )}
            </div>

            <div className="flex flex-col">
              {project.impact && (
                <div className="bg-ulbi-blue/5 border border-ulbi-blue/20 rounded-xl p-5 sm:p-6 mb-8 dark:bg-white/5 dark:border-white/10">
                  <h3 className="text-lg font-semibold text-ulbi-blue mb-3 flex items-center gap-2 dark:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                    </svg>
                    {t('modal.impact')}
                  </h3>
                  <p className="text-ulbi-blue/80 leading-relaxed font-light dark:text-zinc-300">{project.impact}</p>
                </div>
              )}

              {/* Links */}
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                {repos.map((repo) => (
                  <a
                    key={`${repo.label}-${repo.url}`}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-ulbi-blue hover:bg-[#001b59] text-white font-medium transition-colors shadow-md w-full sm:w-auto dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"></path>
                    </svg>
                    {repo.label}
                  </a>
                ))}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-ulbi-orange hover:bg-[#c94520] text-white font-medium transition-colors shadow-lg shadow-ulbi-orange/20 w-full sm:w-auto"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                    {t('modal.live')}
                  </a>
                )}
                {project.slug && (
                  <Link
                    to={`/projects/${project.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg border-2 border-ulbi-blue text-ulbi-blue font-medium hover:bg-ulbi-blue hover:text-white transition-colors w-full sm:w-auto dark:border-white/30 dark:text-white dark:hover:bg-white dark:hover:text-zinc-950"
                  >
                    {t('card.caseStudy')} →
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
};

export default ProjectModal;

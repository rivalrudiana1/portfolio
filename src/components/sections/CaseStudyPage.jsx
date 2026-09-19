import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { getRepos } from '../../data/projectUtils';
import { getCaseDetail } from '../../data/caseStudies';
import Badge from '../ui/Badge';
import ArchitectureDiagram from '../ui/ArchitectureDiagram';
import Reveal from '../ui/Reveal';

function useTocActive(ids) {
  const [active, setActive] = useState(ids[0] ?? '');
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids.join('|')]); // eslint-disable-line react-hooks/exhaustive-deps
  return active;
}

const CaseStudyPage = () => {
  const { slug } = useParams();
  const { data, lang, t } = useLanguage();

  const index = useMemo(
    () => data.projects.findIndex((p) => p.slug === slug),
    [data, slug]
  );
  const project = index >= 0 ? data.projects[index] : null;
  const detail = getCaseDetail(slug);
  const repos = getRepos(project);

  const sections = useMemo(
    () => [
      { id: 'overview', label: t('case.overview') },
      { id: 'architecture', label: t('case.architecture') },
      { id: 'implementation', label: t('case.implementation') },
      { id: 'challenge', label: t('case.challenge') },
      { id: 'impact', label: t('case.impact') },
      { id: 'learnings', label: t('case.learnings') },
    ],
    [t]
  );
  const active = useTocActive(sections.map((s) => s.id));

  // SEO per halaman + scroll ke atas saat slug/lang ganti
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    if (project) {
      document.title = `${project.title} — ${t('case.meta')} | Rival Rudiana Putra`;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', `${project.title}: ${project.desc}`);
    }
    return () => {
      document.title = 'Rival Rudiana Putra — Full-Stack Developer & Data Architecture';
    };
  }, [slug, lang]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!project) {
    return (
      <main className="pt-32 pb-24 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-ulbi-orange mb-3">{t('case.meta')}</p>
        <h1 className="text-3xl font-bold text-ulbi-blue mb-4 dark:text-white">{t('case.notFound')}</h1>
        <p className="text-ulbi-blue/70 mb-8 dark:text-zinc-400">{t('case.notFoundDesc')}</p>
        <Link to="/" className="inline-flex px-6 py-3 rounded-full bg-ulbi-blue text-white font-medium hover:bg-[#001b59]">
          {t('case.back')}
        </Link>
      </main>
    );
  }

  const archText = detail?.architecture?.[lang] ?? detail?.architecture?.id ?? '';
  const steps = detail?.steps?.[lang] ?? detail?.steps?.id ?? [];
  const learnings = detail?.learnings?.[lang] ?? detail?.learnings?.id ?? [];

  const prev = index > 0 ? data.projects[index - 1] : null;
  const next = index < data.projects.length - 1 ? data.projects[index + 1] : null;

  return (
    <main className="pt-28 sm:pt-32 pb-20 bg-ulbi-grey/20 dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm">
          <ol className="flex flex-wrap items-center gap-2 text-ulbi-blue/60 dark:text-zinc-400">
            <li><Link to="/" className="hover:text-ulbi-orange">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link to="/#projects" className="hover:text-ulbi-orange">Projects</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ulbi-blue font-medium dark:text-zinc-200">{project.title}</li>
          </ol>
        </nav>

        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-ulbi-orange mb-3">{t('case.meta')}</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-ulbi-blue tracking-tight mb-4 dark:text-white">
            {project.title}
          </h1>
          <p className="text-base sm:text-lg text-ulbi-blue/70 max-w-3xl font-light mb-6 dark:text-zinc-400">
            {project.fullDesc || project.desc}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((techItem) => (
              <Badge key={techItem} variant="outline">{techItem}</Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 mb-10">
            {repos.map((r) => (
              <a key={`${r.label}-${r.url}`} href={r.url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ulbi-blue text-white text-sm font-medium hover:bg-[#001b59] dark:bg-white dark:text-zinc-950">
                {r.label} ↗
              </a>
            ))}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ulbi-orange text-white text-sm font-medium hover:bg-[#c94520]">
                {t('modal.live')} ↗
              </a>
            )}
            <button
              type="button"
              onClick={() => {
                const url = window.location.href;
                const shareText = `${project.title} — ${t('case.meta')}`;
                if (navigator.share) navigator.share({ title: shareText, url }).catch(() => {});
                else navigator.clipboard?.writeText(url).catch(() => {});
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-ulbi-silver text-sm font-medium text-ulbi-blue hover:border-ulbi-orange hover:text-ulbi-orange dark:border-white/15 dark:text-zinc-200"
            >
              {t('case.share')} ⧉
            </button>
          </div>
        </Reveal>

        {project.image && (
          <img src={project.image} alt={`Cover ${project.title}`} loading="lazy"
            className="w-full aspect-video object-cover rounded-2xl border border-ulbi-silver mb-10 dark:border-white/10" />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 items-start">
          {/* TOC sticky */}
          <aside className="hidden lg:block sticky top-28 rounded-2xl border border-ulbi-silver bg-white p-5 dark:bg-zinc-900 dark:border-white/10">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-ulbi-orange mb-4">{t('case.toc')}</h2>
            <ul className="space-y-1 text-sm">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}
                    className={`block px-3 py-2 rounded-lg transition-colors ${active === s.id ? 'bg-ulbi-orange/10 text-ulbi-orange font-semibold' : 'text-ulbi-blue/70 hover:bg-ulbi-grey dark:text-zinc-400'}`}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          {/* Konten */}
          <div className="space-y-12 min-w-0">
            <section id="overview" className="scroll-mt-28">
              <h2 className="text-2xl font-bold text-ulbi-blue mb-4 dark:text-white">{t('case.overview')}</h2>
              <p className="text-ulbi-blue/80 leading-relaxed font-light dark:text-zinc-300">{project.fullDesc || project.desc}</p>
            </section>

            <section id="architecture" className="scroll-mt-28">
              <h2 className="text-2xl font-bold text-ulbi-blue mb-4 dark:text-white">{t('case.architecture')}</h2>
              {archText && <p className="text-ulbi-blue/70 mb-4 font-light dark:text-zinc-400">{archText}</p>}
              <ArchitectureDiagram type={detail?.diagram ?? 'fuzzy'} title={`${t('case.architecture')} — ${project.title}`} />
            </section>

            <section id="implementation" className="scroll-mt-28">
              <h2 className="text-2xl font-bold text-ulbi-blue mb-4 dark:text-white">{t('case.implementation')}</h2>
              {steps.length > 0 ? (
                <ol className="space-y-3">
                  {steps.map((s, i) => (
                    <li key={i} className="flex gap-3 p-4 rounded-xl bg-white border border-ulbi-silver dark:bg-zinc-900 dark:border-white/10">
                      <span className="shrink-0 w-7 h-7 rounded-full bg-ulbi-orange text-white text-sm font-bold flex items-center justify-center">{i + 1}</span>
                      <span className="text-ulbi-blue/80 font-light dark:text-zinc-300">{s}</span>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-ulbi-blue/70 font-light dark:text-zinc-400">{project.solution}</p>
              )}
            </section>

            <section id="challenge" className="scroll-mt-28 grid gap-4 md:grid-cols-2">
              <div className="p-5 rounded-2xl bg-white border border-ulbi-silver dark:bg-zinc-900 dark:border-white/10">
                <h3 className="font-semibold text-ulbi-blue mb-2 dark:text-white">{t('modal.challenge')}</h3>
                <p className="text-sm text-ulbi-blue/70 font-light dark:text-zinc-400">{project.challenge}</p>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-ulbi-silver dark:bg-zinc-900 dark:border-white/10">
                <h3 className="font-semibold text-ulbi-blue mb-2 dark:text-white">{t('modal.solution')}</h3>
                <p className="text-sm text-ulbi-blue/70 font-light dark:text-zinc-400">{project.solution}</p>
              </div>
            </section>

            <section id="impact" className="scroll-mt-28">
              <h2 className="text-2xl font-bold text-ulbi-blue mb-4 dark:text-white">{t('case.impact')}</h2>
              <div className="p-5 sm:p-6 rounded-2xl bg-ulbi-blue/5 border border-ulbi-blue/20 dark:bg-white/5 dark:border-white/10">
                <p className="text-ulbi-blue/80 font-light dark:text-zinc-300">{project.impact}</p>
              </div>
            </section>

            {learnings.length > 0 && (
              <section id="learnings" className="scroll-mt-28">
                <h2 className="text-2xl font-bold text-ulbi-blue mb-4 dark:text-white">{t('case.learnings')}</h2>
                <ul className="space-y-2">
                  {learnings.map((l, i) => (
                    <li key={i} className="flex gap-2 text-ulbi-blue/80 font-light dark:text-zinc-300">
                      <span className="text-ulbi-orange" aria-hidden="true">✓</span>{l}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Prev / Next */}
            <nav className="grid sm:grid-cols-2 gap-4 pt-4" aria-label="More case studies">
              {prev ? (
                <Link to={`/projects/${prev.slug}`} className="p-5 rounded-2xl border border-ulbi-silver bg-white hover:border-ulbi-orange group dark:bg-zinc-900 dark:border-white/10">
                  <span className="block text-xs uppercase tracking-widest text-ulbi-blue/50 mb-1 dark:text-zinc-500">← {t('case.prev')}</span>
                  <span className="font-semibold text-ulbi-blue group-hover:text-ulbi-orange dark:text-white">{prev.title}</span>
                </Link>
              ) : <span />}
              {next && (
                <Link to={`/projects/${next.slug}`} className="p-5 rounded-2xl border border-ulbi-silver bg-white hover:border-ulbi-orange group text-right dark:bg-zinc-900 dark:border-white/10">
                  <span className="block text-xs uppercase tracking-widest text-ulbi-blue/50 mb-1 dark:text-zinc-500">{t('case.next')} →</span>
                  <span className="font-semibold text-ulbi-blue group-hover:text-ulbi-orange dark:text-white">{next.title}</span>
                </Link>
              )}
            </nav>

            <Link to="/#projects" className="inline-flex items-center gap-2 text-ulbi-orange font-medium hover:underline underline-offset-4">
              ← {t('case.back')}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CaseStudyPage;

import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectsData } from '../data/projects';
import { useLanguage } from '../contexts/LanguageContext';

export default function ProjectPost() {
  const { id } = useParams();
  const { t, lang } = useLanguage();
  const isPt = lang === 'pt';
  const project = projectsData.find((p) => p.id === id);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  if (!project) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0a0a0a] font-mono flex items-center justify-center text-[0.7rem] text-accent tracking-[0.3em] uppercase transition-colors">
        404 // project_not_found
      </div>
    );
  }

  const title = isPt && project.title_pt ? project.title_pt : project.title;
  const tag   = isPt && project.tag_pt   ? project.tag_pt   : project.tag;
  const desc  = isPt && project.desc_pt  ? project.desc_pt  : project.desc;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white font-serif transition-colors duration-300">
      <div className="container-main" style={{ paddingTop: '100px', paddingBottom: '160px' }}>
        
        {/* Back Nav */}
        <div style={{ marginBottom: '60px' }}>
          <Link to="/projects" className="font-mono text-[0.65rem] text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors tracking-[0.2em] uppercase font-black flex items-center group" style={{ gap: '16px' }}>
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            {t('projectpost.back')}
          </Link>
        </div>

        <div className="max-w-[100ch] mx-auto w-full">
          
          {/* Formal Academic Header */}
          <header className="text-center" style={{ marginBottom: '48px' }}>
            <h1 className="text-3xl md:text-5xl font-serif font-black tracking-tight leading-tight" style={{ marginBottom: '24px' }}>
              {title}
            </h1>
            
            <div className="text-lg md:text-xl font-serif text-gray-800 dark:text-gray-300" style={{ marginBottom: '16px' }}>
              <strong>J.G. Mendes</strong>
            </div>

            <div className="text-sm font-serif text-gray-500 dark:text-gray-400 italic" style={{ marginBottom: '32px' }}>
              {t('projectpost.department')}<br />
              <span className="font-mono text-[0.65rem] not-italic tracking-widest uppercase mt-4 block">
                Technical Report {project.id} — {project.date || '2026.Q1'}
              </span>
            </div>
          </header>

          {/* Abstract Block */}
          <div style={{ marginBottom: '48px', padding: '0 40px' }}>
            <h2 className="text-center font-bold font-sans text-sm tracking-widest uppercase" style={{ marginBottom: '16px' }}>
              {t('projectpost.abstract')}
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-justify dark:text-gray-300">
              {desc}
            </p>
          </div>

          {/* Two-Column Metadata */}
          <div className="grid grid-cols-2 border-t border-b border-gray-200 dark:border-[#333] py-6 font-serif text-sm text-center" style={{ marginBottom: '64px', gap: '32px' }}>
            <div>
              <span className="block font-bold mb-2">{t('projectpost.status_label')}</span>
              <span className="font-mono text-xs uppercase tracking-widest text-accent">{project.status}</span>
            </div>
            <div>
              <span className="block font-bold mb-2">{t('projectpost.domain_label')}</span>
              <span className="font-mono text-xs uppercase tracking-widest text-gray-600 dark:text-gray-400">{tag}</span>
            </div>
          </div>

          {/* Main Body */}
          <div className="text-base md:text-lg leading-loose text-justify font-serif text-gray-900 dark:text-gray-300">
            
            <h3 className="font-bold text-xl md:text-2xl tracking-tight" style={{ marginTop: '48px', marginBottom: '16px' }}>
              {t('projectpost.intro_heading')}
            </h3>
            <p style={{ marginBottom: '32px' }}>
              {desc}
            </p>

            <h3 className="font-bold text-xl md:text-2xl tracking-tight" style={{ marginTop: '48px', marginBottom: '16px' }}>
              {t('projectpost.arch_heading')}
            </h3>
            <p style={{ marginBottom: '32px' }}>
              {/* Project-specific content */}
            </p>

            {/* Figure Block */}
            {project.image && (
              <figure style={{ marginBottom: '80px' }}>
                <div className="bg-gray-100 dark:bg-[#111] border border-gray-200 dark:border-[#333] p-2">
                  <img src={project.image} alt="Architecture diagram" className="w-full grayscale contrast-125" />
                </div>
                <figcaption className="text-center text-sm italic text-gray-600 dark:text-gray-400" style={{ marginTop: '24px' }}>
                  <strong>Figure 1.</strong> {t('projectpost.figure_caption')}
                </figcaption>
              </figure>
            )}

            <h3 className="font-bold text-xl md:text-2xl tracking-tight" style={{ marginTop: '64px', marginBottom: '24px' }}>
              {t('projectpost.conc_heading')}
            </h3>
            <p style={{ marginBottom: '48px' }}>
              {/* Conclusion content */}
            </p>

            {/* References */}
            <h3 className="font-bold text-xl md:text-2xl tracking-tight border-b border-gray-200 dark:border-[#333]" style={{ marginTop: '64px', marginBottom: '24px', paddingBottom: '16px' }}>
              {t('projectpost.refs_heading')}
            </h3>
            
            <ol className="list-decimal pl-6 text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-400">
              {project.github ? (
                <li style={{ marginBottom: '24px' }}>
                  <a href={project.github} className="text-black dark:text-white hover:underline" target="_blank" rel="noopener noreferrer">
                    {t('projectpost.source_available')}
                  </a>
                </li>
              ) : (
                <li style={{ marginBottom: '24px' }}>
                  <span>{t('projectpost.source_internal')}</span>
                </li>
              )}
            </ol>

          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '../data/projects';
import { useLanguage } from '../contexts/LanguageContext';

const ALL_TAGS_EN = ['ALL', ...Array.from(new Set(projectsData.map(p => p.tag)))];

export default function AllProjects() {
  const { t, lang } = useLanguage();
  const isPt = lang === 'pt';

  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [filter, setFilter] = useState('ALL');

  const sorted = [...projectsData].sort((a, b) => new Date(b.date) - new Date(a.date));
  const filtered = filter === 'ALL' ? sorted : sorted.filter(p => p.tag === filter);

  const getTitle = (p) => isPt && p.title_pt ? p.title_pt : p.title;
  const getTag   = (p) => isPt && p.tag_pt   ? p.tag_pt   : p.tag;
  const getDesc  = (p) => isPt && p.desc_pt  ? p.desc_pt  : p.desc;

  const resultLabel = filtered.length !== 1 ? t('page.result_plural') : t('page.result_singular');

  return (
    <div className="min-h-screen font-mono transition-colors duration-300 pb-32">
      <div className="container-main" style={{ paddingTop: 'clamp(100px, 18vw, 180px)' }}>

        {/* Back nav */}
        <div style={{ marginBottom: 'clamp(32px, 6vw, 60px)' }}>
          <Link to="/" className="text-[0.7rem] text-[var(--color-text-dim)] hover:text-accent transition-colors tracking-[0.3em] uppercase font-black flex items-center gap-4 group">
            <span className="group-hover:-translate-x-1 transition-transform text-accent">←</span>
            {t('page.back_root')}
          </Link>
        </div>

        {/* Title */}
        <div style={{ marginBottom: 'clamp(32px, 6vw, 60px)' }}>
          <div className="text-[0.65rem] text-accent font-black tracking-[0.4em] mb-6 uppercase">
            {t('allprojects.archive_label')} // {projectsData.length}{t('allprojects.entries_indexed')}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter text-[var(--color-text-primary)] uppercase leading-[0.9]">
            {t('allprojects.title')}<br /><span className="italic text-accent">{t('allprojects.title_accent')}</span>
          </h1>
        </div>

        {/* Filter */}
        <div style={{ marginBottom: 'clamp(24px, 5vw, 48px)' }}>
          <div className="flex flex-wrap gap-4 text-[0.7rem] font-black tracking-[0.15em]">
            {ALL_TAGS_EN.map(tag => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`transition-colors ${filter === tag ? 'text-accent' : 'text-[var(--color-text-dim)] hover:text-[var(--color-text-primary)]'}`}
              >
                [{tag === 'ALL' ? t('allprojects.all_filter').toLowerCase() : tag.toLowerCase().replace(/ /g, '-')}]
              </button>
            ))}
            <span className="ml-auto text-[0.6rem] text-[var(--color-text-muted)] self-center hidden sm:block">
              {filtered.length} {resultLabel}
            </span>
          </div>
        </div>

        {/* Desktop column headers */}
        <div className="hidden md:grid grid-cols-12 gap-4 text-[0.6rem] text-[var(--color-text-muted)] font-black tracking-[0.35em] uppercase pb-4 border-b border-[var(--color-border-subtle)]">
          <span className="col-span-1">{t('allprojects.col_ref')}</span>
          <span className="col-span-5">{t('allprojects.col_id')}</span>
          <span className="col-span-3">{t('allprojects.col_domain')}</span>
          <span className="col-span-2">{t('allprojects.col_period')}</span>
          <span className="col-span-1 text-right">{t('allprojects.col_status')}</span>
        </div>

        {/* Project rows */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {filtered.map((project, i) => {
              const year = project.date ? new Date(project.date).getFullYear() : '2026';
              const q = project.date ? `Q${Math.floor(new Date(project.date).getMonth() / 3) + 1}` : 'Q1';

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={project.link}
                    className="group flex flex-col md:grid md:grid-cols-12 gap-3 md:gap-4 items-start py-7 border-b border-gray-50 dark:border-[#1a1a1a] hover:bg-gray-50/40 dark:hover:bg-white/5 transition-colors"
                  >
                    {/* Mobile compact row header */}
                    <div className="flex items-center justify-between w-full md:hidden">
                      <span className="text-[0.6rem] text-[var(--color-text-dim)]">#{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-[0.6rem] text-accent font-black tracking-widest uppercase">{project.status} →</span>
                    </div>

                    {/* REF — desktop */}
                    <span className="hidden md:block col-span-1 text-[0.65rem] text-[var(--color-text-muted)] group-hover:text-accent transition-colors pt-1">
                      #{String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Title + hover desc */}
                    <div className="w-full md:col-span-5 flex flex-col">
                      <span className="text-[0.9rem] md:text-[1.05rem] font-black text-[var(--color-text-primary)] uppercase tracking-tight leading-tight group-hover:text-accent transition-colors">
                        {getTitle(project)}
                      </span>
                      {/* Bio that reveals on hover */}
                      <div className="overflow-hidden max-h-0 group-hover:max-h-24 transition-all duration-500 ease-in-out">
                        <span className="block text-[0.7rem] text-[var(--color-text-dim)] leading-snug mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          {getDesc(project)}
                        </span>
                      </div>
                    </div>

                    {/* Domain */}
                    <span className="text-[0.65rem] text-[var(--color-text-dim)] tracking-[0.1em] uppercase md:col-span-3 pt-0 md:pt-1">
                      {getTag(project)}
                    </span>

                    {/* Period */}
                    <span className="text-[0.65rem] text-gray-400 dark:text-gray-600 md:col-span-2 md:pt-1">
                      {year}.{q}
                    </span>

                    {/* Status — desktop */}
                    <span className="hidden md:block col-span-1 text-right text-[0.65rem] text-accent font-black tracking-[0.2em] uppercase pt-1">
                      {project.status} →
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Terminal footer */}
        <div className="mt-12 flex items-center gap-3 text-[0.75rem] text-[var(--color-text-dim)]">
          <span className="text-accent font-black">joao@portfolio</span>
          <span>:~/projects$</span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1.1 }}
            className="inline-block w-2 h-4 bg-[var(--color-text-primary)] align-middle"
          />
        </div>

      </div>
    </div>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { citationsData } from '../data/citations';
import { projectsData } from '../data/projects';
import { useLanguage } from '../contexts/LanguageContext';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

function ProjectEntry({ project, idx, t, isPt }) {
  const title = isPt && project.title_pt ? project.title_pt : project.title;
  const tag   = isPt && project.tag_pt   ? project.tag_pt   : project.tag;
  const desc  = isPt && project.desc_pt  ? project.desc_pt  : project.desc;

  return (
    <motion.div
      {...fadeUp(0.1 + idx * 0.15)}
      className="group relative flex flex-col border-t border-[var(--color-border-subtle)] pt-10"
    >
      <Link to={project.link} className="absolute inset-0 z-20" />

      {/* Index + status row */}
      <div className="flex items-center justify-between mb-8">
        <span className="font-mono text-[0.6rem] text-[var(--color-text-muted)] font-black tracking-[0.4em]">
          #0{idx + 1}
        </span>
        <span className="font-mono text-[0.6rem] text-accent font-black tracking-[0.3em] uppercase">
          {project.status}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-mono text-2xl md:text-3xl font-black text-[var(--color-text-primary)] leading-tight uppercase tracking-tighter group-hover:text-accent dark:group-hover:text-accent transition-colors" style={{ marginBottom: '20px' }}>
        {title}
      </h3>

      {/* Tag */}
      <div className="font-mono text-[0.65rem] text-[var(--color-text-dim)] font-black tracking-[0.3em] uppercase" style={{ marginBottom: '24px' }}>
        #{tag}
      </div>

      {/* Description */}
      <p className="font-mono text-[0.8rem] text-[var(--color-text-dim)] leading-relaxed flex-1" style={{ marginBottom: '32px' }}>
        {desc}
      </p>

      {/* CTA */}
      <div className="mt-auto font-mono text-[0.65rem] font-black text-[var(--color-text-primary)] uppercase tracking-[0.3em] group-hover:text-accent dark:group-hover:text-accent transition-colors flex items-center gap-3">
        {t('lab.view_case')} <span className="group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </motion.div>
  );
}

export default function Lab() {
  const { t, lang } = useLanguage();
  const isPt = lang === 'pt';

  return (
    <>
      <section id="lab" className="transition-colors duration-300" style={{ paddingTop: '130px', paddingBottom: '130px' }}>
        <div className="container-main">
          {/* Header */}
          <motion.div {...fadeUp(0)} className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10" style={{ marginBottom: '80px' }}>
            <div>
              <div className="meta-label mb-6 text-[var(--color-text-dim)]">{t('lab.section_label')}</div>
              <h2 className="text-5xl md:text-6xl font-bold font-mono tracking-tighter text-[var(--color-text-primary)] uppercase">
                {t('lab.title')} <span className="text-accent">{t('lab.title_accent')}</span>
              </h2>
            </div>
            {projectsData.length > 3 && (
              <Link to="/projects" className="font-mono text-[0.7rem] text-gray-500 dark:text-gray-500 font-black uppercase tracking-[0.3em] transition-colors hover:text-accent dark:hover:text-accent flex items-center gap-4 group pb-2">
                {t('lab.view_archive')} <span className="group-hover:translate-x-2 transition-transform">→</span>
              </Link>
            )}
          </motion.div>

          {/* 3-col project entries */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-16">
            {[...projectsData]
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .slice(0, 3)
              .map((p, idx) => (
              <ProjectEntry key={idx} project={p} idx={idx} t={t} isPt={isPt} />
            ))}
          </div>
        </div>
      </section>

      <section id="publications" className="transition-colors duration-300" style={{ paddingTop: '130px', paddingBottom: '130px' }}>
        <div className="container-main">
          {/* Header */}
          <motion.div {...fadeUp(0.1)} className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10" style={{ marginBottom: '100px' }}>
            <div>
              <div className="meta-label mb-6 text-[var(--color-text-dim)]">{t('pub.section_label')}</div>
              <h2 className="text-5xl md:text-6xl font-bold font-mono tracking-tighter text-[var(--color-text-primary)] uppercase">
                {t('pub.title')} <span className="text-accent">{t('pub.title_accent')}</span>
              </h2>
            </div>
            {citationsData.length > 5 && (
              <Link to="/posts" className="font-mono text-[0.7rem] text-[var(--color-text-primary)] font-bold uppercase tracking-[0.2em] transition-colors hover:text-accent dark:hover:text-accent flex items-center gap-4 group pb-2">
                {t('pub.view_all')} <span className="text-[var(--color-text-dim)] group-hover:translate-x-2 transition-transform">→</span>
              </Link>
            )}
          </motion.div>

          {/* Publications List */}
          <motion.div {...fadeUp(0.3)}>
            <div className="flex flex-col gap-y-16">
              {[...citationsData]
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 5)
                .map((pub, i) => (
                <Link to={pub.link || '#'} key={i} className="flex flex-col md:flex-row gap-8 md:gap-24 items-start group hover:no-underline cursor-pointer">
                  <span className="font-mono text-sm text-accent font-bold md:pt-1 transition-colors group-hover:text-[var(--color-text-primary)]">{pub.year}</span>
                  <div className="flex-1 max-w-[65ch]">
                    <div className="text-xl md:text-2xl font-bold text-[var(--color-text-primary)] transition-all duration-300 font-mono leading-tight mb-4 group-hover:text-accent dark:group-hover:text-accent">
                      {isPt && pub.title_pt ? pub.title_pt : pub.title}
                    </div>
                    <div className="text-[0.7rem] text-[var(--color-text-dim)] font-mono italic uppercase tracking-[0.2em] transition-colors group-hover:text-[var(--color-text-primary)]">
                      {isPt && pub.venue_pt ? pub.venue_pt : pub.venue}
                    </div>
                  </div>
                  <div className="font-mono text-[0.65rem] text-[var(--color-text-dim)] uppercase tracking-widest pt-1 mt-4 md:mt-0 transition-colors flex items-center gap-4 group-hover:text-accent">
                    {pub.code} <span className="opacity-0 group-hover:opacity-100 transition-opacity text-base translate-y-[1px] font-sans">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

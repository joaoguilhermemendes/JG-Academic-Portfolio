import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { citationsData } from '../data/citations';
import { useLanguage } from '../contexts/LanguageContext';

const ALL_VENUES_EN = Array.from(new Set(citationsData.map(p => p.venue).filter(Boolean)));

export default function AllPosts() {
  const { t, lang } = useLanguage();
  const isPt = lang === 'pt';

  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [filter, setFilter] = useState('ALL');

  const sorted = [...citationsData].sort((a, b) => new Date(b.date) - new Date(a.date));
  const filtered = filter === 'ALL' ? sorted : sorted.filter(p => p.venue === filter);

  const getVenue = (pub) => isPt && pub.venue_pt ? pub.venue_pt : pub.venue;
  const getTitle = (pub) => isPt && pub.title_pt ? pub.title_pt : pub.title;

  const resultLabel = filtered.length !== 1 ? t('page.result_plural') : t('page.result_singular');

  return (
    <div className="min-h-screen font-mono transition-colors duration-300" style={{ paddingBottom: '120px' }}>
      <div className="container-main" style={{ paddingTop: '120px' }}>

        {/* Back nav */}
        <div className="mb-12">
          <Link to="/" className="text-[0.7rem] text-gray-500 dark:text-gray-600 hover:text-accent transition-colors tracking-[0.3em] uppercase font-black flex items-center gap-4 group">
            <span className="group-hover:-translate-x-1 transition-transform text-accent">←</span>
            {t('page.back_root')}
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="text-[0.65rem] text-accent font-black tracking-[0.4em] mb-4 uppercase">
            {t('allposts.archive_label')} // {citationsData.length}{t('allposts.entries_indexed')}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-black dark:text-white uppercase leading-[0.9] mb-14">
            {t('allposts.title')}<br /><span className="italic text-accent">{t('allposts.title_accent')}</span>
          </h1>

          {/* Filter buttons */}
          <div className="flex flex-wrap gap-4 text-[0.7rem] font-black tracking-[0.15em]">
            <button
              onClick={() => setFilter('ALL')}
              className={`transition-colors ${filter === 'ALL' ? 'text-accent' : 'text-gray-500 dark:text-gray-600 hover:text-black dark:hover:text-white'}`}
            >
              [{t('allposts.all_filter').toLowerCase()}]
            </button>
            {ALL_VENUES_EN.map(v => (
              <button
                key={v}
                onClick={() => setFilter(v)}
                className={`transition-colors ${filter === v ? 'text-accent' : 'text-gray-500 dark:text-gray-600 hover:text-black dark:hover:text-white'}`}
              >
                [{v.toLowerCase().replace(/ /g, '-')}]
              </button>
            ))}
            <span className="ml-auto text-[0.6rem] text-gray-400 dark:text-gray-700 self-center hidden sm:block">
              {filtered.length} {resultLabel}
            </span>
          </div>
        </div>

        {/* Desktop table headers — hidden on mobile */}
        <div className="hidden md:grid grid-cols-12 gap-4 text-[0.6rem] text-gray-400 dark:text-gray-700 font-black tracking-[0.35em] uppercase pb-4 border-b border-gray-100 dark:border-[#222]">
          <span className="col-span-1">{t('allposts.col_ref')}</span>
          <span className="col-span-6">{t('allposts.col_title')}</span>
          <span className="col-span-3">{t('allposts.col_venue')}</span>
          <span className="col-span-1">{t('allposts.col_year')}</span>
          <span className="col-span-1 text-right">{t('allposts.col_code')}</span>
        </div>

        {/* Rows */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {filtered.map((pub, i) => (
              <motion.div
                key={pub.code + i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={pub.link || '#'}
                  className="group flex flex-col md:grid md:grid-cols-12 gap-3 md:gap-4 items-start py-7 border-b border-gray-50 dark:border-[#1a1a1a] hover:bg-gray-50/40 dark:hover:bg-white/5 transition-colors"
                >
                  {/* Mobile: compact header row */}
                  <div className="flex items-center justify-between w-full md:hidden">
                    <span className="text-[0.6rem] text-gray-500 dark:text-gray-600">#{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-[0.6rem] text-accent font-black">{pub.code} →</span>
                  </div>

                  {/* REF — desktop only */}
                  <span className="hidden md:block col-span-1 text-[0.65rem] text-gray-400 dark:text-gray-700 group-hover:text-accent transition-colors pt-1">
                    #{String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Title */}
                  <div className="w-full md:col-span-6">
                    <span className="text-[0.9rem] md:text-[1rem] font-black text-black dark:text-white uppercase tracking-tight leading-tight group-hover:text-accent transition-colors">
                      {getTitle(pub)}
                    </span>
                  </div>

                  {/* Venue */}
                  <span className="text-[0.65rem] text-gray-600 dark:text-gray-500 tracking-[0.1em] uppercase md:col-span-3">
                    {getVenue(pub) || '—'}
                  </span>

                  {/* Year */}
                  <span className="text-[0.65rem] text-gray-500 dark:text-gray-600 md:col-span-1">
                    {pub.year || (pub.date ? new Date(pub.date).getFullYear() : '—')}
                  </span>

                  {/* Code — desktop only */}
                  <span className="hidden md:block col-span-1 text-right text-[0.65rem] text-accent font-black tracking-[0.2em] uppercase">
                    {pub.code || 'READ'} →
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Terminal footer */}
        <div className="mt-12 flex items-center gap-3 text-[0.75rem] text-gray-500 dark:text-gray-600">
          <span className="text-accent font-black">joao@portfolio</span>
          <span>:~/writings$</span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1.1 }}
            className="inline-block w-2 h-4 bg-black dark:bg-white align-middle"
          />
        </div>

      </div>
    </div>
  );
}

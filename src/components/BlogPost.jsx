import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { citationsData } from '../data/citations';
import { useLanguage } from '../contexts/LanguageContext';

export default function BlogPost() {
  const { code } = useParams();
  const { t, lang } = useLanguage();
  const isPt = lang === 'pt';
  const post = citationsData.find((c) => c.code === code);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  if (!post) {
    return (
      <div className="min-h-screen font-mono flex items-center justify-center text-[0.7rem] text-accent tracking-[0.3em] uppercase transition-colors">
        404 // entry_not_found
      </div>
    );
  }

  const title = isPt && post.title_pt ? post.title_pt : post.title;
  const venue = isPt && post.venue_pt ? post.venue_pt : post.venue;
  const desc  = isPt && post.desc_pt  ? post.desc_pt  : post.desc;

  return (
    <div className="min-h-screen font-mono text-[var(--color-text-primary)] transition-colors duration-300">
      <article className="container-main" style={{ paddingTop: '160px', paddingBottom: '160px' }}>
        
        {/* Back Nav */}
        <div style={{ marginBottom: '80px' }}>
          <Link to="/posts" className="text-[0.7rem] text-gray-500 dark:text-gray-500 hover:text-accent transition-colors tracking-[0.3em] uppercase font-black flex items-center group" style={{ gap: '16px' }}>
            <span className="group-hover:-translate-x-1 transition-transform text-accent">←</span>
            {t('page.back_archive')}
          </Link>
        </div>

        <div className="max-w-[110ch] mx-auto w-full">
          
          {/* Header */}
          <header style={{ marginBottom: '32px' }}>
            <div className="text-[0.65rem] text-accent tracking-[0.3em] uppercase mb-4 font-black" style={{ marginBottom: '8px' }}>
              RFC_DOCUMENT // {post.code}
            </div>
            <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tighter" style={{ marginBottom: '32px' }}>
              {title}
            </h1>

            <div className="flex flex-col text-[0.75rem] text-[var(--color-text-dim)] uppercase tracking-widest" style={{ gap: '8px', marginBottom: '16px' }}>
              <div>{t('blogpost.date_label')} {post.date || post.year}</div>
              {venue && <div>{t('blogpost.venue_label')} {venue}</div>}
              <div>{t('blogpost.author_label')} J.G. Mendes</div>
            </div>
          </header>

          {/* Divider */}
          <div className="text-gray-400 dark:text-gray-800 text-[0.7rem] overflow-hidden whitespace-nowrap select-none" style={{ marginBottom: '24px' }}>
            {'-'.repeat(200)}
          </div>

          {/* Main Content */}
          <div className="text-[0.85rem] md:text-[0.95rem] leading-[2] text-[var(--color-text-muted)]">
            <p style={{ marginBottom: '24px' }}>
              {desc}
            </p>
          </div>

          {/* Footer / EOF */}
          <div style={{ marginTop: '64px' }}>
            <div className="text-gray-400 dark:text-gray-800 text-[0.7rem] overflow-hidden whitespace-nowrap select-none" style={{ marginBottom: '16px' }}>
              {'-'.repeat(100)}
            </div>
            <div className="flex justify-between items-center text-[0.65rem] tracking-[0.3em] font-black uppercase text-gray-500 dark:text-gray-500">
              <span>{t('blogpost.status_ok')}</span>
              <span className="text-accent">EOF</span>
            </div>
          </div>

        </div>
      </article>
    </div>
  );
}

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

          {/* Optional Project or Github Links */}
          {(post.project_link || post.github) && (
            <div className="flex flex-wrap gap-4 mb-8">
              {post.project_link && (
                <Link to={post.project_link} className="inline-flex items-center gap-2 px-6 py-3 border border-accent text-accent font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-white transition-colors">
                  <span>← {isPt ? 'Página do Projeto' : 'Project Page'}</span>
                </Link>
              )}
              {post.github && (
                <a href={post.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-text-primary)] text-[var(--color-text-primary)] font-mono text-xs uppercase tracking-widest hover:bg-[var(--color-text-primary)] hover:text-[var(--color-surface)] dark:hover:text-[#000] transition-colors">
                  <span>GitHub Repository ↗</span>
                </a>
              )}
            </div>
          )}

          {/* Divider */}
          <div className="opacity-10 text-[var(--color-text-primary)] text-[0.7rem] overflow-hidden whitespace-nowrap select-none" style={{ marginBottom: '24px' }}>
            {'-'.repeat(200)}
          </div>

          {/* Main Content */}
          <div className="text-[0.85rem] md:text-[0.95rem] leading-[2] text-[var(--color-text-muted)]">
            
            {/* Quote Block */}
            {post.quote && (
              <blockquote 
                className="border-l-4 border-accent text-[var(--color-text-primary)] font-serif italic text-[1.1rem] opacity-90 tracking-wide leading-[1.8]"
                style={{ padding: '16px 0 16px 32px', marginBottom: '56px', marginTop: '32px' }}
              >
                "{isPt && post.quote_pt ? post.quote_pt : post.quote}"
              </blockquote>
            )}

            {/* Paragraph Text Mapping */}
            <div style={{ marginBottom: '64px' }}>
              {desc.split('\n').filter(p => p.trim() !== '').map((paragraph, idx) => (
                <p key={idx} style={{ marginBottom: '32px' }} className="text-justify leading-[2.2]">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Pipeline / Steps Block */}
            {post.pipeline && (
              <div style={{ marginBottom: '80px', marginTop: '40px' }}>
                <div className="text-[0.65rem] text-accent font-black tracking-[0.3em] uppercase" style={{ marginBottom: '32px' }}>
                  // {isPt ? 'VISÃO GERAL DO PIPELINE TÉCNICO' : 'TECHNICAL PIPELINE OVERVIEW'}
                </div>
                <div className="flex flex-col" style={{ gap: '24px' }}>
                  {(isPt && post.pipeline_pt ? post.pipeline_pt : post.pipeline).map((pipe, idx) => (
                    <div 
                      key={idx} 
                      className="flex flex-col md:flex-row border border-[var(--color-border-subtle)] bg-[var(--color-surface)] shadow-sm"
                      style={{ padding: '32px 40px', gap: '32px' }}
                    >
                      <div className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[var(--color-text-primary)] font-black" style={{ minWidth: '200px', flexShrink: 0, marginTop: '4px' }}>
                        {pipe.step}
                      </div>
                      <div className="text-[0.9rem] leading-[2] text-[var(--color-text-dim)] flex-1 text-justify">
                        {pipe.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Images Array Component */}
            {post.images && post.images.length > 0 && (
              <div className="mt-12 flex flex-col gap-8">
                {post.images.map((imgUrl, i) => (
                  <div key={i} className="border border-[var(--color-border-subtle)] p-2 bg-[var(--color-surface)]">
                    <img src={imgUrl} alt={`Representation ${i}`} className="w-full" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer / EOF */}
          <div style={{ marginTop: '64px' }}>
            <div className="opacity-10 text-[var(--color-text-primary)] text-[0.7rem] overflow-hidden whitespace-nowrap select-none" style={{ marginBottom: '16px' }}>
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

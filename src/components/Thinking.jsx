import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function Thinking() {
  const { t } = useLanguage();

  return (
    <section id="thinking" className="transition-colors duration-300" style={{ paddingTop: 'clamp(60px, 12vw, 130px)', paddingBottom: 'clamp(60px, 12vw, 130px)' }}>
      <div className="container-main">
        {/* Header Section without border */}
        <motion.div {...fadeUp(0)} className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6" style={{ marginBottom: 'clamp(40px, 8vw, 80px)' }}>
          <div>
            <div className="meta-label mb-6 text-[var(--color-text-dim)]">{t('thinking.section_label')}</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-mono tracking-tighter text-[var(--color-text-primary)] uppercase">
              {t('thinking.title')} <span className="text-accent">{t('thinking.title_accent')}</span>
            </h2>
          </div>
          <div className="meta-label text-[var(--color-text-muted)] hidden md:block uppercase tracking-[0.2em]">{t('thinking.personal_statement')}</div>
        </motion.div>

        {/* Bio text and Portrait System */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-32 items-start justify-between">
          
          {/* Left Column: Text Base */}
          <div className="max-w-[75ch] flex flex-col gap-8 md:gap-12 flex-1 pb-6 md:pb-10">
            <motion.p 
              {...fadeUp(0.1)} 
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-black dark:text-gray-200 leading-snug md:leading-tight font-sans tracking-tight"
              dangerouslySetInnerHTML={{ __html: t('thinking.intro') }}
            />
            
            <motion.p 
              {...fadeUp(0.2)} 
              className="text-base md:text-xl lg:text-2xl font-normal text-[var(--color-text-dim)] leading-relaxed font-sans"
              dangerouslySetInnerHTML={{ __html: t('thinking.body') }}
            />
          </div>

          {/* Right Column: Editorial Portrait Placeholder */}
          <motion.div {...fadeUp(0.3)} className="w-full lg:w-[400px] shrink-0 group xl:mt-4">
            <div className="relative w-full aspect-[3/4] bg-gray-100 overflow-hidden">
              {/* Subtle Red Overlay on Hover */}
              <div className="absolute inset-0 bg-accent mix-blend-color opacity-0 group-hover:opacity-20 transition-opacity duration-700 z-10 pointer-events-none" />
              {/* Image element with Grayscale & Contrast applied via Tailwind */}
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" 
                alt="João Guilherme Portrait" 
                className="w-full h-full object-cover grayscale contrast-125 brightness-95 group-hover:scale-105  transition-all duration-1000 ease-out"
              />
            </div>
            {/* Academic Caption */}
            <div className="mt-4 flex justify-between items-center border-t-[2px] border-[var(--color-text-primary)] pt-3 mb-2">
              <span className="font-mono text-[0.65rem] text-[var(--color-text-primary)] font-bold tracking-widest uppercase">{t('thinking.based_in')}</span>
              <span className="font-mono text-[0.65rem] text-accent font-bold tracking-[0.3em] uppercase">{t('thinking.fig')}</span>
            </div>
            <div className="font-mono text-[var(--color-text-dim)] text-[0.65rem] leading-snug italic">
              {t('thinking.hint')}
            </div>
          </motion.div>

        </div>

        {/* Horizontal Field Domains */}
        <motion.div {...fadeUp(0.5)} className="w-full" style={{ marginTop: 'clamp(40px, 8vw, 80px)' }}>
          <div className="meta-label mb-16 text-[var(--color-text-dim)]">{t('thinking.principles_label')}</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 lg:gap-24">
            {[
              { labelKey: 'thinking.p0.label', textKey: 'thinking.p0.text' },
              { labelKey: 'thinking.p1.label', textKey: 'thinking.p1.text' },
              { labelKey: 'thinking.p2.label', textKey: 'thinking.p2.text' },
            ].map((m, i) => (
              <div key={i} className="flex flex-col gap-5 py-2 transition-colors group">
                 <div className="flex items-center gap-4">
                    <span className="font-mono text-[0.65rem] font-bold text-accent tracking-[0.2em] uppercase">{t(m.labelKey)}</span>
                 </div>
                 <p className="text-[var(--color-text-primary)] font-bold font-mono text-xl lg:text-2xl uppercase tracking-tighter leading-tight group-hover:text-accent transition-colors">
                    {t(m.textKey)}
                 </p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

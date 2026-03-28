import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, x: -15 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function Timeline() {
  const { t } = useLanguage();

  const EVENTS = [
    {
      dateKey:        'timeline.event0.date',
      titleKey:       'timeline.event0.title',
      institutionKey: 'timeline.event0.institution',
      descKey:        'timeline.event0.description',
    },
    {
      dateKey:        'timeline.event1.date',
      titleKey:       'timeline.event1.title',
      institutionKey: 'timeline.event1.institution',
      descKey:        'timeline.event1.description',
    },
    {
      dateKey:        'timeline.event2.date',
      titleKey:       'timeline.event2.title',
      institutionKey: 'timeline.event2.institution',
      descKey:        'timeline.event2.description',
    },
  ];

  return (
    <section id="timeline" className="transition-colors duration-300" style={{ paddingTop: '130px', paddingBottom: '130px' }}>
      <div className="container-main">
        {/* Header */}
        <motion.div {...fadeUp(0)} className="mb-32 flex items-end justify-between">
          <div>
            <div className="meta-label mb-6 text-gray-600 dark:text-gray-600">{t('timeline.section_label')}</div>
            <h2 className="text-5xl md:text-6xl font-bold font-mono tracking-tighter text-black dark:text-white uppercase">
              {t('timeline.title')} <span className="text-accent">{t('timeline.title_accent')}</span>
            </h2>
          </div>
          <div className="text-gray-300 dark:text-gray-800 hidden md:block select-none opacity-40 dark:opacity-20">
             <span className="font-mono text-8xl font-black">2026</span>
          </div>
        </motion.div>

        {/* Timeline List */}
        <div className="flex flex-col gap-32 relative">
          <div className="absolute lg:left-[calc(260px+4rem)] top-0 bottom-4 w-[1px] bg-accent hidden lg:block opacity-20" />

          {EVENTS.map((ev, idx) => (
            <motion.div key={idx} {...fadeUp(0.1 + idx * 0.1)} className="flex flex-col lg:flex-row gap-12 lg:gap-32 relative group">
              <div className="absolute lg:left-[calc(260px+4rem-4px)] top-3 w-[9px] h-[9px] bg-accent hidden lg:block group-hover:scale-150 transition-transform origin-center" />

              {/* Date Column */}
              <div className="lg:w-[260px] font-mono text-sm text-accent font-bold tracking-[0.2em] pt-1 uppercase">
                {t(ev.dateKey)}
              </div>

              {/* Info Column */}
              <div className="flex-1">
                <h3 className="font-mono text-3xl font-bold text-black dark:text-white mb-6 uppercase tracking-tight">{t(ev.titleKey)}</h3>
                <div className="font-mono text-[0.8rem] text-gray-600 dark:text-gray-500 font-bold tracking-[0.2em] mb-10 uppercase inline-block">
                  @ {t(ev.institutionKey)}
                </div>
                <p className="text-xl text-gray-700 dark:text-gray-400 leading-relaxed max-w-[55ch] font-normal">
                  {t(ev.descKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

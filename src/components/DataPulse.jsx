import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const SKILLS = [
  // DATA SCIENCE
  { id: 'data', name: 'python',               meta: 'v3.12',       note_en: 'primary language for scripting & analysis',              note_pt: 'linguagem principal para scripts e análise' },
  { id: 'data', name: 'sql / rdbms',          meta: 'SQLite',      note_en: 'database architecture, modeling & complex querying',     note_pt: 'arquitetura de banco de dados, modelagem e consultas complexas' },
  { id: 'data', name: 'pandas / numpy',       meta: 'v2.x',        note_en: 'data manipulation & numerical operations',               note_pt: 'manipulação de dados e operações numéricas' },
  { id: 'data', name: 'scikit-learn',         meta: 'v1.4',        note_en: 'foundational machine learning pipelines',                note_pt: 'pipelines fundamentais de machine learning' },
  { id: 'data', name: 'matplotlib / seaborn', meta: 'current',     note_en: 'exploratory data visualization',                        note_pt: 'visualização exploratória de dados' },
  // RESEARCH
  { id: 'research', name: 'math & statistics',   meta: 'core base',    note_en: 'calculus, probability, linear algebra',              note_pt: 'cálculo, probabilidade, álgebra linear' },
  { id: 'research', name: 'jupyter / colab',     meta: 'notebooks',    note_en: 'interactive computational research',                 note_pt: 'pesquisa computacional interativa' },
  { id: 'research', name: 'latex / bibtex',      meta: 'TeX',          note_en: 'academic typesetting & citations',                   note_pt: 'tipografia acadêmica e citações' },
  { id: 'research', name: 'data structuring',    meta: 'methodology',  note_en: 'cleaning and normalizing raw datasets',              note_pt: 'limpeza e normalização de conjuntos de dados brutos' },
  // ENGINEERING
  { id: 'engineering', name: 'html / css / js',  meta: 'ES2024',       note_en: 'core web development',                              note_pt: 'desenvolvimento web fundamental' },
  { id: 'engineering', name: 'bootstrap / tailwind', meta: 'v5.x',        note_en: 'building functional web interfaces',                 note_pt: 'construção de interfaces web funcionais' },
  { id: 'engineering', name: 'git / github',     meta: 'current',      note_en: 'version control & collaboration',                   note_pt: 'controle de versão e colaboração' },
  { id: 'engineering', name: 'linux / bash',     meta: 'terminal',     note_en: 'system navigation & scripting',                     note_pt: 'navegação de sistema e scripts' },
];

export default function DataPulse() {
  const { t, language } = useLanguage();
  const [active, setActive] = useState('all');

  const SECTIONS = [
    { id: 'all',         labelKey: 'pulse.filter.all' },
    { id: 'data',        labelKey: 'pulse.filter.data' },
    { id: 'research',    labelKey: 'pulse.filter.research' },
    { id: 'engineering', labelKey: 'pulse.filter.engineering' },
  ];

  const CATEGORY_LABEL = {
    data:        t('pulse.cat.data'),
    research:    t('pulse.cat.research'),
    engineering: t('pulse.cat.engineering'),
  };

  const AREAS = [
    { labelKey: 'pulse.area0.label', textKey: 'pulse.area0.text' },
    { labelKey: 'pulse.area1.label', textKey: 'pulse.area1.text' },
    { labelKey: 'pulse.area2.label', textKey: 'pulse.area2.text' },
  ];

  const filtered = active === 'all' ? SKILLS : SKILLS.filter(s => s.id === active);
  const groups = ['data', 'research', 'engineering'];

  return (
    <section id="pulse" className="transition-colors duration-300" style={{ paddingTop: 'clamp(60px, 12vw, 130px)', paddingBottom: 'clamp(60px, 12vw, 130px)' }}>
      <div className="container-main font-mono">

        {/* Header block */}
        <div style={{ marginBottom: 'clamp(32px, 6vw, 60px)' }}>
          <div className="text-[0.65rem] text-accent font-black tracking-[0.4em] mb-6 uppercase">{t('pulse.section_label')}</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-[var(--color-text-primary)] uppercase leading-[0.9]">
            {t('pulse.title')}<br /><span className="text-accent italic">{t('pulse.title_accent')}</span>
          </h2>
        </div>

        {/* Filter nav */}
        <div style={{ marginBottom: 'clamp(24px, 5vw, 48px)' }}>
          <div className="flex flex-wrap gap-4 text-[0.7rem] font-black tracking-[0.15em]">
            {SECTIONS.map(s => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`transition-colors ${active === s.id ? 'text-accent' : 'text-[var(--color-text-dim)] hover:text-[var(--color-text-primary)]'}`}
              >
                {t(s.labelKey)}
              </button>
            ))}
            <span className="ml-auto text-[0.6rem] text-[var(--color-text-muted)] self-center hidden sm:block">
              {filtered.length}{t('pulse.entries_found')}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-200 dark:bg-[#1e1e1e] mb-12" />

        {/* Skill Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {active === 'all' ? (
              <div className="flex flex-col gap-12 md:gap-24">
                {groups.map(grpId => {
                  const grpSkills = SKILLS.filter(s => s.id === grpId);
                  return (
                    <div key={grpId}>
                      <div className="text-[0.7rem] text-[var(--color-text-dim)] tracking-[0.3em] mb-6 uppercase font-black">
                        {CATEGORY_LABEL[grpId]}
                      </div>
                      <div className="flex flex-col">
                        {grpSkills.map((skill, i) => (
                          <SkillRow key={skill.name} skill={skill} i={i} language={language} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div>
                <div className="text-[0.7rem] text-[var(--color-text-dim)] tracking-[0.3em] mb-6 uppercase font-black">
                  {CATEGORY_LABEL[active]}
                </div>
                <div className="flex flex-col">
                  {filtered.map((skill, i) => (
                    <SkillRow key={skill.name} skill={skill} i={i} language={language} />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Bottom line */}
        <div className="w-full h-px bg-gray-200 dark:bg-[#1e1e1e] mb-6" />
        <div className="flex items-center gap-3 text-[0.75rem] text-[var(--color-text-dim)]">
          <span className="text-accent font-black">joao@portfolio</span>
          <span>:~/skills$</span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1.1 }}
            className="inline-block w-2 h-4 bg-[var(--color-text-primary)] align-middle"
          />
        </div>

        {/* Areas of Exploration */}
        <motion.div className="w-full" style={{ marginTop: 'clamp(40px, 8vw, 80px)' }}>
          <div className="meta-label mb-8 md:mb-16 text-[var(--color-text-dim)]">{t('pulse.areas_label')}</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 lg:gap-24">
            {AREAS.map((area, i) => (
              <div key={i} className="flex flex-col gap-5 py-2 transition-colors group">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[0.65rem] font-bold text-accent tracking-[0.2em] uppercase">{t(area.labelKey)}</span>
                </div>
                <p className="text-[var(--color-text-primary)] font-bold font-mono text-xl lg:text-2xl uppercase tracking-tighter leading-tight group-hover:text-accent transition-colors">
                  {t(area.textKey)}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

function SkillRow({ skill, i, language }) {
  const note = language === 'pt' ? skill.note_pt : skill.note_en;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, delay: i * 0.04 }}
      className="group flex flex-col md:flex-row md:items-baseline border-b border-[var(--color-border-subtle)] py-6 md:py-8 hover:bg-transparent transition-colors cursor-default"
    >
      {/* Mobile Top Row / Desktop Left Column */}
      <div className="flex items-center md:items-baseline justify-between md:justify-start w-full md:w-auto mb-2 md:mb-0">
        <div className="flex items-baseline">
          <span className="text-[var(--color-text-muted)] text-[0.75rem] w-6 md:w-8 shrink-0 select-none group-hover:text-accent dark:group-hover:text-accent transition-colors">→</span>
          <span className="text-[1rem] md:text-[1.1rem] font-black text-[var(--color-text-primary)] uppercase tracking-tight group-hover:text-accent dark:group-hover:text-accent transition-colors md:w-[15rem] shrink-0">
            {skill.name}
          </span>
        </div>
        
        {/* Mobile-only Badge */}
        <span className="md:hidden border border-[var(--color-border-subtle)] text-[var(--color-text-dim)] group-hover:border-accent group-hover:text-accent text-[0.55rem] font-black tracking-[0.1em] uppercase px-2 py-0.5 whitespace-nowrap ml-4 transition-colors">
          {skill.meta}
        </span>
      </div>

      {/* Desktop-only Meta Column */}
      <span className="text-[0.7rem] text-[var(--color-text-dim)] w-32 shrink-0 hidden md:block">
        {skill.meta}
      </span>

      {/* Description */}
      <span className="text-[0.8rem] text-[var(--color-text-dim)] leading-snug group-hover:text-[var(--color-text-primary)] transition-colors pl-6 md:pl-0 mt-1 md:mt-0 flex-1">
        {note}
      </span>
    </motion.div>
  );
}

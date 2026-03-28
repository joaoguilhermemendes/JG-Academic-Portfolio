import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const LINKS = [
  { labelKey: 'contact.github_meta',   href: 'https://github.com/joaoguilhermemendes',          label: 'GitHub' },
  { labelKey: 'contact.linkedin_meta', href: 'https://www.linkedin.com/in/joao-guilherme-mendes/', label: 'LinkedIn' },
  { labelKey: 'contact.lattes_meta',   href: 'https://lattes.cnpq.br/9460711429082348',           label: 'Lattes' },
  { labelKey: 'contact.email_meta',    href: 'mailto:joaoguilhermemendes@id.uff.br',              label: 'Email' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function Contact() {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="bg-white dark:bg-[#0a0a0a] transition-colors duration-300" style={{ paddingTop: '130px', paddingBottom: '20vh' }}>
      <div className="container-main">
        {/* Header */}
        <motion.div {...fadeUp(0)} className="flex items-end justify-between" style={{ marginBottom: '30px' }}>
          <div>
            <div className="meta-label mb-2 text-accent font-bold tracking-[0.3em] text-[0.65rem]">{t('contact.section_label')}</div>
            <h2 className="text-4xl md:text-6xl font-bold font-mono tracking-tighter text-black dark:text-white uppercase leading-tight">
              {t('contact.title')} <span className="text-accent italic">{t('contact.title_accent')}</span>
            </h2>
          </div>
          <div className="meta-label text-gray-400 dark:text-gray-800 hidden md:block text-[0.6rem] tracking-[0.2em] font-bold">{t('contact.collab')}</div>
        </motion.div>

        {/* Contact links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
          {LINKS.map((link, i) => (
            <motion.a
              key={link.label}
              {...fadeUp(0.1 + i * 0.1)}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col gap-4 py-2 transition-all"
            >
              <div className="font-mono text-[0.65rem] text-gray-500 dark:text-gray-600 tracking-[0.3em] font-black uppercase group-hover:text-accent dark:group-hover:text-accent transition-colors">
                {link.label}
              </div>
              <div className="font-mono text-2xl md:text-3xl font-black text-black dark:text-white tracking-tighter group-hover:text-accent dark:group-hover:text-accent transition-colors truncate">
                {t(link.labelKey)}
              </div>
            </motion.a>
          ))}
        </div>

        {/* Spacer */}
        <div style={{ height: '200px' }} />

        {/* Footer bar */}
        <motion.div
          {...fadeUp(0.5)}
          className="flex flex-col md:flex-row justify-between items-center gap-12 pt-12 border-t border-gray-100 dark:border-[#222]"
          style={{ marginTop: '0' }}
        >
          <div className="font-mono text-[0.65rem] text-gray-500 dark:text-gray-600 tracking-[0.2em] font-bold">
            {t('contact.footer')}
          </div>
          <div className="font-mono text-[0.6rem] text-gray-500 dark:text-gray-600 tracking-[0.2em] flex items-center gap-8">
            <span className="text-accent font-bold">{t('contact.university')}</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

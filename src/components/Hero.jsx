import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

const RAW_CODE = `import numpy as np
import pandas as pd
from core import DataEngine

def extract_truth(raw_data):
    # Initialize robust analysis engine
    model = DataEngine(mode='rigorous')
    
    # Isolate signal from chaotic noise
    signal = model.fit_transform(raw_data)
    
    if signal.is_valid():
        return signal.optimize()
        
    return None

# EOF. System awaiting data...`;

function highlightPython(code) {
  let html = code;
  // Highlight Python keywords in blue
  const keywords = ['import', 'from', 'def', 'if', 'return', 'None'];
  keywords.forEach(kw => {
    const reg = new RegExp(`\\b${kw}\\b`, 'g');
    html = html.replace(reg, `<span class="text-accent font-bold">${kw}</span>`);
  });
  // Highlight comments
  html = html.replace(/(#.*)/g, '<span class="opacity-50 italic">$1</span>');
  return html;
}

function TypingScript() {
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout;
    if (isTyping && text.length < RAW_CODE.length) {
      // Randomize typing speed for realism (10ms to 40ms)
      const delay = Math.random() * 30 + 10;
      timeout = setTimeout(() => {
        setText(RAW_CODE.slice(0, text.length + 1));
      }, delay);
    } else if (text.length === RAW_CODE.length) {
      setIsTyping(false);
      // Wait a few seconds, then clear and restart
      timeout = setTimeout(() => {
        setText('');
        setIsTyping(true);
      }, 6000);
    }
    return () => clearTimeout(timeout);
  }, [text, isTyping]);

  return (
    <div className="w-full max-w-[420px] h-[320px] bg-transparent pl-4 relative flex flex-col justify-center pointer-events-none select-none">
      <pre className="font-mono text-[0.65rem] md:text-xs text-[var(--color-text-dim)] whitespace-pre-wrap break-all leading-relaxed">
        <code dangerouslySetInnerHTML={{ __html: highlightPython(text) }} />
        <span className={`inline-block w-[8px] h-[14px] bg-accent align-middle ml-1 ${!isTyping ? 'animate-pulse' : ''}`} />
      </pre>
    </div>
  );
}

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="hero" className="min-h-[100svh] flex flex-col" style={{ paddingTop: 'clamp(80px, 15vw, 130px)', paddingBottom: 'clamp(60px, 12vw, 130px)' }}>
      <div className="container-main flex-1 flex flex-col w-full">
        
        {/* Vertically Centered Main Content Split */}
        <div className="flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center py-12">
          
          {/* Left Text Base */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            
            <motion.div {...fadeUp(0)} className="meta-label inline-block text-gray-400" style={{ marginBottom: 'clamp(24px, 5vw, 48px)' }}>
               {t('hero.student')}
            </motion.div>

            <div className="flex flex-col gap-8 md:gap-16 lg:gap-24 items-start">
              <div className="max-w-[85ch]">
                <motion.h1 
                  {...fadeUp(0.1)}
                  className="text-[3rem] sm:text-[4.5rem] md:text-[7.5rem] leading-[0.85] font-bold text-[var(--color-text-primary)] mb-6 md:mb-12"
                  style={{ letterSpacing: '-0.06em' }}
                >
                  João<br />Guilherme<br />Mendes<span className="text-accent">.</span>
                </motion.h1>

                <motion.p {...fadeUp(0.2)} className="text-base md:text-xl lg:text-2xl font-normal text-[var(--color-text-muted)] leading-snug md:leading-tight mb-0 max-w-[38ch]" dangerouslySetInnerHTML={{ __html: t('hero.description') }} />
                
                <motion.div {...fadeUp(0.3)} className="flex flex-wrap items-center gap-4 sm:gap-8 md:gap-12" style={{ marginTop: 'clamp(24px, 5vw, 48px)' }}>
                  <a href="/CV.pdf" target="_blank" rel="noreferrer" className="btn-cv text-[0.8rem] px-6 py-3 font-mono tracking-widest font-bold transition-all uppercase cursor-pointer">
                    {t('hero.download_cv')}
                  </a>
                  <a href="https://github.com/joaoguilhermemendes" target="_blank" rel="noreferrer" className="text-[0.8rem] font-mono tracking-widest font-bold text-[var(--color-text-dim)] hover:text-[var(--color-text-primary)] transition-all uppercase">
                    GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/joao-guilherme-mendes/" target="_blank" rel="noreferrer" className="text-[0.8rem] font-mono tracking-widest font-bold text-[var(--color-text-dim)] hover:text-[var(--color-text-primary)] transition-all uppercase">
                    LinkedIn
                  </a>
                  <a href="#lab" className="text-[0.8rem] font-mono tracking-widest font-bold text-accent hover:text-black transition-all uppercase">
                    {t('nav.projects')} ↓
                  </a>
                </motion.div>
              </div>
            </div>

          </div>

          {/* Right Interactive Hero Graphic */}
          <motion.div {...fadeUp(0.6)} className="hidden lg:flex lg:col-span-4 h-full w-full justify-end items-center relative">
             <TypingScript />
          </motion.div>

        </div>

        {/* Metadata Horizontal Bar (Locked to Bottom) */}
        <motion.div {...fadeUp(0.25)} className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 pt-8 md:pt-10 border-t border-[var(--color-border-subtle)] mt-auto">
          <div>
            <div className="meta-label mb-3 text-accent tracking-[0.3em]">{t('hero.current_node')}</div>
            <div className="text-[0.65rem] md:text-xs text-[var(--color-text-primary)] font-bold uppercase tracking-widest mb-1">Universidade Federal Fluminense (UFF)</div>
            <div className="text-[0.65rem] text-[var(--color-text-dim)] font-mono italic">BSc Computer Science</div>
          </div>
          <div>
            <div className="meta-label mb-3 text-accent tracking-[0.3em]">{t('hero.status')}</div>
            <div className="flex items-center gap-4">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse shrink-0" />
              <span className="text-[0.65rem] md:text-xs text-[var(--color-text-primary)] font-bold uppercase tracking-widest">{t('hero.seeking')}</span>
            </div>
          </div>
          <div>
             <div className="meta-label mb-3 text-accent tracking-[0.3em]">{t('hero.location')}</div>
             <div className="text-[0.65rem] md:text-xs text-[var(--color-text-primary)] font-bold uppercase tracking-widest">Rio de Janeiro, Brasil</div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}

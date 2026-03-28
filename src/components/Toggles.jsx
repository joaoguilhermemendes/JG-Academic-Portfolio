import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

export default function Toggles() {
  const { lang, toggleLanguage } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="fixed bottom-5 right-4 z-50 flex flex-col gap-2">
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-black border-2 border-black dark:border-white shadow-[3px_3px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center cursor-pointer group"
        aria-label="Toggle Theme"
      >
        <span className="text-base md:text-lg text-[var(--color-text-primary)] group-hover:text-accent leading-none">
          {isDark ? '☀' : '☾'}
        </span>
      </button>

      {/* Language Toggle */}
      <button
        onClick={toggleLanguage}
        className="w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-black border-2 border-black dark:border-white shadow-[3px_3px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center cursor-pointer group"
        aria-label="Toggle Language"
      >
        <span className="font-mono text-[0.65rem] md:text-xs font-bold text-[var(--color-text-primary)] group-hover:text-accent">
          {lang === 'en' ? 'PT' : 'EN'}
        </span>
      </button>
    </div>
  );
}

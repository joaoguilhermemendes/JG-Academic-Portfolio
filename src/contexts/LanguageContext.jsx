import React, { createContext, useContext, useEffect, useState } from 'react';
import en from '../locales/en.json';
import pt from '../locales/pt.json';

const LanguageContext = createContext();
const translations = { en, pt };

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const saved = localStorage.getItem('locale');
    if (saved === 'en' || saved === 'pt') {
      setLang(saved);
    }
    // If no saved preference, default stays 'en' (set in useState)
  }, []);

  const toggleLanguage = () => {
    setLang(prev => {
      const next = prev === 'en' ? 'pt' : 'en';
      localStorage.setItem('locale', next);
      return next;
    });
  };

  const t = (key) => {
    const value = translations[lang] && translations[lang][key];
    return value !== undefined ? value : key; // Fallback to key if unmapped
  };

  return (
    <LanguageContext.Provider value={{ lang, language: lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);

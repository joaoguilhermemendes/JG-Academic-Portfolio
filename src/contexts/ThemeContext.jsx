import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

// Determine initial state synchronously from localStorage to avoid FOUC
function getInitialTheme() {
  try {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  } catch {
    return false; // Default: light
  }
}

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(getInitialTheme);

  // Apply / remove the class on <html> every time isDark changes
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => {
      const next = !prev;
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

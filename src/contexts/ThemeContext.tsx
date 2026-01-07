import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type ContrastMode = 'normal' | 'high';

interface ThemeContextType {
  theme: Theme;
  contrastMode: ContrastMode;
  setTheme: (theme: Theme) => void;
  setContrastMode: (mode: ContrastMode) => void;
  toggleTheme: () => void;
  toggleContrast: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme') as Theme;
      if (stored) return stored;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const [contrastMode, setContrastModeState] = useState<ContrastMode>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('contrastMode') as ContrastMode;
      if (stored) return stored;
      return window.matchMedia('(prefers-contrast: more)').matches ? 'high' : 'normal';
    }
    return 'normal';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove existing classes
    root.classList.remove('light', 'dark', 'high-contrast');
    
    // Apply theme
    root.classList.add(theme);
    
    // Apply high contrast if enabled
    if (contrastMode === 'high') {
      root.classList.add('high-contrast');
    }
    
    // Store preferences
    localStorage.setItem('theme', theme);
    localStorage.setItem('contrastMode', contrastMode);
  }, [theme, contrastMode]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const setContrastMode = (mode: ContrastMode) => {
    setContrastModeState(mode);
  };

  const toggleTheme = () => {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleContrast = () => {
    setContrastModeState(prev => prev === 'normal' ? 'high' : 'normal');
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      contrastMode, 
      setTheme, 
      setContrastMode, 
      toggleTheme, 
      toggleContrast 
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

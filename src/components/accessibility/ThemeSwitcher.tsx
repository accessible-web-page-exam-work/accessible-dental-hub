import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon, Contrast } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ThemeSwitcher() {
  const { theme, contrastMode, toggleTheme, toggleContrast } = useTheme();

  return (
    <div 
      className="flex items-center gap-2"
      role="group"
      aria-label="Theme settings"
    >
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode. Currently ${theme} mode`}
        aria-pressed={theme === 'dark'}
        className="min-h-touch min-w-touch"
      >
        {theme === 'light' ? (
          <Moon className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Sun className="h-5 w-5" aria-hidden="true" />
        )}
      </Button>
      
      <Button
        variant={contrastMode === 'high' ? 'default' : 'outline'}
        size="icon"
        onClick={toggleContrast}
        aria-label={`${contrastMode === 'high' ? 'Disable' : 'Enable'} high contrast mode. Currently ${contrastMode === 'high' ? 'enabled' : 'disabled'}`}
        aria-pressed={contrastMode === 'high'}
        className="min-h-touch min-w-touch"
      >
        <Contrast className="h-5 w-5" aria-hidden="true" />
      </Button>
    </div>
  );
}

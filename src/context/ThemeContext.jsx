import React from 'react';
import { useLocalStorage } from '../hooks';

const ThemeContext = React.createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage('dashboard_theme', 'light');
  const [colorScheme, setColorScheme] = useLocalStorage('dashboard_color_scheme', 'blue');

  // Apply theme to document
  React.useEffect(() => {
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Toggle theme
  const toggleTheme = React.useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, [setTheme]);

  // Set specific theme
  const setThemeMode = React.useCallback(
    (mode) => {
      if (['light', 'dark', 'auto'].includes(mode)) {
        setTheme(mode);
      }
    },
    [setTheme]
  );

  // Change color scheme
  const changeColorScheme = React.useCallback(
    (scheme) => {
      setColorScheme(scheme);
    },
    [setColorScheme]
  );

  // Get system preference
  const getSystemTheme = React.useCallback(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  }, []);

  // Auto theme based on system
  React.useEffect(() => {
    if (theme === 'auto') {
      const systemTheme = getSystemTheme();
      const root = document.documentElement;

      if (systemTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }

      // Listen for system theme changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e) => {
        if (theme === 'auto') {
          if (e.matches) {
            root.classList.add('dark');
          } else {
            root.classList.remove('dark');
          }
        }
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme, getSystemTheme]);

  const value = React.useMemo(
    () => ({
      theme,
      colorScheme,
      toggleTheme,
      setThemeMode,
      changeColorScheme,
      isDark: theme === 'dark' || (theme === 'auto' && getSystemTheme() === 'dark'),
    }),
    [theme, colorScheme, toggleTheme, setThemeMode, changeColorScheme, getSystemTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

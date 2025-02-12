import { useState, useEffect } from 'react';
import { ThemeContext } from './ThemeContext';

// eslint-disable-next-line react/prop-types
export const ThemeProvider = ({ children }) => {
  // Lee el valor inicial de localStorage o usa el valor por defecto
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  // Guarda el tema en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Alterna entre modos claro y oscuro
  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {/* Clase global para manejar Tailwind */}
      <div className={darkMode ? 'dark' : ''}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};


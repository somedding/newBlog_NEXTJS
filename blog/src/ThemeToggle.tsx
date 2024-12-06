'use client';

import { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-ghost btn-sm btn-circle"
      aria-label="테마 변경"
    >
      {theme === 'light' ? (
        <FiSun className="w-4 h-4 sm:w-5 sm:h-5" />
      ) : (
        <FiMoon className="w-4 h-4 sm:w-5 sm:h-5" />
      )}
    </button>
  );
}
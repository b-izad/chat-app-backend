// src/components/DarkModeToggle.js
import React, { useState } from 'react';
import '../styles/DarkModeToggle.css';

function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode', !isDarkMode);
  };

  return (
    <button onClick={toggleDarkMode} className="dark-mode-toggle">
      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}

export default DarkModeToggle;

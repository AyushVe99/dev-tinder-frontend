import React, { useState } from 'react';

const Theme = () => {
  // Track the current theme
  const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('theme') || 'default');

  // Handle theme change
  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
    localStorage.setItem('theme', theme); // Store the theme in localStorage for persistence

    // Change the class on the <body> to apply the selected theme
    document.body.className = ''; // Reset any existing theme classes
    document.body.classList.add(`theme-${theme}`);
  };

  return (
    <div className="dropdown mb-2">
      <div tabIndex={0} role="button" className="btn m-1">
        Theme
        <svg
          width="12px"
          height="12px"
          className="inline-block h-2 w-2 fill-current opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>
      <ul tabIndex={0} className="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl">
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Default"
            value="default"
            checked={currentTheme === 'default'}
            onChange={() => handleThemeChange('default')}
          />
         
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Retro"
            value="retro"
            checked={currentTheme === 'retro'}
            onChange={() => handleThemeChange('retro')}
          />
       
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Cyberpunk"
            value="cyberpunk"
            checked={currentTheme === 'cyberpunk'}
            onChange={() => handleThemeChange('cyberpunk')}
          />
          
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Valentine"
            value="valentine"
            checked={currentTheme === 'valentine'}
            onChange={() => handleThemeChange('valentine')}
          />
        </li>
        <li>
          <input
            type="radio"
            name="theme-dropdown"
            className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
            aria-label="Aqua"
            value="aqua"
            checked={currentTheme === 'aqua'}
            onChange={() => handleThemeChange('aqua')}
          />
        </li>
      </ul>
    </div>
  );
};

export default Theme;

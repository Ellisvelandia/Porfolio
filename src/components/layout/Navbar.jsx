import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudMoon, faCloudSun } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'About', path: '/about' },
    { name: 'Skillset', path: '/skillset' },
    { name: 'Projects', path: '/projects' },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="text-2xl font-bold transition-colors duration-200"
          >
            <span className="text-blue-600">E</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`${
                  isActive(item.path)
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                } transition-colors duration-200`}
              >
                {item.name}
              </Link>
            ))}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <FontAwesomeIcon 
                icon={isDark ? faCloudSun : faCloudMoon} 
                className="text-gray-700 dark:text-gray-300"
              />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <span className="sr-only">Open menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsOpen(false)} />
            
            {/* Menu */}
            <div className="fixed inset-0 z-50">
              <div 
                className="h-screen w-screen p-8"
                style={{
                  backgroundImage: `url(${isDark ? '/wall.jpg' : '/menu.jpg'})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundColor: isDark ? 'rgb(17, 24, 39)' : 'white'
                }}
              >
                <div className="flex justify-end mb-6">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:text-gray-200 bg-black bg-opacity-30 rounded-full p-2"
                  >
                    <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                <div className="space-y-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`${
                        isActive(item.path)
                          ? isDark 
                            ? 'text-blue-400 bg-black bg-opacity-50'
                            : 'text-blue-600 bg-white bg-opacity-70'
                          : isDark
                            ? 'text-white hover:text-blue-300 hover:bg-black hover:bg-opacity-50'
                            : 'text-gray-800 hover:text-blue-600 hover:bg-white hover:bg-opacity-70'
                      } block px-6 py-3 rounded-lg text-xl font-semibold transition-all duration-200 backdrop-blur-sm`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <button
                    onClick={toggleTheme}
                    className={`w-full text-left px-6 py-3 rounded-lg text-xl font-semibold ${
                      isDark 
                        ? 'text-white hover:text-blue-300 hover:bg-black hover:bg-opacity-50' 
                        : 'text-gray-800 hover:text-blue-600 hover:bg-white hover:bg-opacity-70'
                    } transition-all duration-200 backdrop-blur-sm`}
                  >
                    <FontAwesomeIcon 
                      icon={isDark ? faCloudSun : faCloudMoon} 
                      className="mr-3"
                    />
                    {isDark ? 'Light Mode' : 'Dark Mode'}
                  </button>
                </div>  
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
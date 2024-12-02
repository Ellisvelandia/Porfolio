import React, { useState, useRef, useLayoutEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudMoon, faCloudSun, faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../context/ThemeContext';
import { gsap } from 'gsap';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef(null);
  const menuRef = useRef(null);
  const menuItemsRef = useRef([]);
  const closeButtonRef = useRef(null);
  const menuToggleRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate menu toggle button
      gsap.to(menuToggleRef.current, {
        rotation: isOpen ? 90 : 0,
        scale: isOpen ? 0.8 : 1,
        duration: 0.3,
        ease: "back.out(2)"
      });

      if (isOpen) {
        // Animate overlay
        gsap.to(overlayRef.current, {
          opacity: 0.5,
          duration: 0.3,
          ease: "power2.out"
        });

        // Animate menu container
        gsap.fromTo(menuRef.current,
          { x: "100%" },
          { x: "0%", duration: 0.5, ease: "power2.out" }
        );

        // Animate close button with rotation
        gsap.fromTo(closeButtonRef.current,
          { rotation: -180, opacity: 0 },
          { 
            rotation: 0, 
            opacity: 1, 
            duration: 0.5, 
            ease: "back.out(1.7)",
            delay: 0.2 
          }
        );

        // Animate menu items
        gsap.fromTo(menuItemsRef.current,
          { x: 50, opacity: 0 },
          { 
            x: 0, 
            opacity: 1, 
            duration: 0.4,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.2
          }
        );
      } else {
        // Reverse animations when closing
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in"
        });

        gsap.to(menuRef.current, {
          x: "100%",
          duration: 0.5,
          ease: "power2.in"
        });
      }
    });

    return () => ctx.revert();
  }, [isOpen]);

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
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-2xl font-bold transition-colors duration-200"
            >
              <span className="text-blue-600">E</span>
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex md:flex-1 md:justify-center md:items-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`mx-4 px-3 py-2 ${
                  isActive(item.path)
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                } transition-colors duration-200`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Theme Toggle and Mobile Menu - Right Aligned */}
          <div className="flex items-center">
            <button
              onClick={toggleTheme}
              className="hidden md:block p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <FontAwesomeIcon 
                icon={isDark ? faCloudSun : faCloudMoon} 
                className="text-gray-700 dark:text-gray-300"
              />
            </button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                ref={menuToggleRef}
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 w-10 h-10 flex items-center justify-center relative"
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                <div className="relative w-6 h-6">
                  <FontAwesomeIcon
                    icon={isOpen ? faTimes : faBars}
                    className={`absolute inset-0 transform transition-all duration-300 ${
                      isOpen 
                        ? 'rotate-0 scale-100 opacity-100' 
                        : 'rotate-180 scale-50 opacity-0'
                    }`}
                  />
                  <FontAwesomeIcon
                    icon={!isOpen ? faBars : faTimes}
                    className={`absolute inset-0 transform transition-all duration-300 ${
                      !isOpen 
                        ? 'rotate-0 scale-100 opacity-100' 
                        : '-rotate-180 scale-50 opacity-0'
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <>
            {/* Overlay */}
            <div 
              ref={overlayRef}
              className="fixed inset-0 bg-black opacity-0 z-40" 
              onClick={() => setIsOpen(false)} 
            />
            
            {/* Menu */}
            <div 
              ref={menuRef}
              className="fixed inset-0 z-50"
              style={{ transform: 'translateX(100%)' }}
            >
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
                    ref={closeButtonRef}
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:text-gray-200 bg-black bg-opacity-30 rounded-full p-2 w-10 h-10 flex items-center justify-center"
                  >
                    <FontAwesomeIcon icon={faTimes} className="text-xl" />
                  </button>
                </div>
                <div className="space-y-6">
                  {navItems.map((item, index) => (
                    <Link
                      key={item.name}
                      ref={el => menuItemsRef.current[index] = el}
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
                      } block px-6 py-3 rounded-lg text-xl font-semibold backdrop-blur-sm`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <button
                    ref={el => menuItemsRef.current[navItems.length] = el}
                    onClick={toggleTheme}
                    className={`w-full text-left px-6 py-3 rounded-lg text-xl font-semibold ${
                      isDark 
                        ? 'text-white hover:text-blue-300 hover:bg-black hover:bg-opacity-50' 
                        : 'text-gray-800 hover:text-blue-600 hover:bg-white hover:bg-opacity-70'
                    } backdrop-blur-sm`}
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
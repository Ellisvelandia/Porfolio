import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudMoon, faCloudSun, faTimes, faBars, faCode, faUser, faLaptopCode, faDiagramProject, faHome } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../context/ThemeContext';
import gsap from 'gsap';
import { NAV_ITEMS, SOCIAL_LINKS } from '../../constants';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef(null);
  const menuRef = useRef(null);
  const menuItemsRef = useRef([]);
  const closeButtonRef = useRef(null);
  const menuToggleRef = useRef(null);

  useEffect(() => {
    if (!menuToggleRef.current) return;

    const tl = gsap.timeline({ paused: true });

    tl.to(menuToggleRef.current, {
      rotation: isOpen ? 90 : 0,
      scale: isOpen ? 0.8 : 1,
      duration: 0.3,
      ease: "back.out(2)"
    });

    if (isOpen && overlayRef.current && menuRef.current && menuItemsRef.current) {
      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      }, 0);

      tl.fromTo(menuRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        0
      );

      menuItemsRef.current.forEach((item, index) => {
        if (item) {
          tl.fromTo(item,
            { x: 20, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.4,
              ease: "power2.out"
            },
            0.1 + index * 0.05
          );
        }
      });
    } else if (!isOpen && overlayRef.current && menuRef.current) {
      tl.to([overlayRef.current, menuRef.current], {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
      }, 0);
    }

    tl.play();

    return () => {
      tl.kill();
    };
  }, [isOpen]);

  const navItems = NAV_ITEMS;
  const socialLinks = SOCIAL_LINKS;

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-200 backdrop-blur-md border-b dark:border-[#00FF00]/20 border-gray-200/30 bg-white/75 dark:bg-black/75">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link 
                to="/" 
                className="flex items-center space-x-2 transition-colors duration-200 dark:text-[#00FF00] text-gray-900"
              >
                <FontAwesomeIcon icon={faCode} className="text-xl" />
                <span className="font-mono font-bold text-xs md:text-base tracking-wider">ELLIS</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-all duration-200 
                    ${location.pathname === item.path 
                      ? 'dark:text-[#00FF00] text-blue-600' 
                      : 'dark:text-gray-300 text-gray-600 dark:hover:text-[#00FF00] hover:text-blue-600'
                    }`}
                >
                  <FontAwesomeIcon 
                    icon={item.icon} 
                    className="text-sm"
                  />
                  <span className="ml-2">{item.name}</span>
                </Link>
              ))}
              <button
                onClick={toggleTheme}
                className="p-2 transition-all duration-200 rounded-lg dark:text-[#00FF00] text-gray-600 dark:hover:bg-[#00FF00]/10 hover:bg-gray-100"
                aria-label="Toggle theme"
              >
                <FontAwesomeIcon 
                  icon={theme === 'dark' ? faCloudMoon : faCloudSun} 
                  className="text-xl"
                />
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                ref={menuToggleRef}
                onClick={() => setIsOpen(true)}
                className="p-2 transition-colors duration-200 dark:text-[#00FF00] text-gray-600"
                aria-label="Open menu"
              >
                <FontAwesomeIcon icon={faBars} className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="md:hidden">
          <div
            ref={overlayRef}
            className={`fixed inset-0 z-50 transition-opacity duration-300 ${
              theme === 'dark' ? 'bg-black/90' : 'bg-white/95'
            } backdrop-blur-md`}
          >
            <div
              ref={menuRef}
              className="min-h-screen flex flex-col"
            >
              {/* Header */}
              <div className={`flex justify-between items-center p-6 ${
                theme === 'dark' ? 'border-b border-[#00FF00]/20' : 'border-b border-gray-200'
              }`}>
                <div className="flex items-center space-x-3">
                  <FontAwesomeIcon 
                    icon={faCode} 
                    className={theme === 'dark' ? 'text-[#00FF00]/90' : 'text-gray-900'} 
                  />
                  <span className={`font-mono font-bold tracking-wider ${
                    theme === 'dark' ? 'text-[#00FF00]/90' : 'text-gray-900'
                  }`}>
                    ELLIS
                  </span>
                </div>
                <button
                  ref={closeButtonRef}
                  onClick={() => setIsOpen(false)}
                  className={`p-2 transition-all duration-200 hover:rotate-90 transform ${
                    theme === 'dark' 
                      ? 'text-[#00FF00]/80 hover:text-[#00FF00]' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  aria-label="Close menu"
                >
                  <FontAwesomeIcon icon={faTimes} className="text-xl" />
                </button>
              </div>

              {/* Menu items */}
              <div className="flex-1 px-6 py-8 overflow-y-auto">
                <div className="space-y-2">
                  {navItems.map((item, index) => (
                    <Link
                      key={item.path}
                      ref={(el) => (menuItemsRef.current[index] = el)}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`group flex items-center space-x-4 p-4 rounded-lg transition-all duration-200 ${
                        isActive(item.path)
                          ? theme === 'dark'
                            ? 'text-[#00FF00] bg-[#00FF00]/5'
                            : 'text-black bg-gray-100'
                          : theme === 'dark'
                            ? 'text-[#00FF00]/60 hover:text-[#00FF00] hover:bg-[#00FF00]/5'
                            : 'text-gray-700 hover:text-black hover:bg-gray-50'
                      }`}
                    >
                      <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                        isActive(item.path)
                          ? theme === 'dark'
                            ? 'bg-[#00FF00]/5'
                            : 'bg-gray-200'
                          : theme === 'dark'
                            ? 'bg-gray-900'
                            : 'bg-gray-100'
                      }`}>
                        <FontAwesomeIcon 
                          icon={item.icon} 
                          className={`text-lg ${
                            isActive(item.path)
                              ? theme === 'dark'
                                ? 'text-[#00FF00]'
                                : 'text-black'
                              : 'group-hover:text-current'
                          }`}
                        />
                      </div>
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  ))}
                </div>

                {/* Theme toggle */}
                <button
                  onClick={() => {
                    toggleTheme();
                    setIsOpen(false);
                  }}
                  className={`mt-6 w-full group flex items-center space-x-4 p-4 rounded-lg transition-all duration-200 ${
                    theme === 'dark'
                      ? 'text-[#00FF00]/60 hover:text-[#00FF00] hover:bg-[#00FF00]/5'
                      : 'text-gray-700 hover:text-black hover:bg-gray-50'
                  }`}
                >
                  <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
                  }`}>
                    <FontAwesomeIcon
                      icon={theme === 'dark' ? faCloudMoon : faCloudSun}
                      className="text-lg"
                    />
                  </div>
                  <span className="font-medium">
                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                  </span>
                </button>
              </div>

              {/* Footer with social links */}
              <div className={`p-6 ${
                theme === 'dark' ? 'border-t border-[#00FF00]/20' : 'border-t border-gray-200'
              }`}>
                <div className="flex justify-center space-x-6">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 transition-colors duration-200 ${
                        theme === 'dark'
                          ? 'text-[#00FF00]/60 hover:text-[#00FF00]'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <FontAwesomeIcon icon={link.icon} className="text-xl" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
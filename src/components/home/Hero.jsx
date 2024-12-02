import React, { useEffect, useRef, useLayoutEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

// Register GSAP plugins
gsap.registerPlugin(TextPlugin, ScrollTrigger);

const Hero = () => {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const socialsRef = useRef(null);
  const highlightRef = useRef(null);
  const terminalRef = useRef(null);
  const containerRef = useRef(null);
  const ctx = useRef();
  const { theme } = useTheme();

  const socialLinks = [
    { icon: faGithub, url: 'https://github.com/Ellisvelandia', label: 'GitHub', external: true },
    { icon: faLinkedin, url: 'https://linkedin.com/in/ellisvelandia', label: 'LinkedIn', external: true },
    { icon: faEnvelope, url: '/contact', label: 'Contact', external: false },
  ];

  // Create GSAP context
  useLayoutEffect(() => {
    ctx.current = gsap.context(() => {}, containerRef);
    return () => ctx.current.revert();
  }, []);

  useEffect(() => {
    if (!ctx.current) return;

    ctx.current.add(() => {
      const tl = gsap.timeline({ 
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
        }
      });

      // Simulate terminal typing effect
      if (terminalRef.current) {
        tl.to(terminalRef.current, {
          text: {
            value: "> Initializing system...\n> Loading profile...\n> Access granted...",
            delimiter: ""
          },
          duration: 2,
          ease: "none",
        });
      }

      if (titleRef.current) {
        tl.fromTo(titleRef.current,
          { 
            opacity: 0,
            filter: 'blur(10px)',
            textShadow: theme === 'dark' 
              ? '0 0 20px rgba(0, 255, 140, 0)'
              : '0 0 20px rgba(0, 179, 127, 0)'
          },
          { 
            opacity: 1,
            filter: 'blur(0px)',
            textShadow: theme === 'dark'
              ? '0 0 20px rgba(0, 255, 140, 0.5)'
              : '0 0 20px rgba(0, 179, 127, 0.5)',
            duration: 1.5
          }
        );
      }

      if (descriptionRef.current) {
        tl.fromTo(descriptionRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          '-=0.5'
        );
      }

      if (socialsRef.current?.children) {
        tl.fromTo(socialsRef.current.children,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.2, duration: 0.8 },
          '-=0.5'
        );
      }

      if (highlightRef.current) {
        tl.to(highlightRef.current,
          { 
            color: theme === 'dark' ? '#00FF8C' : '#00B37F',
            textShadow: theme === 'dark'
              ? '0 0 10px rgba(0, 255, 140, 0.7)'
              : '0 0 10px rgba(0, 179, 127, 0.7)',
            duration: 1,
            repeat: -1,
            yoyo: true
          },
          '-=0.5'
        );
      }
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      if (ctx.current) {
        ctx.current.revert();
      }
    };
  }, [theme]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Terminal Text */}
      <div 
        ref={terminalRef}
        className={`absolute top-1/4 left-8 font-mono ${
          theme === 'dark' ? 'text-matrix-accent-dark' : 'text-matrix-accent-light'
        } text-sm whitespace-pre`}
        style={{ 
          textShadow: theme === 'dark'
            ? '0 0 10px rgba(0, 255, 140, 0.3)'
            : '0 0 10px rgba(0, 179, 127, 0.3)'
        }}
      ></div>

      <div className="relative max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center z-10">
        <h1 
          ref={titleRef}
          className={`text-5xl md:text-7xl font-bold mb-8 ${
            theme === 'dark' ? 'text-matrix-accent-dark' : 'text-matrix-accent-light'
          }`}
          style={{ 
            fontFamily: "'Share Tech Mono', monospace",
            letterSpacing: '0.05em',
            opacity: 0 // Set initial opacity
          }}
        >
          Ellis Velandia Caicedo
        </h1>

        <div 
          ref={descriptionRef}
          className={`text-xl md:text-2xl mb-12 ${
            theme === 'dark' ? 'text-matrix-text-dark' : 'text-matrix-text-light'
          } space-y-6 font-light`}
          style={{ opacity: 0 }} // Set initial opacity
        >
          <p className="leading-relaxed">
            I am a <span ref={highlightRef} className="font-medium transition-all duration-300">Software Developer from Colombia</span>, 
            currently working as an intern at HDI/Liberty Seguros on real-world software projects.
          </p>
          <p className="leading-relaxed max-w-3xl mx-auto">
            Passionate about creating intuitive web experiences and solving complex problems using 
            <span className={theme === 'dark' ? 'text-matrix-accent-dark' : 'text-matrix-accent-light'}> React</span>,
            <span className={theme === 'dark' ? 'text-matrix-accent-dark' : 'text-matrix-accent-light'}> Node.js</span>,
            <span className={theme === 'dark' ? 'text-matrix-accent-dark' : 'text-matrix-accent-light'}> JavaScript</span>, 
            and modern web development technologies.
          </p>
        </div>

        <div 
          ref={socialsRef}
          className="flex justify-center items-center space-x-8"
        >
          {socialLinks.map((link, index) => (
            link.external ? (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-4"
                aria-label={link.label}
                style={{ opacity: 0 }} // Set initial opacity
              >
                <span className={`absolute inset-0 w-full h-full ${
                  theme === 'dark' ? 'bg-matrix-accent-dark/10' : 'bg-matrix-accent-light/10'
                } rounded-lg transform scale-0 group-hover:scale-100 transition-transform duration-300 ease-out`} />
                <FontAwesomeIcon 
                  icon={link.icon} 
                  className={`relative text-2xl ${
                    theme === 'dark' ? 'text-matrix-text-dark group-hover:text-matrix-accent-dark' : 'text-matrix-text-light group-hover:text-matrix-accent-light'
                  } transform group-hover:scale-110 transition-all duration-300`}
                  style={{ 
                    filter: theme === 'dark'
                      ? 'drop-shadow(0 0 8px rgba(0, 255, 140, 0.3))'
                      : 'drop-shadow(0 0 8px rgba(0, 179, 127, 0.3))'
                  }}
                />
              </a>
            ) : (
              <Link
                key={index}
                to={link.url}
                className="group relative p-4"
                aria-label={link.label}
                style={{ opacity: 0 }} // Set initial opacity
              >
                <span className={`absolute inset-0 w-full h-full ${
                  theme === 'dark' ? 'bg-matrix-accent-dark/10' : 'bg-matrix-accent-light/10'
                } rounded-lg transform scale-0 group-hover:scale-100 transition-transform duration-300 ease-out`} />
                <FontAwesomeIcon 
                  icon={link.icon} 
                  className={`relative text-2xl ${
                    theme === 'dark' ? 'text-matrix-text-dark group-hover:text-matrix-accent-dark' : 'text-matrix-text-light group-hover:text-matrix-accent-light'
                  } transform group-hover:scale-110 transition-all duration-300`}
                  style={{ 
                    filter: theme === 'dark'
                      ? 'drop-shadow(0 0 8px rgba(0, 255, 140, 0.3))'
                      : 'drop-shadow(0 0 8px rgba(0, 179, 127, 0.3))'
                  }}
                />
              </Link>
            )
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
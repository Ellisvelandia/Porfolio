import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { Link } from 'react-router-dom';

gsap.registerPlugin(TextPlugin);

const Hero = () => {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const socialsRef = useRef(null);
  const highlightRef = useRef(null);

  const socialLinks = [
    { icon: faGithub, url: 'https://github.com/Ellisvelandia', label: 'GitHub', external: true },
    { icon: faLinkedin, url: 'https://linkedin.com/in/ellisvelandia', label: 'LinkedIn', external: true },
    { icon: faEnvelope, url: '/contact', label: 'Contact', external: false },
  ];

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
    .fromTo(descriptionRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      '-=0.5'
    )
    .fromTo(socialsRef.current.children,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 0.8 },
      '-=0.5'
    )
    .to(highlightRef.current,
      { color: '#2563eb', duration: 1, repeat: -1, yoyo: true },
      '-=0.5'
    );
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-bl from-blue-100/30 to-transparent dark:from-blue-900/10 rounded-full transform rotate-12" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-blue-100/30 to-transparent dark:from-blue-900/10 rounded-full transform -rotate-12" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
        <h1 
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400"
        >
          Ellis Velandia Caicedo
        </h1>

        <div 
          ref={descriptionRef}
          className="text-xl md:text-2xl mb-12 text-gray-700 dark:text-gray-300 space-y-6"
        >
          <p className="leading-relaxed">
            I am a <span ref={highlightRef} className="font-semibold transition-colors duration-300">Software Developer from Colombia</span>, 
            currently working as an intern at HDI/Liberty Seguros on real-world software projects.
          </p>
          <p className="leading-relaxed max-w-3xl mx-auto">
            Passionate about creating intuitive web experiences and solving complex problems using 
            <span className="text-blue-600 dark:text-blue-400"> React</span>,
            <span className="text-green-600 dark:text-green-400"> Node.js</span>,
            <span className="text-yellow-600 dark:text-yellow-400"> JavaScript</span>, 
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
              >
                <span className="absolute inset-0 w-full h-full bg-blue-100 dark:bg-blue-900/30 rounded-lg transform scale-0 group-hover:scale-100 transition-transform duration-300 ease-out" />
                <FontAwesomeIcon 
                  icon={link.icon} 
                  className="relative text-2xl text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transform group-hover:scale-110 transition-all duration-300"
                />
              </a>
            ) : (
              <Link
                key={index}
                to={link.url}
                className="group relative p-4"
                aria-label={link.label}
              >
                <span className="absolute inset-0 w-full h-full bg-blue-100 dark:bg-blue-900/30 rounded-lg transform scale-0 group-hover:scale-100 transition-transform duration-300 ease-out" />
                <FontAwesomeIcon 
                  icon={link.icon} 
                  className="relative text-2xl text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transform group-hover:scale-110 transition-all duration-300"
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
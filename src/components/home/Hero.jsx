import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

const Hero = () => {
  const socialLinks = [
    { icon: faGithub, url: 'https://github.com/Ellisvelandia' },
    { icon: faLinkedin, url: 'https://linkedin.com/in/ellisvelandia' },
    { icon: faEnvelope, url: 'mailto:eyis619@gmail.com' },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center pt-16 bg-dots-pattern">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-blue-600 mb-8">
          Ellis Velandia Caicedo
        </h1>
        <div className="text-xl md:text-2xl mb-8 text-gray-700 dark:text-gray-300">
          <p className="mb-4">
            I am a <span className="font-semibold">Software Developer from Colombia</span>, currently working as an intern at HDI/Liberty Seguros on real-world software projects.
          </p>
          <p>
            Passionate about creating intuitive web experiences and solving complex problems using React, Node.js, JavaScript, and modern web development technologies.
          </p>
        </div>
        <div className="flex justify-center space-x-6">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <FontAwesomeIcon icon={link.icon} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
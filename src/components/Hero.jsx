import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-6xl font-bold mb-6">
          Hi, I'm <span className="text-purple-400">Your Name</span>
        </h1>
        <p className="text-xl sm:text-2xl text-gray-300 mb-8">
          Full Stack Developer & Tech Enthusiast
        </p>
        <div className="flex justify-center space-x-6 mb-12">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-purple-400 transition-colors">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-purple-400 transition-colors">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-purple-400 transition-colors">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </div>
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition-colors">
          Download Resume
        </button>
      </div>
    </section>
  );
};

export default Hero;
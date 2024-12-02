import React from 'react';
import Career from '../components/about/Career';
import Education from '../components/about/Education';
import Certifications from '../components/about/Certifications';

const About = () => {
  return (
    <div className="min-h-screen py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">About</h1>
        <div className="space-y-16">
          <Career />
          <Education />
          <Certifications />
        </div>
      </div>
    </div>
  );
};

export default About;
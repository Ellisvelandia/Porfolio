import React from 'react';
import Career from '../components/about/Career';
import Education from '../components/about/Education';
import Organizations from '../components/about/Organizations';
import Certifications from '../components/about/Certifications';

const About = () => {
  return (
    <div className="min-h-screen py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">About</h1>
        <div className="space-y-16">
          <Career />
          <Education />
          <Organizations />
          <Certifications />
        </div>
      </div>
    </div>
  );
};

export default About;
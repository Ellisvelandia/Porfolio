import React from 'react';
import Career from '../components/about/Career';
import Education from '../components/about/Education';
import Certifications from '../components/about/Certifications';
import PageLayout from '../components/layout/PageLayout';

const About = () => {
  return (
    <PageLayout>
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">About</h1>
      <div className="space-y-16">
        <Career />
        <Education />
        <Certifications />
      </div>
    </PageLayout>
  );
};

export default About;
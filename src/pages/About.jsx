import React from 'react';
import Career from '../components/about/Career';
import Education from '../components/about/Education';
import Certifications from '../components/about/Certifications';
import PageLayout from '../components/layout/PageLayout';
import { useTheme } from '../context/ThemeContext';

const About = () => {
  const { theme } = useTheme();

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-16">
        <div className={`space-y-16 relative ${
          theme === 'dark' ? 'text-matrix-text-dark' : 'text-matrix-text-light'
        }`}>
          <div className="max-w-4xl mx-auto">
            <Career />
            <Education />
            <Certifications />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default About;
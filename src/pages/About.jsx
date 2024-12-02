import React from 'react';
import Career from '../components/about/Career';
import Education from '../components/about/Education';
import Certifications from '../components/about/Certifications';
import PageLayout from '../components/layout/PageLayout';

const About = () => {
  return (
    <PageLayout>
      <div className="space-y-16">
        <Career />
        <Education />
        <Certifications />
      </div>
    </PageLayout>
  );
};

export default About;
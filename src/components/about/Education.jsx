import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const Education = () => {
  const { theme } = useTheme();

  const education = [
    {
      school: 'SENA: National Learning Service',
      degree: 'Technologist in Software Analysis and Development',
      period: 'October 2023 - February 2026',
      details: [
        'Software Development',
        'System Analysis',
        'Project Management'
      ],
      description: `I use technologies such as programming languages to develop and maintain, analyze software.
        Work collaboratively with multidisciplinary teams that include designers, product managers, and other developers to create exceptional products.
        Implement responsive designs and ensure cross-browser compatibility to deliver the best possible user experience.
        Participate in code reviews and coding challenges to ensure code is robust, efficient, and easy to maintain.`
    }
  ];

  return (
    <section className="mb-16">
      <h2 className={`text-3xl font-bold mb-8 ${
        theme === 'dark' ? 'text-matrix-accent-dark' : 'text-matrix-accent-light'
      } tracking-wide`} style={{
        textShadow: theme === 'dark'
          ? '0 0 10px rgba(0, 255, 140, 0.3)'
          : '0 0 10px rgba(0, 179, 127, 0.3)'
      }}>
        Education
      </h2>
      
      <div className="space-y-8">
        {education.map((edu, index) => (
          <div 
            key={index} 
            className={`relative border ${
              theme === 'dark' 
                ? 'bg-matrix-darkest/40 border-matrix-accent-dark/20' 
                : 'bg-matrix-lightest/40 border-matrix-accent-light/20'
            } rounded-lg p-6 backdrop-blur-sm`}
            style={{
              boxShadow: theme === 'dark'
                ? '0 4px 20px rgba(0, 255, 140, 0.1)'
                : '0 4px 20px rgba(0, 179, 127, 0.1)'
            }}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className={`text-xl font-semibold ${
                  theme === 'dark' ? 'text-matrix-accent-dark' : 'text-matrix-accent-light'
                }`}>{edu.school}</h3>
                <p className={theme === 'dark' ? 'text-matrix-text-dark/80' : 'text-matrix-text-light/80'}>
                  {edu.degree}
                </p>
              </div>
              <span className={`text-sm ${
                theme === 'dark' ? 'text-matrix-text-dark/70' : 'text-matrix-text-light/70'
              }`}>
                {edu.period}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {edu.details.map((detail, detailIndex) => (
                <span
                  key={detailIndex}
                  className={`px-3 py-1 text-sm rounded ${
                    theme === 'dark'
                      ? 'bg-matrix-darkest/60 text-matrix-accent-dark border border-matrix-accent-dark/30'
                      : 'bg-matrix-lightest/60 text-matrix-accent-light border border-matrix-accent-light/30'
                  }`}
                >
                  {detail}
                </span>
              ))}
            </div>
            
            <p className={`whitespace-pre-line ${
              theme === 'dark' ? 'text-matrix-text-dark/90' : 'text-matrix-text-light/90'
            }`}>
              {edu.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
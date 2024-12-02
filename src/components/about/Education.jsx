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
    <section className="mb-8 sm:mb-12 md:mb-16">
      <h2 className={`text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 ${
        theme === 'dark' ? 'text-matrix-accent-dark' : 'text-emerald-600'
      } tracking-wide`} style={{
        textShadow: theme === 'dark'
          ? '0 0 10px rgba(0, 255, 140, 0.3)'
          : '0 0 15px rgba(16, 185, 129, 0.4)'
      }}>
        Education
      </h2>
      
      <div className="space-y-6 sm:space-y-8">
        {education.map((edu, index) => (
          <div 
            key={index} 
            className={`relative border ${
              theme === 'dark' 
                ? 'bg-matrix-darkest/40 border-matrix-accent-dark/20' 
                : 'bg-emerald-50/80 border-emerald-200'
            } rounded-lg p-4 sm:p-6 backdrop-blur-sm`}
            style={{
              boxShadow: theme === 'dark'
                ? '0 4px 20px rgba(0, 255, 140, 0.1)'
                : '0 4px 20px rgba(16, 185, 129, 0.15)'
            }}
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4 mb-4">
              <div>
                <h3 className={`text-lg sm:text-xl font-semibold ${
                  theme === 'dark' ? 'text-matrix-accent-dark' : 'text-emerald-600'
                }`}>{edu.school}</h3>
                <p className={`text-sm sm:text-base ${theme === 'dark' ? 'text-matrix-text-dark/80' : 'text-emerald-700/90'}`}>
                  {edu.degree}
                </p>
              </div>
              <span className={`text-xs sm:text-sm ${
                theme === 'dark' ? 'text-matrix-text-dark/70' : 'text-emerald-600/80'
              }`}>
                {edu.period}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
              {edu.details.map((detail, detailIndex) => (
                <span
                  key={detailIndex}
                  className={`px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm rounded ${
                    theme === 'dark'
                      ? 'bg-matrix-darkest/60 text-matrix-accent-dark border border-matrix-accent-dark/30'
                      : 'bg-emerald-100 text-emerald-700 border border-emerald-200 shadow-sm'
                  }`}
                >
                  {detail}
                </span>
              ))}
            </div>

            <p className={`whitespace-pre-line text-sm sm:text-base leading-relaxed ${
              theme === 'dark' ? 'text-matrix-text-dark/90' : 'text-emerald-800'
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
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
    <section className="mb-6">
      <h2 className={`text-xl sm:text-3xl font-bold mb-4 sm:mb-8 ${
        theme === 'dark' ? 'text-matrix-accent-dark' : 'text-emerald-600'
      } tracking-wide`}>
        Education
      </h2>
      
      <div className="space-y-4 sm:space-y-8">
        {education.map((edu, index) => (
          <div 
            key={index} 
            className={`relative ${
              theme === 'dark' 
                ? 'bg-matrix-darkest/40' 
                : 'bg-emerald-50/80'
            } rounded-lg p-3 sm:p-6`}
          >
            <div className="flex flex-col gap-1 sm:gap-4 mb-3 sm:mb-4">
              <div>
                <h3 className={`text-base sm:text-xl font-semibold ${
                  theme === 'dark' ? 'text-matrix-accent-dark' : 'text-emerald-600'
                }`}>{edu.school}</h3>
                <p className={`text-xs sm:text-base ${theme === 'dark' ? 'text-matrix-text-dark/80' : 'text-emerald-700/90'}`}>
                  {edu.degree}
                </p>
              </div>
              <span className={`text-[10px] sm:text-sm ${
                theme === 'dark' ? 'text-matrix-text-dark/70' : 'text-emerald-600/80'
              }`}>
                {edu.period}
              </span>
            </div>

            <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
              {edu.details.map((detail, detailIndex) => (
                <span
                  key={detailIndex}
                  className={`px-1.5 sm:px-3 py-0.5 text-[10px] sm:text-sm rounded ${
                    theme === 'dark'
                      ? 'bg-matrix-darkest/60 text-matrix-accent-dark'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}
                >
                  {detail}
                </span>
              ))}
            </div>

            <p className={`text-xs sm:text-base leading-relaxed ${
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
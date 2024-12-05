import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const Career = () => {
  const { theme } = useTheme();
  
  const experiences = [
    {
      title: 'Apprentice',
      company: 'Liberty Seguros Colombia / HDI Seguros Colombia',
      period: 'February 2023 - Present',
      tags: ['Software Development', 'Insurance', 'Professional Development'],
      description: `Learning and applying software development practices in a professional insurance company environment.
        Contributing to internal projects and systems maintenance.
        Gaining hands-on experience with industry-standard tools and methodologies.
        Participating in training programs and professional development activities.`
    }
  ];

  return (
    <section className="mb-6">
      <h2 className={`text-xl sm:text-3xl font-bold mb-4 sm:mb-8 ${
        theme === 'dark' ? 'text-matrix-accent-dark' : 'text-emerald-600'
      } tracking-wide`}>
        Career Path
      </h2>
      <div className="space-y-4 sm:space-y-8">
        {experiences.map((exp, index) => (
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
                }`}>{exp.title}</h3>
                <p className={`text-xs sm:text-base ${theme === 'dark' ? 'text-matrix-text-dark/80' : 'text-emerald-700/90'}`}>
                  {exp.company}
                </p>
              </div>
              <span className={`text-[10px] sm:text-sm ${
                theme === 'dark' ? 'text-matrix-text-dark/70' : 'text-emerald-600/80'
              }`}>
                {exp.period}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
              {exp.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className={`px-1.5 sm:px-3 py-0.5 text-[10px] sm:text-sm rounded ${
                    theme === 'dark'
                      ? 'bg-matrix-darkest/60 text-matrix-accent-dark'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <p className={`text-xs sm:text-base leading-relaxed ${
              theme === 'dark' ? 'text-matrix-text-dark/90' : 'text-emerald-800'
            }`}>
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Career;
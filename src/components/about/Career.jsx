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
    <section className="mb-8 sm:mb-12 md:mb-16">
      <h2 className={`text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 ${
        theme === 'dark' ? 'text-matrix-accent-dark' : 'text-emerald-600'
      } tracking-wide`} style={{
        textShadow: theme === 'dark'
          ? '0 0 10px rgba(0, 255, 140, 0.3)'
          : '0 0 15px rgba(16, 185, 129, 0.4)'
      }}>
        Career Path
      </h2>
      <div className="space-y-6 sm:space-y-8">
        {experiences.map((exp, index) => (
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
                }`}>{exp.title}</h3>
                <p className={`text-sm sm:text-base ${theme === 'dark' ? 'text-matrix-text-dark/80' : 'text-emerald-700/90'}`}>
                  {exp.company}
                </p>
              </div>
              <span className={`text-xs sm:text-sm ${
                theme === 'dark' ? 'text-matrix-text-dark/70' : 'text-emerald-600/80'
              }`}>
                {exp.period}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
              {exp.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className={`px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm rounded ${
                    theme === 'dark'
                      ? 'bg-matrix-darkest/60 text-matrix-accent-dark border border-matrix-accent-dark/30'
                      : 'bg-emerald-100 text-emerald-700 border border-emerald-200 shadow-sm'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <p className={`whitespace-pre-line text-sm sm:text-base leading-relaxed ${
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
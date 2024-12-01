import React from 'react';

const Education = () => {
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
    <section>
      <h2 className="text-2xl font-bold mb-6">Education</h2>
      <div className="space-y-6">
        {education.map((edu, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-blue-600">{edu.school}</h3>
                <p className="text-gray-600 dark:text-gray-400">{edu.degree}</p>
              </div>
              <span className="text-gray-500 dark:text-gray-400">{edu.period}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {edu.details.map((detail, detailIndex) => (
                <span
                  key={detailIndex}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                >
                  {detail}
                </span>
              ))}
            </div>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{edu.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
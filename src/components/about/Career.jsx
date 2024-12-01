import React from 'react';

const Career = () => {
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
    <section>
      <h2 className="text-2xl font-bold mb-6">Career</h2>
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-blue-600">{exp.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{exp.company}</p>
              </div>
              <span className="text-gray-500 dark:text-gray-400">{exp.period}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {exp.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Career;
import React from 'react';

const Certifications = () => {
  const certifications = [
    {
      name: 'HeartSaver First Aid CPR AED',
      issuer: 'American Heart Association',
      date: 'September 2022',
      tags: ['CPR', 'First Aid']
    },
    {
      name: 'Amateur Radio Technician\'s License',
      issuer: 'KE6AKG',
      date: 'August 2021',
      tags: ['Amateur Radio', 'Electronics']
    },
    {
      name: 'Recreational UAS Safety Test',
      issuer: 'UAV Coach',
      date: 'December 2021',
      tags: ['Drones']
    }
  ];

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Certifications</h2>
      <div className="space-y-6">
        {certifications.map((cert, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-blue-600">{cert.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{cert.issuer}</p>
              </div>
              <span className="text-gray-500 dark:text-gray-400">{cert.date}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {cert.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
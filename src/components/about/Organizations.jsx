import React from 'react';

const Organizations = () => {
  const organizations = [
    {
      name: 'Edublitz',
      role: 'Founder',
      period: '2023 - Present',
      description: 'Edublitz is a non-profit organization that teaches K-8 students the foundations of electronics and programming through fun, engaging projects. It is currently an official club at Chadwick School.'
    },
    {
      name: 'Civil Air Patrol',
      role: 'Volunteer',
      period: '2021 - Present',
      description: 'Aerospace, Aviation, Leadership, and Emergency Services training.'
    }
  ];

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Organizations</h2>
      <div className="space-y-6">
        {organizations.map((org, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-blue-600">{org.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{org.role}</p>
              </div>
              <span className="text-gray-500 dark:text-gray-400">{org.period}</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{org.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Organizations;
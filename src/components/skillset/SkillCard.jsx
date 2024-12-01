import React from 'react';

const SkillCard = ({ name, icon, category }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{name}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{category}</p>
    </div>
  );
};

export default SkillCard;
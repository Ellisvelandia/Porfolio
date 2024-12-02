import React from 'react';

const SkillCard = ({ name, icon, category }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 md:p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
      <div className="text-2xl md:text-4xl mb-2 md:mb-4">{icon}</div>
      <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-1 md:mb-2">{name}</h3>
      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 capitalize">{category}</p>
    </div>
  );
};

export default SkillCard;
import React from 'react';

const MissionCard = ({ number, title, description }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
      <h3 className="text-lg font-semibold text-blue-600 mb-2">
        #{number}. {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </div>
  );
};

export default MissionCard;
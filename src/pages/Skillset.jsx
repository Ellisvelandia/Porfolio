import React, { useState } from 'react';
import SkillCard from '../components/skillset/SkillCard';
import PageLayout from '../components/layout/PageLayout';

const Skillset = () => {
  const [filter, setFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'programming', label: 'Programming' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'tools', label: 'Tools & Services' }
  ];

  const skills = [
    { name: 'React', category: 'frontend', icon: '⚛️' },
    { name: 'Node.js', category: 'backend', icon: '🟢' },
    { name: 'JavaScript', category: 'programming', icon: '📜' },
    { name: 'TypeScript', category: 'programming', icon: '📘' },
    { name: 'HTML', category: 'frontend', icon: '🌐' },
    { name: 'CSS', category: 'frontend', icon: '🎨' },
    { name: 'TailwindCSS', category: 'frontend', icon: '💨' },
    { name: 'Git', category: 'tools', icon: '📚' },
    { name: 'MongoDB', category: 'backend', icon: '🍃' },
    { name: 'Express', category: 'backend', icon: '🚂' },
    { name: 'Python', category: 'programming', icon: '🐍' },
    { name: 'VS Code', category: 'tools', icon: '👨‍💻' }
  ];

  const filteredSkills = filter === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === filter);

  return (
    <PageLayout>
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 px-2 mb-6 md:mb-8">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setFilter(category.id)}
            className={`px-2 py-1 md:px-4 md:py-2 text-sm md:text-base rounded-lg transition-colors duration-200 ${
              filter === category.id
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 px-2 md:px-4">
        {filteredSkills.map((skill, index) => (
          <SkillCard key={index} {...skill} />
        ))}
      </div>
    </PageLayout>
  );
};

export default Skillset;
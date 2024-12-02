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
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">Skills</h1>
      <div className="flex justify-center mb-8 space-x-4">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setFilter(category.id)}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              filter === category.id
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredSkills.map((skill, index) => (
          <SkillCard key={index} {...skill} />
        ))}
      </div>
    </PageLayout>
  );
};

export default Skillset;
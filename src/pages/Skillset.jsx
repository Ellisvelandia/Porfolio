import React, { useState } from 'react';
import SkillCard from '../components/skillset/SkillCard';

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
    <div className="min-h-screen py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Skillset</h1>
        
        <div className="flex justify-center mb-8 space-x-4 flex-wrap gap-y-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-4 py-2 rounded-full transition-colors ${
                filter === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredSkills.map((skill, index) => (
            <SkillCard
              key={index}
              name={skill.name}
              icon={skill.icon}
              category={skill.category}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skillset;
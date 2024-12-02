import React, { useState } from 'react';
import SkillCard from '../components/skillset/SkillCard';
import PageLayout from '../components/layout/PageLayout';
import { useTheme } from '../context/ThemeContext';

const Skillset = () => {
  const [filter, setFilter] = useState('all');
  const { theme } = useTheme();

  const categories = [
    { id: 'all', label: 'All Skills' },
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className={`
          text-3xl font-bold text-center mb-8
          ${theme === 'dark' ? 'text-matrix-text-dark' : 'text-matrix-text-light'}
        `}>
          Technical Skills
        </h1>
        
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`
                px-4 py-2 
                rounded-lg 
                font-medium
                text-sm
                transition-all 
                duration-300
                ${filter === category.id
                  ? theme === 'dark'
                    ? 'bg-matrix-accent-dark text-matrix-bg-dark shadow-[0_0_15px_rgba(0,230,160,0.3)]'
                    : 'bg-matrix-accent-light text-white shadow-[0_0_15px_rgba(0,179,127,0.2)]'
                  : theme === 'dark'
                    ? 'bg-matrix-darkest/30 text-matrix-text-dark hover:bg-matrix-dark/40'
                    : 'bg-matrix-lighter text-matrix-text-light hover:bg-matrix-light/30'
                }
              `}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSkills.map((skill, index) => (
            <SkillCard key={index} {...skill} />
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default Skillset;
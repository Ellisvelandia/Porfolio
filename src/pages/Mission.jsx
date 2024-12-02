import React from 'react';
import MissionCard from '../components/mission/MissionCard';

const Mission = () => {
  const missions = [
    {
      number: 1,
      title: "Full-Stack Development Expertise",
      description: "Specialized in modern web development with React.js and related technologies. Committed to building scalable, responsive applications that provide exceptional user experiences while maintaining robust backend architectures."
    },
    {
      number: 2,
      title: "Innovation & Technical Growth",
      description: "Actively expanding knowledge in emerging technologies like AI integration, cloud services, and modern development frameworks. Passionate about implementing cutting-edge solutions in real-world applications."
    },
    {
      number: 3,
      title: "Quality-Driven Development",
      description: "Advocate for clean code architecture, comprehensive testing, and maintainable solutions. Experienced in implementing CI/CD pipelines and ensuring code quality through automated testing and thorough code reviews."
    },
    {
      number: 4,
      title: "Project Leadership",
      description: "Proven track record in leading development teams and managing complex projects. Skilled in agile methodologies and ensuring successful project delivery through effective communication and technical leadership."
    }
  ];

  return (
    <div className="min-h-screen py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">Mission</h1>
        <div className="space-y-6">
          {missions.map((mission) => (
            <MissionCard
              key={mission.number}
              number={mission.number}
              title={mission.title}
              description={mission.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mission;
import React from 'react';
import MissionCard from '../components/mission/MissionCard';

const Mission = () => {
  const missions = [
    {
      number: 1,
      title: "Web Development Excellence",
      description: "Dedicated to creating exceptional web experiences through modern technologies and best practices. I strive to build intuitive, performant, and accessible applications that solve real-world problems."
    },
    {
      number: 2,
      title: "Continuous Learning",
      description: "Committed to continuous growth in software development, actively learning new technologies and methodologies to stay at the forefront of web development."
    },
    {
      number: 3,
      title: "Code Quality",
      description: "Focused on writing clean, maintainable, and well-documented code. I believe in the importance of following best practices and industry standards to create robust applications."
    },
    {
      number: 4,
      title: "Problem Solving",
      description: "Passionate about solving complex technical challenges and finding innovative solutions to improve user experiences and application performance."
    },
    {
      number: 5,
      title: "Collaboration",
      description: "Enthusiastic about working in teams, sharing knowledge, and contributing to the developer community. I value open communication and collaborative problem-solving."
    }
  ];

  return (
    <div className="min-h-screen py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Mission</h1>
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
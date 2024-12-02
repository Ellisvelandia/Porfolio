import React, { useState } from 'react';
import ProjectCard from './ProjectCard';

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "Portfolio Website",
      description: "Personal portfolio website built with React and Matrix-inspired design",
      videoSrc: "/videos/portfolio.mp4",
      fallbackImage: "/images/portfolio.jpg",
      accentColor: "#10B981",
      bgColor: "rgba(6, 78, 59, 0.95)",
      tags: ["React", "Tailwind CSS", "GSAP"],
      link: "https://github.com/yourusername/portfolio"
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Project Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {projects.map((project) => (
          <div 
            key={project.id}
            className="w-full max-w-32 mx-auto"
            onMouseEnter={() => setActiveProject(project.id)}
            onMouseLeave={() => setActiveProject(null)}
          >
            <ProjectCard 
              project={project} 
              isActive={activeProject === project.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;

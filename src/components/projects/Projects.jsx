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
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12">
      {/* Section Title */}
      <h2 className="text-2xl sm:text-3xl font-bold text-matrix-accent-dark text-center mb-6 sm:mb-8 tracking-tight drop-shadow-[0_0_8px_rgba(0,255,140,0.3)]">
        Featured Projects
      </h2>
      
      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
        {projects.map((project) => (
          <div 
            key={project.id}
            className="w-full mx-auto transform transition-transform duration-300 hover:scale-[1.02]"
            onClick={() => {
              if (window.innerWidth < 768) { // Mobile touch interaction
                setActiveProject(activeProject === project.id ? null : project.id);
              }
            }}
            onMouseEnter={() => {
              if (window.innerWidth >= 768) { // Desktop hover interaction
                setActiveProject(project.id);
              }
            }}
            onMouseLeave={() => {
              if (window.innerWidth >= 768) {
                setActiveProject(null);
              }
            }}
          >
            <ProjectCard 
              project={project} 
              isActive={activeProject === project.id}
            />
          </div>
        ))}
      </div>
      
      {/* Mobile Hint */}
      <p className="md:hidden text-center text-sm text-matrix-text-dark/70 mt-4">
        Tap on a project to see more details
      </p>
    </div>
  );
};

export default Projects;

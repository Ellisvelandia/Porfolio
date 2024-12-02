import React, { useState } from 'react';
import ProjectCard from './ProjectCard';

const Projects = ({ theme }) => {
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

  const handleProjectInteraction = (projectId) => {
    if (window.innerWidth < 768) { // Mobile touch interaction
      setActiveProject(activeProject === projectId ? null : projectId);
    }
  };

  const handleProjectHover = (projectId) => {
    if (window.innerWidth >= 768) { // Desktop hover interaction
      setActiveProject(projectId);
    }
  };

  return (
    <section 
      aria-label="Projects"
      className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12"
    >
      {/* Section Title */}
      <h2 
        className="text-2xl sm:text-3xl font-bold text-matrix-accent-dark text-center mb-6 sm:mb-8 tracking-tight drop-shadow-[0_0_8px_rgba(0,255,140,0.3)]"
        id="projects-section"
      >
        Featured Projects
      </h2>
      
      {/* Project Grid */}
      <div 
        role="list"
        aria-labelledby="projects-section"
        className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto"
      >
        {projects.map((project) => (
          <div 
            key={project.id}
            role="listitem"
            className="w-full mx-auto transform transition-transform duration-300 hover:scale-[1.02]"
            onClick={() => handleProjectInteraction(project.id)}
            onMouseEnter={() => handleProjectHover(project.id)}
            onMouseLeave={() => handleProjectHover(null)}
          >
            <ProjectCard 
              project={project} 
              isActive={activeProject === project.id}
              theme={theme}
            />
          </div>
        ))}
      </div>
      
      {/* Mobile Hint */}
      <p 
        className="md:hidden text-center text-sm text-matrix-text-dark/70 mt-4"
        aria-hidden="true"
      >
        Tap on a project to see more details
      </p>
    </section>
  );
};

export default Projects;

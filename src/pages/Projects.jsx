import React from "react";
import ProjectCard from "../components/projects/ProjectCard";
import PageLayout from '../components/layout/PageLayout';

const Projects = () => {
  const projects = [
    {
      title: "SoloSpeak",
      description: "A language learning platform for practicing conversations",
      image: "/projects/solospeak.png",
      tags: ["React", "Web Development", "Language Learning"],
      links: {
        demo: "https://solospeak.netlify.app/login",
      },
    },
    {
      title: "POS Cantina",
      description: "Point of Sale system for cantina management",
      image: "/projects/poscantina.png",
      tags: ["Web App", "POS System", "Cantina Management"],
      links: {
        demo: "https://poscantina.netlify.app/",
      },
    },
    // Add more projects here
  ];

  return (
    <PageLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </PageLayout>
  );
};

export default Projects;

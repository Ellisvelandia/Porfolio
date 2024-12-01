import React from "react";
import ProjectCard from "../components/projects/ProjectCard";

const Projects = () => {
  const projects = [
    {
      title: "SoloSpeak",
      description: "A language learning platform for practicing conversations",
      image: "/solospeak.png",
      tags: ["React", "Web Development", "Language Learning"],
      links: {
        demo: "https://solospeak.vercel.app/login",
      },
    },
    {
      title: "POS Cantina",
      description: "Point of Sale system for restaurant management",
      image: "/poscantina.png",
      tags: ["Web App", "POS System", "Restaurant Management"],
      links: {
        demo: "https://poscantina.netlify.app/",
      },
    },
    // Add more projects here
  ];

  return (
    <div className="min-h-screen py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;

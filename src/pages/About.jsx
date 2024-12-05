import React, { useState } from "react";
import Career from "../components/about/Career";
import Education from "../components/about/Education";
import Certifications from "../components/about/Certifications";
import PageLayout from "../components/layout/PageLayout";
import { useTheme } from "../context/ThemeContext";

const About = () => {
  const { theme } = useTheme();
  const [activeComponent, setActiveComponent] = useState("career");

  const renderComponent = () => {
    switch (activeComponent) {
      case "career":
        return <Career />;
      case "education":
        return <Education />;
      case "certifications":
        return <Certifications />;
      default:
        return <Career />;
    }
  };

  const buttonClasses = (name) => `
    relative flex-shrink-0 px-2 sm:px-6 py-1 sm:py-2.5
    min-w-[80px] sm:min-w-[120px] 
    font-mono tracking-wider uppercase text-[10px] sm:text-base
    ${
      activeComponent === name
        ? "text-matrix-green-bright"
        : "text-matrix-green hover:text-matrix-green-bright"
    }
  `;

  const NavButton = ({ name, label }) => (
    <button onClick={() => setActiveComponent(name)} className={buttonClasses(name)}>
      <span className="relative z-10 flex items-center justify-center gap-0.5 sm:gap-2 w-full">
        <span className="opacity-50 text-[7px] sm:text-xs">[</span>
        {label}
        <span className="opacity-50 text-[7px] sm:text-xs">]</span>
      </span>
    </button>
  );

  return (
    <PageLayout>
      <div className="min-h-screen">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 backdrop-blur-md pt-1 sm:pt-4">
          <div className="flex overflow-x-auto pb-2 sm:pb-4 px-1.5 sm:px-4">
            <div className="flex gap-2 sm:gap-6 mx-auto">
              <NavButton name="career" label="Career" />
              <NavButton name="education" label="Education" />
              <NavButton name="certifications" label="Certifications" />
            </div>
          </div>
        </nav>

        {/* Content */}
        <main className="container mx-auto px-2 sm:px-4 py-3 sm:py-8 text-matrix-green">
          <div className="max-w-4xl mx-auto">
            <div className="relative p-2 sm:p-0">
              {renderComponent()}
            </div>
          </div>
        </main>
      </div>
    </PageLayout>
  );
};

export default About;

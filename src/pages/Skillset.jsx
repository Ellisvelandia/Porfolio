import React, { useState } from "react";
import SkillCard from "../components/skillset/SkillCard";
import PageLayout from "../components/layout/PageLayout";
import { useTheme } from "../context/ThemeContext";
import { SKILL_CATEGORIES, SKILLS } from '../constants';

const Skillset = () => {
  const [filter, setFilter] = useState("all");
  const { theme } = useTheme();

  const categories = SKILL_CATEGORIES;
  const skills = SKILLS;

  const filteredSkills =
    filter === "all"
      ? skills
      : skills.filter((skill) => skill.category === filter);

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`
                px-3 sm:px-4 
                py-1.5 sm:py-2 
                rounded-lg 
                font-medium
                text-xs sm:text-sm
                transition-all 
                duration-300
                ${
                  filter === category.id
                    ? theme === "dark"
                      ? "bg-matrix-accent-dark text-matrix-bg-dark shadow-[0_0_15px_rgba(0,230,160,0.3)]"
                      : "bg-matrix-accent-light text-white shadow-[0_0_15px_rgba(0,179,127,0.2)]"
                    : theme === "dark"
                    ? "bg-matrix-darkest/30 text-matrix-text-dark hover:bg-matrix-dark/40"
                    : "bg-matrix-lighter text-matrix-text-light hover:bg-matrix-light/30"
                }
              `}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {filteredSkills.map((skill, index) => (
            <SkillCard key={index} {...skill} />
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default Skillset;

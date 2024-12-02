import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const SkillCard = ({ name, icon, category }) => {
  const { theme } = useTheme();

  return (
    <div className={`
      group relative p-3 sm:p-5 rounded-xl
      transition-all duration-300 ease-in-out
      backdrop-blur-sm
      border-2
      hover:scale-[1.02]
      ${theme === 'dark'
        ? 'bg-matrix-bg-dark/60 hover:bg-matrix-bg-dark/80 border-matrix-dark/30 hover:border-matrix-accent-dark'
        : 'bg-white/80 hover:bg-white border-matrix-light/30 hover:border-matrix-accent-light'
      }
      ${theme === 'dark' 
        ? 'shadow-[0_4px_20px_-12px_rgba(0,230,160,0.5)]' 
        : 'shadow-[0_4px_20px_-12px_rgba(0,179,127,0.25)]'
      }
    `}>
      <div className="flex items-center gap-2 sm:gap-4">
        <div className={`
          flex-shrink-0 text-2xl sm:text-3xl p-2 sm:p-3 rounded-lg
          transition-colors duration-300
          ${theme === 'dark'
            ? 'bg-matrix-darkest/30 text-matrix-light'
            : 'bg-matrix-lighter text-matrix-dark'
          }
        `}>
          {icon}
        </div>
        <div className="flex-grow">
          <h3 className={`
            text-base sm:text-lg font-bold mb-1.5 sm:mb-2
            transition-colors duration-300
            ${theme === 'dark'
              ? 'text-matrix-text-dark group-hover:text-matrix-accent-dark'
              : 'text-matrix-text-light group-hover:text-matrix-accent-light'
            }
          `}>
            {name}
          </h3>
          <div className={`
            inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium
            transition-colors duration-300
            ${theme === 'dark'
              ? 'bg-matrix-dark/30 text-matrix-light'
              : 'bg-matrix-lighter text-matrix-dark'
            }
          `}>
            {category}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
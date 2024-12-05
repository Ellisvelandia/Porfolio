import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const SkillCard = ({ name, icon, category }) => {
  const { theme } = useTheme();

  return (
    <div className={`
      group relative p-2.5 sm:p-4 rounded-lg
      ${theme === 'dark'
        ? 'bg-matrix-bg-dark/60 text-matrix-text-dark'
        : 'bg-white/80 text-matrix-text-light'
      }
    `}>
      <div className="flex items-center gap-2 sm:gap-3">
        <div className={`
          flex-shrink-0 text-xl sm:text-2xl p-2 rounded-lg
          ${theme === 'dark'
            ? 'bg-matrix-darkest/30 text-matrix-light'
            : 'bg-matrix-lighter text-matrix-dark'
          }
        `}>
          {icon}
        </div>
        <div className="flex-grow min-w-0">
          <h3 className={`
            text-sm sm:text-base font-semibold mb-1 truncate
            ${theme === 'dark'
              ? 'text-matrix-text-dark'
              : 'text-matrix-text-light'
            }
          `}>
            {name}
          </h3>
          <div className={`
            inline-block px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium
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
import React from 'react';

const PageLayout = ({ children }) => {
  // Matrix characters for more variety
  const matrixChars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01";

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Matrix-inspired Background */}
      <div className="fixed inset-0 z-0">
        {/* Base layer with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-50 to-emerald-50/20 dark:from-gray-900 dark:via-gray-900 dark:to-emerald-900/20" />
        
        {/* Matrix code columns - Light version */}
        <div className="absolute inset-0 block dark:hidden">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(1.5rem,1fr))] gap-x-4">
            {Array(40).fill(0).map((_, i) => (
              <div key={i} className="relative h-screen overflow-hidden font-mono text-xs">
                <div 
                  className="absolute whitespace-pre text-emerald-900/80"
                  style={{
                    animation: `fall ${8 + Math.random() * 5}s linear infinite`,
                    animationDelay: `${Math.random() * -15}s`,
                    transform: 'translateY(-100%)'
                  }}
                >
                  {Array(100).fill(0).map(() => 
                    matrixChars[Math.floor(Math.random() * matrixChars.length)]
                  ).join('\n')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Matrix code columns - Dark version */}
        <div className="absolute inset-0 hidden dark:block">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(1.5rem,1fr))] gap-x-4">
            {Array(40).fill(0).map((_, i) => (
              <div key={i} className="relative h-screen overflow-hidden font-mono text-xs">
                <div 
                  className="absolute whitespace-pre text-emerald-400/80"
                  style={{
                    animation: `fall ${8 + Math.random() * 5}s linear infinite`,
                    animationDelay: `${Math.random() * -15}s`,
                    transform: 'translateY(-100%)'
                  }}
                >
                  {Array(100).fill(0).map(() => 
                    matrixChars[Math.floor(Math.random() * matrixChars.length)]
                  ).join('\n')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subtle grid overlay */}
        <div 
          className="absolute inset-0 opacity-5 dark:opacity-10"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                             linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: '2rem 2rem'
          }}
        />

        {/* Glass effect overlay */}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] dark:bg-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full w-full px-4 pt-24 md:pt-28">
        <style jsx global>{`
          @keyframes fall {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }
        `}</style>
        {children}
      </div>
    </div>
  );
};

export default PageLayout;

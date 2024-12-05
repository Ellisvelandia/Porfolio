import React from "react";
import { useTheme } from '../../context/ThemeContext';

const Certifications = () => {
  const { theme } = useTheme();
  
  const certifications = [
    {
      id: 1,
      name: "Google Cybersecurity",
      img: "/certificates/google.png",
      link: "https://www.coursera.org/account/accomplishments/specialization/G2KBQZAVU5V8",
      issuer: "Google",
      date: "2023",
      tags: ["Cybersecurity", "Google"],
    },
  ];

  return (
    <section className="mb-6">
      <h2 className={`text-xl sm:text-3xl font-bold mb-4 sm:mb-8 ${
        theme === 'dark' ? 'text-matrix-accent-dark' : 'text-emerald-600'
      } tracking-wide`}>
        Certifications
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className={`relative ${
              theme === 'dark' 
                ? 'bg-matrix-darkest/40' 
                : 'bg-emerald-50/80'
            } rounded-lg p-3 sm:p-6`}
          >
            <div className="flex flex-col gap-1 sm:gap-4 mb-3 sm:mb-4">
              <div>
                <h3 className={`text-base sm:text-xl font-semibold ${
                  theme === 'dark' ? 'text-matrix-accent-dark' : 'text-emerald-600'
                }`}>
                  {cert.name}
                </h3>
                <p className={`text-xs sm:text-base ${theme === 'dark' ? 'text-matrix-text-dark/80' : 'text-emerald-700/90'}`}>
                  {cert.issuer}
                </p>
              </div>
              <span className={`text-[10px] sm:text-sm ${
                theme === 'dark' ? 'text-matrix-text-dark/70' : 'text-emerald-600/80'
              }`}>
                {cert.date}
              </span>
            </div>

            {cert.img && (
              <div className="mb-3 sm:mb-4 w-full aspect-[16/9] sm:aspect-[4/3]">
                <img
                  src={cert.img}
                  alt={cert.name}
                  className={`w-full h-full object-contain rounded-lg ${
                    theme === 'dark' ? 'bg-matrix-darkest/60' : 'bg-emerald-50/90'
                  }`}
                />
              </div>
            )}

            {cert.link && (
              <div className="mb-3 sm:mb-4">
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-block text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-md ${
                    theme === 'dark'
                      ? 'bg-matrix-darkest/60 text-matrix-accent-dark hover:bg-matrix-accent-dark/20'
                      : 'bg-emerald-50/90 text-emerald-600 hover:bg-emerald-100/90'
                  }`}
                >
                  View Certificate
                </a>
              </div>
            )}

            <div className="flex flex-wrap gap-1 sm:gap-2">
              {cert.tags.map((tag, index) => (
                <span
                  key={index}
                  className={`px-1.5 sm:px-3 py-0.5 text-[10px] sm:text-sm rounded ${
                    theme === 'dark'
                      ? 'bg-matrix-darkest/60 text-matrix-accent-dark'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;

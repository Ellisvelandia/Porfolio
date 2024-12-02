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
    <section className="mb-16">
      <h2 className={`text-3xl font-bold mb-8 ${
        theme === 'dark' ? 'text-matrix-accent-dark' : 'text-emerald-600'
      } tracking-wide`} style={{
        textShadow: theme === 'dark'
          ? '0 0 10px rgba(0, 255, 140, 0.3)'
          : '0 0 15px rgba(16, 185, 129, 0.4)'
      }}>
        Certifications
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className={`relative border ${
              theme === 'dark' 
                ? 'bg-matrix-darkest/40 border-matrix-accent-dark/20' 
                : 'bg-emerald-50/80 border-emerald-200'
            } rounded-lg p-6 backdrop-blur-sm transform transition-all duration-300 hover:scale-[1.02]`}
            style={{
              boxShadow: theme === 'dark'
                ? '0 4px 20px rgba(0, 255, 140, 0.1)'
                : '0 4px 20px rgba(16, 185, 129, 0.15)'
            }}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className={`text-xl font-semibold ${
                  theme === 'dark' ? 'text-matrix-accent-dark' : 'text-emerald-600'
                }`}>
                  {cert.name}
                </h3>
                <p className={theme === 'dark' ? 'text-matrix-text-dark/80' : 'text-emerald-700/90'}>
                  {cert.issuer}
                </p>
              </div>
              <span className={`text-sm ${
                theme === 'dark' ? 'text-matrix-text-dark/70' : 'text-emerald-600/80'
              }`}>
                {cert.date}
              </span>
            </div>

            {cert.img && (
              <div className="mb-4 relative group">
                <div className={`absolute inset-0 rounded-lg ${
                  theme === 'dark' ? 'bg-matrix-accent-dark/5' : 'bg-emerald-200/10'
                }`} />
                <img
                  src={cert.img}
                  alt={cert.name}
                  className={`w-full h-40 object-contain rounded-lg p-2 ${
                    theme === 'dark' ? 'bg-matrix-darkest/60' : 'bg-emerald-50/90'
                  }`}
                />
              </div>
            )}

            {cert.link && (
              <div className="mb-4">
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-block px-4 py-2 rounded-md border transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-matrix-darkest/60 text-matrix-accent-dark border-matrix-accent-dark/30 hover:bg-matrix-accent-dark/20'
                      : 'bg-emerald-50/90 text-emerald-600 border-emerald-200 hover:bg-emerald-100/90'
                  }`}
                  style={{
                    textShadow: theme === 'dark'
                      ? '0 0 10px rgba(0, 255, 140, 0.2)'
                      : '0 0 10px rgba(16, 185, 129, 0.3)'
                  }}
                >
                  View Certificate
                </a>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {cert.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className={`px-3 py-1 text-sm rounded ${
                    theme === 'dark'
                      ? 'bg-matrix-darkest/60 text-matrix-accent-dark border border-matrix-accent-dark/30'
                      : 'bg-emerald-100 text-emerald-700 border border-emerald-200 shadow-sm'
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

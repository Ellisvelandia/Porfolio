import React from "react";

const Certifications = () => {
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
    <section>
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Certifications
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                  {cert.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {cert.issuer}
                </p>
              </div>
              <span className="text-gray-500 dark:text-gray-400">
                {cert.date}
              </span>
            </div>
            {cert.img && (
              <div className="mb-4">
                <img
                  src={cert.img}
                  alt={cert.name}
                  className="w-full h-40 object-contain rounded-lg bg-gray-100 dark:bg-gray-700 p-2"
                />
              </div>
            )}
            {cert.link && (
              <div className="mb-4">
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  View Certificate
                </a>
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {cert.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
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

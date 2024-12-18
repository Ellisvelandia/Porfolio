import React from "react";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
  } from "@fortawesome/free-regular-svg-icons";

const ContactInfo = () => {
  const socialLinks = [
    {
      icon: faGithub,
      url: "https://github.com/Ellisvelandia",
      label: "GitHub",
    },
    {
      icon: faLinkedin,
      url: "https://linkedin.com/in/ellisvelandia",
      label: "LinkedIn",
    },
  ];

  return (
    <div className="md:col-span-2 space-y-4 md:sticky md:top-20">
      <div className="bg-white/90 dark:bg-gray-900/95 backdrop-blur-lg rounded-xl p-5 sm:p-6 shadow-xl border border-gray-200/50 dark:border-gray-800/50 hover:border-emerald-500/30 dark:hover:border-[#00FF00]/30 transition-all duration-300">
        <h2 className="text-2xl font-bold text-emerald-600 dark:text-[#00FF00] mb-4">
          Connect With Me
        </h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-50/80 dark:bg-gray-800/50 rounded-lg hover:bg-emerald-50/80 dark:hover:bg-gray-800/70 transition-all duration-300">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="text-xl text-emerald-600 dark:text-[#00FF00]"
            />
            <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-[#00FF00] transition-colors duration-300">
              eyis619@gmail.com
            </span>
          </div>
          <div className="flex space-x-3">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 bg-gray-50/80 dark:bg-gray-800/50 rounded-lg transition-all duration-300 hover:bg-emerald-500 dark:hover:bg-[#00FF00] hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20 dark:hover:shadow-[#00FF00]/20"
                aria-label={link.label}
              >
                <FontAwesomeIcon
                  icon={link.icon}
                  className="text-xl text-gray-700 dark:text-gray-300 group-hover:text-white dark:group-hover:text-gray-900 transition-all duration-300"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;

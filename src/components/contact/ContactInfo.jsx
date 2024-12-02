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
    <div className="md:col-span-2 space-y-8 md:sticky md:top-20">
      <div className="bg-white/90 dark:bg-gray-900/95 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-800/50 hover:border-emerald-500/30 dark:hover:border-[#00FF00]/30 transition-all duration-300">
        <h2 className="text-3xl font-bold text-emerald-600 dark:text-[#00FF00] mb-8 tracking-tight">
          Connect With Me
        </h2>
        <div className="space-y-8">
          <div className="flex items-center space-x-4 p-4 bg-gray-50/80 dark:bg-gray-800/50 rounded-xl hover:bg-emerald-50/80 dark:hover:bg-gray-800/70 transition-all duration-300">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="text-2xl text-emerald-600 dark:text-[#00FF00]"
            />
            <span className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-[#00FF00] transition-colors duration-300">
              eyis619@gmail.com
            </span>
          </div>
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-4 bg-gray-50/80 dark:bg-gray-800/50 rounded-xl transition-all duration-300 hover:bg-emerald-500 dark:hover:bg-[#00FF00] hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20 dark:hover:shadow-[#00FF00]/20"
                aria-label={link.label}
              >
                <FontAwesomeIcon
                  icon={link.icon}
                  className="text-2xl text-gray-700 dark:text-gray-300 group-hover:text-white dark:group-hover:text-gray-900 transition-all duration-300"
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

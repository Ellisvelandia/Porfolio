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
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Connect With Me
        </h2>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="text-xl text-blue-500"
            />
            <span className="text-gray-600 dark:text-gray-300">
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
                className="group relative p-3 bg-gray-100 dark:bg-gray-700 rounded-lg transition-all duration-300 hover:bg-blue-500"
                aria-label={link.label}
              >
                <FontAwesomeIcon
                  icon={link.icon}
                  className="text-xl text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors"
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

import React from 'react';

const About = () => {
  const skills = [
    'JavaScript', 'React', 'Node.js', 'Python',
    'TypeScript', 'TailwindCSS', 'MongoDB', 'AWS'
  ];

  return (
    <section id="about" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-4">Who I Am</h3>
            <p className="text-gray-300 mb-6">
              I'm a passionate developer who loves building things for the web. 
              With a strong foundation in both frontend and backend technologies, 
              I create efficient, scalable, and user-friendly solutions.
            </p>
            <p className="text-gray-300">
              When I'm not coding, you can find me exploring new technologies, 
              contributing to open-source projects, or sharing knowledge with the 
              developer community.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Skills</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {skills.map((skill) => (
                <div 
                  key={skill}
                  className="bg-gray-700 rounded-lg p-3 text-center hover:bg-purple-600 transition-colors"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
import React from 'react';

const PageLayout = ({ children }) => {
  return (
    <div className="min-h-screen py-20 px-4 bg-[url('/menu.jpg')] dark:bg-[url('/wall.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="max-w-4xl mx-auto">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;

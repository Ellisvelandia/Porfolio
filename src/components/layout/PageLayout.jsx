import React from 'react';

const PageLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full bg-[url('/menu.jpg')] dark:bg-[url('/wall.jpg')] bg-fixed bg-cover bg-center bg-no-repeat">
      <div className="relative h-full w-full px-4 pt-24 md:pt-28">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;

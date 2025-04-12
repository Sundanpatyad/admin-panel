import React from "react";
import UserHeader from "../components/UserHeader";

const MainLayout = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <UserHeader userName="John Doe" title={title} />
      <div className="w-full px-4 sm:px-6 md:px-8 lg:container lg:mx-auto py-4 sm:py-6">
        <div className="max-w-full overflow-x-auto">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;

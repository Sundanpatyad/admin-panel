import React from "react";
import UserHeader from "../components/UserHeader";

const MainLayout = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <UserHeader userName="John Doe" title={title} />
      <div className="container mx-auto py-4">{children}</div>
    </div>
  );
};

export default MainLayout;

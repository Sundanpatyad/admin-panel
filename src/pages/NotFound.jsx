import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl md:text-6xl font-bold text-purple-700 mb-4">404</h1>
      <p className="text-xl md:text-2xl text-gray-600 mb-8">Page not found</p>
      <Link 
        to="/" 
        className="px-6 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
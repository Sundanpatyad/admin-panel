import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Welcome to Admin Dashboard</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Get Started</h2>
        <p className="mb-4">This is a simple admin dashboard application with authentication features.</p>
        <div className="flex space-x-4">
          <Link to="/login" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
            Login
          </Link>
          <Link to="/signup" className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
            Sign Up
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Manage Your Data</h3>
          <p>Access and manage all your data from a centralized dashboard.</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Secure Authentication</h3>
          <p>Your data is protected with our secure authentication system.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
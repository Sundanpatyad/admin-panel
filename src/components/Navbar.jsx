import { Link } from "react-router-dom";
import React from "react";

function Navbar({ isAuthenticated, handleLogout }) {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold text-indigo-600">Admin Dashboard</div>
        <div className="space-x-4">
          <Link to="/" className="text-gray-600 hover:text-indigo-600">
            Home
          </Link>
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="text-gray-600 hover:text-indigo-600">
                Login
              </Link>
              <Link
                to="/signup"
                className="text-gray-600 hover:text-indigo-600"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="text-gray-600 hover:text-indigo-600"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-indigo-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

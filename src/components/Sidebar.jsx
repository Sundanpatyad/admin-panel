import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import LogoutConfirmationModal from "./LogoutModal";
import { closeSidebar } from "../redux/slices/navSclice";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isOpen: isSidebarOpen } = useSelector((state) => state.nav);

  // Navigation items for search - adding keywords for better matching
  const navigationItems = [
    {
      path: "/candidates",
      label: "Candidates",
      section: "Recruitment",
      keywords: ["candidate", "applicant", "job", "recruit", "hiring"],
    },
    {
      path: "/employees",
      label: "Employees",
      section: "Organization",
      keywords: ["employee", "staff", "team", "member", "worker", "personnel"],
    },
    {
      path: "/attendance",
      label: "Attendance",
      section: "Organization",
      keywords: [
        "attendance",
        "present",
        "absent",
        "time",
        "clock",
        "check-in",
      ],
    },
    {
      path: "/leaves",
      label: "Leaves",
      section: "Organization",
      keywords: [
        "leave",
        "vacation",
        "holiday",
        "time-off",
        "absence",
        "day-off",
      ],
    },
  ];

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSidebarOpen &&
        !event.target.closest(".sidebar") &&
        !event.target.closest(".sidebar-toggle")
      ) {
        dispatch(closeSidebar());
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  const isActiveLink = (path) => {
    return location.pathname === path
      ? "text-purple-700 font-semibold"
      : "text-gray-600";
  };

  const handleLogoutClick = () => {
    // Open the confirmation modal instead of logging out directly
    setIsLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Enhanced search submission with better matching and feedback
  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    // Find matching navigation item with improved matching
    const searchLower = searchQuery.toLowerCase();
    const matchedItem = navigationItems.find(
      (item) =>
        item.label.toLowerCase().includes(searchLower) ||
        item.section.toLowerCase().includes(searchLower) ||
        item.keywords.some((keyword) => keyword.includes(searchLower))
    );

    if (matchedItem) {
      navigate(matchedItem.path);
      setSearchQuery("");
      if (window.innerWidth < 768) {
        dispatch(closeSidebar());
      }
    } else {
      // Provide visual feedback when no match is found
      setSearchQuery("");
      // Optional: Add a toast notification or other feedback here
    }
  };

  // Add real-time search suggestions
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // Update search results as user types
  useEffect(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const results = navigationItems.filter(
        (item) =>
          item.label.toLowerCase().includes(query) ||
          item.section.toLowerCase().includes(query) ||
          item.keywords.some((keyword) => keyword.includes(query))
      );
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchQuery]);

  // Handle clicking outside to close search results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".search-container")) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle search result selection
  const handleResultClick = (path) => {
    navigate(path);
    setSearchQuery("");
    setShowResults(false);
    if (window.innerWidth < 768) {
      dispatch(closeSidebar());
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" />
      )}

      {/* Sidebar */}
      <div
        className={`sidebar fixed md:static inset-y-0 left-0 z-40 w-64 min-h-screen bg-white border-r border-gray-200 px-4 py-6 transform transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center mb-8">
          <div className="w-8 h-8 border-2 border-purple-700"></div>
          <span className="ml-2 text-xl font-bold text-purple-700">LOGO</span>
        </div>

        {/* Enhanced Search with dropdown results */}
        <div className="mb-8 search-container relative">
          <form onSubmit={handleSearchSubmit} className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-purple-500"
              onFocus={() => searchResults.length > 0 && setShowResults(true)}
            />
          </form>

          {/* Search Results Dropdown */}
          {showResults && searchResults.length > 0 && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
              {searchResults.map((item) => (
                <div
                  key={item.path}
                  className="px-4 py-2 hover:bg-purple-50 cursor-pointer"
                  onClick={() => handleResultClick(item.path)}
                >
                  <div className="font-medium text-gray-900">{item.label}</div>
                  <div className="text-sm text-gray-500">{item.section}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Rest of the sidebar remains unchanged */}
        <div className="space-y-8">
          {/* Recruitment Section */}
          <div>
            <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
              Recruitment
            </h3>
            <Link
              to="/candidates"
              className={`flex items-center space-x-2 py-2 px-3 rounded-md hover:bg-purple-50 ${isActiveLink(
                "/candidates"
              )}`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span>Candidates</span>
            </Link>
          </div>

          {/* Organization Section */}
          <div>
            <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
              Organization
            </h3>
            <nav className="space-y-1">
              <Link
                to="/employees"
                className={`flex items-center space-x-2 py-2 px-3 rounded-md hover:bg-purple-50 ${isActiveLink(
                  "/employees"
                )}`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <span>Employees</span>
              </Link>
              <Link
                to="/attendance"
                className={`flex items-center space-x-2 py-2 px-3 rounded-md hover:bg-purple-50 ${isActiveLink(
                  "/attendance"
                )}`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
                <span>Attendance</span>
              </Link>
              <Link
                to="/leaves"
                className={`flex items-center space-x-2 py-2 px-3 rounded-md hover:bg-purple-50 ${isActiveLink(
                  "/leaves"
                )}`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>Leaves</span>
              </Link>
            </nav>
          </div>

          {/* Others Section */}
          <div>
            <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
              Others
            </h3>
            <button
              onClick={handleLogoutClick}
              className="flex items-center space-x-2 py-2 px-3 rounded-md hover:bg-purple-50 text-gray-600 w-full text-left"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <LogoutConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={closeLogoutModal}
      />
    </>
  );
}

export default Sidebar;

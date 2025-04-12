import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toggleSidebar } from "../redux/slices/navSclice";

const UserHeader = ({ userImage, title }) => {
  const dispatch = useDispatch();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const userName = user?.name || "Admin";
  const userRole = user?.role || "Administrator";
  const dropdownRef = useRef(null);
  const { isOpen: isSidebarOpen } = useSelector((state) => state.nav);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white p-2 sm:p-3 md:p-4 shadow flex justify-between items-center relative">
      <div className="flex items-center">
        <span className="text-base sm:text-lg md:text-xl font-bold text-black truncate max-w-[120px] sm:max-w-[200px] md:max-w-none">
          {title}
        </span>
      </div>

      <div
        className="flex items-center space-x-1 sm:space-x-2 md:space-x-4"
        ref={dropdownRef}
      >
        {/* Notification Button */}
        <div className="relative">
          <button
            className="p-1 sm:p-1.5 md:p-2 relative"
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-[8px] sm:text-[10px] md:text-xs flex items-center justify-center">
              3
            </span>
          </button>

          {/* Notification Dropdown */}
          {isNotificationOpen && (
            <div className="absolute right-0 mt-2 w-48 sm:w-56 md:w-64 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
              <div className="p-2 text-xs sm:text-sm">
                <div className="font-medium mb-2">Notifications</div>
                {/* Add your notification items here */}
                <div className="text-gray-500">No new notifications</div>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => dispatch(toggleSidebar(!isSidebarOpen))}
          className="sidebar-toggle z-50 p-1 mr-2 rounded-md bg-purple-700 text-white md:hidden"
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isSidebarOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Profile Button */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-1 sm:gap-1.5 md:gap-2 cursor-pointer"
          >
            <div className="text-right hidden sm:block">
              <p className="text-xs sm:text-sm font-medium text-gray-900">
                {userName}
              </p>
              <p className="text-[10px] sm:text-xs text-gray-500">{userRole}</p>
            </div>
            {userImage ? (
              <img
                src={userImage}
                alt={userName}
                className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-purple-200 flex items-center justify-center">
                <span className="text-purple-700 font-semibold text-xs sm:text-sm md:text-base">
                  {userName.charAt(0)}
                </span>
              </div>
            )}
          </button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-36 sm:w-40 md:w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
              <div className="py-1 sm:py-2">
                <div className="block sm:hidden px-3 sm:px-4 py-1 sm:py-2 border-b border-gray-100">
                  <p className="text-xs sm:text-sm font-medium text-gray-900">
                    {userName}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-500">
                    {userRole}
                  </p>
                </div>
                <button className="w-full px-3 sm:px-3 md:px-4 py-1.5 sm:py-2 text-left text-xs sm:text-sm md:text-base text-gray-700 hover:bg-purple-50 hover:text-purple-700">
                  Edit Profile
                </button>
                <button className="w-full px-3 sm:px-3 md:px-4 py-1.5 sm:py-2 text-left text-xs sm:text-sm md:text-base text-gray-700 hover:bg-purple-50 hover:text-purple-700">
                  Change Password
                </button>
                <button className="w-full px-3 sm:px-3 md:px-4 py-1.5 sm:py-2 text-left text-xs sm:text-sm md:text-base text-gray-700 hover:bg-purple-50 hover:text-purple-700">
                  Manage Notification
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserHeader;

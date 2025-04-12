import React from "react";
import { logout } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function LogoutConfirmationModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle the logout process
  const handleConfirmLogout = async () => {
    try {
      // Dispatch the logout action which will call the API and remove the token
      await dispatch(logout()).unwrap();
      // Close the modal
      onClose();
      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-md">
        {/* Header */}
        <div className="bg-purple-700 text-white py-4 px-6">
          <h2 className="text-xl font-medium text-center">Log Out</h2>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 text-center text-lg">
            Are you sure you want to log out?
          </p>
        </div>

        {/* Footer with action buttons */}
        <div className="flex justify-center p-6 pt-2 space-x-4">
          <button
            onClick={onClose}
            className="bg-purple-700 text-white px-6 py-2 rounded-full font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmLogout}
            className="border border-red-500 text-red-500 px-6 py-2 rounded-full font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutConfirmationModal;

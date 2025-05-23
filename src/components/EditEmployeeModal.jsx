import Dropdown from "./Dropdown"; // Add this import
import Modal from "./Modal";
import React from "react";

const EditEmployeeModal = ({ isOpen, onClose, employee, onSave, onChange }) => {
  // Position options for dropdown
  const positionOptions = [
    { value: "Full Time", label: "Full Time" },
    { value: "Intern", label: "Intern" },
    { value: "Contractor", label: "Contractor" },
    { value: "Manager", label: "Manager" },
  ];

  // Handle dropdown change
  const handlePositionChange = (value) => {
    onChange({ target: { name: "position", value } });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Employee Details">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name*"
            value={employee.fullName}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
            required
          />
        </div>

        {/* Other input fields remain unchanged */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email Address*"
            value={employee.email}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number*"
            value={employee.phoneNumber}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="department"
            placeholder="Department*"
            value={employee.department}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
            required
          />
        </div>

        {/* Replace select with Dropdown component */}
        <div>
          <Dropdown
            value={employee.position}
            onChange={handlePositionChange}
            options={positionOptions}
            placeholder="Select Position*"
            className="rounded-md"
          />
        </div>

        <div>
          <div className="relative">
            <input
              type="date"
              name="dateOfJoining"
              value={employee.dateOfJoining}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 appearance-none"
              required
              style={{ colorScheme: "light" }}
            />
            <div className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2">
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={onSave}
          className="px-8 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
        >
          Save
        </button>
      </div>
    </Modal>
  );
};

export default EditEmployeeModal;

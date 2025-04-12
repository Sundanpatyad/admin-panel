import React, { useCallback, useEffect, useState } from "react";
import {
  createLeave,
  fetchAllLeaves,
  fetchApprovedLeaves,
} from "../redux/slices/leaveSlice";

import Modal from "./Modal";
import axios from "axios";
import { debounce } from "lodash";
import { useDispatch } from "react-redux";

const AddLeaveModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    employeeName: "",
    employeeId: "",
    designation: "",
    leaveDate: "",
    reason: "",
    documents: null,
  });

  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (!query) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      try {
        setIsSearching(true);
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/employees/search?query=${query}`
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error searching employees:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 500),
    []
  );

  const handleEmployeeSearch = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, employeeName: value }));
    setShowDropdown(true);
    debouncedSearch(value);
  };

  const handleSelectEmployee = (employee) => {
    setFormData((prev) => ({
      ...prev,
      employeeId: employee._id,
      employeeName: employee.fullName,
      designation: employee.position,
    }));
    setShowDropdown(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      documents: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("employee", formData.employeeId);
      formDataToSend.append("name", formData.employeeName);
      formDataToSend.append("designation", formData.designation);
      formDataToSend.append("date", formData.leaveDate);
      formDataToSend.append("reason", formData.reason);

      // Append document if it exists
      if (formData.documents) {
        formDataToSend.append("documents", formData.documents);
      }

      const resultAction = await dispatch(createLeave(formDataToSend));

      if (createLeave.fulfilled.match(resultAction)) {
        dispatch(fetchAllLeaves());
        dispatch(fetchApprovedLeaves());
        onClose();
      } else if (createLeave.rejected.match(resultAction)) {
        throw new Error(resultAction.payload || "Failed to create leave");
      }
    } catch (error) {
      setError(error.message || "An error occurred while creating leave");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".search-container")) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Leave">
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <div className="grid grid-cols-2 gap-6">
          <div className="relative search-container">
            <input
              type="text"
              name="employeeName"
              value={formData.employeeName}
              onChange={handleEmployeeSearch}
              placeholder="Search Employee Name*"
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
              required
              autoComplete="off"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
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
            {isSearching && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-700"></div>
              </div>
            )}
            {showDropdown && searchResults.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                {searchResults.map((employee) => (
                  <div
                    key={employee._id}
                    onClick={() => handleSelectEmployee(employee)}
                    className="px-4 py-2 hover:bg-purple-50 cursor-pointer flex items-center gap-3"
                  >
                    <img
                      src={employee.profileImage}
                      alt={employee.fullName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium">{employee.fullName}</div>
                      <div className="text-sm text-gray-600">
                        {employee.position}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              placeholder="Designation*"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
              required
              readOnly
            />
          </div>

          <div>
            <input
              type="date"
              name="leaveDate"
              value={formData.leaveDate}
              onChange={handleInputChange}
              placeholder="Leave Date*"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
              required
            />
          </div>

          <div className="relative">
            <input
              type="file"
              name="documents"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
              accept=".pdf,.doc,.docx"
            />
            <svg
              className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
          </div>
        </div>

        <div className="mt-6">
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleInputChange}
            placeholder="Reason*"
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500"
            required
          />
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-8 py-2 rounded-full transition-colors ${
              isSubmitting
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-700"></div>
                Saving...
              </div>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddLeaveModal;

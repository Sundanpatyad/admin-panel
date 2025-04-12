import React, { useState } from "react";

import AddCandidateModal from "./AddCandidateModal";
import Dropdown from "./Dropdown"; // Add this import
import { addCandidate } from "../redux/slices/candidateSlice";
import { useDispatch } from "react-redux";

const Header = ({ title, onAddClick, onFilterChange }) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Status options for dropdown
  const statusOptions = [
    { value: "", label: "Status" },
    { value: "New", label: "New" },
    { value: "Selected", label: "Selected" },
    { value: "Rejected", label: "Rejected" },
  ];

  // Position options for dropdown
  const positionOptions = [
    { value: "", label: "Position" },
    { value: "Developer", label: "Developer" },
    { value: "Designer", label: "Designer" },
    { value: "HR", label: "HR" },
  ];

  // Update filters and notify parent
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onFilterChange?.({
      search: value,
      status: statusFilter,
      position: positionFilter,
    });
  };

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
    onFilterChange?.({
      search: searchTerm,
      status: value,
      position: positionFilter,
    });
  };

  const handlePositionFilterChange = (value) => {
    setPositionFilter(value);
    onFilterChange?.({
      search: searchTerm,
      status: statusFilter,
      position: value,
    });
  };

  const handleAddClick = () => {
    setIsModalOpen(true);
    if (onAddClick) {
      onAddClick();
    }
  };

  const handleSubmitCandidate = (candidateData) => {
    dispatch(
      addCandidate({
        ...candidateData,
        status: "New",
      })
    );
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center w-full justify-between gap-4">
          <div className="flex gap-4">
            <Dropdown
              value={statusFilter}
              onChange={handleStatusFilterChange}
              options={statusOptions}
              className="min-w-[120px]"
            />
            <Dropdown
              value={positionFilter}
              onChange={handlePositionFilterChange}
              options={positionOptions}
              className="min-w-[120px]"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-[300px] px-4 py-2 pl-10 border border-gray-300 rounded-full"
                value={searchTerm}
                onChange={handleSearchChange}
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
            </div>
            <button
              onClick={handleAddClick}
              className="px-6 py-2 bg-purple-700 text-white rounded-full whitespace-nowrap hover:bg-purple-800 transition-colors"
            >
              Add {title.slice(0, -1)}
            </button>
          </div>
        </div>
      </div>
      <AddCandidateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitCandidate}
      />
    </>
  );
};

export default Header;

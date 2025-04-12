import React from "react";

const PageHeader = ({
  title,
  searchTerm,
  onSearchChange,
  positionFilter,
  onPositionChange,
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center justify-between w-full gap-4">
        <select
          className="px-4 py-2 border border-gray-300 rounded-full min-w-[150px]"
          value={positionFilter}
          onChange={onPositionChange}
        >
          <option value="">Position</option>
          <option value="Full Time">Full Time</option>
          <option value="Senior">Senior</option>
          <option value="Junior">Junior</option>
          <option value="Team Lead">Team Lead</option>
          <option value="Intern">Intern</option>
        </select>
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-[300px] px-4 py-2 pl-10 border border-gray-300 rounded-full"
            value={searchTerm}
            onChange={onSearchChange}
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
      </div>
    </div>
  );
};

export default PageHeader;

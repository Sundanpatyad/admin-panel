import React, { useEffect, useRef, useState } from "react";
import {
  fetchAllLeaves,
  fetchApprovedLeaves,
  updateLeave,
} from "../redux/slices/leaveSlice";
import { useDispatch, useSelector } from "react-redux";

import AddLeaveModal from "../components/AddLeaveModal";
import MainLayout from "../layouts/MainLayout";

const LeaveTable = ({
  filteredLeaves,
  selectedLeaveId,
  toggleLeaveStatusDropdown,
  handleUpdateStatus,
}) => {
  const dropdownRef = useRef(null);

  return (
    <div className="bg-white rounded-3xl min-h-[50vh] overflow-hidden shadow-sm">
      <div className="bg-purple-700 text-white p-4">
        <h2 className="text-xl font-semibold">Applied Leaves</h2>
      </div>
      <div className="overflow-y-auto h-[70vh]">
        {/* Header */}
        <div className="grid grid-cols-6 bg-purple-700 text-white sticky top-0 z-10">
          <div className="px-6 py-4 text-sm font-medium">Profile</div>
          <div className="px-6 py-4 text-sm font-medium">Name</div>
          <div className="px-6 py-4 text-sm font-medium">Date</div>
          <div className="px-6 py-4 text-sm font-medium">Reason</div>
          <div className="px-6 py-4 text-sm font-medium">Status</div>
          <div className="px-6 py-4 text-sm font-medium">Docs</div>
        </div>

        {/* Body */}
        <div className="divide-y min-h-[50vh] overflow-y-scroll  divide-gray-100">
          {filteredLeaves.map((leave) => (
            <div
              key={leave._id}
              className="grid grid-cols-6 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="px-6 py-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src={
                      leave.profile ||
                      `https://ui-avatars.com/api/?name=${leave.name}&background=random`
                    }
                    alt={leave.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="px-6 py-4">
                <div className="text-base font-medium text-gray-900">
                  {leave.name}
                </div>
                <div className="text-sm text-gray-500">{leave.designation}</div>
              </div>

              <div className="px-6 py-4 text-base text-gray-900">
                {new Date(leave.date).toLocaleDateString()}
              </div>

              <div className="px-6 py-4 text-base text-gray-900">
                {leave.reason}
              </div>

              <div className="px-6 py-4">
                <div className="relative status-dropdown" ref={dropdownRef}>
                  <button
                    onClick={() => toggleLeaveStatusDropdown(leave._id)}
                    className="inline-flex items-center px-4 py-1.5 rounded-full border transition-colors duration-200 hover:bg-gray-50"
                    style={{
                      borderColor:
                        leave.status.toLowerCase() === "approved"
                          ? "#10B981"
                          : leave.status.toLowerCase() === "rejected"
                          ? "#EF4444"
                          : "#F59E0B",
                      color:
                        leave.status.toLowerCase() === "approved"
                          ? "#059669"
                          : leave.status.toLowerCase() === "rejected"
                          ? "#DC2626"
                          : "#D97706",
                    }}
                  >
                    {leave.status}
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {selectedLeaveId === leave._id && (
                    <div className="absolute left-0 mt-1  px-4 py-2  bg-white rounded-lg shadow-lg z-50 min-w-[120px]">
                      {["Approved", "Pending", "Rejected"].map((status) => (
                        <button
                          key={status}
                          onClick={() => handleUpdateStatus(leave._id, status)}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="px-6 py-4">
                {leave.documents && (
                  <button className="text-purple-700 hover:text-purple-800 transition-colors duration-200">
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
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const LeaveCalendar = ({
  selectedDate,
  handlePrevMonth,
  handleNextMonth,
  monthNames,
  emptyDays,
  days,
  setSelectedDate,
  approvedLeaves,
}) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
      <div className="bg-purple-700 text-white px-6 py-4">
        <h2 className="text-xl font-semibold">Leave Calendar</h2>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handlePrevMonth}
            className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h3 className="text-lg font-semibold">
            {monthNames[selectedDate.getMonth()]}, {selectedDate.getFullYear()}
          </h3>
          <button
            onClick={handleNextMonth}
            className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-500 mb-2">
          <div>S</div>
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {emptyDays.map((day) => (
            <div key={`empty-${day}`} className="h-12"></div>
          ))}
          {days.map((day) => {
            const date = new Date(
              selectedDate.getFullYear(),
              selectedDate.getMonth(),
              day
            );
            const isSelected =
              date.toDateString() === selectedDate.toDateString();
            const hasLeave = approvedLeaves.some(
              (leave) =>
                new Date(leave.date).toDateString() === date.toDateString()
            );

            return (
              <button
                key={day}
                onClick={() => setSelectedDate(date)}
                className={`h-12 flex items-center justify-center rounded-lg text-sm relative transition-colors duration-200 ${
                  isSelected
                    ? "bg-purple-100 text-purple-700 font-semibold"
                    : hasLeave
                    ? "bg-purple-50 text-purple-600"
                    : "hover:bg-gray-50"
                }`}
              >
                {day}
                {hasLeave && (
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Approved Leaves
          </h3>
          <div className="space-y-3 overflow-y-auto pr-2">
            {approvedLeaves.length > 0 ? (
              approvedLeaves.map((leave) => (
                <div
                  key={leave._id}
                  className="flex items-center space-x-4 p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                    <img
                      src={
                        leave.profile ||
                        `https://ui-avatars.com/api/?name=${leave.name}&background=random`
                      }
                      alt={leave.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      {leave.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {leave.designation}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(leave.date).toLocaleDateString()}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-4">
                No approved leaves for this period
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Leave = () => {
  const dispatch = useDispatch();
  const leaves = useSelector((state) => state.leave.leaves);
  const approvedLeaves = useSelector((state) => state.leave.approvedLeaves);
  const error = useSelector((state) => state.leave.error);

  const [status, setStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [selectedLeaveId, setSelectedLeaveId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isAddLeaveModalOpen, setIsAddLeaveModalOpen] = useState(false);

  const filterDropdownRef = useRef(null);

  useEffect(() => {
    dispatch(fetchAllLeaves());
    dispatch(fetchApprovedLeaves());
  }, [dispatch]);

  const handleStatusChange = (value) => {
    setStatus(value);
    setIsStatusDropdownOpen(false);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleUpdateStatus = async (leaveId, newStatus) => {
    try {
      await dispatch(updateLeave({ leaveId, status: newStatus })).unwrap();
      dispatch(fetchAllLeaves());
      dispatch(fetchApprovedLeaves());
      setSelectedLeaveId(null);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const toggleLeaveStatusDropdown = (leaveId) => {
    setSelectedLeaveId(selectedLeaveId === leaveId ? null : leaveId);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Handle status dropdown in table
      if (selectedLeaveId && !event.target.closest(".status-dropdown")) {
        setSelectedLeaveId(null);
      }

      // Handle filter dropdown
      if (isStatusDropdownOpen && !event.target.closest(".filter-dropdown")) {
        setIsStatusDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedLeaveId, isStatusDropdownOpen]);

  const filteredLeaves = leaves.filter((leave) => {
    const matchesStatus =
      status === "all" || leave.status.toLowerCase() === status.toLowerCase();
    const matchesSearch =
      leave.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      leave.reason.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const daysInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  ).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handlePrevMonth = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1)
    );
  };

  if (error) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="bg-red-50 text-red-600 p-4 rounded-lg shadow">
            Error: {error}
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={"Leaves"}>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative filter-dropdown" ref={filterDropdownRef}>
              <button
                onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                className="px-4 py-2 border border-gray-300 rounded-full flex items-center space-x-2 hover:bg-gray-50 transition-colors duration-200 shadow-sm"
              >
                <span className="text-gray-700">
                  {status === "all"
                    ? "All Status"
                    : status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isStatusDropdownOpen && (
                <div className="absolute z-50 mt-2 bg-white  rounded-lg shadow-lg w-full overflow-hidden">
                  {["all", "approved", "pending", "rejected"].map((value) => (
                    <button
                      key={value}
                      onClick={() => handleStatusChange(value)}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-50 capitalize transition-colors duration-200 ${
                        status === value ? "bg-purple-50 text-purple-700" : ""
                      }`}
                    >
                      {value === "all" ? "All Status" : value}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="search"
                placeholder="Search name or reason"
                value={searchQuery}
                onChange={handleSearch}
                className="pl-10 px-4 py-2 border border-gray-300 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
              />
            </div>
          </div>
          <button
            onClick={() => setIsAddLeaveModalOpen(true)}
            className="px-4 py-2 bg-purple-700 text-white rounded-full hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200 shadow-sm"
          >
            <span className="flex items-center">
              <svg
                className="w-5 h-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add Leave
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 min-h-[70vh] lg:grid-cols-2 gap-6">
          <LeaveTable
            filteredLeaves={filteredLeaves}
            selectedLeaveId={selectedLeaveId}
            toggleLeaveStatusDropdown={toggleLeaveStatusDropdown}
            handleUpdateStatus={handleUpdateStatus}
          />

          <LeaveCalendar
            selectedDate={selectedDate}
            handlePrevMonth={handlePrevMonth}
            handleNextMonth={handleNextMonth}
            monthNames={monthNames}
            emptyDays={emptyDays}
            days={days}
            setSelectedDate={setSelectedDate}
            approvedLeaves={approvedLeaves}
          />
        </div>

        <AddLeaveModal
          isOpen={isAddLeaveModalOpen}
          onClose={() => setIsAddLeaveModalOpen(false)}
        />
      </div>
    </MainLayout>
  );
};

export default Leave;

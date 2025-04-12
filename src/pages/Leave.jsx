import React, { useEffect, useRef, useState } from "react";
import {
  fetchAllLeaves,
  fetchApprovedLeaves,
  updateLeave,
} from "../redux/slices/leaveSlice";
import { useDispatch, useSelector } from "react-redux";

import AddLeaveModal from "../components/AddLeaveModal";
import Dropdown from "../components/Dropdown"; // Add this import
import MainLayout from "../layouts/MainLayout";

// Status options for the dropdown
const statusOptions = [
  { value: "Approved", label: "Approved" },
  { value: "Pending", label: "Pending" },
  { value: "Rejected", label: "Rejected" },
];

const LeaveTable = ({ filteredLeaves, handleUpdateStatus }) => {
  const handleDocumentDownload = (documentUrl, fileName = "document") => {
    if (!documentUrl) return;

    // Create an anchor element
    const anchor = document.createElement("a");
    anchor.href = documentUrl;
    anchor.download = fileName || "document";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <div className="bg-white rounded-3xl min-h-[50vh] overflow-hidden shadow-sm">
      <div className="bg-purple-700 text-white p-4">
        <h2 className="text-xl font-semibold">Applied Leaves</h2>
      </div>
      <div className="">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="bg-purple-700 text-white">
              <th className="px-4 py-4 text-left text-sm font-medium">
                Profile
              </th>
              <th className="px-4 py-4 text-left text-sm font-medium">Name</th>
              <th className="px-4 py-4 text-left text-sm font-medium">Date</th>
              <th className="px-4 py-4 text-left text-sm font-medium">
                Reason
              </th>
              <th className="px-4 py-4 text-left text-sm font-medium">
                Status
              </th>
              <th className="px-4 py-4 text-left text-sm font-medium">Docs</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaves.map((leave) => (
              <tr
                key={leave._id}
                className="hover:bg-gray-50 border-b border-gray-100"
              >
                {/* Profile */}
                <td className="px-4 py-4">
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
                </td>

                {/* Name */}
                <td className="px-4 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {leave.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {leave.designation}
                  </div>
                </td>

                {/* Date */}
                <td className="px-4 py-4 text-sm text-gray-900">
                  {new Date(leave.date).toLocaleDateString()}
                </td>

                {/* Reason */}
                <td className="px-4 py-4 text-sm text-gray-900 truncate max-w-[200px]">
                  {leave.reason}
                </td>

                {/* Status */}
                <td className="px-4 py-4">
                  <div className="relative z-[60]">
                    <Dropdown
                      value={leave.status}
                      onChange={(newStatus) =>
                        handleUpdateStatus(leave._id, newStatus)
                      }
                      options={statusOptions}
                      className="w-32"
                    />
                  </div>
                </td>

                {/* Documents */}
                <td className="px-4 py-4">
                  {leave.documents && (
                    <button
                      onClick={() =>
                        handleDocumentDownload(
                          leave.documents,
                          `leave-document-${leave._id}`
                        )
                      }
                      className="text-purple-700 hover:text-purple-800 transition-colors duration-200"
                      title="Download Document"
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
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
                className={`h-12 border flex items-center justify-center rounded-lg text-sm relative transition-colors duration-200 ${
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
                {hasLeave && day === 8 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-purple-700 rounded-full flex items-center justify-center text-white text-xs">
                    1
                  </span>
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
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Handle filter dropdown
      if (isStatusDropdownOpen && !event.target.closest(".filter-dropdown")) {
        setIsStatusDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isStatusDropdownOpen]);

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
              <Dropdown
                value={status}
                onChange={handleStatusChange}
                options={[
                  { value: "all", label: "Status" },
                  { value: "approved", label: "Approved" },
                  { value: "pending", label: "Pending" },
                  { value: "rejected", label: "Rejected" },
                ]}
                placeholder="Status"
                className="w-32"
              />
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
                placeholder="Search"
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

        <div className="grid grid-cols-1 min-h-[70vh] lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <LeaveTable
              filteredLeaves={filteredLeaves}
              handleUpdateStatus={handleUpdateStatus}
            />
          </div>

          <div className="lg:col-span-1">
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

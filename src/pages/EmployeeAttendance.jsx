import React, { useEffect, useState } from "react";
import {
  fetchAttendance,
  updateAttendance,
} from "../redux/slices/attendanceSlice";
import { useDispatch, useSelector } from "react-redux";

import Dropdown from "../components/Dropdown";
import MainLayout from "../layouts/MainLayout";
import PageHeader from "../components/PageHeader";

const EmployeeAttendance = () => {
  const dispatch = useDispatch();
  const { attendance, status, error } = useSelector(
    (state) => state.attendance
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    dispatch(fetchAttendance());
  }, [dispatch]);

  const handleStatusChange = (employeeId, newStatus) => {
    dispatch(
      updateAttendance({
        employeeId,
        status: newStatus,
        task: "--", // You can add a task input field if needed
      })
    );
  };

  // Remove console.log

  // Filter employees based on search and status
  const filteredEmployees = attendance?.filter((employee) => {
    const matchesSearch =
      employee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || employee.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  if (error) {
    return (
      <MainLayout>
        <div className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-xl text-red-500">Error: {error}</div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={"Attandance"}>
      <div className="p-6">
        <PageHeader
          title="Attendance"
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          statusFilter={selectedStatus}
          onStatusChange={(e) => setSelectedStatus(e.target.value)}
        />

        <div className="bg-white rounded-3xl h-[70vh] shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-purple-700 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Profile
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Employee Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Task
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEmployees?.map((employee) => (
                <tr key={employee._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    {employee.profileImage ? (
                      <img
                        src={employee.profileImage}
                        alt={employee.fullName}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-purple-700 flex items-center justify-center text-white">
                        {employee.fullName
                          .split(" ")
                          .map((name) => name[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm">{employee.fullName}</td>
                  <td className="px-6 py-4 text-sm">{employee.position}</td>
                  <td className="px-6 py-4 text-sm">{employee.department}</td>
                  <td className="px-6 py-4 text-sm">{employee.task || "--"}</td>
                  <td className="px-6 py-4 text-sm">
                    <Dropdown
                      value={employee.status || "Absent"}
                      onChange={(newStatus) =>
                        handleStatusChange(employee._id, newStatus)
                      }
                      options={attendanceStatusOptions}
                      disabled={status === "loading"}
                      className="w-40"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm relative">
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
};

export default EmployeeAttendance;

const attendanceStatusOptions = [
  { value: "Present", label: "Present" },
  { value: "Absent", label: "Absent" },
  { value: "Medical Leave", label: "Medical Leave" },
  { value: "Work from Home", label: "Work from Home" },
];

const getStatusStyle = (status) => {
  switch (status) {
    case "Present":
      return "text-green-700 bg-green-50 border-green-200";
    case "Medical Leave":
      return "text-orange-700 bg-orange-50 border-orange-200";
    case "Work from Home":
      return "text-blue-700 bg-blue-50 border-blue-200";
    case "Absent":
      return "text-red-700 bg-red-50 border-red-200";
    default:
      return "text-gray-700 bg-gray-50 border-gray-200";
  }
};

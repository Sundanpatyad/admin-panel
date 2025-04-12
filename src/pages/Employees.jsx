import React, { useEffect, useState } from "react";
import {
  deleteEmployee,
  fetchEmployees,
  updateEmployee,
} from "../redux/slices/empoyeeSlice";
import { useDispatch, useSelector } from "react-redux";

import EditEmployeeModal from "../components/EditEmployeeModal";
import MainLayout from "../layouts/MainLayout";
import PageHeader from "../components/PageHeader";

const Employees = () => {
  const dispatch = useDispatch();
  const {
    employees = [],
    status = "idle",
    error = null,
  } = useSelector((state) => state.employees || {});

  // Add useEffect to fetch employees on component mount
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const handleOpenModal = (employee) => {
    setEditingEmployee({
      ...employee,
      dateOfJoining: new Date(employee.dateOfJoining)
        .toISOString()
        .split("T")[0],
    });
    setIsEditModalOpen(true);
    setSelectedEmployee(null); // Close the dropdown
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await dispatch(
        updateEmployee({
          id: editingEmployee._id,
          data: editingEmployee,
        })
      ).unwrap();
      setIsEditModalOpen(false);
      setEditingEmployee(null);
    } catch (error) {
      console.error("Failed to update employee:", error);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await dispatch(deleteEmployee(id)).unwrap();
      setSelectedEmployee(null);
    } catch (error) {
      console.error("Failed to delete employee:", error);
    }
  };

  // Filter employees based on search term and position
  const filteredEmployees = (employees || []).filter((employee) => {
    const matchesSearch =
      searchTerm.trim() === "" ||
      employee.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.phoneNumber?.includes(searchTerm);

    const matchesPosition =
      selectedPosition === "" || employee.position === selectedPosition;

    return matchesSearch && matchesPosition;
  });

  const renderContent = () => {
    if (status === "loading") {
      return (
        <div className="p-4 sm:p-6 flex justify-center items-center h-64">
          <div className="text-lg sm:text-xl text-gray-600">Loading...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="p-4 sm:p-6 flex justify-center items-center h-64">
          <div className="text-lg sm:text-xl text-red-500">Error: {error}</div>
        </div>
      );
    }

    return (
      <div className="bg-white h-[70vh] rounded-xl sm:rounded-3xl shadow overflow-hidden">
        <div className="">
          <table className="w-full min-w-[800px]">
            <thead className="bg-purple-700 text-white">
              <tr>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium whitespace-nowrap">
                  Profile
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium whitespace-nowrap">
                  Name
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium whitespace-nowrap">
                  Email
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium whitespace-nowrap">
                  Phone
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium whitespace-nowrap">
                  Position
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium whitespace-nowrap">
                  Dept.
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium whitespace-nowrap">
                  Join Date
                </th>
                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <tr key={employee._id} className="hover:bg-gray-50">
                  <td className="px-3 sm:px-6 py-2 sm:py-4">
                    {employee.profileImage ? (
                      <img
                        src={employee.profileImage}
                        alt={employee.fullName}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-purple-700 flex items-center justify-center text-white text-xs sm:text-sm font-medium">
                        {employee.fullName
                          .split(" ")
                          .map((name) => name[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)}
                      </div>
                    )}
                  </td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm whitespace-nowrap">
                    {employee.fullName}
                  </td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm whitespace-nowrap">
                    {employee.email}
                  </td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm whitespace-nowrap">
                    {employee.phoneNumber}
                  </td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm whitespace-nowrap">
                    {employee.position}
                  </td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm whitespace-nowrap">
                    {employee.department}
                  </td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm whitespace-nowrap">
                    {new Date(employee.dateOfJoining).toLocaleDateString()}
                  </td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm relative">
                    <button
                      className="text-gray-400 hover:text-gray-600"
                      onClick={() =>
                        setSelectedEmployee(
                          selectedEmployee === employee._id
                            ? null
                            : employee._id
                        )
                      }
                    >
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                    {selectedEmployee === employee._id && (
                      <div className="absolute right-0 mt-2 w-36 sm:w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                        <div className="py-1">
                          <button
                            className="block w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-800 hover:bg-gray-100"
                            onClick={() => handleOpenModal(employee)}
                          >
                            Edit Employee
                          </button>
                          <button
                            className="block w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-red-600 hover:bg-gray-100"
                            onClick={() => handleDeleteEmployee(employee._id)}
                          >
                            Delete Employee
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {filteredEmployees.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    className="px-3 sm:px-6 py-2 sm:py-4 text-center text-xs sm:text-sm text-gray-500"
                  >
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <MainLayout title={"Employees"}>
      <div className="p-3 sm:p-4 md:p-6">
        <PageHeader
          title="Employees"
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          positionFilter={selectedPosition}
          onPositionChange={(e) => setSelectedPosition(e.target.value)}
        />
        {renderContent()}
        <EditEmployeeModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingEmployee(null);
          }}
          employee={editingEmployee || {}}
          onChange={handleInputChange}
          onSave={handleSave}
        />
      </div>
    </MainLayout>
  );
};

export default Employees;

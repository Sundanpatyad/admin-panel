import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

// API endpoints for employee operations
export const getAllEmployees = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/employees`);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Failed to fetch employees",
      }
    );
  }
};

export const getEmployeeById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/api/employees/${id}`);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Failed to fetch employee",
      }
    );
  }
};

export const createEmployee = async (employeeData) => {
  try {
    const response = await axios.post(`${API_URL}/api/employees`, employeeData);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Failed to create employee",
      }
    );
  }
};

export const updateEmployee = async (id, employeeData) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/employees/${id}`,
      employeeData
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Failed to update employee",
      }
    );
  }
};

export const deleteEmployee = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/api/employees/${id}`);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Failed to delete employee",
      }
    );
  }
};

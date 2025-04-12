import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

// Get all employees with their attendance status
export const getAllAttendance = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/attendance`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch attendance" };
  }
};

// Update attendance status for an employee
export const updateAttendance = async (data) => {
  try {
    const response = await axios.put(`${API_URL}/api/attendance/update`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update attendance" };
  }
};

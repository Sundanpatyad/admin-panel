import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

// Create a new leave request
export const createLeaveRequest = async (leaveData) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/leave/create`,
      leaveData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to create leave request" };
  }
};

// Get all leaves
export const getAllLeaves = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/leave/all`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch leaves" };
  }
};

// Update leave status
export const updateLeaveStatus = async (leaveId, status) => {
  try {
    const response = await axios.patch(
      `${API_URL}/api/leave/status/${leaveId}`,
      {
        status,
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update leave status" };
  }
};

// Get approved leaves
export const getApprovedLeaves = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/leave/approved`);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { message: "Failed to fetch approved leaves" }
    );
  }
};

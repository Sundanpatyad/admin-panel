import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

// Get all candidates
export const getCandidates = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/candidates`);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Failed to fetch candidates",
      }
    );
  }
};

// Get a single candidate by ID
export const getCandidate = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/api/candidates/${id}`);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Failed to fetch candidate",
      }
    );
  }
};

// Create a new candidate
export const createCandidate = async (candidateData) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/candidates`,
      candidateData
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Failed to create candidate",
      }
    );
  }
};

// Update a candidate
export const updateCandidate = async (id, candidateData) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/candidates/${id}`,
      candidateData
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Failed to update candidate",
      }
    );
  }
};

// Delete a candidate
export const deleteCandidate = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/api/candidates/${id}`);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Failed to delete candidate",
      }
    );
  }
};

import axios from "axios";

// Create an axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.BACKEND_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage if it exists
    const token = localStorage.getItem("token");

    // If token exists, add it to the headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Return successful responses as-is
    return response;
  },
  (error) => {
    // Handle response errors
    if (error.response) {
      // Server responded with a status code outside of 2xx range
      console.error("Response error:", error.response.data);

      // Handle authentication errors
      if (error.response.status === 401) {
        // Clear local storage and redirect to login if unauthorized
        localStorage.removeItem("token");
        // If using a router, you could redirect here
        // window.location.href = '/login';
      }
    } else if (error.request) {
      // Request was made but no response was received
      console.error("Request error:", error.request);
    } else {
      // Something else caused the error
      console.error("Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default api;

import axios from "axios";

// Create a dedicated Axios instance for our API
const apiClient = axios.create({
  // Use the environment variable for your Laravel API's base URLs
  // baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api",
  baseURL: "https://api.akvision.net/api",

  // This is CRITICAL for Laravel Sanctum's cookie-based authentication to work
  withCredentials: true,

  // Standard headers for API communication
  headers: {
    Accept: "application/json",
  },
});

// This interceptor automatically attaches the authentication token to every
// API request after the user has logged in.
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;

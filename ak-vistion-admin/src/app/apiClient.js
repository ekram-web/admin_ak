import axios from "axios";

// Create a dedicated Axios instance
const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // The base URL of your Laravel API
  withCredentials: true, // Important for Laravel Sanctum
  headers: {
    Accept: "application/json",
  },
});

// This is the magic part: an "interceptor" that automatically adds
// the authentication token to every single request after you log in.
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;

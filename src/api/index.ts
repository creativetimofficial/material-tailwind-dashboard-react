import axios from "axios";

// Base URL for the hosted API for development environment
export const baseURL = "http://localhost:3333/";

const instance = axios.create({
  baseURL,
  timeout: 20000,
});

// Add token to request via interceptor
instance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default instance;

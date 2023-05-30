import axios from "axios";

// Set the user token if available
const useAxios = () => {
  const token = localStorage.getItem("token"); // Example: Get the token from local storage

  const api = axios.create({
    baseURL: "https://awt-api.fineit.io",
    // baseURL: "http://localhost:1000",

    //  headers: {
    //   "ngrok-skip-browser-warning": "*",
    //  },
  });
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return api;
};

export default useAxios;

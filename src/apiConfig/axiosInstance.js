import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:1000",
  baseURL: "https://cfcb-206-84-142-90.ngrok-free.app",
  headers: {
    "ngrok-skip-browser-warning": "*",
  },
});

// Set the user token if available
// const userToken = localStorage.getItem("userToken"); // Example: Get the token from local storage
// if (userToken) {
//   api.defaults.headers.common[
//     "Authorization"
//   ] = `Bearer ${userToken}`;
// }

export default api;

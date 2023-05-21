import axios from "axios";

const api = axios.create({
  baseURL: "https://d4f0-206-84-142-90.ngrok-free.app",
  // baseURL: "http://localhost:1000",
});

// Set the user token if available
// const userToken = localStorage.getItem("userToken"); // Example: Get the token from local storage
// if (userToken) {
//   api.defaults.headers.common[
//     "Authorization"
//   ] = `Bearer ${userToken}`;
// }

export default api;

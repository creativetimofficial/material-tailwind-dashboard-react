import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASEURL

export const axiosClient = axios.create({
  baseURL: baseUrl + "/api/v1/",
  headers: {
    'Content-Type': 'application/json',
  },
})

export default axiosClient;
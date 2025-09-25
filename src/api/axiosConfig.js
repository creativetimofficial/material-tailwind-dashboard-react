import axios from "axios";



const apiClient = axios.create({
    baseURL: "https://localhost:7093/api",
});


apiClient.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("authToken");


        if (token) {

            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {

        return Promise.reject(error);
    }
);

export default apiClient;
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8222/api/v1/",
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if(error.response.status === 401) {
            localStorage.removeItem("accessToken");
            window.location.href = "/sign-in";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
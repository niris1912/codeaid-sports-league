import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.BACKEND_API_URL, 
});
  
axiosInstance.interceptors.request.use((config) => 
    {
        const authToken = localStorage.getItem('authToken'); 
        if (authToken) {
            config.headers['Authorization'] = `Bearer ${authToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(response => {
    return response
  }, error => {
    
    if (error.response.status === 401) {
        localStorage.removeItem('authToken');
    }
    else {
        return Promise.reject(error)
    }
});

export default axiosInstance;
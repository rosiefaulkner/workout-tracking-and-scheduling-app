import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://localhost:8081/api/", // Adjust the base URL to match your backend
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosInstance;

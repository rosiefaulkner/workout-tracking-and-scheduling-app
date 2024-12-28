import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // Base URL for all API requests
  timeout: 10000, // Optional: request timeout in milliseconds
});

export default axiosInstance;

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ecommerce-cslayy-backend.onrender.com/api",
  withCredentials: true, 
});

export default axiosInstance;

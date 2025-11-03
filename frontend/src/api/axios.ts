import axios, { AxiosInstance } from "axios";

console.log('API URL:', process.env.REACT_APP_API_URL);
const API_BASE_URL =  process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

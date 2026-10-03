// Imports
import axios from 'axios';
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Axios Instance
const api: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor (Injects JWT token if present)
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: unknown) => {
    return Promise.reject(error);
  },
);

// Response Interceptor
api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: unknown) => {
    return Promise.reject(error);
  },
);

export default api;

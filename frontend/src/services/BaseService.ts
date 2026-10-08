// External Imports
import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';

// Internal Imports
import { AuthService } from '@/services/AuthService.js';

// Base API URL from Environment Variable
const BASE_URL = `${import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'}/api`;

// Internal Axios Instance Configured with Interceptors
const httpInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor to Attach Bearer Token Automatically
httpInstance.interceptors.request.use((config) => {
  const token = AuthService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Base Service Class
export class BaseService {
  // Protected Static HTTP Helper Methods
  protected static async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await httpInstance.get<T>(url, config);
    return response.data;
  }

  protected static async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await httpInstance.post<T>(url, data, config);
    return response.data;
  }

  protected static async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await httpInstance.patch<T>(url, data, config);
    return response.data;
  }

  protected static async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await httpInstance.put<T>(url, data, config);
    return response.data;
  }

  protected static async deleteHttp<T = void>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await httpInstance.delete<T>(url, config);
    return response.data;
  }
}

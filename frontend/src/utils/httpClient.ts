// External Imports
import axios from 'axios';

// Internal Imports
import { AuthService } from '@/services/AuthService.js';

// Base API URL
const BASE_URL = `${import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'}/api`;

// Axios Instance Definition
export const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor to Attach Bearer Token
httpClient.interceptors.request.use((config) => {
  const token = AuthService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default httpClient;

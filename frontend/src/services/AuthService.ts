// External Imports
import axios from 'axios';

// Internal Imports
import type { LoginDTO, RegisterDTO, UserResponseDTO } from '@/dtos/UserDTO.js';
import { useAuthStore } from '@/stores/authstore.js';

// Base API URL
const AUTH_API_URL = `${import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'}/api/auth`;

// Interface for Auth Backend Response
interface AuthBackendResponse {
  accessToken: string;
  user: UserResponseDTO;
}

// Service Class
export class AuthService {
  // Authentication Methods
  static async login(credentials: LoginDTO): Promise<UserResponseDTO> {
    const response = await axios.post<AuthBackendResponse>(`${AUTH_API_URL}/login`, credentials);
    const { accessToken, user } = response.data;

    const authStore = useAuthStore();
    authStore.setAuth(accessToken, user);

    return user;
  }

  static async register(userData: RegisterDTO): Promise<UserResponseDTO> {
    const response = await axios.post<AuthBackendResponse>(`${AUTH_API_URL}/register`, userData);
    const { accessToken, user } = response.data;

    const authStore = useAuthStore();
    authStore.setAuth(accessToken, user);

    return user;
  }

  static logout(): void {
    const authStore = useAuthStore();
    authStore.logout();
  }

  // Getters
  static getCurrentUser(): UserResponseDTO | null {
    const authStore = useAuthStore();
    return authStore.currentUser;
  }

  static getToken(): string | null {
    const authStore = useAuthStore();
    return authStore.token;
  }

  static isAuthenticated(): boolean {
    const authStore = useAuthStore();
    return authStore.isAuthenticated();
  }
}

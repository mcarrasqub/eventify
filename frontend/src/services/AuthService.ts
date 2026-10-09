// Internal Imports
import { BaseService } from '@/services/BaseService.js';
import type { LoginDTO, RegisterDTO, UserResponseDTO } from '@/dtos/UserDTO.js';
import { useAuthStore } from '@/stores/authstore.js';

// Interface for Auth Backend Response
interface AuthBackendResponse {
  accessToken: string;
  user: UserResponseDTO;
}

// Service Class
export class AuthService extends BaseService {
  // Authentication Methods
  static async login(credentials: LoginDTO): Promise<UserResponseDTO> {
    const response = await this.post<AuthBackendResponse>('/auth/login', credentials);
    const { accessToken, user } = response;

    const authStore = useAuthStore();
    authStore.setAuth(accessToken, user);

    return user;
  }

  static async register(userData: RegisterDTO): Promise<UserResponseDTO> {
    const response = await this.post<AuthBackendResponse>('/auth/register', userData);
    const { accessToken, user } = response;

    const authStore = useAuthStore();
    authStore.setAuth(accessToken, user);

    return user;
  }

  static logout(): void {
    const authStore = useAuthStore();
    authStore.logout();
  }

  static isAuthenticated(): boolean {
    const authStore = useAuthStore();
    return authStore.isAuthenticated();
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
}


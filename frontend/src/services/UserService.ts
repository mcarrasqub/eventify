// External Imports
import axios from 'axios';

// Internal Imports
import type { UserResponseDTO } from '@/dtos/UserDTO.js';
import { AuthService } from '@/services/AuthService.js';

// Base API URL
const USERS_API_URL = `${import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000'}/api/users`;

// Service Class
export class UserService {
  // Methods
  static async getProfile(): Promise<UserResponseDTO> {
    const token = AuthService.getToken();
    const response = await axios.get<UserResponseDTO>(`${USERS_API_URL}/me`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  }
}

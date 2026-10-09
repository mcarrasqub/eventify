// Internal Imports
import { BaseService } from '@/services/BaseService.js';
import type { UserResponseDTO } from '@/dtos/UserDTO.js';

// Service Class
export class UserService extends BaseService {
  // Methods
  static async getProfile(): Promise<UserResponseDTO> {
    return await this.get<UserResponseDTO>('/users/me');
  }
}

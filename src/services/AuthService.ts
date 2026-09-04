// Internal Imports
import type { LoginDTO, UserResponseDTO } from '@/dtos/UserDTO.js';
import { useAuthStore } from '@/stores/authstore.js';
import { useUserStore } from '@/stores/userstore.js';

// Service Class
export class AuthService {
  static login(credentials: LoginDTO): UserResponseDTO | null {
    const userStore = useUserStore();

    const user = userStore.users.find(
      (existingUser) =>
        existingUser.email === credentials.email && existingUser.password === credentials.password,
    );

    if (!user) {
      return null;
    }

    const { password: _password, ...userWithoutPassword } = user;
    const userDTO: UserResponseDTO = userWithoutPassword;

    useAuthStore().login(userDTO);

    return userDTO;
  }

  static logout(): void {
    useAuthStore().logout();
  }

  static getCurrentUser(): UserResponseDTO | null {
    return useAuthStore().currentUser;
  }

  static isAuthenticated(): boolean {
    return useAuthStore().isAuthenticated();
  }

  static isAdmin(): boolean {
    const currentUser = useAuthStore().currentUser;
    return currentUser?.role === 'admin';
  }
}

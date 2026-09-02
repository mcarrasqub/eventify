// Imports
import type { LoginDTO, UserResponseDTO } from '@/dtos/UserDTO.js';
import type { UserInterface } from '@/interfaces/UserInterface.js';
import { userSeeder } from '@/stores/userseeder.js';
import { useUserStore } from '@/stores/userstore.js';

// Service Class
export class UserService {
  static getUsers(): UserInterface[] {
    return userSeeder;
  }

  static getUserById(id: number): UserInterface | undefined {
    return this.getUsers().find((user) => user.id === id);
  }

  static login(credentials: LoginDTO): UserResponseDTO | null {
    const foundUser = this.getUsers().find(
      (user) => user.email === credentials.email && user.password === credentials.password,
    );

    if (!foundUser) {
      return null;
    }

    const { password: _password, ...userWithoutPassword } = foundUser;
    const userStore = useUserStore();
    userStore.setCurrentUser(userWithoutPassword);

    return userWithoutPassword;
  }

  static getCurrentUser(): UserResponseDTO | null {
    const userStore = useUserStore();
    return userStore.currentUser;
  }

  static isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  static isAdmin(): boolean {
    return this.getCurrentUser()?.isAdmin ?? false;
  }

  static logout(): void {
    const userStore = useUserStore();
    userStore.setCurrentUser(null);
  }
}

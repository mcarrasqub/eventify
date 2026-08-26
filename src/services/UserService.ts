// Imports
import type { LoginDTO, UserResponseDTO } from '@/dtos/UserDTO.js';
import type { UserInterface } from '@/interfaces/UserInterface.js';
import { userSeeder } from '@/stores/userseeder.js';
import { useUserStore } from '@/stores/userstore.js';

// Constants
const USERS_STORAGE_KEY = 'eventify_users';
const CURRENT_USER_KEY = 'eventify_current_user';

// Service Class
export class UserService {
  public static initializeStorage(): void {
    if (!localStorage.getItem(USERS_STORAGE_KEY)) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(userSeeder));
    }
  }

  public static getUsers(): UserInterface[] {
    this.initializeStorage();
    const data = localStorage.getItem(USERS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  public static login(credentials: LoginDTO): UserResponseDTO | null {
    const users = this.getUsers();
    const foundUser = users.find(
      (u) => u.email === credentials.email && u.password === credentials.password,
    );

    if (!foundUser) {
      return null;
    }

    const { password: _password, ...userWithoutPassword } = foundUser;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));

    // Service -> Store communication
    const userStore = useUserStore();
    userStore.setCurrentUser(userWithoutPassword);

    return userWithoutPassword;
  }

  public static getCurrentUser(): UserResponseDTO | null {
    const userStore = useUserStore();
    if (userStore.currentUser) {
      return userStore.currentUser;
    }

    const data = localStorage.getItem(CURRENT_USER_KEY);
    if (data) {
      const user: UserResponseDTO = JSON.parse(data);
      userStore.setCurrentUser(user);
      return user;
    }
    return null;
  }

  public static logout(): void {
    localStorage.removeItem(CURRENT_USER_KEY);
    const userStore = useUserStore();
    userStore.setCurrentUser(null);
  }
}

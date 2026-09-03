// Internal Imports
import type { UserInterface } from '@/interfaces/UserInterface.js';
import { useUserStore } from '@/stores/userstore.js';

// Service Class
export class UserService {
  static getAll(): UserInterface[] {
    const userStore = useUserStore();
    return userStore.users;
  }

  static getById(id: number): UserInterface | undefined {
    return this.getAll().find((user) => user.id === id);
  }
}

// External Imports
import { defineStore } from 'pinia';
import { ref } from 'vue';

// Internal Imports
import type { UserResponseDTO } from '@/dtos/UserDTO.js';

// Store Definition
export const useAuthStore = defineStore('auth', () => {
  // State
  const currentUser = ref<UserResponseDTO | null>(null);

  // Actions & Methods
  const login = (user: UserResponseDTO): void => {
    currentUser.value = user;
  };

  const logout = (): void => {
    currentUser.value = null;
  };

  const isAuthenticated = (): boolean => {
    return currentUser.value !== null;
  };

  return {
    currentUser,
    login,
    logout,
    isAuthenticated,
  };
});

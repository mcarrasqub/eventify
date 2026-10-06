// External Imports
import { defineStore } from 'pinia';
import { ref } from 'vue';

// Internal Imports
import type { UserResponseDTO } from '@/dtos/UserDTO.js';

// Store Definition
export const useAuthStore = defineStore('auth', () => {
  // State
  const token = ref<string | null>(localStorage.getItem('token'));
  const currentUser = ref<UserResponseDTO | null>(
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
  );

  // Actions
  const setAuth = (newToken: string, user: UserResponseDTO): void => {
    token.value = newToken;
    currentUser.value = user;
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = (): void => {
    token.value = null;
    currentUser.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const isAuthenticated = (): boolean => {
    return token.value !== null && currentUser.value !== null;
  };

  const isAdmin = (): boolean => {
    return currentUser.value?.role === 'admin';
  };

  return {
    token,
    currentUser,
    setAuth,
    logout,
    isAuthenticated,
    isAdmin,
  };
});

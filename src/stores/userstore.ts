// Imports
import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { UserResponseDTO } from '@/dtos/UserDTO.js';

// Store Definition
export const useUserStore = defineStore('user', () => {
  // Reactive state
  const currentUser = ref<UserResponseDTO | null>(null);

  // Actions
  function setCurrentUser(user: UserResponseDTO | null): void {
    currentUser.value = user;
  }

  return {
    currentUser,
    setCurrentUser,
  };
});

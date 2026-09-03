// Imports
import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { UserInterface } from '@/interfaces/UserInterface.js';

// Store Definition
export const useUserStore = defineStore('user', () => {
  // State
  const users = ref<UserInterface[]>([]);

  return { users };
});

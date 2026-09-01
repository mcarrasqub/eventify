// Imports
import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { TicketInterface } from '@/interfaces/TicketInterface.js';

// Store Definition
export const useTicketStore = defineStore('ticket', () => {
  const tickets = ref<TicketInterface[]>([]);

  return { tickets };
});

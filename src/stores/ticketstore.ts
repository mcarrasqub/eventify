// Imports
import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { TicketInterface } from '@/interfaces/TicketInterface.js';
import { ticketSeeder } from '@/stores/ticketseeder.js';

// Store Definition
export const useTicketStore = defineStore('ticket', () => {
  const tickets = ref<TicketInterface[]>(ticketSeeder);

  return { tickets };
});

import { defineStore } from 'pinia';

import { ref } from 'vue';
import type { TicketInterface } from '@/interfaces/TicketInterface.js';

export const useTicketStore = defineStore('ticket', () => {
  const tickets = ref<TicketInterface[]>([]);

  return { tickets };
});

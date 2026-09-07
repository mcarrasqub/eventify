// Imports
import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { VenueInterface } from '@/interfaces/VenueInterface.js';

// Store Definition
export const useVenueStore = defineStore('venue', () => {
  // State
  const venues = ref<VenueInterface[]>([]);

  return { venues };
});

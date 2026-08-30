// Imports
import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { VenueInterface } from '@/interfaces/VenueInterface.js';
import { venueSeeder } from '@/stores/venueseeder.js';

// Store Definition
export const useVenueStore = defineStore('venue', () => {
  const venues = ref<VenueInterface[]>(venueSeeder);

  return { venues };
});

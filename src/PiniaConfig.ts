// Imports
import { createPinia } from 'pinia';
import { watch } from 'vue';

import { eventSeeder } from '@/stores/eventseeder.js';
import { ticketSeeder } from '@/stores/ticketseeder.js';
import { userSeeder } from '@/stores/userseeder.js';
import { venueSeeder } from '@/stores/venueseeder.js';

// Configuration Class
export default class PiniaConfig {
  public static init() {
    const pinia = createPinia();

    const savedState = localStorage.getItem('piniaState');
    if (savedState) {
      pinia.state.value = JSON.parse(savedState);
    } else {
      // initialize the state with the seeders
      pinia.state.value = {
        event: {
          events: eventSeeder,
        },

        ticket: {
          tickets: ticketSeeder,
        },

        user: {
          users: userSeeder,
        },

        venue: {
          venues: venueSeeder,
        },
      };

      // save the initial state to localStorage
      localStorage.setItem('piniaState', JSON.stringify(pinia.state.value));
    }

    // watch for changes and save to localStorage
    watch(
      pinia.state,
      (state) => {
        localStorage.setItem('piniaState', JSON.stringify(state));
      },
      { deep: true },
    );

    return pinia;
  }
}

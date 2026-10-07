// External Imports
import { createPinia } from 'pinia';
import { watch } from 'vue';

// Internal Imports
import { ticketSeeder } from '@/seeders/ticketseeder.js';

// Configuration Class
export default class PiniaConfig {
  public static init() {
    const pinia = createPinia();

    const savedState = localStorage.getItem('piniaState');
    if (savedState) {
      pinia.state.value = JSON.parse(savedState);
    } else {
      // initialize state for client-side stores
      pinia.state.value = {
        ticket: {
          tickets: ticketSeeder,
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

// External Imports
import { createPinia } from 'pinia';


// Configuration Class
export default class PiniaConfig {
  public static init() {
    const pinia = createPinia();

    /*const savedState = localStorage.getItem('piniaState');
    if (savedState) {
      pinia.state.value = JSON.parse(savedState);
    } else {
      // initialize state for client-side stores
      pinia.state.value = {
        ticket: {
          tickets: [],
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
    );*/

    return pinia;
  }
}

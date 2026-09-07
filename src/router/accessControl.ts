// External Imports
import type { Router } from 'vue-router';

// Internal Imports
import { useAuthStore } from '@/stores/authstore.js';

// Router Guards Configuration
export const configureRouterGuards = (router: Router): void => {
  router.beforeEach((to) => {
    const authStore = useAuthStore();

    // Update page title dynamically
    if (to.meta.title && typeof to.meta.title === 'string') {
      document.title = `${to.meta.title} - Eventify`;
    }

    if (to.meta.guestOnly && authStore.isAuthenticated()) {
      if (authStore.currentUser?.role === 'admin') {
        return { name: 'admin-events' };
      }

      return { name: 'home' };
    }

    if (to.meta.requiresAuth && !authStore.isAuthenticated()) {
      return { name: 'login' };
    }

    if (to.meta.requiresAdmin && authStore.currentUser?.role !== 'admin') {
      return { name: 'home' };
    }

    return true;
  });
};

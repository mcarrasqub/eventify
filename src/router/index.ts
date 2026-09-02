// Imports
// External Imports
import { createRouter, createWebHistory } from 'vue-router';

// Internal Imports
import { UserService } from '@/services/UserService.js';
import AdminEventsView from '@/views/AdminEventsView.vue';
import AdminVenuesView from '@/views/AdminVenuesView.vue';
import ExploreEventsView from '@/views/ExploreEventsView.vue';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import ShowEventView from '@/views/ShowEventView.vue';
import TicketsStatsView from '@/views/TicketsStatsView.vue';

// Router Definition
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Home' },
    },
    {
      path: '/explore',
      name: 'explore',
      component: ExploreEventsView,
      meta: { title: 'Explore Events' },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { title: 'Log In' },
    },
    {
      path: '/tickets-stats',
      name: 'tickets-stats',
      component: TicketsStatsView,
      meta: { title: 'Tickets Stats', requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/admin-events',
      name: 'admin-events',
      component: AdminEventsView,
      meta: { title: 'Admin Events', requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/admin-venues',
      name: 'admin-venues',
      component: AdminVenuesView,
      meta: { title: 'Admin Venues', requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/event/:id',
      name: 'event-show',
      component: ShowEventView,
      meta: { title: 'Event Details' },
    },
  ],
});

// Route Guard
router.beforeEach((to, _from, next) => {
  const currentUser = UserService.getCurrentUser();
  const requiresAuth = to.meta.requiresAuth;
  const requiresAdmin = to.meta.requiresAdmin;

  if (requiresAuth && !currentUser) {
    return next({ name: 'home' });
  }

  if (requiresAdmin && !currentUser?.isAdmin) {
    return next({ name: 'home' });
  }

  if (to.name === 'login' && currentUser) {
    return next(currentUser.isAdmin ? { name: 'admin-events' } : { name: 'home' });
  }

  next();
});

export default router;

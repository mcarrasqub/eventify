// Imports
import { createRouter, createWebHistory } from 'vue-router';

import ExploreEventsView from '@/views/ExploreEventsView.vue';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
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
      path: '/tickets_stats',
      name: 'tickets_stats',
      component: TicketsStatsView,
      meta: { title: 'Tickets Stats' },
    },
    {
      path: '/admin-events',
      name: 'admin-events',
      component: () => import('@/views/AdminEventsView.vue'),
      meta: { title: 'Admin Events' },
    },
    {
      path: '/event/:id',
      name: 'event-show',
      component: () => import('@/views/ShowEventView.vue'),
      meta: { title: 'Event Details' },
    },
  ],
});

export default router;

// Imports
import { createRouter, createWebHistory } from 'vue-router';

import AdminEventsView from '@/views/AdminEventsView.vue';
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
      path: '/tickets_stats',
      name: 'tickets_stats',
      component: TicketsStatsView,
      meta: { title: 'Tickets Stats' },
    },
    {
      path: '/admin-events',
      name: 'admin-events',
      component: AdminEventsView,
      meta: { title: 'Admin Events' },
    },
    {
      path: '/admin-venues',
      name: 'admin-venues',
      component: () => import('@/views/AdminVenuesView.vue'),
      meta: { title: 'Admin Venues' },
    },
    {
      path: '/event/:id',
      name: 'event-show',
      component: ShowEventView,
      meta: { title: 'Event Details' },
    },
  ],
});

export default router;

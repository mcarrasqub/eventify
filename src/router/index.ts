// Imports
import { createRouter, createWebHistory } from 'vue-router';

import AdminTicketsView from '@/views/AdminTicketsView.vue';
import ExploreEventsView from '@/views/ExploreEventsView.vue';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';

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
      path: '/admin_tickets',
      name: 'admin_tickets',
      component: AdminTicketsView,
      meta: { title: 'Admin Tickets' },
    },
    {
      path: '/admin-events',
      name: 'admin-events',
      component: () => import('@/views/AdminEventsView.vue'),
      meta: { title: 'Admin Events' },
    },
  ],
});

export default router;

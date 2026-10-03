// External Imports
import { createRouter, createWebHistory } from 'vue-router';

// Internal Imports
import { configureRouterGuards } from '@/router/accessControl.js';
import { adminRoutes } from '@/router/adminRoutes.js';
import ExploreEventsView from '@/views/ExploreEventsView.vue';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import ShowEventView from '@/views/ShowEventView.vue';

//Public Routes
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
      meta: { title: 'Log In', guestOnly: true },
    },
    {
      path: '/event/:id',
      name: 'event-show',
      component: ShowEventView,
      meta: { title: 'Event Details' },
    },
    ...adminRoutes,
  ],
});

// Configure Router Guards
configureRouterGuards(router);

export default router;

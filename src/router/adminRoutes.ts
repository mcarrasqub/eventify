// External Imports
import type { RouteRecordRaw } from 'vue-router';

// Internal Imports
import AdminEventsView from '@/views/admin/AdminEventsView.vue';
import AdminVenuesView from '@/views/admin/AdminVenuesView.vue';
import TicketsStatsView from '@/views/admin/TicketsStatsView.vue';

// Admin Routes Definition
export const adminRoutes: RouteRecordRaw[] = [
  {
    path: '/admin/tickets-stats',
    name: 'tickets-stats',
    component: TicketsStatsView,
    meta: {
      title: 'Tickets Stats',
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: '/admin/events',
    name: 'admin-events',
    component: AdminEventsView,
    meta: {
      title: 'Admin Events',
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: '/admin/venues',
    name: 'admin-venues',
    component: AdminVenuesView,
    meta: {
      title: 'Admin Venues',
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
];

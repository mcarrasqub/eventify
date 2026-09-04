<script setup lang="ts">
// External Imports
import { computed } from 'vue';
import { RouterLink, RouterView, useRouter } from 'vue-router';

// Internal Imports
import { AuthService } from '@/services/AuthService.js';

// Variables
const router = useRouter();

// Computed
const currentUser = computed(() => AuthService.getCurrentUser());

// Methods
function handleLogout(): void {
  AuthService.logout();
  router.push('/login');
}
</script>

<template>
  <div class="min-h-screen bg-midnight">
    <div class="flex min-h-screen">
      <!-- Sidebar Navigation -->
      <aside
        class="fixed inset-y-0 z-10 hidden w-64 flex-col border-r border-white/10 bg-midnight-soft lg:flex"
      >
        <div class="flex flex-1 flex-col p-6">
          <!-- Logo & Brand -->
          <div class="mb-12 flex items-center gap-3">
            <img
              src="@/assets/images/logo_eventify.png"
              alt="Eventify"
              class="h-8 w-8 object-contain"
            />
            <div>
              <p class="font-display text-xl font-bold tracking-tight text-white">Eventify</p>
            </div>
          </div>

          <!-- Navigation Links -->
          <nav class="space-y-2">
            <!-- Regular User / Guest Navigation Links -->
            <template v-if="!currentUser?.isAdmin">
              <RouterLink
                to="/"
                class="flex items-center gap-3 rounded-lg border border-white/10 px-4 py-3 text-sm font-medium text-ink-muted transition hover:border-rose-gold/20 hover:bg-rose-gold/10 hover:text-white"
                active-class="border-rose-gold/30 bg-rose-gold/10 text-white"
              >
                <span class="font-mono text-xs">01</span>
                <span>Home</span>
              </RouterLink>

              <RouterLink
                to="/explore"
                class="flex items-center gap-3 rounded-lg border border-white/10 px-4 py-3 text-sm font-medium text-ink-muted transition hover:border-rose-gold/20 hover:bg-rose-gold/10 hover:text-white"
                active-class="border-rose-gold/30 bg-rose-gold/10 text-white"
              >
                <span class="font-mono text-xs">02</span>
                <span>Explore</span>
              </RouterLink>
            </template>

            <!-- Admin-Only Navigation Links -->
            <template v-else>
              <RouterLink
                to="/admin/tickets-stats"
                class="flex items-center gap-3 rounded-lg border border-white/10 px-4 py-3 text-sm font-medium text-ink-muted transition hover:border-rose-gold/20 hover:bg-rose-gold/10 hover:text-white"
                active-class="border-rose-gold/30 bg-rose-gold/10 text-white"
              >
                <span class="font-mono text-xs">01</span>
                <span>Tickets Statistics</span>
              </RouterLink>

              <RouterLink
                to="/admin/events"
                class="flex items-center gap-3 rounded-lg border border-white/10 px-4 py-3 text-sm font-medium text-ink-muted transition hover:border-rose-gold/20 hover:bg-rose-gold/10 hover:text-white"
                active-class="border-rose-gold/30 bg-rose-gold/10 text-white"
              >
                <span class="font-mono text-xs">02</span>
                <span>Admin Events</span>
              </RouterLink>

              <RouterLink
                to="/admin/venues"
                class="flex items-center gap-3 rounded-lg border border-white/10 px-4 py-3 text-sm font-medium text-ink-muted transition hover:border-rose-gold/20 hover:bg-rose-gold/10 hover:text-white"
                active-class="border-rose-gold/30 bg-rose-gold/10 text-white"
              >
                <span class="font-mono text-xs">03</span>
                <span>Admin Venues</span>
              </RouterLink>
            </template>
          </nav>
        </div>

        <!-- Sidebar Footer: User Profile & Logout Section -->
        <div class="border-t border-white/10 p-6">
          <!-- Logged-in State -->
          <div v-if="currentUser" class="flex flex-col gap-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3 min-w-0">
                <div
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-deep-purple font-display text-lg font-bold text-white"
                >
                  {{ currentUser.name.charAt(0).toUpperCase() }}
                </div>
                <div class="min-w-0">
                  <div class="flex items-center gap-2">
                    <p class="truncate text-sm font-semibold text-white">{{ currentUser.name }}</p>
                    <span
                      v-if="currentUser.isAdmin"
                      class="rounded bg-rose-gold/20 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-rose-gold"
                    >
                      Admin
                    </span>
                    <span
                      v-else
                      class="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px] text-ink-muted"
                    >
                      User
                    </span>
                  </div>
                  <p class="truncate text-xs text-ink-muted">{{ currentUser.email }}</p>
                </div>
              </div>
            </div>

            <!-- Logout Button -->
            <button
              type="button"
              class="flex w-full items-center justify-center gap-2 rounded-lg border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-xs font-semibold text-rose-300 transition hover:bg-rose-500/20 hover:text-white"
              @click="handleLogout"
            >
              <span>Log Out</span>
            </button>
          </div>

          <!-- Logged-out / Guest State -->
          <div v-else class="flex flex-col gap-3">
            <div class="flex items-center gap-3">
              <div
                class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 font-display text-lg text-ink-muted"
              >
                G
              </div>
              <div>
                <p class="text-sm font-semibold text-white">Guest User</p>
                <p class="text-xs text-ink-muted">Not logged in</p>
              </div>
            </div>

            <RouterLink
              to="/login"
              class="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-gold px-4 py-2.5 font-display text-xs font-bold text-midnight transition duration-200 hover:bg-rose-light hover:shadow-md hover:shadow-rose-gold/20"
            >
              <span>Log In</span>
              <span>→</span>
            </RouterLink>
          </div>
        </div>
      </aside>

      <!-- Main Layout Area -->
      <div class="flex min-w-0 flex-1 flex-col lg:ml-64">
        <!-- Main Content -->
        <main class="flex-1 overflow-y-auto px-5 py-7 sm:px-8 sm:py-10">
          <RouterView />
        </main>
      </div>
    </div>
  </div>
</template>

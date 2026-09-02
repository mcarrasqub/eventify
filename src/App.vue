<script setup lang="ts">
// Imports
import { computed } from 'vue';
import { RouterLink, RouterView, useRouter } from 'vue-router';

import { UserService } from '@/services/UserService.js';

// Variables
const router = useRouter();

// Computed
const currentUser = computed(() => UserService.getCurrentUser());

// Métodos
function handleLogout(): void {
  UserService.logout();
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

            <!-- Admin-Only Route -->
            <RouterLink
              v-if="currentUser?.isAdmin"
              to="/tickets_stats"
              class="flex items-center gap-3 rounded-lg border border-rose-gold/20 bg-rose-gold/10 px-4 py-3 text-sm font-medium text-rose-light transition hover:bg-rose-gold/20"
              active-class="border-rose-gold/50 bg-rose-gold/20 text-white"
            >
              <span class="font-mono text-xs">03</span>
              <span>Tickets Statistics</span>
            </RouterLink>

            <!-- Login Route (When Not Logged In) -->
            <RouterLink
              v-if="!currentUser"
              to="/login"
              class="flex items-center gap-3 rounded-lg border border-white/10 px-4 py-3 text-sm font-medium text-ink-muted transition hover:border-rose-gold/20 hover:bg-rose-gold/10 hover:text-white"
              active-class="border-rose-gold/30 bg-rose-gold/10 text-white"
            >
              <span class="font-mono text-xs">04</span>
              <span>Log In</span>
            </RouterLink>

            <RouterLink
              to="/admin-events"
              class="flex items-center gap-3 rounded-lg border border-white/10 px-4 py-3 text-sm font-medium text-ink-muted transition hover:border-rose-gold/20 hover:bg-rose-gold/10 hover:text-white"
              active-class="border-rose-gold/30 bg-rose-gold/10 text-white"
            >
              <span class="font-mono text-xs">05</span>
              <span>Admin Events</span>
            </RouterLink>

            <RouterLink
              to="/admin-venues"
              class="flex items-center gap-3 rounded-lg border border-white/10 px-4 py-3 text-sm font-medium text-ink-muted transition hover:border-rose-gold/20 hover:bg-rose-gold/10 hover:text-white"
              active-class="border-rose-gold/30 bg-rose-gold/10 text-white"
            >
              <span class="font-mono text-xs">06</span>
              <span>Admin Venues</span>
            </RouterLink>
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
              class="flex w-full items-center justify-center rounded-lg bg-rose-gold px-3 py-2 text-xs font-bold text-midnight transition hover:bg-rose-light"
            >
              Log In
            </RouterLink>
          </div>
        </div>
      </aside>

      <!-- Main Layout Area -->
      <div class="flex min-w-0 flex-1 flex-col lg:ml-64">
        <!-- Header -->
        <header class="border-b border-white/10 bg-midnight/80 backdrop-blur">
          <div class="flex items-center justify-between px-5 py-5 sm:px-8">
            <div>
              <p class="font-mono text-[10px] uppercase tracking-[0.25em] text-rose-gold">
                Saturday, 12 October 2024
              </p>
              <h1 class="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">
                {{ $route.meta.title }}
              </h1>
            </div>
            <div class="flex items-center gap-3">
              <!-- Mobile Profile Avatar -->
              <div
                class="flex h-9 w-9 items-center justify-center rounded-full bg-deep-purple font-display text-sm text-white lg:hidden"
              >
                {{ currentUser ? currentUser.name.charAt(0).toUpperCase() : 'G' }}
              </div>
            </div>
          </div>
        </header>

        <!-- Main Content -->
        <main class="flex-1 overflow-y-auto px-5 py-7 sm:px-8 sm:py-10">
          <RouterView />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="min-h-screen bg-midnight">
    <div class="flex min-h-screen">
      <aside
        class="fixed inset-y-0 z-10 hidden w-64 flex-col border-r border-white/10 bg-midnight-soft lg:flex"
      >
        <div class="flex flex-1 flex-col p-6">
          <div class="mb-12 flex items-center gap-3">
            <img
              src="@/assets/images/logo_eventify.png"
              alt="Eventify"
              class="h-8 w-8 object-contain"
            />
            <div>
              <p class="font-display text-xl font-bold tracking-tight">Eventify</p>
            </div>
          </div>

          <nav class="space-y-2">
            <RouterLink
              to="/"
              class="flex items-center gap-3 rounded-lg border border-rose-gold/20 bg-rose-gold/10 px-4 py-3 text-sm font-medium text-rose-light transition hover:bg-rose-gold/20"
            >
              <span class="font-mono text-xs">01</span>
              <span>Overview</span>
            </RouterLink>
          </nav>
        </div>

        <div class="border-t border-white/10 p-6">
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-full bg-deep-purple font-display text-lg text-white"
            >
              A
            </div>
            <div>
              <p class="text-sm font-semibold">Admin User</p>
              <p class="text-xs text-ink-muted">admin@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      <div class="flex min-w-0 flex-1 flex-col lg:ml-64">
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
              <button
                class="hidden rounded-lg border border-white/10 px-3 py-2 text-xs text-ink-muted transition hover:border-rose-gold/50 hover:text-white sm:block"
                aria-label="Search"
              >
                Search <span class="ml-3 font-mono text-[10px]">/</span>
              </button>
              <div
                class="flex h-9 w-9 items-center justify-center rounded-full bg-deep-purple font-display text-sm text-white lg:hidden"
              >
                A
              </div>
            </div>
          </div>
        </header>

        <main class="flex-1 overflow-y-auto px-5 py-7 sm:px-8 sm:py-10">
          <RouterView />
        </main>
      </div>
    </div>
  </div>
</template>

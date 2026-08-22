<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="bg-gray-100 min-h-screen">
    <div class="flex h-screen overflow-hidden">
      <!-- sidebar -->
      <aside class="w-64 bg-gray-800 text-white shadow-lg fixed h-full flex flex-col">
        <div class="p-6 flex-1">
          <div class="flex items-center mb-8">
            <i class="fas fa-graduation-cap text-2xl mr-3 text-blue-400"></i>
            <span class="font-bold text-xl">Eventify Dashboard</span>
          </div>

          <nav class="space-y-2">
            <RouterLink
              to="/"
              class="flex items-center px-4 py-3 rounded-lg hover:bg-gray-700 transition duration-200"
            >
              <i class="fas fa-home mr-3"></i>
              <span>Home</span>
            </RouterLink>
          </nav>
        </div>

        <div class="w-full p-6 border-t border-gray-700 mt-auto">
          <div class="flex items-center">
            <div class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
              <i class="fas fa-user text-white"></i>
            </div>
            <div>
              <p class="text-sm font-semibold">Admin User</p>
              <p class="text-xs text-gray-400">admin@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      <!-- main content area -->
      <div class="flex-1 flex flex-col overflow-hidden ml-64">
        <!-- top header -->
        <header class="bg-white shadow-sm border-b border-gray-200">
          <div class="px-6 py-4 flex items-center justify-between">
            <div>
              <h1 class="text-2xl font-bold text-gray-800">
                {{ $route.meta.title }}
              </h1>
            </div>
            <div class="flex items-center space-x-4">
              <button
                class="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition duration-200"
              >
                <i class="fas fa-search"></i>
              </button>
              <div
                class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center cursor-pointer hover:bg-blue-600 transition duration-200"
              >
                <i class="fas fa-user text-white"></i>
              </div>
            </div>
          </div>
        </header>

        <!-- main content -->
        <main class="flex-1 overflow-y-auto p-6">
          <RouterView />
        </main>
      </div>
    </div>
  </div>
</template>

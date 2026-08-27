<script setup lang="ts">
// Imports
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import type { LoginDTO } from '@/dtos/UserDTO.js';
import { UserService } from '@/services/UserService.js';

// Variables
const router = useRouter();

// Reactive variables
const credentials = ref<LoginDTO>({
  email: '',
  password: '',
});
const errorMessage = ref<string>('');

// Methods
function handleLogin(): void {
  errorMessage.value = '';

  if (!credentials.value.email || !credentials.value.password) {
    errorMessage.value = 'Please fill in all fields.';
    return;
  }

  const user = UserService.login(credentials.value);
  if (user) {
    router.push('/');
  } else {
    errorMessage.value = 'Invalid credentials. Try mariana@example.com / password123';
  }
}
</script>

<template>
  <!-- Login Form Container -->
  <div class="mx-auto flex max-w-md flex-col justify-center py-10">
    <div class="rounded-2xl border border-white/10 bg-midnight-soft p-8 shadow-xl">
      <!-- Header -->
      <div class="mb-6 text-center">
        <h2 class="font-display text-3xl font-bold text-white">Log In</h2>
        <p class="mt-2 text-xs text-ink-muted">Enter your credentials to access Eventify</p>
      </div>

      <!-- Error Alert -->
      <div
        v-if="errorMessage"
        class="mb-4 rounded-lg border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300"
      >
        {{ errorMessage }}
      </div>

      <!-- Form Inputs -->
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="mb-1 block font-mono text-xs text-ink-muted">Email address</label>
          <input
            v-model="credentials.email"
            type="email"
            placeholder="mariana@example.com"
            class="w-full rounded-xl border border-white/10 bg-midnight px-4 py-3 text-sm text-white placeholder-white/30 focus:border-rose-gold focus:outline-none"
          />
        </div>

        <div>
          <label class="mb-1 block font-mono text-xs text-ink-muted">Password</label>
          <input
            v-model="credentials.password"
            type="password"
            placeholder="••••••••"
            class="w-full rounded-xl border border-white/10 bg-midnight px-4 py-3 text-sm text-white placeholder-white/30 focus:border-rose-gold focus:outline-none"
          />
        </div>

        <button
          type="submit"
          class="w-full rounded-xl bg-rose-gold py-3 font-display text-sm font-bold text-midnight transition hover:bg-rose-light"
        >
          Sign In
        </button>
      </form>
    </div>
  </div>
</template>

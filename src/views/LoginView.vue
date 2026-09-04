<script setup lang="ts">
// External Imports
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Internal Imports
import type { LoginDTO } from '@/dtos/UserDTO.js';
import { AuthService } from '@/services/AuthService.js';

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

  const user = AuthService.login(credentials.value);
  if (user) {
    if (user.role === 'admin') {
      router.push('/admin/events');
    } else {
      router.push('/');
    }
  } else {
    errorMessage.value = 'Invalid credentials. Try mariana@example.com / password123';
  }
}
</script>

<template>
  <!-- Full Hero Container with Background Image & Overlay -->
  <div
    class="relative flex min-h-[82vh] items-center justify-center overflow-hidden rounded-3xl border border-white/10 p-6 sm:p-12"
  >
    <!-- Background Image -->
    <img
      src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&auto=format&fit=crop&q=80"
      alt="Concert stage background"
      class="absolute inset-0 h-full w-full object-cover opacity-90"
    />

    <!-- Dark Gradient Overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-midnight/95 via-midnight/80 to-midnight/95"
    ></div>

    <!-- Glassmorphic Login Card (Expanded Width & Padding) -->
    <div
      class="relative z-10 w-full max-w-xl overflow-hidden rounded-3xl border border-white/15 bg-midnight-soft/85 p-10 shadow-2xl backdrop-blur-xl sm:p-14"
    >
      <!-- Top Decorative Accent Bar -->
      <div
        class="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-rose-gold via-rose-light to-rose-gold"
      ></div>

      <!-- Header -->
      <div class="mb-10 text-center">
        <span
          class="mb-3 inline-flex items-center gap-1.5 rounded-full border border-rose-gold/30 bg-rose-gold/10 px-4 py-1 font-mono text-xs uppercase tracking-widest text-rose-gold"
        >
          ✦ Account Access
        </span>
        <h2 class="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Welcome Back
        </h2>
        <p class="mt-3 text-sm text-ink-muted sm:text-base">
          Enter your credentials to access your account
        </p>
      </div>

      <!-- Error Alert -->
      <div
        v-if="errorMessage"
        class="mb-6 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs leading-relaxed text-rose-300 sm:text-sm"
      >
        {{ errorMessage }}
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin" class="space-y-6">
        <!-- Email Input -->
        <div class="flex flex-col gap-2">
          <label
            for="login-email"
            class="font-mono text-xs uppercase tracking-[0.2em] text-rose-gold"
          >
            Email Address
          </label>
          <input
            id="login-email"
            v-model="credentials.email"
            type="email"
            required
            placeholder="mariana@example.com"
            class="w-full rounded-2xl border border-white/15 bg-midnight/90 px-5 py-3.5 text-base text-white placeholder-white/30 outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30"
          />
        </div>

        <!-- Password Input -->
        <div class="flex flex-col gap-2">
          <label
            for="login-password"
            class="font-mono text-xs uppercase tracking-[0.2em] text-rose-gold"
          >
            Password
          </label>
          <input
            id="login-password"
            v-model="credentials.password"
            type="password"
            required
            placeholder="••••••••"
            class="w-full rounded-2xl border border-white/15 bg-midnight/90 px-5 py-3.5 text-base text-white placeholder-white/30 outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30"
          />
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="mt-4 w-full rounded-2xl bg-rose-gold py-4 font-display text-base font-bold text-midnight transition duration-200 hover:bg-rose-light hover:shadow-xl hover:shadow-rose-gold/25"
        >
          Log In
        </button>
      </form>
    </div>
  </div>
</template>

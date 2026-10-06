<script setup lang="ts">
// External Imports
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

// Internal Imports
import type { RegisterDTO } from '@/dtos/UserDTO.js';
import { AuthService } from '@/services/AuthService.js';

// Interfaces
interface RegisterFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

// Variables
const router = useRouter();

// Reactive variables
const formData = ref<RegisterFormData>({
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
});
const errorMessage = ref<string>('');
const isSubmitting = ref<boolean>(false);

// Methods
async function handleRegister(): Promise<void> {
  errorMessage.value = '';

  if (!formData.value.name || !formData.value.email || !formData.value.password) {
    errorMessage.value = 'Please fill in all required fields.';
    return;
  }

  if (formData.value.password.length < 6) {
    errorMessage.value = 'Password must be at least 6 characters long.';
    return;
  }

  if (formData.value.password !== formData.value.confirmPassword) {
    errorMessage.value = 'Passwords do not match.';
    return;
  }

  const payload: RegisterDTO = {
    name: formData.value.name.trim(),
    email: formData.value.email.trim().toLowerCase(),
    password: formData.value.password,
    phone: formData.value.phone.trim() || undefined,
  };

  isSubmitting.value = true;

  try {
    const user = await AuthService.register(payload);
    if (user.role === 'admin') {
      router.push('/admin/events');
    } else {
      router.push('/');
    }
  } catch (error: unknown) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'response' in error &&
      typeof (error as { response?: { data?: { message?: string | string[] } } }).response?.data?.message !== 'undefined'
    ) {
      const serverMessage = (error as { response: { data: { message: string | string[] } } }).response.data.message;
      errorMessage.value = Array.isArray(serverMessage)
        ? serverMessage.join(', ')
        : String(serverMessage);
    } else {
      errorMessage.value = 'An error occurred while creating your account. Please try again.';
    }
  } finally {
    isSubmitting.value = false;
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

    <!-- Glassmorphic Register Card -->
    <div
      class="relative z-10 w-full max-w-xl overflow-hidden rounded-3xl border border-white/15 bg-midnight-soft/85 p-10 shadow-2xl backdrop-blur-xl sm:p-14"
    >
      <!-- Top Decorative Accent Bar -->
      <div
        class="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-rose-gold via-rose-light to-rose-gold"
      ></div>

      <!-- Header -->
      <div class="mb-8 text-center">
        <span
          class="mb-3 inline-flex items-center gap-1.5 rounded-full border border-rose-gold/30 bg-rose-gold/10 px-4 py-1 font-mono text-xs uppercase tracking-widest text-rose-gold"
        >
          ✦ Join Eventify
        </span>
        <h2 class="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Create Account
        </h2>
        <p class="mt-3 text-sm text-ink-muted sm:text-base">
          Sign up to discover, reserve, and manage premium events
        </p>
      </div>

      <!-- Error Alert -->
      <div
        v-if="errorMessage"
        class="mb-6 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs leading-relaxed text-rose-300 sm:text-sm"
      >
        {{ errorMessage }}
      </div>

      <!-- Register Form -->
      <form @submit.prevent="handleRegister" class="space-y-5">
        <!-- Name Input -->
        <div class="flex flex-col gap-2">
          <label
            for="register-name"
            class="font-mono text-xs uppercase tracking-[0.2em] text-rose-gold"
          >
            Full Name *
          </label>
          <input
            id="register-name"
            v-model="formData.name"
            type="text"
            required
            placeholder="Mariana Carrascal"
            class="w-full rounded-2xl border border-white/15 bg-midnight/90 px-5 py-3.5 text-base text-white placeholder-white/30 outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30"
          />
        </div>

        <!-- Email Input -->
        <div class="flex flex-col gap-2">
          <label
            for="register-email"
            class="font-mono text-xs uppercase tracking-[0.2em] text-rose-gold"
          >
            Email Address *
          </label>
          <input
            id="register-email"
            v-model="formData.email"
            type="email"
            required
            placeholder="mariana@example.com"
            class="w-full rounded-2xl border border-white/15 bg-midnight/90 px-5 py-3.5 text-base text-white placeholder-white/30 outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30"
          />
        </div>

        <!-- Phone Input (Optional) -->
        <div class="flex flex-col gap-2">
          <label
            for="register-phone"
            class="font-mono text-xs uppercase tracking-[0.2em] text-rose-gold"
          >
            Phone Number (Optional)
          </label>
          <input
            id="register-phone"
            v-model="formData.phone"
            type="tel"
            placeholder="+57 300 123 4567"
            class="w-full rounded-2xl border border-white/15 bg-midnight/90 px-5 py-3.5 text-base text-white placeholder-white/30 outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30"
          />
        </div>

        <!-- Password Inputs Grid -->
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <!-- Password Input -->
          <div class="flex flex-col gap-2">
            <label
              for="register-password"
              class="font-mono text-xs uppercase tracking-[0.2em] text-rose-gold"
            >
              Password *
            </label>
            <input
              id="register-password"
              v-model="formData.password"
              type="password"
              required
              minlength="6"
              placeholder="••••••••"
              class="w-full rounded-2xl border border-white/15 bg-midnight/90 px-5 py-3.5 text-base text-white placeholder-white/30 outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30"
            />
          </div>

          <!-- Confirm Password Input -->
          <div class="flex flex-col gap-2">
            <label
              for="register-confirm-password"
              class="font-mono text-xs uppercase tracking-[0.2em] text-rose-gold"
            >
              Confirm Password *
            </label>
            <input
              id="register-confirm-password"
              v-model="formData.confirmPassword"
              type="password"
              required
              minlength="6"
              placeholder="••••••••"
              class="w-full rounded-2xl border border-white/15 bg-midnight/90 px-5 py-3.5 text-base text-white placeholder-white/30 outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30"
            />
          </div>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="isSubmitting"
          class="mt-4 w-full rounded-2xl bg-rose-gold py-4 font-display text-base font-bold text-midnight transition duration-200 hover:bg-rose-light hover:shadow-xl hover:shadow-rose-gold/25 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span v-if="isSubmitting">Creating Account...</span>
          <span v-else>Create Account</span>
        </button>

        <!-- Login Redirect Link -->
        <p class="pt-2 text-center text-sm text-ink-muted">
          Already have an account?
          <RouterLink
            to="/login"
            class="font-semibold text-rose-gold transition hover:text-rose-light hover:underline"
          >
            Log In
          </RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>

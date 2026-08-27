<script setup lang="ts">
// Interfaces
export interface SelectorOption {
  label: string;
  value: string | number;
}

// Props
withDefaults(
  defineProps<{
    id?: string;
    label?: string;
    modelValue: string | number;
    options: (string | SelectorOption)[];
    placeholder?: string;
  }>(),
  {
    id: 'selector-filtro',
    label: '',
    placeholder: 'All',
  },
);

// Emits
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

// Methods
function handleSelect(event: Event): void {
  const target = event.target as HTMLSelectElement;
  emit('update:modelValue', target.value);
}

function getOptionValue(option: string | SelectorOption): string | number {
  return typeof option === 'string' ? option : option.value;
}

function getOptionLabel(option: string | SelectorOption): string {
  return typeof option === 'string' ? option : option.label;
}
</script>

<template>
  <!-- Selector Container -->
  <div class="flex flex-col gap-1.5">
    <!-- Label -->
    <label
      v-if="label"
      :for="id"
      class="font-mono text-[10px] uppercase tracking-[0.2em] text-rose-gold"
    >
      {{ label }}
    </label>

    <!-- Select Element -->
    <div class="relative">
      <select
        :id="id"
        :value="modelValue"
        class="w-full appearance-none rounded-xl border border-white/15 bg-midnight-soft px-4 py-2.5 pr-10 text-sm text-white outline-none transition focus:border-rose-gold focus:ring-2 focus:ring-rose-gold/30"
        @change="handleSelect"
      >
        <option v-if="placeholder" value="All" class="bg-midnight text-white">
          {{ placeholder }}
        </option>
        <option
          v-for="option in options"
          :key="getOptionValue(option)"
          :value="getOptionValue(option)"
          class="bg-midnight text-white"
        >
          {{ getOptionLabel(option) }}
        </option>
      </select>

      <!-- Dropdown Chevron Icon -->
      <div
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-ink-muted"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Interfaces
export interface TableColumn {
  align?: 'center' | 'left' | 'right';
  key: string;
  label: string;
  width?: string;
}

// Props
withDefaults(
  defineProps<{
    columns: TableColumn[];
    data: Record<string, unknown>[];
    emptyMessage?: string;
    keyField?: string;
  }>(),
  {
    emptyMessage: 'No records found.',
    keyField: 'id',
  },
);

// Methods
function getAlignmentClass(align?: 'center' | 'left' | 'right'): string {
  if (align === 'center') {
    return 'text-center';
  }
  if (align === 'right') {
    return 'text-right';
  }
  return 'text-left';
}
</script>

<template>
  <!-- Table Container -->
  <div class="overflow-hidden rounded-2xl border border-white/10 bg-midnight-soft shadow-xl">
    <div class="overflow-x-auto">
      <table class="w-full border-collapse text-left text-sm text-white">
        <!-- Table Header -->
        <thead
          class="border-b border-white/10 bg-midnight-lift font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted"
        >
          <tr>
            <th
              v-for="col in columns"
              :key="col.key"
              scope="col"
              :class="['px-6 py-4 font-medium', getAlignmentClass(col.align), col.width || '']"
            >
              {{ col.label }}
            </th>
            <!-- Optional Actions Header Slot or Column -->
            <th v-if="$slots.actions" scope="col" class="px-6 py-4 text-right font-medium">
              Actions
            </th>
          </tr>
        </thead>

        <!-- Table Body -->
        <tbody class="divide-y divide-white/5 font-sans">
          <!-- Empty State -->
          <tr v-if="data.length === 0">
            <td :colspan="columns.length + ($slots.actions ? 1 : 0)" class="py-12 text-center">
              <slot name="empty">
                <div class="flex flex-col items-center justify-center gap-3">
                  <div
                    class="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-midnight text-ink-muted"
                  >
                    <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                  </div>
                  <p class="font-sans text-sm text-ink-muted">{{ emptyMessage }}</p>
                </div>
              </slot>
            </td>
          </tr>

          <!-- Data Rows -->
          <tr
            v-for="row in data"
            :key="String(row[keyField] ?? Math.random())"
            class="transition duration-150 hover:bg-white/[0.03]"
          >
            <!-- Dynamic Column Cells -->
            <td
              v-for="col in columns"
              :key="col.key"
              :class="['px-6 py-4 text-sm align-middle', getAlignmentClass(col.align)]"
            >
              <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]">
                <span class="text-white">{{ row[col.key] }}</span>
              </slot>
            </td>

            <!-- Actions Slot Cell -->
            <td v-if="$slots.actions" class="px-6 py-4 text-right align-middle">
              <slot name="actions" :row="row"></slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

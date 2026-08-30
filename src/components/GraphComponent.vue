<script setup lang="ts">
// Imports
import { ArcElement, Chart, Legend, PieController, Tooltip } from 'chart.js';
import type { ChartConfiguration } from 'chart.js';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

Chart.register(ArcElement, Legend, PieController, Tooltip);

// Props
const props = withDefaults(
  defineProps<{
    backgroundColor?: string[];
    data?: number[];
    labels?: string[];
  }>(),
  {
    backgroundColor: () => ['#c9956c', '#7b5ea7'],
    data: () => [30, 70],
    labels: () => ['Used', 'Unused'],
  },
);

// Reactive variables
const chartCanvas = ref<HTMLCanvasElement | null>(null);

// Variables
let chartInstance: Chart | null = null;

// Methods
function renderChart(): void {
  if (!chartCanvas.value) {
    return;
  }

  if (chartInstance) {
    chartInstance.destroy();
  }

  const config: ChartConfiguration<'pie'> = {
    type: 'pie',
    data: {
      labels: props.labels,
      datasets: [
        {
          backgroundColor: props.backgroundColor,
          borderColor: '#121527',
          borderWidth: 2,
          data: props.data,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: '#e5b897',
            font: {
              family: 'DM Mono',
              size: 12,
            },
          },
          position: 'bottom',
        },
      },
      responsive: true,
    },
  };

  chartInstance = new Chart(chartCanvas.value, config);
}

// Lifecycle
onMounted(() => {
  renderChart();
});

watch(
  () => [props.data, props.labels, props.backgroundColor],
  () => {
    renderChart();
  },
  { deep: true },
);

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
});
</script>

<template>
  <!-- Chart Container -->
  <div class="relative w-full">
    <!-- Chart Canvas -->
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

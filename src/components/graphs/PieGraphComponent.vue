<script setup lang="ts">
// External Imports
import { ArcElement, Chart, Legend, PieController, Tooltip } from 'chart.js';
import type { ChartConfiguration } from 'chart.js';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

Chart.register(ArcElement, Legend, PieController, Tooltip);

// Props
const props = defineProps<{
  backgroundColor: string[];
  borderColor: string;
  data: number[];
  labels: string[];
  legendPosition?: 'top' | 'left' | 'bottom' | 'right';
  title?: string;
}>();

// Reactive State
const chartCanvas = ref<HTMLCanvasElement | null>(null);

// Variables
let chartInstance: Chart<'pie'>;

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
          data: props.data,
          backgroundColor: props.backgroundColor,
          borderColor: props.borderColor,
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: props.legendPosition,
          labels: {
            color: '#f4d7c0',
            font: {
              family: 'DM Mono',
              size: 12,
            },
          },
        },
        title: props.title
          ? {
              display: true,
              text: props.title,
              color: '#f4d7c0',
              font: {
                family: 'DM Mono',
                size: 13,
                weight: 'bold',
              },
            }
          : undefined,
      },
    },
  };

  chartInstance = new Chart(chartCanvas.value, config);
}

// Lifecycle
onMounted(() => {
  renderChart();
});

watch(
  () => [
    props.data,
    props.labels,
    props.backgroundColor,
    props.borderColor,
    props.legendPosition,
    props.title,
  ],
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
  <div class="pie-graph">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<style scoped>
.pie-graph {
  position: relative;
  width: 100%;
  height: 260px;
}

canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>

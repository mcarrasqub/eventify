<script setup lang="ts">
// External Imports
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js';
import type { ChartConfiguration } from 'chart.js';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

Chart.register(BarController, BarElement, CategoryScale, Legend, LinearScale, Tooltip);

// Props
const props = withDefaults(
  defineProps<{
    backgroundColor?: string[];
    borderColor?: string;
    data?: number[];
    labels?: string[];
    title?: string;
  }>(),
  {
    backgroundColor: () => ['#c9956c'],
    borderColor: '#0f172a',
    data: () => [0],
    labels: () => ['Event'],
    title: '',
  },
);

// Reactive State
const chartCanvas = ref<HTMLCanvasElement | null>(null);

// Variables
let chartInstance: Chart<'bar'> | null = null;

// Methods
function renderChart(): void {
  if (!chartCanvas.value) {
    return;
  }

  if (chartInstance) {
    chartInstance.destroy();
  }

  const config: ChartConfiguration<'bar'> = {
    type: 'bar',
    data: {
      labels: props.labels,
      datasets: [
        {
          label: 'Revenue',
          data: props.data,
          backgroundColor: props.backgroundColor,
          borderColor: props.borderColor,
          borderWidth: 1,
          borderRadius: 8,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
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
      scales: {
        x: {
          ticks: {
            color: '#f4d7c0',
            maxRotation: 45,
            minRotation: 0,
          },
          grid: {
            color: 'rgba(255,255,255,0.06)',
          },
        },
        y: {
          ticks: {
            color: '#f4d7c0',
          },
          grid: {
            color: 'rgba(255,255,255,0.06)',
          },
        },
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
  () => [props.data, props.labels, props.backgroundColor, props.borderColor, props.title],
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
  <div class="bar-graph">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<style scoped>
.bar-graph {
  position: relative;
  width: 100%;
  height: 310px;
}

canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>

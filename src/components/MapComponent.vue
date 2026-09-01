<script setup lang="ts">
// External Imports
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { onMounted, onUnmounted, ref } from 'vue';

// Props
const props = defineProps<{
  latitude?: number;
  longitude?: number;
  name: string;
  address: string;
}>();

// Reactive variables
const mapContainer = ref<HTMLDivElement | null>(null);
let mapInstance: L.Map | null = null;

// Lifecycle Hooks
onMounted(() => {
  if (!mapContainer.value) {
    return;
  }

  // Default coordinates if not provided
  const lat = props.latitude ?? 4.60971;
  const lng = props.longitude ?? -74.08175;

  mapInstance = L.map(mapContainer.value).setView([lat, lng], 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(mapInstance);

  const customIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const popupContent = `<div style="color: #111; font-family: sans-serif; font-size: 12px;"><strong>${props.name}</strong><br/>${props.address}</div>`;

  L.marker([lat, lng], { icon: customIcon }).addTo(mapInstance).bindPopup(popupContent).openPopup();
});

onUnmounted(() => {
  if (mapInstance) {
    mapInstance.remove();
    mapInstance = null;
  }
});
</script>

<template>
  <!-- Map Container -->
  <div class="relative z-0 overflow-hidden rounded-xl border border-white/10 shadow-lg">
    <div ref="mapContainer" class="h-64 w-full bg-midnight"></div>
  </div>
</template>

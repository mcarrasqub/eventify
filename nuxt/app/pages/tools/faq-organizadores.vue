<script setup lang="ts">
import { ref } from 'vue'

const openFaq = ref<number | null>(1)
const toggleFaq = (id: number) => {
  openFaq.value = openFaq.value === id ? null : id
}

const faqs = [
  {
    id: 1,
    q: '¿Cómo publico un evento y configuro distintas localidades?',
    a: 'En el panel de organizador puedes definir el aforo máximo, crear tipos de boletería (General, VIP, Preventa), fechas de venta y asignación de asientos o zonas.',
  },
  {
    id: 2,
    q: '¿Cómo funciona la validación de boletos en las puertas del recinto?',
    a: 'Puedes sincronizar los dispositivos móviles de tu equipo de staff con nuestra aplicación de escaneo QR, la cual opera incluso con conectividad intermitente.',
  },
  {
    id: 3,
    q: '¿Cuándo se transfiere el dinero recaudado de las entradas?',
    a: 'Los organizadores verificados pueden solicitar anticipos del 40% durante la preventa, y la liquidación final se desembolsa 48 horas hábiles tras culminar el evento.',
  },
  {
    id: 4,
    q: '¿Cuáles son las comisiones de la plataforma?',
    a: 'Eventify cobra una tarifa competitiva por entrada vendida según el plan acordado (5% a 10%), sin costos ocultos de configuración.',
  },
]
</script>

<template>
  <div>
    <nav aria-label="breadcrumb" class="mb-3">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><NuxtLink to="/">Inicio</NuxtLink></li>
        <li class="breadcrumb-item"><NuxtLink to="/tools">Soporte</NuxtLink></li>
        <li class="breadcrumb-item active" aria-current="page">FAQ Organizadores</li>
      </ol>
    </nav>

    <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
      <div>
        <h1 class="h2 mb-1">Preguntas Frecuentes - Organizadores</h1>
        <p class="text-muted mb-0">
          Guías y respuestas para la creación, venta y gestión de accesos a eventos.
        </p>
      </div>
      <span class="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle px-3 py-2">
        CSR
      </span>
    </div>

    <div class="card border-0 shadow-sm">
      <div class="list-group list-group-flush">
        <div
          v-for="faq in faqs"
          :key="faq.id"
          class="list-group-item p-3"
        >
          <div
            class="d-flex justify-content-between align-items-center role-button user-select-none"
            style="cursor: pointer"
            @click="toggleFaq(faq.id)"
          >
            <span class="fw-semibold text-success">{{ faq.q }}</span>
            <span class="text-muted fs-5">{{ openFaq === faq.id ? '−' : '+' }}</span>
          </div>
          <div v-show="openFaq === faq.id" class="mt-2 text-secondary pt-1 border-top">
            {{ faq.a }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const openFaq = ref<number | null>(1)
const toggleFaq = (id: number) => {
  openFaq.value = openFaq.value === id ? null : id
}

const faqs = [
  {
    id: 1,
    q: '¿Cómo accedo a mis entradas compradas?',
    a: 'Una vez confirmada la compra, tus entradas con código QR único se envían de inmediato a tu correo registrado y quedan disponibles en la app de Eventify.',
  },
  {
    id: 2,
    q: '¿Puedo transferir mi boleto a otra persona?',
    a: 'Sí, puedes realizar la cesión de boleto hasta 24 horas antes del inicio del evento indicando el correo y documento de identidad del nuevo titular.',
  },
  {
    id: 3,
    q: '¿Cuál es la política para solicitar cancelaciones y reembolsos?',
    a: 'Las solicitudes deben enviarse con al menos 7 días de anticipación al evento. Se aplicará la retención administrativa correspondiente según los términos de compra.',
  },
  {
    id: 4,
    q: '¿Qué documento debo presentar en el acceso?',
    a: 'Debes presentar tu documento de identidad original junto con el código QR en tu teléfono móvil o impreso de forma legible.',
  },
]
</script>

<template>
  <div>
    <nav aria-label="breadcrumb" class="mb-3">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><NuxtLink to="/">Inicio</NuxtLink></li>
        <li class="breadcrumb-item"><NuxtLink to="/tools">Soporte</NuxtLink></li>
        <li class="breadcrumb-item active" aria-current="page">FAQ Asistentes</li>
      </ol>
    </nav>

    <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
      <div>
        <h1 class="h2 mb-1">Preguntas Frecuentes - Asistentes</h1>
        <p class="text-muted mb-0">
          Respuestas a las dudas más comunes sobre compra, boletos y acceso a eventos.
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
            <span class="fw-semibold text-primary">{{ faq.q }}</span>
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

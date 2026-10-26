<script setup lang="ts">
import { ref, computed } from 'vue'

const searchQuery = ref('')

interface FaqQuickItem {
  id: number
  question: string
  answer: string
  category: 'asistentes' | 'organizadores'
  targetRoute: string
}

const faqs = ref<FaqQuickItem[]>([
  {
    id: 1,
    question: '¿Cómo descargo mis entradas en formato digital?',
    answer: 'Puedes acceder a tus entradas desde tu correo de confirmación o en el módulo de usuario.',
    category: 'asistentes',
    targetRoute: '/tools/faq-asistentes',
  },
  {
    id: 2,
    question: '¿Cómo solicito el reembolso o cancelación de una entrada?',
    answer: 'Consulta las políticas de reembolso y términos aplicables para asistentes.',
    category: 'asistentes',
    targetRoute: '/tools/faq-asistentes',
  },
  {
    id: 3,
    question: '¿Qué comisiones cobra Eventify por boleto vendido?',
    answer: 'Las tarifas van del 5% al 10% según el plan acordado.',
    category: 'organizadores',
    targetRoute: '/tools/faq-organizadores',
  },
  {
    id: 4,
    question: '¿Cómo se configuran los accesos y lectura de códigos QR?',
    answer: 'Eventify proporciona una app móvil para el personal de control en puertas.',
    category: 'organizadores',
    targetRoute: '/tools/faq-organizadores',
  },
])

const filteredFaqs = computed(() => {
  if (!searchQuery.value.trim()) return faqs.value
  const query = searchQuery.value.toLowerCase()
  return faqs.value.filter(
    (item) =>
      item.question.toLowerCase().includes(query) ||
      item.answer.toLowerCase().includes(query)
  )
})
</script>

<template>
  <div>
    <!-- Encabezado -->
    <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
      <div>
        <h1 class="h2 mb-1">Centro de Ayuda & FAQ</h1>
        <p class="text-muted mb-0">
          Preguntas frecuentes y soporte para asistentes y organizadores.
        </p>
      </div>
      <div>
        <span class="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle px-3 py-2 fs-6">
          Modo CSR
        </span>
      </div>
    </div>

    <!-- Tarjetas de Navegación a las 2 Subrutas -->
    <div class="row g-4 mb-4">
      <!-- Subruta 1: Asistentes -->
      <div class="col-md-6">
        <div class="card h-100 shadow-sm border-0 border-top border-4 border-primary">
          <div class="card-body p-4 d-flex flex-column">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <h2 class="h5 card-title mb-0">FAQ Asistentes</h2>
              <span class="badge bg-primary-subtle text-primary">Subruta 1</span>
            </div>
            <p class="card-text text-muted flex-grow-1">
              Guía de compra, descarga de boletos digitales y políticas de acceso.
            </p>
            <div class="mt-3">
              <NuxtLink to="/tools/faq-asistentes" class="btn btn-outline-primary w-100">
                Ver Preguntas de Asistentes →
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Subruta 2: Organizadores -->
      <div class="col-md-6">
        <div class="card h-100 shadow-sm border-0 border-top border-4 border-success">
          <div class="card-body p-4 d-flex flex-column">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <h2 class="h5 card-title mb-0">FAQ Organizadores</h2>
              <span class="badge bg-success-subtle text-success">Subruta 2</span>
            </div>
            <p class="card-text text-muted flex-grow-1">
              Gestión de recintos, validación de códigos QR y políticas de liquidación.
            </p>
            <div class="mt-3">
              <NuxtLink to="/tools/faq-organizadores" class="btn btn-outline-success w-100">
                Ver Preguntas de Organizadores →
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Buscador Rápido de Preguntas Frecuentes -->
    <div class="card p-4 border-0 shadow-sm bg-light">
      <h2 class="h5 mb-2">Buscador Rápido</h2>
      <p class="text-muted small mb-3">
        Encuentra rápidamente respuestas a tus preguntas.
      </p>

      <div class="input-group mb-3">
        <span class="input-group-text bg-white">🔍</span>
        <input
          v-model="searchQuery"
          type="text"
          class="form-control"
          placeholder="Busca por palabra clave: boletos, QR, entradas, comisiones..."
        />
        <button
          v-if="searchQuery"
          class="btn btn-outline-secondary"
          type="button"
          @click="searchQuery = ''"
        >
          Limpiar
        </button>
      </div>

      <div v-if="filteredFaqs.length === 0" class="text-center py-3 text-muted">
        No se encontraron preguntas con el término "{{ searchQuery }}".
      </div>

      <ul v-else class="list-group">
        <li
          v-for="faq in filteredFaqs"
          :key="faq.id"
          class="list-group-item d-flex justify-content-between align-items-start py-3"
        >
          <div>
            <div class="fw-semibold">{{ faq.question }}</div>
            <div class="text-muted small mt-1">{{ faq.answer }}</div>
          </div>
          <NuxtLink :to="faq.targetRoute" class="btn btn-sm btn-light border ms-3 text-nowrap">
            Ver más →
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

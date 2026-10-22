<script setup lang="ts">
import { articles } from '~/data/articles'
</script>

<template>
  <div>
    <h1 class="h2 mb-3">Blog de Eventify</h1>
    <p class="text-muted">Artículos técnicos sobre gestión de eventos desplegados como SSG.</p>
    <ul class="list-group">
      <li
        v-for="article in articles"
        :key="article.id"
        class="list-group-item position-relative py-3"
      >
        <NuxtLink
          class="stretched-link text-decoration-none fw-semibold text-dark"
          :to="`/blog/${article.id}`"
        >
          {{ article.title }}
        </NuxtLink>
        <span class="text-body-secondary d-block small mt-1">
          {{ article.category }} · {{ article.author }} · {{ article.date }}
        </span>
      </li>
    </ul>
  </div>
</template>

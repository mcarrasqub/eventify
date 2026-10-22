<script setup lang="ts">
import { articles } from '~/data/articles'

definePageMeta({
  validate(route) {
    const param = String(route.params.id)
    return articles.some((a) => a.id === param)
  },
})

const route = useRoute()
const id = computed(() => String(route.params.id))
const article = computed(() => articles.find((a) => a.id === id.value))
</script>

<template>
  <article v-if="article">
    <p class="mb-2">
      <NuxtLink class="text-decoration-none small" to="/blog">← Todos los artículos</NuxtLink>
    </p>
    <h1 class="h2 mb-2">{{ article.title }}</h1>
    <p class="text-muted small mb-3">
      <strong>{{ article.category }}</strong> · {{ article.author }} · {{ article.date }}
    </p>
    <hr />
    <p class="lead mb-3">{{ article.summary }}</p>
    <p class="mb-0 fs-6 lh-base">{{ article.content }}</p>
  </article>
</template>

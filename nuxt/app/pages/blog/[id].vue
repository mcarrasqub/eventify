<script setup lang="ts">
// Imports
import { articles } from '~/data/articles';
import { DateFormatUtil } from '~/utils/DateFormatUtil';

definePageMeta({
  validate(route) {
    const param = String(route.params.id);
    return articles.some((article) => article.id === param);
  },
});

// Variables
const route = useRoute();
const id = computed(() => String(route.params.id));

// Computed
const article = computed(() => articles.find((item) => item.id === id.value));

// SEO
useSeoMeta({
  title: () => `${article.value?.title} · Eventify`,
  description: () => article.value?.summary,
});
</script>

<template>
  <article v-if="article" class="mx-auto" style="max-width: 720px">
    <!-- Back navigation -->
    <p class="mb-1">
      <NuxtLink class="text-decoration-none small" to="/blog">← Todos los artículos</NuxtLink>
    </p>

    <!-- Article header -->
    <h1 class="h2 fw-bold text-primary">{{ article.title }}</h1>
    <p class="text-body-secondary small">
      {{ article.author }} · {{ DateFormatUtil.formatLongDate(article.publishedAt) }}
    </p>

    <!-- Article content -->
    <p v-for="paragraph in article.paragraphs" :key="paragraph">{{ paragraph }}</p>
  </article>
</template>

<script setup lang="ts">
// Imports
import { articles } from '~/data/articles';
import { DateFormatUtil } from '~/utils/DateFormatUtil';

// SEO
useSeoMeta({
  title: 'Blog · Eventify',
  description: 'Artículos sobre cómo sacar provecho de un dashboard de gestión de eventos.',
});
</script>

<template>
  <section>
    <!-- Page title -->
    <h1 class="h2 mb-3 text-primary">Blog</h1>

    <!-- Article list -->
    <ul class="list-group shadow-sm">
      <li
        v-for="article in articles"
        :key="article.id"
        class="list-group-item list-group-item-action position-relative py-3"
      >
        <NuxtLink
          class="stretched-link text-decoration-none fw-semibold"
          :to="`/blog/${article.id}`"
        >
          {{ article.title }}
        </NuxtLink>
        <span class="text-body-secondary d-block small">
          {{ article.author }} · {{ DateFormatUtil.formatLongDate(article.publishedAt) }}
        </span>
      </li>
    </ul>
  </section>
</template>

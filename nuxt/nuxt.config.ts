// https://nuxt.com/docs/api/configuration/nuxt-config
import { articles } from './app/data/articles';

const blogRoutes = ['/blog', ...articles.map((article) => `/blog/${article.id}`)];

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  routeRules: {
    '/': { ssr: true }, // SSR
    '/blog/**': { prerender: true }, // SSG
    '/events/**': { ssr: true }, // SSR
    '/tools/**': { ssr: false }, // CSR
  },
  nitro: {
    prerender: {
      routes: blogRoutes,
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'es' },
      title: 'Eventify Mini',
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
          integrity: 'sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH',
          crossorigin: 'anonymous',
        },
      ],
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
          integrity: 'sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz',
          crossorigin: 'anonymous',
          defer: true,
        },
      ],
    },
  },
});

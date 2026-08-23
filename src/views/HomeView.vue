<script setup lang="ts">
const stats = [
  { label: 'Total events', value: '24', change: '+12.5%', tone: 'rose' },
  { label: 'Tickets sold', value: '1,284', change: '+8.2%', tone: 'purple' },
  { label: 'Revenue', value: '$48,920', change: '+18.4%', tone: 'rose' },
];

const upcomingEvents = [
  {
    date: '18',
    month: 'OCT',
    name: 'Nocturne Sessions',
    place: 'The Velvet Room',
    tickets: '148 / 200',
  },
  {
    date: '26',
    month: 'OCT',
    name: 'Afterglow Market',
    place: 'Luna Arts District',
    tickets: '312 / 500',
  },
  { date: '02', month: 'NOV', name: 'Midnight Cinema', place: 'Rooftop 88', tickets: '96 / 120' },
];
</script>

<template>
  <section class="mx-auto max-w-7xl">
    <div class="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p class="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
          Your events, in one place
        </p>
        <h2 class="font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Good evening, <span class="text-rose-gold">Admin.</span>
        </h2>
      </div>
      <button
        class="w-fit rounded-lg bg-rose-gold px-5 py-3 text-sm font-semibold text-midnight transition hover:bg-rose-light"
      >
        + Create event
      </button>
    </div>

    <div class="grid gap-4 md:grid-cols-3">
      <article
        v-for="stat in stats"
        :key="stat.label"
        class="rounded-xl border border-white/10 bg-midnight-soft p-5"
      >
        <div class="mb-8 flex items-center justify-between">
          <p class="text-sm text-ink-muted">{{ stat.label }}</p>
          <span
            :class="
              stat.tone === 'rose'
                ? 'bg-rose-gold/10 text-rose-light'
                : 'bg-deep-purple/20 text-purple-200'
            "
            class="rounded-full px-2 py-1 font-mono text-[10px]"
            >{{ stat.change }}</span
          >
        </div>
        <p class="font-mono text-3xl font-medium text-white">{{ stat.value }}</p>
      </article>
    </div>

    <div class="mt-10 grid gap-8 xl:grid-cols-[1.4fr_0.8fr]">
      <section>
        <div class="mb-4 flex items-center justify-between">
          <h3 class="font-display text-2xl font-bold">Upcoming events</h3>
          <button class="text-xs font-medium text-rose-gold transition hover:text-rose-light">
            View all
          </button>
        </div>
        <div class="divide-y divide-white/10 rounded-xl border border-white/10 bg-midnight-soft">
          <article
            v-for="event in upcomingEvents"
            :key="event.name"
            class="flex items-center gap-4 p-4 sm:p-5"
          >
            <div
              class="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-deep-purple/20 text-deep-purple"
            >
              <span class="font-mono text-xl font-medium leading-none text-purple-200">{{
                event.date
              }}</span>
              <span class="mt-1 font-mono text-[9px] tracking-widest text-purple-300">{{
                event.month
              }}</span>
            </div>
            <div class="min-w-0 flex-1">
              <h4 class="truncate font-semibold text-white">{{ event.name }}</h4>
              <p class="mt-1 truncate text-xs text-ink-muted">{{ event.place }}</p>
            </div>
            <p class="hidden font-mono text-xs text-rose-light sm:block">{{ event.tickets }}</p>
          </article>
        </div>
      </section>

      <aside class="rounded-xl border border-rose-gold/20 bg-rose-gold/10 p-6">
        <p class="font-mono text-[10px] uppercase tracking-[0.2em] text-rose-gold">
          Tonight's pulse
        </p>
        <h3 class="mt-3 font-display text-3xl font-bold">The room is ready.</h3>
        <p class="mt-3 text-sm leading-6 text-ink-muted">
          Your next event is 74% sold out. Keep the energy moving and make tonight memorable.
        </p>
        <div class="mt-8 h-1.5 overflow-hidden rounded-full bg-midnight-lift">
          <div class="h-full w-[74%] rounded-full bg-rose-gold"></div>
        </div>
        <div class="mt-3 flex justify-between font-mono text-[10px] text-ink-muted">
          <span>148 tickets sold</span><span>74%</span>
        </div>
      </aside>
    </div>
  </section>
</template>

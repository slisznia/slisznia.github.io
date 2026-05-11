<script setup lang="ts">
import type { Projection } from '@/types/portfolio'

defineProps<{
  projection: Projection
}>()
</script>

<template>
  <router-link
    :to="`/projections/${projection.id}`"
    class="block rounded-lg border border-ink-800 bg-ink-900/40 p-5 hover:border-ink-600 hover:bg-ink-900 transition-colors"
  >
    <h3 class="text-lg font-semibold text-ink-50">{{ projection.title }}</h3>
    <p class="mt-1 text-sm text-ink-300">{{ projection.headline }}</p>
    <p class="mt-3 text-sm text-ink-400">{{ projection.summary }}</p>
  </router-link>
</template>

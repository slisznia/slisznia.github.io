<script setup lang="ts">
import { computed } from 'vue'
import { portfolio } from '@/lib/content'
import { sortedProjections } from '@/lib/portfolio'
import ProjectionCard from '@/components/ProjectionCard.vue'

const copy = portfolio.site.copy.projectionsIndex
const projections = computed(() => sortedProjections(portfolio))
</script>

<template>
  <section class="container-narrow pt-10 pb-6">
    <h1 class="text-3xl font-semibold tracking-tight text-ink-50">{{ copy.heading }}</h1>
    <p v-if="copy.body" class="mt-3 text-ink-200 max-w-2xl">{{ copy.body }}</p>
  </section>

  <section class="container-narrow py-6">
    <div class="grid gap-4 sm:grid-cols-2">
      <ProjectionCard
        v-for="projection in projections"
        :key="projection.id"
        :projection="projection"
      />
    </div>
  </section>
</template>

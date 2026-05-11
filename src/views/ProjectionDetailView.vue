<script setup lang="ts">
import { computed } from 'vue'
import { portfolio } from '@/lib/content'
import { findProjection, projectsForProjection } from '@/lib/portfolio'
import ProjectRow from '@/components/ProjectRow.vue'

const props = defineProps<{ id: string }>()

const projection = computed(() => findProjection(portfolio, props.id))
const projects = computed(() =>
  projection.value ? projectsForProjection(portfolio, projection.value.id) : [],
)
</script>

<template>
  <div v-if="projection">
    <section class="container-narrow pt-10 pb-6">
      <router-link to="/projections" class="text-sm text-ink-400 hover:text-ink-100">
        ← All projections
      </router-link>
      <h1 class="mt-3 text-3xl font-semibold tracking-tight text-ink-50">
        {{ projection.title }}
      </h1>
      <p class="mt-3 text-lg text-ink-200">{{ projection.headline }}</p>
      <p class="mt-3 text-ink-300 max-w-2xl">{{ projection.summary }}</p>
    </section>

    <section class="container-narrow py-6 border-t border-ink-800">
      <h2 class="text-sm uppercase tracking-wider text-ink-400">
        Projects in this projection ({{ projects.length }})
      </h2>
      <div class="mt-4">
        <ProjectRow
          v-for="project in projects"
          :key="project.id"
          :project="project"
          :projection-id="projection.id"
        />
      </div>
      <p v-if="!projects.length" class="mt-4 text-ink-400">
        No projects match this projection yet.
      </p>
    </section>
  </div>

  <div v-else class="container-narrow py-16">
    <h1 class="text-2xl font-semibold text-ink-50">Projection not found</h1>
    <router-link to="/projections" class="mt-4 inline-block text-ink-300 hover:text-ink-50">
      ← Back to projections
    </router-link>
  </div>
</template>

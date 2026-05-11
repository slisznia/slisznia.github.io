<script setup lang="ts">
import { computed } from 'vue'
import type { Project } from '@/types/portfolio'
import { portfolio } from '@/lib/content'
import { capabilityLabel, domainLabel } from '@/lib/portfolio'
import TagChip from './TagChip.vue'

const props = defineProps<{
  project: Project
  projectionId?: string
  maxTags?: number
}>()

const limit = computed(() => props.maxTags ?? 6)

const domainTags = computed(() =>
  props.project.domains.slice(0, limit.value).map((id) => ({
    id,
    label: domainLabel(portfolio, id),
  })),
)

const capabilityTags = computed(() =>
  props.project.capabilities.slice(0, limit.value).map((id) => ({
    id,
    label: capabilityLabel(portfolio, id),
  })),
)

const highlight = computed(() => {
  if (!props.projectionId) return null
  return props.project.projectionHighlights?.[props.projectionId]?.[0] ?? null
})
</script>

<template>
  <router-link
    :to="`/projects/${project.id}`"
    class="block border-b border-ink-800 py-5 hover:bg-ink-900/40 transition-colors -mx-2 px-2 rounded"
  >
    <div class="flex items-baseline justify-between gap-4">
      <h3 class="text-base font-semibold text-ink-50">{{ project.title }}</h3>
      <span v-if="project.status" class="shrink-0 text-xs text-ink-400">
        {{ project.status }}
      </span>
    </div>
    <p class="mt-1 text-sm text-ink-300">{{ project.summary }}</p>
    <p v-if="highlight" class="mt-2 text-sm italic text-ink-200">
      {{ highlight }}
    </p>
    <div class="mt-3 flex flex-wrap gap-1.5">
      <TagChip
        v-for="tag in domainTags"
        :key="`d-${tag.id}`"
        :label="tag.label"
        tone="domain"
      />
      <TagChip
        v-for="tag in capabilityTags"
        :key="`c-${tag.id}`"
        :label="tag.label"
        tone="capability"
      />
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { portfolio } from '@/lib/content'
import { capabilityLabel, domainLabel } from '@/lib/portfolio'
import ProjectRow from '@/components/ProjectRow.vue'

const copy = portfolio.site.copy.projectsIndex
const activeDomain = ref<string | null>(null)
const activeCapability = ref<string | null>(null)

const availableDomains = computed(() => {
  const ids = new Set<string>()
  for (const p of portfolio.projects) for (const d of p.domains) ids.add(d)
  return [...ids]
    .map((id) => ({ id, label: domainLabel(portfolio, id) }))
    .sort((a, b) => a.label.localeCompare(b.label))
})

const availableCapabilities = computed(() => {
  const ids = new Set<string>()
  for (const p of portfolio.projects) for (const c of p.capabilities) ids.add(c)
  return [...ids]
    .map((id) => ({ id, label: capabilityLabel(portfolio, id) }))
    .sort((a, b) => a.label.localeCompare(b.label))
})

const visibleProjects = computed(() =>
  portfolio.projects.filter((project) => {
    if (activeDomain.value && !project.domains.includes(activeDomain.value)) return false
    if (activeCapability.value && !project.capabilities.includes(activeCapability.value)) return false
    return true
  }),
)

function toggleDomain(id: string) {
  activeDomain.value = activeDomain.value === id ? null : id
}
function toggleCapability(id: string) {
  activeCapability.value = activeCapability.value === id ? null : id
}
function clearFilters() {
  activeDomain.value = null
  activeCapability.value = null
}
</script>

<template>
  <section class="container-narrow pt-10 pb-6">
    <h1 class="text-3xl font-semibold tracking-tight text-ink-50">{{ copy.heading }}</h1>
    <p v-if="copy.body" class="mt-3 text-ink-200 max-w-2xl">{{ copy.body }}</p>
  </section>

  <section class="container-narrow py-4 border-t border-ink-800">
    <div class="text-xs uppercase tracking-wider text-ink-400">Filter by domain</div>
    <div class="mt-2 flex flex-wrap gap-1.5">
      <button
        v-for="d in availableDomains"
        :key="d.id"
        type="button"
        class="rounded-full border px-2 py-0.5 text-xs transition-colors"
        :class="activeDomain === d.id
          ? 'border-ink-300 bg-ink-100 text-ink-950'
          : 'border-ink-700 bg-ink-900 text-ink-200 hover:border-ink-500'"
        @click="toggleDomain(d.id)"
      >
        {{ d.label }}
      </button>
    </div>

    <div class="mt-4 text-xs uppercase tracking-wider text-ink-400">Filter by capability</div>
    <div class="mt-2 flex flex-wrap gap-1.5">
      <button
        v-for="c in availableCapabilities"
        :key="c.id"
        type="button"
        class="rounded-full border px-2 py-0.5 text-xs transition-colors"
        :class="activeCapability === c.id
          ? 'border-ink-300 bg-ink-100 text-ink-950'
          : 'border-ink-600 bg-ink-800 text-ink-100 hover:border-ink-400'"
        @click="toggleCapability(c.id)"
      >
        {{ c.label }}
      </button>
    </div>

    <button
      v-if="activeDomain || activeCapability"
      type="button"
      class="mt-4 text-xs text-ink-400 hover:text-ink-100"
      @click="clearFilters"
    >
      Clear filters
    </button>
  </section>

  <section class="container-narrow py-6">
    <div class="text-sm text-ink-400">
      Showing {{ visibleProjects.length }} of {{ portfolio.projects.length }}
    </div>
    <div class="mt-2">
      <ProjectRow
        v-for="project in visibleProjects"
        :key="project.id"
        :project="project"
      />
    </div>
    <p v-if="!visibleProjects.length" class="mt-6 text-ink-400">
      No projects match the current filters.
    </p>
  </section>
</template>

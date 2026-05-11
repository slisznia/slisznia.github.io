<script setup lang="ts">
import { computed } from 'vue'
import { portfolio } from '@/lib/content'
import {
  capabilityLabel,
  domainLabel,
  findProject,
  projectionsForProject,
} from '@/lib/portfolio'
import TagChip from '@/components/TagChip.vue'
import EvidenceList from '@/components/EvidenceList.vue'
import ProjectGallery from '@/components/ProjectGallery.vue'

const props = defineProps<{ id: string }>()

const project = computed(() => findProject(portfolio, props.id))
const relatedProjections = computed(() =>
  project.value ? projectionsForProject(portfolio, project.value) : [],
)
</script>

<template>
  <div v-if="project">
    <section class="container-narrow pt-10 pb-6">
      <router-link to="/projects" class="text-sm text-ink-400 hover:text-ink-100">
        ← All projects
      </router-link>
      <div class="mt-3 flex items-baseline justify-between gap-4 flex-wrap">
        <h1 class="text-3xl font-semibold tracking-tight text-ink-50">
          {{ project.title }}
        </h1>
        <span v-if="project.status" class="text-sm text-ink-400">
          {{ project.status }}
        </span>
      </div>
      <p v-if="project.timeframe" class="mt-1 text-sm text-ink-400">
        {{ project.timeframe }}
      </p>
      <p class="mt-4 text-lg text-ink-200 leading-relaxed">
        {{ project.summary }}
      </p>

      <div class="mt-5 flex flex-wrap gap-1.5">
        <TagChip
          v-for="id in project.domains"
          :key="`d-${id}`"
          :label="domainLabel(portfolio, id)"
          tone="domain"
        />
        <TagChip
          v-for="id in project.capabilities"
          :key="`c-${id}`"
          :label="capabilityLabel(portfolio, id)"
          tone="capability"
        />
      </div>
    </section>

    <section
      v-if="project.problem || project.solution"
      class="container-narrow py-6 border-t border-ink-800 grid gap-6 md:grid-cols-2"
    >
      <div v-if="project.problem">
        <h2 class="text-sm uppercase tracking-wider text-ink-400">Problem</h2>
        <p class="mt-2 text-ink-200 leading-relaxed">{{ project.problem }}</p>
      </div>
      <div v-if="project.solution">
        <h2 class="text-sm uppercase tracking-wider text-ink-400">Approach</h2>
        <p class="mt-2 text-ink-200 leading-relaxed">{{ project.solution }}</p>
      </div>
    </section>

    <section
      v-if="project.outcomes?.length"
      class="container-narrow py-6 border-t border-ink-800"
    >
      <h2 class="text-sm uppercase tracking-wider text-ink-400">Outcomes</h2>
      <ul class="mt-3 space-y-2">
        <li v-for="(item, i) in project.outcomes" :key="i" class="text-ink-200 text-sm">
          — {{ item }}
        </li>
      </ul>
    </section>

    <section
      v-if="project.evidence?.length"
      class="container-narrow py-6 border-t border-ink-800"
    >
      <h2 class="text-sm uppercase tracking-wider text-ink-400">
        Evidence by capability
      </h2>
      <div class="mt-4">
        <EvidenceList :evidence="project.evidence" />
      </div>
    </section>

    <section
      v-if="project.media?.length"
      class="container-narrow py-6 border-t border-ink-800"
    >
      <h2 class="text-sm uppercase tracking-wider text-ink-400">Gallery</h2>
      <div class="mt-4">
        <ProjectGallery :items="project.media" />
      </div>
    </section>

    <section
      v-if="project.tags?.length"
      class="container-narrow py-6 border-t border-ink-800"
    >
      <h2 class="text-sm uppercase tracking-wider text-ink-400">Technologies</h2>
      <div class="mt-3 flex flex-wrap gap-1.5">
        <TagChip v-for="t in project.tags" :key="t" :label="t" tone="plain" />
      </div>
    </section>

    <section
      v-if="relatedProjections.length"
      class="container-narrow py-6 border-t border-ink-800"
    >
      <h2 class="text-sm uppercase tracking-wider text-ink-400">Related projections</h2>
      <div class="mt-3 flex flex-wrap gap-2">
        <router-link
          v-for="p in relatedProjections"
          :key="p.id"
          :to="`/projections/${p.id}`"
          class="text-sm text-ink-200 underline decoration-ink-700 hover:decoration-ink-200"
        >
          {{ p.title }}
        </router-link>
      </div>
    </section>

    <section
      v-if="project.links?.length"
      class="container-narrow py-6 border-t border-ink-800"
    >
      <h2 class="text-sm uppercase tracking-wider text-ink-400">Links</h2>
      <ul class="mt-3 space-y-1">
        <li v-for="link in project.links" :key="link.href">
          <a
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm text-ink-100 underline decoration-ink-700 hover:decoration-ink-200"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>
    </section>
  </div>

  <div v-else class="container-narrow py-16">
    <h1 class="text-2xl font-semibold text-ink-50">Project not found</h1>
    <router-link to="/projects" class="mt-4 inline-block text-ink-300 hover:text-ink-50">
      ← Back to projects
    </router-link>
  </div>
</template>

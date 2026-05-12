<script setup lang="ts">
import { computed } from 'vue'
import { portfolio } from '@/lib/content'
import { assetUrl, sortedProjections } from '@/lib/portfolio'
import ProjectionCard from '@/components/ProjectionCard.vue'
import ProjectRow from '@/components/ProjectRow.vue'
import CustomerLogos from '@/components/CustomerLogos.vue'

const hero = portfolio.site.hero
const copy = portfolio.site.copy.home
const person = portfolio.person
const projections = computed(() => sortedProjections(portfolio))
const featuredProjects = computed(() => portfolio.projects.slice(0, 4))
</script>

<template>
  <section class="container-narrow pt-12 pb-10">
    <p class="text-sm uppercase tracking-wider text-ink-400">
      {{ person.headline }}
    </p>
    <h1 class="mt-3 text-4xl md:text-5xl font-semibold tracking-tight text-ink-50">
      {{ hero.title }}
    </h1>
    <blockquote
      class="mt-6 border-l-2 border-ink-600 pl-5 text-lg italic text-ink-200 leading-relaxed"
    >
      {{ hero.body }}
    </blockquote>
  </section>

  <section class="container-narrow py-10 border-t border-ink-800">
    <h2 class="text-sm uppercase tracking-wider text-ink-400">{{ copy.tour.heading }}</h2>
    <p class="mt-3 text-ink-200 leading-relaxed">{{ copy.tour.body }}</p>
  </section>

  <section class="container-narrow py-10 border-t border-ink-800">
    <div class="flex items-baseline justify-between">
      <h2 class="text-xl font-semibold text-ink-50">{{ copy.projectionsSection.heading }}</h2>
      <router-link to="/projections" class="text-sm text-ink-400 hover:text-ink-100">
        See all →
      </router-link>
    </div>
    <p v-if="copy.projectionsSection.subhead" class="mt-2 text-sm text-ink-400">
      {{ copy.projectionsSection.subhead }}
    </p>
    <div class="mt-5 grid gap-4 sm:grid-cols-2">
      <ProjectionCard
        v-for="projection in projections"
        :key="projection.id"
        :projection="projection"
      />
    </div>
  </section>

  <section class="container-narrow py-10 border-t border-ink-800">
    <div class="flex items-baseline justify-between">
      <h2 class="text-xl font-semibold text-ink-50">
        {{ copy.selectedProjectsSection.heading }}
      </h2>
      <router-link to="/projects" class="text-sm text-ink-400 hover:text-ink-100">
        All projects →
      </router-link>
    </div>
    <div class="mt-2">
      <ProjectRow
        v-for="project in featuredProjects"
        :key="project.id"
        :project="project"
      />
    </div>
  </section>

  <section id="consulting" class="container-narrow py-10 border-t border-ink-800">
    <h2 class="text-xl font-semibold text-ink-50">{{ copy.consultingSection.heading }}</h2>
    <div class="mt-5 grid gap-6 md:grid-cols-2">
      <div>
        <h3 class="text-sm uppercase tracking-wider text-ink-400">
          {{ copy.consultingSection.goodFitLabel }}
        </h3>
        <ul class="mt-3 space-y-2 text-ink-200">
          <li v-for="item in portfolio.consulting.goodFit" :key="item" class="text-sm">
            — {{ item }}
          </li>
        </ul>
      </div>
      <div>
        <h3 class="text-sm uppercase tracking-wider text-ink-400">
          {{ copy.consultingSection.poorFitLabel }}
        </h3>
        <ul class="mt-3 space-y-2 text-ink-300">
          <li v-for="item in portfolio.consulting.poorFit" :key="item" class="text-sm">
            — {{ item }}
          </li>
        </ul>
      </div>
    </div>
    <div
      v-if="portfolio.consulting.engagementNotes?.length"
      class="mt-6 rounded border border-ink-800 bg-ink-900/40 p-4 text-sm text-ink-300 space-y-2"
    >
      <p
        v-for="(note, i) in portfolio.consulting.engagementNotes"
        :key="i"
      >
        {{ note }}
      </p>
    </div>
  </section>

  <section id="contact" class="container-narrow py-10 border-t border-ink-800">
    <h2 class="text-xl font-semibold text-ink-50">{{ copy.contactSection.heading }}</h2>
    <div class="mt-5 flex flex-col sm:flex-row sm:items-center gap-6">
      <img
        v-if="portfolio.contact.photo"
        :src="assetUrl(portfolio.contact.photo.src)"
        :alt="portfolio.contact.photo.alt"
        class="h-32 w-32 rounded-full object-cover border border-ink-800 shrink-0"
        loading="lazy"
      />
      <div>
        <p class="text-ink-200">{{ portfolio.contact.preferred }}</p>
        <div class="mt-3 flex flex-wrap gap-4 text-sm">
          <a
            v-if="portfolio.contact.email"
            :href="`mailto:${portfolio.contact.email}`"
            class="text-ink-100 underline decoration-ink-700 hover:decoration-ink-200"
          >
            {{ portfolio.contact.email }}
          </a>
          <a
            v-if="portfolio.contact.github"
            :href="portfolio.contact.github"
            target="_blank"
            rel="noopener noreferrer"
            class="text-ink-100 underline decoration-ink-700 hover:decoration-ink-200"
          >
            {{ portfolio.contact.github }}
          </a>
        </div>
      </div>
    </div>
  </section>

  <section
    v-if="portfolio.customers?.length"
    class="container-narrow py-10 border-t border-ink-800"
  >
    <h2
      v-if="copy.customersSection"
      class="text-sm uppercase tracking-wider text-ink-400"
    >
      {{ copy.customersSection.heading }}
    </h2>
    <div class="mt-5">
      <CustomerLogos :customers="portfolio.customers" />
    </div>
  </section>
</template>

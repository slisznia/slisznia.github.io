<script setup lang="ts">
import { portfolio } from '@/lib/content'
import { sortedProjections } from '@/lib/portfolio'

const person = portfolio.person
const projections = sortedProjections(portfolio)
</script>

<template>
  <section class="container-narrow py-10">
    <header>
      <h1 class="text-3xl font-semibold tracking-tight text-ink-50">{{ person.name }}</h1>
      <p class="mt-1 text-ink-300">{{ person.headline }}</p>
      <p v-if="person.location" class="text-sm text-ink-400">{{ person.location }}</p>
    </header>

    <section v-if="person.positioning" class="mt-8">
      <h2 class="text-sm uppercase tracking-wider text-ink-400">Positioning</h2>
      <p class="mt-2 text-ink-200">{{ person.positioning }}</p>
    </section>

    <section v-if="person.preferredEngagementStyle?.length" class="mt-8">
      <h2 class="text-sm uppercase tracking-wider text-ink-400">Engagement styles</h2>
      <ul class="mt-2 grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm text-ink-200">
        <li v-for="item in person.preferredEngagementStyle" :key="item">— {{ item }}</li>
      </ul>
    </section>

    <section class="mt-8">
      <h2 class="text-sm uppercase tracking-wider text-ink-400">Practice areas</h2>
      <ul class="mt-2 space-y-2">
        <li v-for="p in projections" :key="p.id" class="text-sm text-ink-200">
          <span class="text-ink-50 font-medium">{{ p.title }}</span> — {{ p.headline }}
        </li>
      </ul>
    </section>

    <section class="mt-8">
      <h2 class="text-sm uppercase tracking-wider text-ink-400">Selected projects</h2>
      <ul class="mt-2 space-y-3">
        <li v-for="project in portfolio.projects" :key="project.id" class="text-sm">
          <div class="text-ink-50 font-medium">
            {{ project.title }}
            <span v-if="project.status" class="text-ink-400 font-normal">
              — {{ project.status }}
            </span>
          </div>
          <p class="text-ink-300">{{ project.summary }}</p>
        </li>
      </ul>
    </section>

    <section class="mt-8">
      <h2 class="text-sm uppercase tracking-wider text-ink-400">Contact</h2>
      <p class="mt-2 text-sm text-ink-200">
        <span v-if="portfolio.contact.email">{{ portfolio.contact.email }}</span>
        <span v-if="portfolio.contact.github"> · {{ portfolio.contact.github }}</span>
      </p>
    </section>
  </section>
</template>

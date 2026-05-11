<script setup lang="ts">
import { portfolio } from '@/lib/content'
</script>

<template>
  <footer class="border-t border-ink-800 mt-16">
    <div class="container-narrow py-8 text-sm text-ink-400 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
      <div>{{ portfolio.person.name }} — {{ portfolio.person.location }}</div>
      <div class="flex gap-4">
        <a
          v-if="portfolio.contact.email"
          :href="`mailto:${portfolio.contact.email}`"
          class="hover:text-ink-100"
        >
          {{ portfolio.contact.email }}
        </a>
        <a
          v-if="portfolio.contact.github"
          :href="portfolio.contact.github"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-ink-100"
        >
          GitHub
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { portfolio } from '@/lib/content'

const open = ref(false)

const links = [
  { to: '/', label: 'Home' },
  { to: '/projections', label: 'Projections' },
  { to: '/projects', label: 'Projects' },
  { to: '/#contact', label: 'Contact' },
]
</script>

<template>
  <header class="border-b border-ink-800 bg-ink-950/90 backdrop-blur sticky top-0 z-20">
    <div class="container-narrow flex items-center justify-between py-4">
      <router-link
        to="/"
        class="font-semibold tracking-tight text-ink-50 hover:text-white"
      >
        {{ portfolio.person.name }}
      </router-link>

      <nav class="hidden md:flex gap-6 text-sm">
        <router-link
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="text-ink-300 hover:text-ink-50 transition-colors"
          active-class="text-ink-50"
        >
          {{ link.label }}
        </router-link>
      </nav>

      <button
        class="md:hidden text-ink-200 p-2 -mr-2"
        :aria-expanded="open"
        aria-label="Toggle menu"
        @click="open = !open"
      >
        <span class="block w-6 h-px bg-current mb-1.5" />
        <span class="block w-6 h-px bg-current mb-1.5" />
        <span class="block w-6 h-px bg-current" />
      </button>
    </div>

    <div v-if="open" class="md:hidden border-t border-ink-800">
      <nav class="container-narrow flex flex-col py-2">
        <router-link
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="py-2 text-ink-300 hover:text-ink-50"
          active-class="text-ink-50"
          @click="open = false"
        >
          {{ link.label }}
        </router-link>
      </nav>
    </div>
  </header>
</template>

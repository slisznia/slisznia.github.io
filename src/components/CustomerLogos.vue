<script setup lang="ts">
import type { Customer } from '@/types/portfolio'
import { assetUrl } from '@/lib/portfolio'

defineProps<{
  customers: Customer[]
}>()
</script>

<template>
  <ul class="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14">
    <li v-for="c in customers" :key="c.name">
      <component
        :is="c.url ? 'a' : 'div'"
        :href="c.url"
        :target="c.url ? '_blank' : undefined"
        :rel="c.url ? 'noopener noreferrer' : undefined"
        :title="c.name"
        :aria-label="c.name"
        class="inline-flex items-center opacity-80 hover:opacity-100 transition-opacity"
      >
        <img
          :src="assetUrl(c.logo)"
          :alt="c.name"
          class="h-10 w-auto max-w-[200px] object-contain"
          loading="lazy"
        />
      </component>
    </li>
  </ul>
</template>

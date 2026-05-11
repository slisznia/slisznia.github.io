<script setup lang="ts">
import type { ProjectEvidence } from '@/types/portfolio'
import { portfolio } from '@/lib/content'
import { capabilityLabel } from '@/lib/portfolio'

defineProps<{
  evidence: ProjectEvidence[]
}>()
</script>

<template>
  <ul class="space-y-3">
    <li
      v-for="(item, index) in evidence"
      :key="index"
      class="rounded border border-ink-800 bg-ink-900/40 p-4"
    >
      <div class="text-xs uppercase tracking-wide text-ink-400">
        {{ capabilityLabel(portfolio, item.capability) }}
      </div>
      <p class="mt-1 text-sm text-ink-200">{{ item.detail }}</p>
    </li>
  </ul>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  tone?: 'domain' | 'capability' | 'plain'
}>()
</script>

<template>
  <span
    class="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium"
    :class="{
      'border-ink-700 bg-ink-900 text-ink-200': tone === 'domain' || !tone,
      'border-ink-600 bg-ink-800 text-ink-100': tone === 'capability',
      'border-ink-800 bg-transparent text-ink-300': tone === 'plain',
    }"
  >
    {{ label }}
  </span>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import type { MediaItem } from '@/types/portfolio'
import { assetUrl } from '@/lib/portfolio'

const props = defineProps<{
  items: MediaItem[]
}>()

const activeIndex = ref<number | null>(null)
const isOpen = computed(() => activeIndex.value !== null)
const activeItem = computed(() =>
  activeIndex.value === null ? null : props.items[activeIndex.value],
)

function open(index: number) {
  activeIndex.value = index
}

function close() {
  activeIndex.value = null
}

function next() {
  if (activeIndex.value === null) return
  activeIndex.value = (activeIndex.value + 1) % props.items.length
}

function prev() {
  if (activeIndex.value === null) return
  activeIndex.value =
    (activeIndex.value - 1 + props.items.length) % props.items.length
}

function onKey(event: KeyboardEvent) {
  if (!isOpen.value) return
  if (event.key === 'Escape') close()
  else if (event.key === 'ArrowRight') next()
  else if (event.key === 'ArrowLeft') prev()
}

watch(isOpen, (open) => {
  if (open) {
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
  } else {
    document.removeEventListener('keydown', onKey)
    document.body.style.overflow = ''
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
</script>

<template>
  <div>
    <ul
      class="grid gap-4 sm:grid-cols-2 md:grid-cols-3"
    >
      <li
        v-for="(item, index) in items"
        :key="item.src"
      >
        <button
          type="button"
          class="group block w-full text-left rounded overflow-hidden border border-ink-800 hover:border-ink-500 transition-colors"
          @click="open(index)"
        >
          <div class="aspect-[4/3] bg-ink-900 overflow-hidden">
            <img
              :src="assetUrl(item.src)"
              :alt="item.alt ?? item.title ?? ''"
              class="h-full w-full object-cover group-hover:opacity-90 transition-opacity"
              loading="lazy"
            />
          </div>
          <div v-if="item.title" class="px-3 py-2 text-sm text-ink-200">
            {{ item.title }}
          </div>
        </button>
      </li>
    </ul>

    <Teleport to="body">
      <div
        v-if="isOpen && activeItem && activeIndex !== null"
        class="fixed inset-0 z-50 bg-ink-950/95 backdrop-blur flex flex-col"
        role="dialog"
        aria-modal="true"
        @click.self="close"
      >
        <div class="flex justify-between items-center px-4 sm:px-6 py-3 text-ink-300 text-sm">
          <span>{{ activeIndex + 1 }} / {{ items.length }}</span>
          <button
            type="button"
            class="p-2 -mr-2 hover:text-ink-50"
            aria-label="Close"
            @click="close"
          >
            ✕
          </button>
        </div>

        <div class="flex-1 flex items-center justify-center px-4 sm:px-12 min-h-0">
          <button
            v-if="items.length > 1"
            type="button"
            class="absolute left-2 sm:left-4 p-3 text-ink-200 hover:text-ink-50 text-3xl select-none"
            aria-label="Previous"
            @click="prev"
          >
            ‹
          </button>

          <img
            :src="assetUrl(activeItem.src)"
            :alt="activeItem.alt ?? activeItem.title ?? ''"
            class="max-h-full max-w-full object-contain"
            @click.stop
          />

          <button
            v-if="items.length > 1"
            type="button"
            class="absolute right-2 sm:right-4 p-3 text-ink-200 hover:text-ink-50 text-3xl select-none"
            aria-label="Next"
            @click="next"
          >
            ›
          </button>
        </div>

        <div
          v-if="activeItem.title || activeItem.caption"
          class="px-4 sm:px-12 py-5 max-w-3xl mx-auto w-full"
          @click.stop
        >
          <div v-if="activeItem.title" class="text-ink-50 font-medium">
            {{ activeItem.title }}
          </div>
          <p v-if="activeItem.caption" class="mt-1 text-sm text-ink-300 leading-relaxed">
            {{ activeItem.caption }}
          </p>
        </div>
      </div>
    </Teleport>
  </div>
</template>

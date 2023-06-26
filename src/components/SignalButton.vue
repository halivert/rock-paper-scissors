<script setup lang="ts">
import type { BaseIcons } from "@/base-icons"

type Props = (
  | {
      signal: keyof BaseIcons
      icon: {
        icon: string
        color: string
      }
    }
  | {
      signal: "empty"
    }
) & {
  waves?: boolean
}

const props = defineProps<Props>()

const $emit = defineEmits<{
  select: [signal: keyof BaseIcons]
}>()
</script>

<template>
  <div v-if="props.signal === 'empty'" class="empty">
    <div class="circle"></div>
  </div>
  <button
    v-else
    :class="['button', { waves: props.waves }, props.signal]"
    @click="$emit('select', signal)"
    :style="{
      '--icon-bg-color': props.icon.color,
    }"
  >
    <div class="circle">
      <img :src="props.icon.icon" />
    </div>
  </button>
</template>

<style scoped>
.button {
  --radius: 100%;

	width: var(--size, 100%);
  display: inline-block;
  position: relative;
  padding: calc(var(--size) * 0.11);
  border: none;
  appearance: none;
  background: transparent;
	overflow: hidden;
  aspect-ratio: 1;
	user-select: none;
}

.circle {
  --circle-size: calc(100% - 0.25rem);

  padding: calc(var(--circle-size) * 0.2);
  align-items: center;
  background-color: white;
  border-radius: var(--radius);
  display: inline-flex;
  justify-content: center;
  margin: 0;
  width: var(--circle-size);
  height: var(--circle-size);
  position: relative;
  z-index: 1;
  box-shadow: inset 0 4px 2px 1px rgba(0, 0, 0, 0.2);
	pointer-events: none;
}

.button:hover .circle {
  box-shadow: inset 0 5px 2px 1px rgba(0, 0, 0, 0.2);
}

.button:active .circle {
  box-shadow: inset 0 6px 2px 1px rgba(0, 0, 0, 0.2);
}

.button::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 100%;
  background: var(--icon-bg-color);
  box-shadow: inset 0 -4px 2px 1px rgba(0, 0, 0, 0.3);
}

.button:active::after {
  box-shadow: inset 0 0 2px 2px rgba(0, 0, 0, 0.3);
}

.circle img {
  height: 100%;
}

.empty .circle {
  background-color: rgba(0, 0, 0, 0.1);
  box-shadow: none;
}

.waves {
  --opacity: 0.03;

  border-radius: var(--radius);
  box-shadow: 0 0 3px 20px rgba(255, 255, 255, var(--opacity)),
    0 0 3px 50px rgba(255, 255, 255, var(--opacity)),
    0 0 3px 85px rgba(255, 255, 255, var(--opacity));

  z-index: -1;
}

.button.rock .circle {
  padding: calc(var(--circle-size) * 0.3);
}
</style>

<script setup lang="ts">
import { ref, computed, onUnmounted } from "vue"
import bonusLogo from "@/assets/logo-bonus.svg"
import logo from "@/assets/logo.svg"

export interface Props {
  score: number
  bonus?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  bonus: false,
})

const $emit = defineEmits<{
  bonusUpdate: [bonus: boolean]
}>()

const title = computed(() => {
  if (props.bonus) {
    return "Rock, Paper, Scissors, Lizard, Spock"
  }

  return "Rock, Paper, Scissors"
})

const timeout = ref(0)
const clicks = ref(0)

const expireTime = 1000

function clearClicks(): void {
  clicks.value = 0
}

function clearClickTimeout(): void {
  if (timeout.value) clearTimeout(timeout.value)
  timeout.value = 0
}

function handleTitleClick(): void {
  clicks.value++

  if (clicks.value >= 3) {
    clicks.value = 0
    $emit("bonusUpdate", props.bonus)
    clearClickTimeout()
  }

  if (clicks.value === 1) {
    timeout.value = setTimeout(clearClicks, expireTime)
  } else if (timeout.value) {
    clearClickTimeout()
    timeout.value = setTimeout(clearClicks, expireTime)
  }
}

onUnmounted(clearClickTimeout)
</script>

<template>
  <section :class="['score-header', { bonus }]">
    <h1 class="title">
      <img
        :src="bonus ? bonusLogo : logo"
        :alt="title"
        @click="handleTitleClick"
      />
    </h1>

    <div class="score">
      <h2 class="label">Score</h2>
      <span class="value">{{ props.score }}</span>
    </div>
  </section>
</template>

<style scoped>
.score-header {
  --padding-block: 0.5em;

  border: 2px solid var(--header-outline);
  border-radius: 0.25em;
  padding: 0.75em;
  padding-inline-start: 1.25em;
  padding-block: var(--padding-block);

  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5em;
  overflow: hidden;
}

.score-header.bonus {
  --padding-block: 0.75em;
}

.score-header.bonus .title {
  max-height: 4em;
}

.title {
  max-height: 3em;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
}

.title img {
  width: 100%;
}

.score {
  display: flex;
  flex-flow: column nowrap;
  color: var(--score-text);
  background-color: white;
  text-align: center;
  padding: 0.6em 1.3em;
  border-radius: 0.25em;
  line-height: 0.9;
  gap: 0.2em;
}

.score .label {
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.value {
  color: var(--dark-text);
  font-size: 2.5em;
  font-weight: 700;
}

@media (min-width: 800px) {
  .score-header {
    max-width: 55%;
    padding-inline: 1.75em;
    margin-inline: auto;
  }
}
</style>

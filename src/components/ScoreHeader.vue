<script setup lang="ts">
import bonusLogo from "@/assets/logo-bonus.svg"
import logo from "@/assets/logo.svg"

export interface Props {
  score: number
  bonus?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  bonus: false,
})
</script>

<template>
  <section :class="['score-header', { bonus }]">
    <h1 class="title">
      <img :src="bonus ? bonusLogo : logo" alt="logo" />
    </h1>

    <div class="score">
      <h2 class="label">Score</h2>
      <span class="value">{{ props.score }}</span>
    </div>
  </section>
</template>

<style scoped>
.score-header {
  border: 2px solid var(--header-outline);
  border-radius: 0.25rem;
  padding: 0.75rem;
  padding-left: 1.25rem;

  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5em;
  overflow: hidden;
}

.score-header.bonus .title {
  height: 4em;
}

.title {
  height: 3em;
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

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
    <img class="title" :src="bonus ? bonusLogo : logo" />

    <div class="score">
      <span class="label">Score</span>
      <span class="value">{{ props.score }}</span>
    </div>
  </section>
</template>

<style scoped>
.score-header {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  overflow: hidden;
}

.score-header.bonus .title {
	height: 4rem;
}

.title {
  height: 3rem;
}

.score {
  display: flex;
  flex-flow: column nowrap;
  color: var(--score-text);
  background-color: white;
  text-align: center;
  padding: 0.6rem 1.3rem;
  border-radius: 0.25rem;
  line-height: 0.9;
  gap: 0.2rem;
}

.score .label {
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
}

.value {
  color: var(--dark-text);
  font-size: 2.5rem;
  font-weight: 700;
}
</style>

<script setup lang="ts">
const props = defineProps<{
  score: number
}>()
</script>

<template>
  <section class="score-header">
    <h1 class="title">Rock Paper Scissors</h1>

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

.title {
  text-transform: uppercase;
  flex: 0 1 10%;
  line-height: 0.8;
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
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

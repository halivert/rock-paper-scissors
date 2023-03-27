<script setup lang="ts">
import { ref } from "vue"
import ScoreHeader from "./components/ScoreHeader.vue"

const score = ref(12)
</script>

<template>
  <header class="header">
    <ScoreHeader :score="score" />
  </header>

  <main>Hola</main>
</template>

<style scoped>
.header {
  border: 2px solid var(--header-outline);
  border-radius: 0.25rem;
  margin: auto;
  padding: 0.75rem;
  padding-left: 1.25rem;
}
</style>

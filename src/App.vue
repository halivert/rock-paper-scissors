<script setup lang="ts">
import { ref } from "vue"
import { bonus, icons, type BaseIcons, type Signal } from "@/base-icons"
import { loses } from "@/brackets"
import ScoreHeader from "@/components/ScoreHeader.vue"
import SignalButton from "@/components/SignalButton.vue"
import SelectionStep from "@/components/SelectionStep.vue"

const score = ref(0)
const winner = ref<Winner>()
const player = ref<Signal>("empty")

function play(housePick: keyof BaseIcons): number {
  if (housePick === player.value) {
    winner.value = "draw"
    return 0
  }

  if (loses[player.value].includes(housePick)) {
    winner.value = "house"
    return -1
  }

  winner.value = "player"
  score.value++
  return 1
}

function restart(): void {
  winner.value = undefined
  player.value = "empty"
}
</script>

<template>
  <header class="header">
    <ScoreHeader :score="score" :bonus="bonus" />
  </header>

  <main>
    <template v-if="player === 'empty'">
      <SignalButton
        v-for="(icon, name) in icons"
        :key="name"
        :signal="name"
        :icon="icon"
        @select="player = $event"
      >
      </SignalButton>
    </template>
    <template v-else>
      <SelectionStep
        :player="player"
        :winner="winner"
        @house-picks="play"
        @play-again="restart"
      ></SelectionStep>
    </template>
  </main>
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

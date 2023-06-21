<script setup lang="ts">
import { ref, computed } from "vue"
import { baseIcons, type BaseIcons, type Signal } from "@/base-icons"
import { loses } from "@/brackets"
import ScoreHeader from "@/components/ScoreHeader.vue"
import SignalButton from "@/components/SignalButton.vue"
import SelectionStep from "@/components/SelectionStep.vue"

const bonus = ref(import.meta.env.VITE_BONUS === "true")
const score = ref(0)

const icons = computed(
  () =>
    Object.fromEntries(
      Object.entries(baseIcons).filter(([iconName]) => {
        if (bonus.value) return true

        return !["lizard", "spock"].includes(iconName)
      })
    ) as Record<keyof BaseIcons, Icon>
)

const player = ref<Signal>("scissors")
const computer = ref<Signal>("empty")

// const play = (player: string) => {
//   const options = Object.keys(icons.value)
//   const computer = options[Math.floor(Math.random() * options.length)]
//
//   console.info({ computer, player })
//
//   if (computer === player) return 0
//   if (loses[player].includes(computer)) return -1
//   score.value++
//   return 1
// }
</script>

<template>
  <header class="header">
    <ScoreHeader :score="score" :bonus="bonus" />
  </header>

  <main>
    <template v-if="player === 'empty' && computer === 'empty'">
      <SignalButton
        v-for="(icon, name) in icons"
        :key="name"
        :signal="name"
        :icon="icon"
        @select="player = $event"
      ></SignalButton>
    </template>
    <template v-else-if="player !== 'empty'">
      <SelectionStep :player="player"></SelectionStep>
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

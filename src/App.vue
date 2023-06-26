<script setup lang="ts">
import { ref } from "vue"
import { bonus, icons, type BaseIcons, type Signal } from "@/base-icons"
import { loses } from "@/brackets"
import ScoreHeader from "@/components/ScoreHeader.vue"
import SignalButton from "@/components/SignalButton.vue"
import SelectionStep from "@/components/SelectionStep.vue"
import AppFooter from "@/components/AppFooter.vue"
import RulesDialog from "./components/RulesDialog.vue"

const score = ref(0)
const winner = ref<Winner>()
const player = ref<Signal>("empty")

const showRules = ref(true)

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
      <div class="pentagon">
        <SignalButton
          v-for="(icon, name) in icons"
          :key="name"
          :signal="name"
          :icon="icon"
          @select="player = $event"
          :style="{ '--size': '28%' }"
        >
        </SignalButton>
      </div>
    </template>
    <template v-else>
      <SelectionStep
        :player="player"
        :winner="winner"
        @house-picks="play"
        @play-again="restart"
      ></SelectionStep>
    </template>

    <Teleport to="body">
      <RulesDialog
        :bonus="bonus"
        :open="showRules"
        @close="showRules = false"
      ></RulesDialog>
    </Teleport>
  </main>

  <AppFooter @show-rules="showRules = true"></AppFooter>
</template>

<style scoped>
.header {
  border: 2px solid var(--header-outline);
  border-radius: 0.25rem;
  padding: 0.75rem;
  padding-left: 1.25rem;
}

main {
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  padding-block: 0 4.2em;
}

.pentagon {
  margin-inline: auto;
  aspect-ratio: 1;
  overflow: hidden;
  clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
  position: relative;
  max-width: 20em;
  width: 100%;
}

.pentagon button {
  position: absolute;
}

.pentagon button:nth-child(1) {
  top: 6%;
  left: 36%;
}

.pentagon button:nth-child(2) {
  top: 31%;
  left: 69%;
}

.pentagon button:nth-child(3) {
  top: 69%;
  left: 56%;
}

.pentagon button:nth-child(4) {
  top: 69%;
  left: 17%;
}

.pentagon button:nth-child(5) {
  top: 32%;
  left: 4%;
}
</style>

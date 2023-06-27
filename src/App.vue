<script setup lang="ts">
import { ref } from "vue"
import {
  bonus,
  icons,
  type BaseIcons,
  type Signal,
  connectors,
} from "@/base-icons"
import { loses } from "@/brackets"
import ScoreHeader from "@/components/ScoreHeader.vue"
import SignalButton from "@/components/SignalButton.vue"
import SelectionStep from "@/components/SelectionStep.vue"
import AppFooter from "@/components/AppFooter.vue"
import RulesDialog from "./components/RulesDialog.vue"

const score = ref(0)
const winner = ref<Winner>()
const player = ref<Signal>("empty")

const showRules = ref(false)

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

function bonusUpdate(newBonus: boolean): void {
  bonus.value = !newBonus
}
</script>

<template>
  <header class="header">
    <ScoreHeader :score="score" :bonus="bonus" @bonus-update="bonusUpdate" />
  </header>

  <main>
    <template v-if="player === 'empty'">
      <div :class="[bonus ? 'pentagon' : 'triangle']">
        <SignalButton
          class="signal-button"
          v-for="(icon, name) in icons"
          :key="name"
          :signal="name"
          :icon="icon"
          @select="player = $event"
          :aria-label="`Button to pick ${name}`"
        >
        </SignalButton>
        <img class="connectors" :src="connectors" alt="" aria-hidden="true" />
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

  <AppFooter class="footer" @show-rules="showRules = true"></AppFooter>
</template>

<style scoped>
main {
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  padding-block: 0 4.2em;
}

.pentagon {
  display: grid;
  place-items: center;
  margin-inline: auto;
  aspect-ratio: 1;
  position: relative;
  max-width: 19em;
  width: 100%;
}

.pentagon .signal-button {
  --size: 28%;
}

.pentagon button {
  position: absolute;
}

.pentagon button:nth-child(1) {
  top: 4%;
  left: 36%;
}

.pentagon button:nth-child(2) {
  top: 31%;
  left: 71%;
}

.pentagon button:nth-child(3) {
  top: 71%;
  left: 57%;
}

.pentagon button:nth-child(4) {
  top: 71%;
  left: 15%;
}

.pentagon button:nth-child(5) {
  top: 31%;
  left: 1%;
}

.pentagon .connectors {
  width: 66%;
  z-index: -1;
}

.triangle {
  display: grid;
  place-items: center;
  margin-inline: auto;
  aspect-ratio: 1;
  position: relative;
  max-width: 19em;
  width: 100%;
}

.triangle .signal-button {
  --size: 32%;
}

.triangle button {
  position: absolute;
}

.triangle button:nth-child(1) {
  top: 10%;
  left: 65%;
}

.triangle button:nth-child(2) {
  top: 10%;
  left: 3%;
}

.triangle button:nth-child(3) {
  top: 60%;
  left: 34%;
}

.triangle .connectors {
  width: 66%;
  z-index: -1;
}

@media (min-width: 800px) {
  .header {
    flex-basis: 100%;
  }

  main {
    padding-block: 0;
    font-size: 0.75rem;
  }

  .footer {
    align-self: flex-end;
    font-size: 0.75rem;
  }

  .pentagon .signal-button {
    --size: 34%;
  }

  .triangle .signal-button {
    --size: 43%;
  }

  .triangle button:nth-child(1) {
    top: 3%;
    left: 65%;
  }

  .triangle button:nth-child(2) {
    top: 3%;
    left: -3%;
  }

  .triangle button:nth-child(3) {
    top: 55%;
    left: 29%;
  }
}
</style>

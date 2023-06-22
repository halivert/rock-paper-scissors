<script setup lang="ts">
import { ref } from "vue"
import { bonus, icons, type BaseIcons, type Signal } from "@/base-icons"
import { loses } from "@/brackets"
import ScoreHeader from "@/components/ScoreHeader.vue"
import SignalButton from "@/components/SignalButton.vue"
import SelectionStep from "@/components/SelectionStep.vue"
import ActionButton from "@/components/ActionButton.vue"
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

    <Teleport to="body">
      <RulesDialog
        :bonus="bonus"
        :open="showRules"
        @close="showRules = false"
      ></RulesDialog>
    </Teleport>
  </main>

  <footer>
    <ActionButton class="rules-button" @click="showRules = true"
      >Rules</ActionButton
    >

    <div class="attribution">
      Challenge by
      <a
        rel="noopener noreferrer"
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        >Frontend Mentor</a
      >. Coded by <a href="https://halivert.dev">Halí</a>.
    </div>
  </footer>
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
}

footer {
  text-align: center;
  padding-block: 0 1.25rem;
}

.rules-button {
  --background-color: transparent;
  --color: var(--white);

  padding-inline: 2em;
  padding-block: 0.5em;
}

.attribution {
  position: fixed;
  font-size: 0.75rem;
  bottom: 0.25em;
  left: 0;
  right: 0;
  color: var(--white);
  font-weight: 600;
}

.attribution a {
  text-decoration: none;
  color: transparent;
  background: var(--cyan-gradient);
  background-clip: text;
}

.attribution a:visited {
  background: var(--lizard-gradient);
}
</style>

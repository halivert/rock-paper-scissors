<script setup lang="ts">
import { ref } from "vue"
import { bonus, icons, type BaseIcons, type Signal } from "@/base-icons"
import { loses } from "@/brackets"
import ScoreHeader from "@/components/ScoreHeader.vue"
import SignalButton from "@/components/SignalButton.vue"
import SelectionStep from "@/components/SelectionStep.vue"
import ActionButton from "@/components/ActionButton.vue"

import Rules from "@/assets/image-rules.svg"
import RulesBonus from "@/assets/image-rules-bonus.svg"
import CloseButton from "@/assets/icon-close.svg"

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
      <dialog :open="showRules" class="dialog">
        <h2 class="title">Rules</h2>
        <picture class="picture">
          <img
            :src="bonus ? RulesBonus : Rules"
            :alt="
              bonus
                ? 'Rules of the rock, paper, scissors, lizard, spock game'
                : 'Rules of the rock, paper, scissors game'
            "
          />
        </picture>

        <button class="close-button" @click="showRules = false">
          <img :src="CloseButton" alt="close icon" />
        </button>
      </dialog>
    </Teleport>
  </main>

  <footer>
    <ActionButton class="rules-button" @click="showRules = true"
      >Rules</ActionButton
    >
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

.dialog {
  border: none;
  height: 100%;
  width: 100%;
  background-color: var(--white);
  display: none;
  flex-flow: column nowrap;
  inset: 0;
  justify-content: space-around;
  padding: 1.5rem;
  position: absolute;
  z-index: 2;
}

.dialog[open] {
  display: flex;
}

.dialog .title {
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
}

.picture,
.picture img {
	text-align: center;
  max-width: 100%;
}

.close-button {
  border: none;
  background-color: transparent;
  display: inline-block;
  align-self: center;
  padding: 1rem;
}
</style>

<script setup lang="ts">
import { ref } from "vue"
import ScoreHeader from "@/components/ScoreHeader.vue"
import RockIcon from "@/assets/icon-rock.svg"
import PaperIcon from "@/assets/icon-paper.svg"
import ScissorsIcon from "@/assets/icon-scissors.svg"
import LizardIcon from "@/assets/icon-lizard.svg"
import SpockIcon from "@/assets/icon-spock.svg"
import SignalButton from "./components/SignalButton.vue"

const bonus = import.meta.env.VITE_BONUS === "true"

const score = ref(0)

const icons = {
	scissors: {
		icon: ScissorsIcon,
		color: "var(--scissors-gradient)",
	},
	paper: {
		icon: PaperIcon,
		color: "var(--paper-gradient)",
	},
	rock: {
		icon: RockIcon,
		color: "var(--rock-gradient)",
	},
	lizard: {
		icon: LizardIcon,
		color: "var(--lizard-gradient)",
	},
	spock: {
		icon: SpockIcon,
		color: "var(--cyan-gradient)",
	},
}
</script>

<template>
  <header class="header">
    <ScoreHeader :score="score" :bonus="bonus" />
  </header>

  <main>
    <SignalButton
      v-for="(icon, name) in icons"
      :key="name"
      :signal="name"
			:icon="icon"
    ></SignalButton>
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

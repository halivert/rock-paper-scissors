<script setup lang="ts">
import CloseButton from "@/assets/icon-close.svg"
import Rules from "@/assets/image-rules.svg"
import RulesBonus from "@/assets/image-rules-bonus.svg"

defineProps<{
  bonus: boolean
  open: boolean
}>()

const $emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <dialog :open="open" class="dialog">
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

    <button class="close-button" @click="$emit('close')">
      <img :src="CloseButton" alt="close icon" />
    </button>
  </dialog>
</template>

<style scoped>
.dialog {
  background-color: var(--white);
  border: none;
  display: none;
  flex-flow: column nowrap;
  height: 100%;
  inset: 0;
  justify-content: space-around;
  padding: 1.5rem;
  position: absolute;
  width: 100%;
  z-index: 2;
	background-color: transparent;
}

.dialog[open] {
  display: flex;
}

.dialog .title {
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
}

.picture,
.picture img {
  text-align: center;
  max-width: 100%;
}

.close-button {
  align-self: center;
  background-color: transparent;
  border: none;
  display: inline-block;
  padding: 1rem;
}
</style>

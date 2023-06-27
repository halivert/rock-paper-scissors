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
  <div :class="['dialog', { open }]">
    <div class="content">
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
    </div>
  </div>
</template>

<style scoped>
.dialog {
  display: none;

  position: absolute;
  inset: 0;
  border: none;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0;
}

.content {
  display: flex;
  padding: 1.5rem;
  flex-flow: column nowrap;
  background-color: var(--white);
  flex-grow: 1;
  justify-content: space-around;
  border-radius: 32px;
}

.dialog.open {
  display: flex;
}

.content .title {
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

@media (min-width: 800px) {
  .content {
    flex-basis: 30%;
    flex-grow: 0;
    flex-flow: row wrap;
    border-radius: 16px;
    justify-content: space-between;
    align-items: center;
    align-self: center;
    padding-block-start: 0.75em;
  }

  .content .picture {
    order: 1;
    flex: 1 0 100%;
  }

  .close-button {
    padding: 0.25em;
  }
}
</style>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from "vue"
import { icons, type BaseIcons, type Signal } from "@/base-icons"
import SignalButton from "@/components/SignalButton.vue"
import ActionButton from "@/components/ActionButton.vue"

const props = defineProps<{
  player: keyof BaseIcons
  winner: Winner
}>()

const $emit = defineEmits<{
  housePicks: [signal: keyof BaseIcons]
}>()

const keys = Object.keys(icons.value) as [keyof BaseIcons]
const step = 80
const times = Array.from({ length: keys.length }, (_, x) => x * step)

const housePick = ref<Signal>("empty")

const index = ref(0)

const status = computed(() => {
  if (props.winner === "player") {
    return "You win"
  }

  return props.winner === "house" ? "You lose" : "Draw"
})

const start = () => {
  const interval = setInterval(() => {
    housePick.value = keys[index.value]
    index.value = (index.value + keys.length + 1) % keys.length
  }, step)

  setTimeout(() => {
    if (housePick.value === "empty") throw new Error("House can't pick empty")
    clearInterval(interval)
    $emit("housePicks", housePick.value)
  }, step * 10 + times[Math.floor(Math.random() * times.length)])
}

onMounted(start)
</script>

<template>
  <section class="component">
    <div class="item player">
      <div class="block">
        <SignalButton
          class="signal-button"
          :signal="props.player"
          :icon="icons[props.player]"
          :waves="props.winner === 'player'"
          :aria-label="`You picked ${props.player}`"
        >
        </SignalButton>
      </div>

      <label> You picked </label>
    </div>

    <div :class="['item result', { finished: !!props.winner }]">
      <span> {{ status }} </span>

      <ActionButton @click="$emit('play-again')"> Play again </ActionButton>
    </div>

    <div class="item house">
      <div class="block">
        <SignalButton
          class="signal-button"
          :signal="housePick"
          :icon="housePick !== 'empty' ? icons[housePick] : null"
          :waves="props.winner === 'house'"
          :aria-label="
            housePick !== 'empty'
              ? `House picked ${housePick}`
              : 'House is picking...'
          "
        >
        </SignalButton>
      </div>

      <label> The house picked </label>
    </div>
  </section>
</template>

<style scoped>
.component {
  --size: 75%;

  margin-block: 3rem 0;
  text-align: center;
  display: flex;
  justify-content: space-around;
  flex-flow: row wrap;
  row-gap: 4rem;
  column-gap: 1.75rem;
}

.block {
  display: block;
}

.item {
  flex: 1;
  display: flex;
  justify-content: space-between;
  flex-flow: column nowrap;
}

.component .empty {
  margin-top: 1em;
}

.component label {
  font-size: 0.875rem;
  color: var(--white);
  display: block;
  margin-block: 1em 0;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
}

.result {
  order: 1;
  flex: 1 0 100%;
  align-items: center;
}

.result:not(.finished) {
  opacity: 0;
}

.result span {
  color: var(--white);
  font-size: 3.5em;
  text-transform: uppercase;
  font-weight: 700;
}

.signal-button {
  width: 87%;
  pointer-events: none;
}

.result {
  --background-color: var(--white);
  --color: var(--dark-text);
}

@media (min-width: 800px) {
  .component {
    --size: 44%;

    margin-block-start: 0;
    height: 100%;
  }

  .signal-button {
    width: 51%;
  }

  .result:not(.finished) {
    display: none;
  }

  .result {
    flex: 0 1 auto;
    justify-content: center;
  }

  .item.house {
    order: 1;
  }

  .item:not(.result) {
    flex-flow: column-reverse;
    gap: 1em;
  }
}
</style>

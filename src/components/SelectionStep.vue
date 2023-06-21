<script setup lang="ts">
import { onMounted, ref, computed } from "vue"
import { baseIcons, type BaseIcons, type Signal } from "@/base-icons"
import SignalButton from "@/components/SignalButton.vue"

const props = defineProps<{
  player: keyof BaseIcons
}>()

const computer = ref<Signal>("empty")

const index = ref(0)

const keys = Object.keys(baseIcons) as [keyof BaseIcons]

const times = [0, 100, 200, 300, 400]

const start = () => {
  const interval = setInterval(() => {
    computer.value = keys[index.value]
    index.value = (index.value + keys.length + 1) % keys.length
  }, 100)

  setTimeout(() => {
    clearInterval(interval)
  }, 1000 + times[Math.floor(Math.random() * times.length)])
}

onMounted(start)
</script>

<template>
  <section class="component">
    <div class="container">
      <div>
        <SignalButton
          class="signal-button"
          :signal="props.player"
          :icon="baseIcons[props.player]"
        ></SignalButton>
      </div>
      <div>
        <SignalButton
          class="signal-button"
          :signal="computer"
          :icon="computer !== 'empty' ? baseIcons[computer] : null"
        ></SignalButton>
      </div>
    </div>

    <div class="container">
      <label> You picked </label>

      <label> The house picked </label>
    </div>
  </section>
</template>

<style scoped>
.component {
  margin: 7rem 0;
  text-align: center;
}

.container {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.container > * {
  flex: 1;
}

.container label {
  color: white;
  display: block;
  margin-top: 1em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
}
</style>

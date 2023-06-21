<script setup lang="ts">
export interface Props {
  signal: string
  icon: {
    icon: string
    color: string
  }
}

const props = defineProps<Props>()
</script>

<template>
  <button class="button">
    <div class="circle">
      <img :src="props.icon.icon" />
    </div>
  </button>
</template>

<style scoped>
.button {
  display: inline-block;
  position: relative;
  padding: 1.25em;
  border: none;
  appearance: none;
  background: transparent;
}

.circle {
  --size: 7em;
  --radius: 100%;

  padding: 1.75em;
  align-items: center;
  background-color: white;
  border-radius: var(--radius);
  display: inline-flex;
  justify-content: center;
  margin: 0;
  width: var(--size);
  height: var(--size);
  position: relative;
  z-index: 1;
  box-shadow: inset 0 4px 2px 1px rgba(0, 0, 0, 0.2);
}


.button:hover .circle {
  box-shadow: inset 0 5px 2px 1px rgba(0, 0, 0, 0.2);
}

.button:active .circle {
  box-shadow: inset 0 6px 2px 1px rgba(0, 0, 0, 0.2);
}

.button::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 100%;
  background: v-bind("props.icon.color");
  box-shadow: inset 0 -4px 2px 1px rgba(0, 0, 0, 0.3);
}

.button:active::after {
  box-shadow: inset 0 0 2px 2px rgba(0, 0, 0, 0.3);
}

.circle img {
  height: 100%;
}
</style>

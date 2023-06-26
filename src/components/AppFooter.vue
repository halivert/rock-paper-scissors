<script setup lang="ts">
import ActionButton from "@/components/ActionButton.vue"

const name = "Halí"
const link = "https://halivert.dev"

const frontendMentorLink = "https://www.frontendmentor.io?ref=challenge"

const $emit = defineEmits<{
  showRules: []
}>()
</script>

<template>
  <footer>
    <ActionButton class="rules-button" @click="$emit('showRules')"
      >Rules</ActionButton
    >

    <div class="attribution">
      Challenge by
      <a rel="noopener noreferrer" :href="frontendMentorLink" target="_blank"
        >Frontend Mentor</a
      >. Coded by <a :href="link">{{ name }}</a
      >.
    </div>
  </footer>
</template>

<style scoped>
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

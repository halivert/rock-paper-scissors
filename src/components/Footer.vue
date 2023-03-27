<script setup lang="ts">
const name = 'Halí Velázquez'
const link = 'https://halivert.dev'

const frontendMentorLink =
	'https://www.frontendmentor.io/challenges/rock-paper-scissors-game-pTgwgvgH'
</script>

<template>
	<footer class="attribution">
		Challenge by
		<a rel="noopener noreferrer" :href="frontendMentorLink" target="_blank">Frontend Mentor</a>.
		Coded by <a :href="link">{{ name }}</a
		>.
	</footer>
</template>

<script setup lang="ts">
</script>

<template>
	<button class="button">
		<slot></slot>
	</button>
</template>

<style scoped>
.button {
	background-color: var(--background-color);
	color: var(--color);
	border-color: var(--color);

	border-style: solid;
	border-width: 1px;
	font-size: 1rem;
	padding-inline: 3.25em;
	padding-block: 0.75em;
	text-transform: uppercase;
	border-radius: 8px;
	font-weight: 600;
	letter-spacing: 2px;
}
</style>

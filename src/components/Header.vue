<script setup>
	import { ref } from 'vue'

	const searchValue = ref('')
</script>

<template>
	<h2>Поиск товаров</h2>
	<input type="text" name="searchValue" v-model="searchValue">
</template>

<style scoped>

</style>
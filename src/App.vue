<script setup>
import { onMounted } from 'vue'
import Header from './components/Header.vue'

import { useProducts } from './composables/useProducts'

const { fetchProducts } = useProducts()

onMounted(() => {
  fetchProducts()
})

</script>

<template>
	<nav>
		<RouterLink to="/">Главная. Список товаров</RouterLink>
		<RouterLink to="/create">Создание товара</RouterLink>
		<RouterLink to="/order">Создание товара</RouterLink>
	</nav>
	<Header/>
	<main>
    <RouterView />
  </main>
</template>

<style>
ul {
	padding-left: 0;
}
</style>
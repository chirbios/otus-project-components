<script setup>
import { ref, onMounted } from 'vue'
import Header from './components/Header.vue'
import { useProducts } from './composables/useProducts'

const { products, loading, error, fetchProducts } = useProducts()
const filters = ref({
  name: '',
  minPrice: null,
  maxPrice: null
})

const handleFilter = (newFilters) => {
  filters.value = newFilters
}

onMounted(() => {
  fetchProducts()
})
</script>

<template>
  <nav>
    <RouterLink to="/">Главная. Список товаров</RouterLink>
    <RouterLink to="/create">Создание товара</RouterLink>
    <RouterLink to="/order">Создание заказа</RouterLink>
    <RouterLink to="/auth">Войти</RouterLink>
  </nav>
  
  <main>
    <Header @filter="handleFilter" />
    <RouterView 
      :filters="filters" 
      :products="products" 
      :loading="loading" 
      :error="error" 
    />
  </main>
</template>

<style>
ul {
  padding-left: 0;
}

nav {
  display: flex;
  justify-content: space-around;
  column-gap: 20px;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

nav a {
  text-decoration: none;
  color: #333;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

nav a:hover {
  background-color: #e0e0e0;
}

nav a.router-link-active {
  background-color: #007bff;
  color: white;
}
</style>
<script setup>
import { ref, onMounted } from 'vue'
import Header from './components/Header.vue'
import { useAuthStore } from './stores/authStore'
import { useProductStore } from './stores/productStore'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const productStore = useProductStore()
const { loading, error, fetchProducts } = productStore
const { products } = storeToRefs()

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
  authStore.checkAuth()
})
</script>

<template>
  <Header @filter="handleFilter" />
  
  <main>
    <RouterView 
      :filters="filters" 
      :products="products" 
      :loading="loading" 
      :error="error" 
    />
  </main>
</template>

<style></style>
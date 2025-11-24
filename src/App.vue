<script setup>
import { onMounted } from 'vue'
import Header from './components/Header.vue'
import Product from './components/Product.vue'
import OrderForm from './components/OrderForm.vue'
import CreateProduct from './components/CreateProduct.vue'
import { useProducts } from './composables/useProducts'


const { products, loading, error, fetchProducts } = useProducts()

onMounted(() => {
  fetchProducts()
})

</script>

<template>
	<Header/>
	<CreateProduct/>
	<OrderForm/>
	<h2>Список товаров</h2>
  <div v-if="loading">Загрузка товаров...</div>
  <div v-else-if="error" class="error">Ошибка: {{ error }}</div>
  <ul v-else>
    <Product 
      v-for="product in products"
      :key="product.id"
      :title="product.title"
      :id="product.id"
      :price="product.price"
      :description="product.description"
      :category="product.category"
      :image="product.image"
      :rating="product.rating"
    />
  </ul>
</template>

<style scoped>
ul {
	padding-left: 0;
}
</style>
<script setup>
import { computed, onMounted } from 'vue'
import Product from '../components/Product.vue'
import { useProductStore } from '../stores/productStore'
import { storeToRefs } from 'pinia'

const props = defineProps({
  filters: {
    type: Object,
    default: () => ({})
  }
})

const productStore = useProductStore()
const { loading, error, fetchProducts } = productStore
const { products } = storeToRefs()

const filteredProducts = computed(() => {
  if (!products.value.length) return []
  
  return products.value.filter(product => {
    if (props.filters.name && !product.title?.toLowerCase().includes(props.filters.name.toLowerCase())) {
      return false
    }
    
    if (props.filters.minPrice !== null && product.price < props.filters.minPrice) {
      return false
    }
    
    if (props.filters.maxPrice !== null && product.price > props.filters.maxPrice) {
      return false
    }
    
    return true
  })
})

onMounted(() => {
  fetchProducts()
})
</script>

<template>
  <div class="home-view">
    <h2>Список товаров</h2>
    
    <div v-if="!loading && !error" class="filter-stats">
      Найдено товаров: {{ filteredProducts.length }} из {{ products.length }}
    </div>
    
    <div v-if="loading" class="loading">Загрузка товаров...</div>
    <div v-else-if="error" class="error">Ошибка: {{ error }}</div>
    <div v-else-if="!filteredProducts.length" class="no-products">
      Товары не найдены. Попробуйте изменить параметры поиска.
    </div>
    <ul v-else class="products-list">
      <Product 
        v-for="product in filteredProducts"
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
  </div>
</template>

<style scoped>
.home-view {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.filter-stats {
  text-align: center;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 8px;
  font-weight: bold;
  color: #666;
}

.loading {
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
}

.error {
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #dc3545;
  background-color: #f8d7da;
  border-radius: 8px;
  margin: 20px 0;
}

.no-products {
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin: 20px 0;
}

.products-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>
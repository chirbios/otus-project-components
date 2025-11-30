<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '../services/api'

const route = useRoute()
const product = ref(null)
const loading = ref(false)
const error = ref(null)

const fetchProduct = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await api.get(`/products/${route.params.id}`)
    product.value = response.data
  } catch (err) {
    console.error('API Error:', err)
    error.value = 'Товар не найден'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProduct()
})
</script>

<template>
  <div class="product-view">
    <div v-if="loading" class="loading">Загрузка товара...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="product" class="product-details">
      <div class="product-header">
        <h1>{{ product.title }}</h1>
        <span class="price">{{ product.price }}$</span>
      </div>
      
      <div class="product-content">
        <div class="product-image" v-if="product.image">
          <img :src="product.image" :alt="product.title" />
        </div>
        
        <div class="product-info">
          <p class="description">{{ product.description }}</p>
          
          <div class="product-meta">
            <div class="category">
              <strong>Категория:</strong> {{ product.category }}
            </div>
            
            <div class="rating" v-if="product.rating">
              <strong>Рейтинг:</strong> {{ product.rating.rate }} ⭐ ({{ product.rating.count }} отзывов)
            </div>
          </div>
          
          <button class="buy-btn">Добавить в корзину</button>
        </div>
      </div>
      
      <router-link to="/" class="back-link">← Назад к каталогу</router-link>
    </div>
  </div>
</template>

<style scoped>
.product-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
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

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #e0d7d7;
}

.product-header h1 {
  margin: 0;
  color: #333;
  font-size: 2rem;
}

.price {
  font-size: 2rem;
  font-weight: bold;
  color: #007bff;
}

.product-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 40px;
  margin-bottom: 30px;
}

.product-image img {
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #666;
  margin: 0;
}

.product-meta {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.category, .rating {
  font-size: 1rem;
  color: #555;
}

.buy-btn {
  padding: 15px 30px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  align-self: flex-start;
}

.buy-btn:hover {
  background-color: #218838;
}

.back-link {
  display: inline-block;
  padding: 10px 20px;
  background-color: #6c757d;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  transition: background-color 0.3s;
}

.back-link:hover {
  background-color: #5a6268;
}

@media (max-width: 768px) {
  .product-content {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .product-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .product-header h1 {
    font-size: 1.5rem;
  }
  
  .price {
    font-size: 1.5rem;
  }
}
</style>
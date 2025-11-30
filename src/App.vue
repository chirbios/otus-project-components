<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Header from './components/Header.vue'
import { useProducts } from './composables/useProducts'
import { useCart } from './composables/useCart'
import { useAuth } from './composables/useAuth'

const { products, loading, error, fetchProducts } = useProducts()
const { cartCount } = useCart()
const { isAuthenticated, userLogin, logout } = useAuth()
const router = useRouter()

const filters = ref({
  name: '',
  minPrice: null,
  maxPrice: null
})

const handleFilter = (newFilters) => {
  filters.value = newFilters
}

const handleLogout = () => {
  logout()
  router.push('/')
}

onMounted(() => {
  fetchProducts()
})
</script>

<template>
  <nav>
    <RouterLink to="/">Главная. Список товаров</RouterLink>
    <RouterLink to="/create" v-if="isAuthenticated">Создание товара</RouterLink>
    <RouterLink to="/order">Создание заказа</RouterLink>
    <RouterLink to="/cart">Корзина ({{ cartCount }})</RouterLink>
    
    <div class="auth-section">
      <template v-if="isAuthenticated">
        <span class="user-info">Привет, {{ userLogin }}!</span>
        <button @click="handleLogout" class="logout-btn">Выйти</button>
      </template>
      <template v-else>
        <RouterLink to="/auth">Войти</RouterLink>
      </template>
    </div>
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
  align-items: center;
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

.auth-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-info {
  color: #28a745;
  font-weight: bold;
}

.logout-btn {
  padding: 5px 10px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: #c82333;
}
</style>
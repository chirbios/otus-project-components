<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/authStore'
import { useCartStore } from '../stores/cartStore'

const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()

const { cartCount } = storeToRefs(cartStore)

const searchValue = ref('')
const minPrice = ref('')
const maxPrice = ref('')

const emit = defineEmits(['filter'])

watch([searchValue, minPrice, maxPrice], () => {
  emit('filter', {
    name: searchValue.value,
    minPrice: minPrice.value ? Number(minPrice.value) : null,
    maxPrice: maxPrice.value ? Number(maxPrice.value) : null
  })
})

const handleLogout = () => {
  authStore.logout() 
  router.push('/')
}
</script>

<template>
  <header>
    <nav class="navigation">
      <RouterLink to="/">Главная. Список товаров</RouterLink>
      <RouterLink to="/create" v-if="authStore.isAuthenticated">Создание товара</RouterLink>
      <RouterLink to="/order" v-if="authStore.isAuthenticated">Создание заказа</RouterLink>
      <RouterLink to="/cart" v-if="authStore.isAuthenticated">Корзина ({{ cartCount }})</RouterLink>
      
      <div class="auth-section">
        <template v-if="authStore.isAuthenticated">
          <span class="user-info">Привет, {{ authStore.userLogin }}!</span>
          <button @click="handleLogout" class="logout-btn">Выйти</button>
        </template>
        <template v-else>
          <RouterLink to="/auth">Войти</RouterLink>
        </template>
      </div>
    </nav>

    <div class="filters-container" v-if="$route.path === '/'">
      <h2>Поиск товаров</h2>
      <div class="filters">
        <div class="filter-group">
          <label>Название товара:</label>
          <input type="text" v-model="searchValue" placeholder="Введите название...">
        </div>
        <div class="filter-group">
          <label>Минимальная цена:</label>
          <input type="number" v-model="minPrice" placeholder="0" min="0">
        </div>
        <div class="filter-group">
          <label>Максимальная цена:</label>
          <input type="number" v-model="maxPrice" placeholder="100000" min="0">
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.navigation {
  display: flex;
  justify-content: space-around;
  align-items: center;
  column-gap: 20px;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.navigation a {
  text-decoration: none;
  color: #333;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.navigation a:hover {
  background-color: #e0e0e0;
}

.navigation a.router-link-active {
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

.filters-container {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #eee;
}

.filters-container h2 {
  margin-top: 0;
  margin-bottom: 15px;
  text-align: center;
  color: #333;
}

.filters {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.filter-group label {
  font-weight: bold;
  font-size: 14px;
}

.filter-group input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 150px;
}
</style>
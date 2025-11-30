<script setup>
import { ref, watch } from 'vue'

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
</script>

<template>
  <div class="header">
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
</template>

<style scoped>
.header {
  margin-bottom: 20px;
}

.filters {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
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
<script setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cartStore'

const props = defineProps(['title', 'id', 'price', 'description', 'category', 'image', 'rating'])
const router = useRouter()
const { addToCart } = useCartStore()

const goToProduct = () => {
  router.push(`/product/${props.id}`)
}

const handleAddToCart = (event) => {
  event.stopPropagation()
  addToCart({
    id: props.id,
    title: props.title,
    price: props.price,
    description: props.description,
    image: props.image,
    category: props.category,
    rating: props.rating
  })
}
</script>

<template>
  <div class="element" @click="goToProduct">
    <h3>{{ props.title }}</h3>
    <span class="description">{{ props.description }}</span>
    <h3 class="price">{{ props.price }}$</h3>
    <ul v-if="props.image">
      <li><img :src="props.image" :alt="props.title" /></li>
    </ul>
    <button class="add-to-cart-btn" @click="handleAddToCart">
      Добавить в корзину
    </button>
  </div>
</template>

<style scoped>
ul {
  padding-left: 0;
  list-style: none;
  display: flex;
	justify-content: space-between;
  column-gap: 10px;
}

li > img {
  width: 160px;
  height: 160px;
  border-radius: 16px;
  object-fit: contain;
}

.element {
  margin-top: 20px;
  border: 1px solid #e0d7d7;
  background-color: #e0d7d7;
  border-radius: 16px;
  padding: 15px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
}

.element:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.description {
  display: block;
  margin: 10px 0;
  color: #666;
  font-size: 0.9rem;
}

.price {
  color: #007bff;
  margin: 10px 0;
}

.add-to-cart-btn {
  padding: 8px 16px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s;
  margin-top: 10px;
}

.add-to-cart-btn:hover {
  background-color: #218838;
  transform: scale(1.05);
}
</style>
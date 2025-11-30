<script setup>
import { useCart } from '../composables/useCart'

const { cartItems, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart()

const incrementQuantity = (item) => {
  updateQuantity(item.id, item.quantity + 1)
}

const decrementQuantity = (item) => {
  updateQuantity(item.id, item.quantity - 1)
}
</script>

<template>
  <div class="cart-view">
    <div class="cart-header">
      <h2>Корзина покупок</h2>
      <div class="cart-stats">
        <span>Товаров: {{ totalItems }}</span>
        <span>Общая сумма: {{ totalPrice }}$</span>
      </div>
      <button v-if="cartItems.length > 0" @click="clearCart" class="clear-cart-btn">
        Очистить корзину
      </button>
    </div>

    <div v-if="cartItems.length === 0" class="empty-cart">
      <p>Ваша корзина пуста</p>
      <router-link to="/" class="continue-shopping">Продолжить покупки</router-link>
    </div>

    <div v-else class="cart-items">
      <div v-for="item in cartItems" :key="item.id" class="cart-item">
        <div class="item-image">
          <img v-if="item.image" :src="item.image" :alt="item.title" />
        </div>
        
        <div class="item-details">
          <h3>{{ item.title }}</h3>
          <p class="item-price">{{ item.price }}$ за шт.</p>
          <p class="item-total">Всего: {{ (item.price * item.quantity).toFixed(2) }}$</p>
        </div>
        
        <div class="quantity-controls">
          <button @click="decrementQuantity(item)" class="quantity-btn">-</button>
          <span class="quantity">{{ item.quantity }}</span>
          <button @click="incrementQuantity(item)" class="quantity-btn">+</button>
        </div>
        
        <button @click="removeFromCart(item.id)" class="remove-btn">
          🗑️
        </button>
      </div>
    </div>

    <div v-if="cartItems.length > 0" class="cart-footer">
      <div class="total-section">
        <h3>Итого: {{ totalPrice }}$</h3>
        <button class="checkout-btn">Оформить заказ</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #e0d7d7;
}

.cart-stats {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-weight: bold;
}

.clear-cart-btn {
  padding: 10px 20px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.clear-cart-btn:hover {
  background-color: #c82333;
}

.empty-cart {
  text-align: center;
  padding: 60px 20px;
}

.empty-cart p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 20px;
}

.continue-shopping {
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  transition: background-color 0.3s;
}

.continue-shopping:hover {
  background-color: #0056b3;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e0d7d7;
}

.item-image img {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
}

.item-details {
  flex: 1;
}

.item-details h3 {
  margin: 0 0 5px 0;
  font-size: 1rem;
}

.item-price {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.item-total {
  margin: 5px 0 0 0;
  font-weight: bold;
  color: #007bff;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity-btn {
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity-btn:hover {
  background-color: #f8f9fa;
}

.quantity {
  font-weight: bold;
  min-width: 30px;
  text-align: center;
}

.remove-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 5px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.remove-btn:hover {
  background-color: #f8d7da;
}

.cart-footer {
  border-top: 2px solid #e0d7d7;
  padding-top: 20px;
}

.total-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-section h3 {
  margin: 0;
  color: #333;
}

.checkout-btn {
  padding: 15px 30px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.checkout-btn:hover {
  background-color: #218838;
}

@media (max-width: 768px) {
  .cart-header {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
  
  .cart-item {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }
  
  .total-section {
    flex-direction: column;
    gap: 15px;
  }
}
</style>
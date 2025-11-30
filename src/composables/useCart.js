import { ref, computed } from 'vue'

const cartItems = ref([])

export function useCart() {
  
  const addToCart = (product) => {
    const existingItem = cartItems.value.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cartItems.value.push({
        ...product,
        quantity: 1
      })
    }
    console.log('Товар добавлен в корзину:', product.title)
    console.log('Текущая корзина:', cartItems.value)
  }

  const removeFromCart = (productId) => {
    const index = cartItems.value.findIndex(item => item.id === productId)
    if (index !== -1) {
      cartItems.value.splice(index, 1)
    }
  }

  const updateQuantity = (productId, newQuantity) => {
    const item = cartItems.value.find(item => item.id === productId)
    if (item) {
      if (newQuantity <= 0) {
        removeFromCart(productId)
      } else {
        item.quantity = newQuantity
      }
    }
  }

  const clearCart = () => {
    cartItems.value = []
  }

  const totalItems = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)
  })

  const cartCount = computed(() => {
    return cartItems.value.length
  })

  return {
    cartItems: cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    cartCount
  }
}
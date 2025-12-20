import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useCartStore } from '../cartStore.js'

describe('cartStore', () => {
  let cartStore
  
  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)
    cartStore = useCartStore()
  })
  
  // 1. Инициализация
  it('initializes with empty cart', () => {
    expect(cartStore.cartItems).toEqual([])
    expect(cartStore.totalItems).toBe(0)
    expect(cartStore.totalPrice).toBe('0.00')
  })
  
  // 2. Добавление товаров
  it('adds and removes items correctly', () => {
    const product = { id: 1, title: 'Test', price: 100 }
    
    // Добавляем
    cartStore.addToCart(product)
    expect(cartStore.cartItems).toHaveLength(1)
    expect(cartStore.totalItems).toBe(1)
    
    // Добавляем еще раз (увеличиваем количество)
    cartStore.addToCart(product)
    expect(cartStore.cartItems[0].quantity).toBe(2)
    expect(cartStore.totalItems).toBe(2)
    
    // Удаляем
    cartStore.removeFromCart(1)
    expect(cartStore.cartItems).toHaveLength(0)
  })
  
  // 3. Вычисление суммы
  it('calculates total price correctly', () => {
    const product1 = { id: 1, title: 'Test1', price: 100 }
    const product2 = { id: 2, title: 'Test2', price: 200 }
    
    cartStore.addToCart(product1)
    cartStore.addToCart(product1) // 2 штуки
    cartStore.addToCart(product2)
    
    // 100*2 + 200*1 = 400
    expect(cartStore.totalPrice).toBe('400.00')
    expect(cartStore.totalItems).toBe(3)
  })
})
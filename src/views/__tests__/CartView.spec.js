import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { useCartStore } from '../../stores/cartStore.js'
import CartView from '../CartView.vue'

describe('CartView Component', () => {
  let pinia
  let cartStore
  
  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
    cartStore = useCartStore()
    cartStore.clearCart()
  })
  
  const createWrapper = () => {
    return mount(CartView, {
      global: {
        plugins: [pinia],
        stubs: {
          RouterLink: {
            template: '<a><slot /></a>'
          }
        }
      }
    })
  }
  
  // 1. Базовый тест - компонент рендерится
  it('renders empty cart correctly', () => {
    const wrapper = createWrapper()
    
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('Ваша корзина пуста')
    expect(wrapper.find('.continue-shopping').exists()).toBe(true)
  })
  
  // 2. Тест с товарами в корзине
  it('displays cart items when cart is not empty', async () => {
    // Добавляем товар в корзину
    const product = {
      id: 1,
      title: 'iPhone',
      price: 999.99,
      image: 'iphone.jpg'
    }
    
    cartStore.addToCart(product)
    
    const wrapper = createWrapper()
    
    // Проверяем основные элементы
    expect(wrapper.text()).toContain('iPhone')
    expect(wrapper.text()).toContain('999.99$ за шт.')
    expect(wrapper.find('.clear-cart-btn').exists()).toBe(true)
    expect(wrapper.find('.checkout-btn').exists()).toBe(true)
  })
  
  // 3. Тест статистики корзины
  it('shows correct cart statistics', async () => {
    const product = {
      id: 1,
      title: 'Test',
      price: 100
    }
    
    cartStore.addToCart(product)
    cartStore.addToCart(product) // Количество 2
    
    const wrapper = createWrapper()
    
    expect(wrapper.text()).toContain('Товаров: 2')
    expect(wrapper.text()).toContain('Общая сумма: 200.00$')
  })
  
  // 4. Тест кнопок управления количеством
  it('quantity buttons work correctly', async () => {
    const product = {
      id: 1,
      title: 'Test',
      price: 100
    }
    
    cartStore.addToCart(product)
    
    const wrapper = createWrapper()
    
    // Находим кнопки + и -
    const buttons = wrapper.findAll('.quantity-btn')
    expect(buttons).toHaveLength(2)
    
    // Проверяем начальное количество
    expect(wrapper.find('.quantity').text()).toBe('1')
    
    // Кликаем на + (вторая кнопка)
    await buttons[1].trigger('click')
    expect(cartStore.cartItems[0].quantity).toBe(2)
    
    // Кликаем на - (первая кнопка)
    await buttons[0].trigger('click')
    expect(cartStore.cartItems[0].quantity).toBe(1)
  })
  
  // 5. Тест кнопки очистки корзины
  it('clear cart button works', async () => {
    const product = {
      id: 1,
      title: 'Test',
      price: 100
    }
    
    cartStore.addToCart(product)
    
    const wrapper = createWrapper()
    
    // Проверяем, что товар есть
    expect(wrapper.text()).toContain('Test')
    
    // Кликаем очистить
    await wrapper.find('.clear-cart-btn').trigger('click')
    
    // Проверяем, что корзина пуста
    expect(cartStore.cartItems).toHaveLength(0)
  })
})
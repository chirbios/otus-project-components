import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import Product from '../Product.vue'

describe('Product Component - Minimal', () => {
  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)
    
    // Мокаем зависимости
    vi.mock('vue-router', () => ({
      useRouter: () => ({ push: vi.fn() })
    }))
    
    vi.mock('../../stores/cartStore.js', () => ({
      useCartStore: () => ({ addToCart: vi.fn() })
    }))
  })
  
  afterEach(() => {
    vi.clearAllMocks()
  })
  
  // 1. Базовый тест рендеринга
  it('renders product with title and price', () => {
    const wrapper = mount(Product, {
      props: {
        title: 'iPhone',
        id: 1,
        price: 999,
        description: 'Smartphone',
        category: 'electronics'
      },
      global: {
        plugins: [createPinia()]
      }
    })
    
    expect(wrapper.find('h3').text()).toBe('iPhone')
    expect(wrapper.find('.price').text()).toBe('999$')
  })
  
  // 2. Тест кнопки добавления в корзину
  it('has add to cart button', () => {
    const wrapper = mount(Product, {
      props: {
        title: 'Test',
        id: 1,
        price: 100,
        description: 'Test'
      },
      global: {
        plugins: [createPinia()]
      }
    })
    
    expect(wrapper.find('.add-to-cart-btn').text()).toBe('Добавить в корзину')
  })
  
  // 3. Тест CSS структуры
  it('has correct container class', () => {
    const wrapper = mount(Product, {
      props: {
        title: 'Test',
        id: 1,
        price: 100,
        description: 'Test'
      },
      global: {
        plugins: [createPinia()]
      }
    })
    
    expect(wrapper.find('.element').exists()).toBe(true)
  })
})
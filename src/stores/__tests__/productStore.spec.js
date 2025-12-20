// src/stores/__tests__/productStore.minimal.spec.js
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useProductStore } from '../productStore.js'

describe('productStore - Minimal', () => {
  let productStore
  
  beforeEach(() => {
    // Создаем Pinia
    const pinia = createPinia()
    setActivePinia(pinia)
    
    // Получаем store
    productStore = useProductStore()
    
    // Мокаем API
    vi.mock('../../services/api.js', () => ({
      default: {
        get: vi.fn()
      }
    }))
  })
  
  afterEach(() => {
    vi.clearAllMocks()
  })
  
  // 1. Тест начального состояния
  it('starts with empty products', () => {
    expect(productStore.products).toEqual([])
    expect(productStore.loading).toBe(false)
  })
  
  // 2. Тест успешной загрузки
  it('can fetch products successfully', async () => {
    const mockApi = (await import('../../services/api.js')).default
    const mockProducts = [{ id: 1, title: 'Test' }]
    
    mockApi.get.mockResolvedValue({ data: mockProducts })
    
    await productStore.fetchProducts()
    
    expect(productStore.products).toEqual(mockProducts)
    expect(productStore.loading).toBe(false)
  })
  
  // 3. Тест состояния загрузки
  it('sets loading to true during fetch', async () => {
    const mockApi = (await import('../../services/api.js')).default
    const mockProducts = [{ id: 1, title: 'Test' }]
    
    mockApi.get.mockResolvedValue({ data: mockProducts })
    
    // Проверяем начальное состояние
    expect(productStore.loading).toBe(false)
    
    // Запускаем загрузку и проверяем промежуточное состояние
    const fetchPromise = productStore.fetchProducts()
    expect(productStore.loading).toBe(true)
    
    // Ждем завершения
    await fetchPromise
    expect(productStore.loading).toBe(false)
  })
})
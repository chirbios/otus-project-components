import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore } from '../authStore.js'

describe('authStore', () => {
  let authStore
  let originalLocalStorage
  
  beforeEach(() => {
    // Сохраняем оригинальный localStorage
    originalLocalStorage = { ...global.localStorage }
    
    // Очищаем localStorage перед каждым тестом
    global.localStorage.clear()
    
    // Создаем Pinia
    const pinia = createPinia()
    setActivePinia(pinia)
    
    // Получаем store
    authStore = useAuthStore()
  })
  
  afterEach(() => {
    // Восстанавливаем localStorage после теста
    Object.keys(global.localStorage).forEach(key => {
      delete global.localStorage[key]
    })
    Object.entries(originalLocalStorage).forEach(([key, value]) => {
      global.localStorage.setItem(key, value)
    })
  })
  
  // 1. Тест начального состояния
  it('initializes with empty auth state', () => {
    expect(authStore.isAuthenticated).toBe(false)
    expect(authStore.userLogin).toBe('')
  })
  
  // 2. Тест логина
  it('login sets authentication state', () => {
    authStore.login('testuser')
    
    expect(authStore.isAuthenticated).toBe(true)
    expect(authStore.userLogin).toBe('testuser')
    expect(localStorage.getItem('isAuthenticated')).toBe('true')
    expect(localStorage.getItem('userLogin')).toBe('testuser')
  })
  
  // 3. Тест логаута
  it('logout clears authentication state', () => {
    // Сначала логинимся
    authStore.login('testuser')
    expect(authStore.isAuthenticated).toBe(true)
    
    // Затем разлогиниваемся
    authStore.logout()
    
    expect(authStore.isAuthenticated).toBe(false)
    expect(authStore.userLogin).toBe('')
    expect(localStorage.getItem('isAuthenticated')).toBeNull()
    expect(localStorage.getItem('userLogin')).toBeNull()
  })
  
  // 4. Тест checkAuth
  it('checkAuth reads from localStorage', () => {
    // Устанавливаем данные напрямую в localStorage
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('userLogin', 'saveduser')
    
    // Вызываем checkAuth
    const result = authStore.checkAuth()
    
    expect(result).toBe(true)
    expect(authStore.isAuthenticated).toBe(true)
    expect(authStore.userLogin).toBe('saveduser')
  })
  
  // 5. Тест вычисляемых свойств
  it('computed properties reflect state', () => {
    expect(authStore.isAuthenticated).toBe(false)
    expect(authStore.userLogin).toBe('')
    
    authStore.login('alice')
    
    expect(authStore.isAuthenticated).toBe(true)
    expect(authStore.userLogin).toBe('alice')
  })
})
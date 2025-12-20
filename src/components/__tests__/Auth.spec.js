import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import Auth from '../Auth.vue'

describe('Auth Component - Minimal', () => {
  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)
    
    // Мокаем зависимости
    vi.mock('vue-router', () => ({
      useRouter: () => ({ push: vi.fn() })
    }))
    
    vi.mock('../../stores/authStore.js', () => ({
      useAuthStore: () => ({
        checkAuth: vi.fn(),
        login: vi.fn(),
        logout: vi.fn(),
        isAuthenticated: false,
        userLogin: ''
      })
    }))
  })
  
  afterEach(() => {
    vi.clearAllMocks()
  })
  
  // 1. Базовая проверка рендеринга
  it('renders without crashing', () => {
    const wrapper = mount(Auth, {
      global: {
        stubs: ['Form', 'Field', 'ErrorMessage']
      }
    })
    
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('h2').text()).toBe('Авторизация')
  })
  
  // 2. Проверка демо-информации
  it('shows demo access info', () => {
    const wrapper = mount(Auth, {
      global: {
        stubs: ['Form', 'Field', 'ErrorMessage']
      }
    })
    
    expect(wrapper.text()).toContain('Демо-доступ')
  })
  
  // 3. Проверка что форма существует когда не авторизован
  it('shows form when not authenticated', () => {
    const wrapper = mount(Auth, {
      global: {
        stubs: {
          Form: { template: '<form>Form</form>' }
        }
      }
    })
    
    expect(wrapper.find('form').exists()).toBe(true)
  })
})
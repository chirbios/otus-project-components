// src/components/__tests__/OrderForm.minimal.spec.js
import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import OrderForm from '../OrderForm.vue'

describe('OrderForm Component - Minimal', () => {
  // 1. Базовый тест рендеринга
  it('renders without crashing', () => {
    const wrapper = shallowMount(OrderForm, {
      global: {
        plugins: [createPinia()],
        stubs: ['Form', 'Field', 'ErrorMessage']
      }
    })
    
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('h2').text()).toBe('Форма отправки заказа')
  })
  
  // 2. Тест структуры формы
  it('contains form container', () => {
    const wrapper = shallowMount(OrderForm, {
      global: {
        plugins: [createPinia()],
        stubs: {
          Form: { template: '<form class="order_form_elements"></form>' }
        }
      }
    })
    
    expect(wrapper.find('.order_form_elements').exists()).toBe(true)
  })
  
  // 3. Тест кнопки отправки
  it('has submit button', () => {
    const wrapper = shallowMount(OrderForm, {
      global: {
        plugins: [createPinia()],
        stubs: {
          Form: { 
            template: '<form><button type="submit">Отправить</button></form>' 
          }
        }
      }
    })
    
    const button = wrapper.find('button[type="submit"]')
    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('Отправить')
  })
})
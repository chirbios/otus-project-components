// src/router/__tests__/router.minimal.spec.js
import { describe, it, expect, beforeEach } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'

describe('Router Minimal Tests', () => {
  let router
  
  beforeEach(() => {
    const mockComponent = { template: '<div>Mock</div>' }
    
    const routes = [
      { path: '/', component: mockComponent },
      { path: '/cart', component: mockComponent },
      { path: '/product/:id', component: mockComponent },
    ]
    
    router = createRouter({
      history: createWebHistory(),
      routes,
    })
  })
  
  // 1. Базовая проверка
  it('router is created successfully', () => {
    expect(router).toBeDefined()
    expect(router.options.routes.length).toBeGreaterThan(0)
  })
  
  // 2. Проверка навигации
  it('can navigate to home page', async () => {
    await router.push('/')
    expect(router.currentRoute.value.path).toBe('/')
  })
  
  // 3. Проверка динамического маршрута
  it('can navigate to product page with id', async () => {
    await router.push('/product/123')
    expect(router.currentRoute.value.path).toBe('/product/123')
    expect(router.currentRoute.value.params.id).toBe('123')
  })
})
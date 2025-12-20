import { createWebHistory , createRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

import HomeView from '../views/HomeView.vue'
import CreateProductView from '../views/CreateProductView.vue'
import OrderView from '../views/OrderView.vue'
import AuthView from '../views/AuthView.vue'
import ProductView from '../views/ProductView.vue'
import CartView from '../views/CartView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/create', component: CreateProductView },
	{ path: '/order', component: OrderView },
	{ path: '/auth', component: AuthView },
	{ path: '/product/:id', component: ProductView },
	{ path: '/cart', component: CartView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  authStore.checkAuth()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/auth')
  } else {
    next()
  }
})

export default router
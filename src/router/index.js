import { createMemoryHistory, createRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

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
  history: createMemoryHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const { checkAuth } = useAuth()
  const isAuthenticated = checkAuth()

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/auth')
  } else {
    next()
  }
})

export default router
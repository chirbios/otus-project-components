import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from './views/HomeView.vue'
import CreateProductView from './views/CreateProductView.vue'
import OrderView from './views/OrderView.vue'
import AuthView from './views/AuthView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/create', component: CreateProductView },
	{ path: '/order', component: OrderView },
	{ path: '/auth', component: AuthView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
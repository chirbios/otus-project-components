import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from './views/HomeView.vue'
import CreateProductView from './views/CreateProductView.vue'
import OrderView from './views/OrderView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/create', component: CreateProductView },
	{ path: '/order', component: OrderView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
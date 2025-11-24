import { ref } from 'vue'
import api from '../services/api'

export function useProducts() {
  const products = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchProducts = async () => {
    loading.value = true
    error.value = null
    
    try {
			const response = await api.get('/products')
			products.value = response.data
    } catch (err) {
      console.error('❌ API Error:', err)
      error.value = err.message
    } finally {
      console.log('🏁 Loading finished')
      loading.value = false
    }
  }

  return {
    products,
    loading,
    error,
    fetchProducts
  }
}
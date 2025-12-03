import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  
  const isAuthenticatedState = ref(false)
  const userLoginState = ref('')
  
  isAuthenticatedState.value = localStorage.getItem('isAuthenticated') === 'true'
  userLoginState.value = localStorage.getItem('userLogin') || ''
  
  const login = (loginValue) => {
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('userLogin', loginValue)
    isAuthenticatedState.value = true
    userLoginState.value = loginValue
  }
  
  const logout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userLogin')
    isAuthenticatedState.value = false
    userLoginState.value = ''
  }
  
  const checkAuth = () => {
    isAuthenticatedState.value = localStorage.getItem('isAuthenticated') === 'true'
    userLoginState.value = localStorage.getItem('userLogin') || ''
    return isAuthenticatedState.value
  }
  
  const isAuthenticated = computed(() => isAuthenticatedState.value)
  const userLogin = computed(() => userLoginState.value)
  
  return {
    isAuthenticated,
    userLogin,
    
    login,
    logout,
    checkAuth
  }
})
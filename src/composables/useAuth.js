import { ref, computed } from 'vue'

export function useAuth() {
  const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true')
  const userLogin = ref(localStorage.getItem('userLogin') || '')

  const login = (login) => {
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('userLogin', login)
    isAuthenticated.value = true
    userLogin.value = login
  }

  const logout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userLogin')
    isAuthenticated.value = false
    userLogin.value = ''
  }

  const checkAuth = () => {
    isAuthenticated.value = localStorage.getItem('isAuthenticated') === 'true'
    userLogin.value = localStorage.getItem('userLogin') || ''
    return isAuthenticated.value
  }

  return {
    isAuthenticated: computed(() => isAuthenticated.value),
    userLogin: computed(() => userLogin.value),
    login,
    logout,
    checkAuth
  }
}
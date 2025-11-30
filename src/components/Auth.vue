<script setup>
import { ref } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { useRouter } from 'vue-router'
import * as yup from 'yup'

const router = useRouter()

const authLogin = ref('')
const authPassword = ref('')
const showSuccessMessage = ref(false)
const isLoading = ref(false)
const authError = ref('')

const schema = yup.object({
  authLogin: yup.string().required('Логин обязателен').min(3, 'Логин должен быть не менее 3 символов'),
  authPassword: yup.string().required('Пароль обязателен').min(4, 'Пароль должен быть не менее 4 символов'),
});

async function onAuth(values, { resetForm }) {
  isLoading.value = true
  authError.value = ''
  console.log('Форма отправлена:', values)
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (values.authLogin && values.authPassword) {
      console.log('Успешная авторизация')
      
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userLogin', values.authLogin)
      
      showSuccessMessage.value = true
      resetForm()
      
      setTimeout(() => {
        router.push('/create')
      }, 1000)
      
    } else {
      throw new Error('Неверные учетные данные')
    }
    
  } catch (error) {
    console.error('Ошибка авторизации:', error)
    authError.value = 'Ошибка авторизации. Проверьте логин и пароль.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="auth-container">
    <h2>Авторизация</h2>
    
    <div v-if="showSuccessMessage" class="success-message">
      ✅ Вы успешно авторизовались! Перенаправляем...
    </div>
    
    <div v-if="authError" class="error-message">
      ❌ {{ authError }}
    </div>
    
    <Form novalidate @submit="onAuth" class="auth-form" :validation-schema="schema">
      <div class="form-group">
        <label>Логин</label>
        <Field type="text" name="authLogin" v-model="authLogin" v-slot="{ field, meta }">
          <input v-bind="field" :class="['form-input', { 'error': meta.touched && meta.errors }]"/>
        </Field>
        <ErrorMessage name="authLogin" as="p" class="error-text" />
      </div>
      
      <div class="form-group">
        <label>Пароль</label>
        <Field name="authPassword" v-model="authPassword" v-slot="{ field, meta }">
          <input v-bind="field" type="password" :class="['form-input', { 'error': meta.touched && meta.errors }]">
        </Field>
        <ErrorMessage name="authPassword" as="p" class="error-text" />
      </div>
      
      <button type="submit" :disabled="isLoading" class="submit-btn">
        {{ isLoading ? 'Загрузка...' : 'Войти' }}
      </button>
    </Form>
    
    <div class="demo-info">
      <p><strong>Демо-доступ:</strong> любой логин и пароль</p>
    </div>
  </div>
</template>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.auth-form {
  background-color: #f8f9fa;
  padding: 30px;
  border-radius: 8px;
  border: 1px solid #e0d7d7;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

.form-input.error {
  border-color: #dc3545;
}

.error-text {
  color: #dc3545;
  font-size: 14px;
  margin: 5px 0 0 0;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover:not(:disabled) {
  background-color: #0056b3;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.success-message {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  padding: 12px;
  margin-bottom: 20px;
  text-align: center;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  padding: 12px;
  margin-bottom: 20px;
  text-align: center;
}

.demo-info {
  margin-top: 20px;
  padding: 15px;
  background-color: #e7f3ff;
  border-radius: 4px;
  text-align: center;
  font-size: 14px;
  color: #0066cc;
}
</style>
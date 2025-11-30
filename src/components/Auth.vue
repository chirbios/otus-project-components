<script setup>
import { ref } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import axios from 'axios'

const authLogin = ref('')
const authPassword = ref('')
const showSuccessMessage = ref(false)
const isLoading = ref(false)

const schema = yup.object({
  authLogin: yup.string().required('Логин обязателен').min(6, 'Логин должен быть не менее 6 символов'),
  authPassword: yup.string().required('Пароль обязателен').trim(),
});

async function onAuth(values, { resetForm }) {
  isLoading.value = true
  console.log('Форма отправлена:', values)
  
  try {
    // Имитация запроса к API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Ваш реальный запрос:
    // const response = await axios.post('/api/auth', values)
    
    console.log('Успешная авторизация')
    showSuccessMessage.value = true
    resetForm()
    
    // Скрываем сообщение через 3 секунды
    setTimeout(() => {
      showSuccessMessage.value = false
    }, 3000)
    
  } catch (error) {
    console.error('Ошибка авторизации:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div v-if="showSuccessMessage" class="success-message">
    Вы успешно авторизовались
  </div>
  
  <Form novalidate @submit="onAuth" class="order_form_elements" :validation-schema="schema">
    <div>
      <label>Введите Логин
        <Field type="text" name="authLogin" v-model="authLogin" v-slot="{ field, meta }">
          <input v-bind="field" :class="meta.touched && meta.errors ? 'red' : ''"/>
        </Field>
        <ErrorMessage name="authLogin" as="p" />
      </label>
    </div>
    
    <div>
      <label>Введите пароль
        <Field name="authPassword" v-model="authPassword" v-slot="{ field, meta }">
          <input v-bind="field" type="password" :class="meta.touched && meta.errors ? 'red' : ''">
        </Field>
        <ErrorMessage name="authPassword" as="p" />
      </label>
    </div>
    
    <button type="submit" :disabled="isLoading">
      {{ isLoading ? 'Загрузка...' : 'Войти' }}
    </button>
  </Form>
</template>

<style scoped>
.red {
  border: 1px solid red;
}

.success-message {
  background: green;
  color: white;
  padding: 10px;
  margin-bottom: 20px;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
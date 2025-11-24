<script setup>
import { ref } from 'vue'
import { Field, Form, ErrorMessage } from 'vee-validate'
import { useRouter } from 'vue-router'
import * as yup from 'yup'
import axios from 'axios'

const router = useRouter()

const orderFormProduct = ref('')
const orderFormName = ref('')
const orderFormEmail = ref('')
const orderFormAddress = ref('')
const orderFormCountry = ref('')
const orderFormIsStudent = ref('no')
const orderFormHobby = ref([])
const showSuccessMessage = ref(false)
const isLoading = ref(false)

const schema = yup.object({
  orderFormProduct: yup.string().required().min(3),
  orderFormName: yup.string().required().min(6),
  orderFormEmail: yup.string().email().required(),
  orderFormAddress: yup.string().required().min(10),
  orderFormCountry: yup.string().required().min(2),
});

async function onSubmit(values) {
  isLoading.value = true
  
  try {
    const response = await axios.post('https://httpbin.org/post', values, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
		console.log('Успешный ответ:', response.data);

    showSuccessMessage.value = true;
    
    setTimeout(() => {
      router.push('/'); 
    }, 2000);

  } catch (error) {
    console.error('Ошибка:', error);
    alert('Произошла ошибка при отправке формы');
  } finally {
    isLoading.value = false;
  }
}

</script>

<template>
  <h2>Форма отправки заказа</h2>
  
  <div v-if="showSuccessMessage" class="success-message">
    ✅ Форма успешно отправлена! Сообщение исчезнет через 5 секунд.
  </div>
  
  <Form novalidate @submit='onSubmit' class="order_form_elements" :validation-schema="schema">
    <div class="order_form_element">
      <label>Введите название товара
        <Field type="text" name="orderFormProduct" v-model="orderFormProduct" v-slot="{ field, meta }">
          <input v-bind="field" :class="meta.errors.length ? 'red' : ''"/>
        </Field>
        <ErrorMessage name="orderFormProduct" as="p">Имя должно содержать не менее 8 символов</ErrorMessage>
      </label>
    </div>
    <div class="order_form_element">
      <label>Введите имя
        <Field type="text" name="orderFormName" v-model="orderFormName" v-slot="{ field, meta }">
          <input v-bind="field" :class="meta.errors.length ? 'red' : ''"/>
        </Field>
        <ErrorMessage name="orderFormName" as="p">Имя должно содержать не менее 8 символов</ErrorMessage>
      </label>
    </div>
    <div class="order_form_element">
      <label>Введите email
        <Field type="email" name="orderFormEmail" v-model="orderFormEmail" v-slot="{ field, meta }">
          <input v-bind="field" :class="meta.errors.length ? 'red' : ''"/>
        </Field>
        <ErrorMessage name="orderFormEmail" as="p">Введите действительный адрес электронной почты</ErrorMessage>
      </label>
    </div>
    <div class="order_form_element">
      <label>Введите адрес
        <Field type="text" name="orderFormAddress" v-model="orderFormAddress" v-slot="{ field, meta }">
          <input v-bind="field" :class="meta.errors.length ? 'red' : ''"/>
        </Field>
        <ErrorMessage name="orderFormAddress" as="p">Введите действительный адрес проживания</ErrorMessage>
      </label>
    </div>
    <div class="order_form_element">
      <div>Вы студент?
        <label>
          <Field type="radio" value="yes" v-model="orderFormIsStudent" name="orderFormIsStudent"/> Да
        </label>
        <label>
          <Field type="radio" value="no" v-model="orderFormIsStudent" name="orderFormIsStudent"/> Нет
        </label>
        <ErrorMessage name="orderFormIsStudent" as="p"/>
      </div>
    </div>
    <div class="order_form_element">
      <label>Выберите страну
        <Field name="orderFormCountry" v-model="orderFormCountry" as="select"> 
          <option disabled value="">Выберите страну</option>
          <option value="Россия">Россия</option>
          <option value="Узбекистан">Узбекистан</option>
          <option value="Китай">Китай</option>
        </Field>
        <ErrorMessage name="orderFormCountry" as="p">Не выбрана страна</ErrorMessage>
      </label>
    </div>
    <div class="order_form_element">
      <label>Выберите хобби
        <Field name="orderFormHobby" v-model="orderFormHobby" as="select" multiple>
          <option value="Спорт">Спорт</option>
          <option value="Игры">Игры</option>
          <option value="Прогулки">Прогулки</option>
          <option value="Соц. сети">Соц. сети</option>
        </Field>
        <ErrorMessage name="orderFormHobby" as="p"/>
      </label>
    </div>
    <button type="submit" :disabled="isLoading">
      {{ isLoading ? 'Отправка...' : 'Отправить' }}
    </button>
  </Form>
</template>

<style scoped>
.order_form_elements {
  width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  background-color: #e0d7d7;
  border-radius: 16px;
  padding: 20px;
}
.order_form_element {
  margin-top: 10px;
  text-align: left;
}
button {
  margin-top: 20px;
}
.red {
  border: 1px solid red;
}

p {
  margin: 0;
  color: red;
}

.success-message {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 20px;
  text-align: center;
  font-weight: bold;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
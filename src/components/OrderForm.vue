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
const orderDateOfBirth = ref('')
const cardNumber = ref('')
const cardExpiry = ref('')
const cardCVV = ref('')
const agreeToTerms = ref(false)
const showSuccessMessage = ref(false)
const isLoading = ref(false)

const validateAge = (date) => {
  if (!date) return false;
  
  const birthDate = new Date(date);
  const today = new Date();
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age >= 18;
}

const validateCardExpiry = (value) => {
  if (!value) return false;
  
  const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
  if (!regex.test(value)) return false;
  
  const [month, year] = value.split('/');
  const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
  const currentDate = new Date();
  
  expiryDate.setMonth(expiryDate.getMonth() + 1);
  expiryDate.setDate(0);
  
  return expiryDate > currentDate;
};

const schema = yup.object({
  orderFormProduct: yup.string().required().min(3),
  orderFormName: yup.string().required().min(6),
  orderFormEmail: yup.string().email().required(),
  orderFormAddress: yup.string().required().min(10),
  orderFormCountry: yup.string().required().min(2),
	orderDateOfBirth: yup
    .mixed()
    .test('required', 'Введите дату рождения', value => value && value !== '')
    .test('valid-date', 'Введите корректную дату рождения', value => {
      if (!value) return false;
      const date = new Date(value);
      return !isNaN(date.getTime());
    })
    .test('is-adult', 'Вы должны быть старше 18 лет', value => {
      if (!value) return false;
      return validateAge(value);
    })
    .test('not-future', 'Дата рождения не может быть в будущем', value => {
      if (!value) return false;
      return new Date(value) <= new Date();
    }),
	cardNumber: yup
    .string()
    .required('Номер карты обязателен')
    .matches(/^\d{16}$/, 'Номер карты должен содержать ровно 16 цифр'),
  cardExpiry: yup
    .string()
    .required('Срок действия карты обязателен')
    .test('valid-expiry', 'Введите срок действия в формате MM/YY', validateCardExpiry),
  cardCVV: yup
    .string()
    .required('CVV код обязателен')
    .matches(/^\d{3}$/, 'CVV должен содержать ровно 3 цифры'),
  agreeToTerms: yup
    .boolean()
    .oneOf([true], 'Необходимо согласие на обработку данных')
    .required('Необходимо согласие на обработку данных'),
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
    }, 1500);

  } catch (error) {
    console.error('Ошибка:', error);
    alert('Произошла ошибка при отправке формы');
  } finally {
    isLoading.value = false;
  }
}

const formatCardNumber = (value) => {
  return value.replace(/\D/g, '').slice(0, 16);
};

const formatCardExpiry = (value) => {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length >= 3) {
    return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
  }
  return cleaned;
};

const formatCVV = (value) => {
  return value.replace(/\D/g, '').slice(0, 3);
};
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
		<div class="order_form_element">
      <label>Введите дату рождения
        <Field name="orderDateOfBirth" v-model="orderDateOfBirth" v-slot="{ field, meta }"> 
          <input type="date" v-bind="field" :class="meta.touched && meta.errors.length ? 'red' : ''"/>
        </Field>
        <ErrorMessage name="orderDateOfBirth" as="p"/>
      </label>
    </div>
		<div class="order_form_element">
      <label>Номер карты
        <Field name="cardNumber" v-model="cardNumber" v-slot="{ field, meta }">
          <input 
            v-bind="field" 
            :class="meta.touched && meta.errors.length ? 'red' : ''"
            placeholder="1234 5678 9012 3456"
            @input="(e) => { field.onInput(e); cardNumber = formatCardNumber(e.target.value); }"
          />
        </Field>
        <ErrorMessage name="cardNumber" as="p"/>
      </label>
    </div>
    <div class="order_form_element card-details">
      <div class="card-detail">
        <label>Срок действия (MM/YY)
          <Field name="cardExpiry" v-model="cardExpiry" v-slot="{ field, meta }">
            <input 
              v-bind="field" 
              :class="meta.touched && meta.errors.length ? 'red' : ''"
              placeholder="MM/YY"
              @input="(e) => { field.onInput(e); cardExpiry = formatCardExpiry(e.target.value); }"
            />
          </Field>
          <ErrorMessage name="cardExpiry" as="p"/>
        </label>
      </div>
      <div class="card-detail">
        <label>CVV
          <Field name="cardCVV" v-model="cardCVV" v-slot="{ field, meta }">
            <input 
              v-bind="field" 
              :class="meta.touched && meta.errors.length ? 'red' : ''"
              placeholder="123"
              type="password"
              @input="(e) => { field.onInput(e); cardCVV = formatCVV(e.target.value); }"
            />
          </Field>
          <ErrorMessage name="cardCVV" as="p"/>
        </label>
      </div>
    </div>
		<div class="order_form_element">
			<label class="checkbox-label">
				<Field type="checkbox" name="agreeToTerms" v-model="agreeToTerms" value="true" />
				<span>Я согласен на обработку персональных данных</span>
			</label>
			<ErrorMessage name="agreeToTerms" as="p"/>
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
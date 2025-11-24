<script setup>
import { ref } from 'vue'
import { Field, Form, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const createProductName = ref('')
const createProductPrice = ref(0)
const createProductDescription = ref('')
const createProductCategory = ref('')
const showSuccessMessage = ref(false)
const isLoading = ref(false)


const schema = yup.object({
	createProductName: yup.string().required().min(6),
	createProductPrice: yup.number().required().positive(),
	createProductDescription: yup.string().required().min(10),
	createProductCategory: yup.string().required(),
});

async function onCreate(values) {
  isLoading.value = true
  
  try {
    const response = await axios.post('https://httpbin.org/post', values, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
		console.log('Товар успешно создан', response.data);

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

	<div v-if="showSuccessMessage" class="success-message">
    ✅ Товар успешно создан
  </div>

	<h2>Форма создания товара</h2>
	<Form  novalidate @submit='onCreate' class="order_form_elements" :validation-schema="schema" >
		<div class="order_form_element">
			<label>Введите название товара
				<Field type="text" name="createProductName" v-model="createProductName" v-slot="{ field, meta }">
					<input v-bind="field" :class="meta.errors.length ? 'red' : ''"/>
				</Field>
				<ErrorMessage name="createProductName" as="p">Имя должно содержать не менее 6 символов</ErrorMessage>
			</label>
		</div>
		<div class="order_form_element">
			<label>Введите сумму
				<Field type="number" name="createProductPrice" v-model="createProductPrice" v-slot="{ field, meta }">
					<input v-bind="field" :class="meta.errors.length ? 'red' : ''"/>
				</Field>
				<ErrorMessage name="createProductPrice" as="p">Имя должно содержать не менее 1 символа</ErrorMessage>
			</label>
		</div>
		<div class="order_form_element">
			<label>Введите описание
				<Field type="text" name="createProductDescription" v-model="createProductDescription" v-slot="{ field, meta }">
					<input v-bind="field" :class="meta.errors.length ? 'red' : ''"/>
				</Field>
				<ErrorMessage name="createProductDescription" as="p">Имя должно содержать не менее 10 символов</ErrorMessage>
			</label>
		</div>
		<div class="order_form_element">
			<label>Выберите категорию
				<Field name="createProductCategory" v-model="createProductCategory" as="select"> 
					<option disabled value="">Выберите категорию</option>
					<option value="men's clothing">men's clothing</option>
					<option value="jewelery">jewelery</option>
					<option value="electronics">electronics</option>
				</Field>
				<ErrorMessage name="createProductCategory" as="p">Не выбрана категория</ErrorMessage>
			</label>
		</div>
		<button>Создать товар</button>
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
.red {
	border: 1px solid red;
}
button {
	margin-top: 20px;
}
</style>
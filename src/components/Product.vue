<script setup>
const props = defineProps(['title', 'id', 'price', 'description', 'category', 'image', 'rating'])

</script>

<template>
	<div class="element">
		<h3>{{ props.title }}</h3>
		<span>{{ props.description }}</span>
		<h3>{{ props.price }}$</h3>
		<ul>
		</ul>
	</div>
</template>

<style scoped>
ul {
	padding-left: 0;
	list-style: none;
	display: flex;
	column-gap: 10px;
}

li > img {
	width: 160px;
	height: 160px;
	border-radius: 16px;
}

.element {
	margin-top: 20px;
	border: 1px solid #e0d7d7;
	background-color: #e0d7d7;
	border-radius: 16px;
	padding: 10px;
}
</style>
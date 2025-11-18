<script setup>
const props = defineProps(['title', 'price', 'images'])
</script>

<template>
	<div class="element">
		<h2>{{ props.title }}</h2>
		<h3>{{ props.price }}$</h3>
		<ul>
			<li v-for="img in props.images">
				<img :src="img" :alt="props.title">
			</li>
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
<script setup>
import Product from './components/Product.vue'

const products = [
	{
		"id":344,
		"title":"Majestic Mountain Graphic T-Shirt",
		"slug":"majestic-mountain-graphic-t-shirt",
		"price":44,
		"description":"Elevate your wardrobe with this stylish black t-shirt featuring a striking monochrome mountain range graphic. Perfect for those who love the outdoors or want to add a touch of nature-inspired design to their look, this tee is crafted from soft, breathable fabric ensuring all-day comfort. Ideal for casual outings or as a unique gift, this t-shirt is a versatile addition to any collection.",
		"category":{
			"id":55,
			"name":"Clothes",
			"slug":"clothes",
			"image":"https://i.imgur.com/QkIa5tT.jpeg",
			"creationAt":"2025-11-18T13:43:31.000Z",
			"updatedAt":"2025-11-18T13:43:31.000Z"
		},
		"images":["https://i.imgur.com/QkIa5tT.jpeg","https://i.imgur.com/jb5Yu0h.jpeg","https://i.imgur.com/UlxxXyG.jpeg"],
		"creationAt":"2025-11-18T13:43:32.000Z","updatedAt":"2025-11-18T13:43:32.000Z"
	},
	{
		"id":345,
		"title":"Classic Olive Chino Shorts",
		"slug":"classic-olive-chino-shorts",
		"price":84,
		"description":"Elevate your casual wardrobe with these classic olive chino shorts. Designed for comfort and versatility, they feature a smooth waistband, practical pockets, and a tailored fit that makes them perfect for both relaxed weekends and smart-casual occasions. The durable fabric ensures they hold up throughout your daily activities while maintaining a stylish look.",
		"category":{
			"id":55,
			"name":"Clothes",
			"slug":"clothes",
			"image":"https://i.imgur.com/QkIa5tT.jpeg",
			"creationAt":"2025-11-18T13:43:31.000Z","updatedAt":"2025-11-18T13:43:31.000Z"
		},
		"images":["https://i.imgur.com/UsFIvYs.jpeg","https://i.imgur.com/YIq57b6.jpeg"],
		"creationAt":"2025-11-18T13:43:32.000Z","updatedAt":"2025-11-18T13:43:32.000Z"
	},
	{
		"id":346,
		"title":"Classic Heather Gray Hoodie",
		"slug":"classic-heather-gray-hoodie",
		"price":69,
		"description":"Stay cozy and stylish with our Classic Heather Gray Hoodie. Crafted from soft, durable fabric, it features a kangaroo pocket, adjustable drawstring hood, and ribbed cuffs. Perfect for a casual day out or a relaxing evening in, this hoodie is a versatile addition to any wardrobe.",
		"category":{
			"id":55,
			"name":"Clothes",
			"slug":"clothes",
			"image":"https://i.imgur.com/QkIa5tT.jpeg",
			"creationAt":"2025-11-18T13:43:31.000Z",
			"updatedAt":"2025-11-18T13:43:31.000Z"
		},
		"images":["https://i.imgur.com/cHddUCu.jpeg","https://i.imgur.com/CFOjAgK.jpeg","https://i.imgur.com/wbIMMme.jpeg"],
		"creationAt":"2025-11-18T13:43:32.000Z","updatedAt":"2025-11-18T13:43:32.000Z"
	},
	{
		"id":347,
		"title":"Classic High-Waisted Athletic Shorts",
		"slug":"classic-high-waisted-athletic-shorts",
		"price":43,
		"description":"Stay comfortable and stylish with our Classic High-Waisted Athletic Shorts. Designed for optimal movement and versatility, these shorts are a must-have for your workout wardrobe. Featuring a figure-flattering high waist, breathable fabric, and a secure fit that ensures they stay in place during any activity, these shorts are perfect for the gym, running, or even just casual wear.",
		"category":{
			"id":55,
			"name":"Clothes",
			"slug":"clothes",
			"image":"https://i.imgur.com/QkIa5tT.jpeg",
			"creationAt":"2025-11-18T13:43:31.000Z",
			"updatedAt":"2025-11-18T13:43:31.000Z"
		},
		"images":["https://i.imgur.com/eGOUveI.jpeg","https://i.imgur.com/UcsGO7E.jpeg","https://i.imgur.com/NLn4e7S.jpeg"],
		"creationAt":"2025-11-18T13:43:32.000Z","updatedAt":"2025-11-18T13:43:32.000Z"
	},
	{
		"id":348,
		"title":"Classic Black T-Shirt",
		"slug":"classic-black-t-shirt",
		"price":35,
		"description":"Elevate your everyday style with our Classic Black T-Shirt. This staple piece is crafted from soft, breathable cotton for all-day comfort. Its versatile design features a classic crew neck and short sleeves, making it perfect for layering or wearing on its own. Durable and easy to care for, it's sure to become a favorite in your wardrobe.",
		"category":{
			"id":55,
			"name":"Clothes",
			"slug":"clothes",
			"image":"https://i.imgur.com/QkIa5tT.jpeg",
			"creationAt":"2025-11-18T13:43:31.000Z",
			"updatedAt":"2025-11-18T13:43:31.000Z"
		},
		"images":["https://i.imgur.com/9DqEOV5.jpeg","https://i.imgur.com/ae0AEYn.jpeg","https://i.imgur.com/mZ4rUjj.jpeg"],
		"creationAt":"2025-11-18T13:43:32.000Z",
		"updatedAt":"2025-11-18T13:43:32.000Z"
	},
	{
		"id":349,
		"title":"Classic Comfort Fit Joggers",
		"slug":"classic-comfort-fit-joggers",
		"price":25,
		"description":"Discover the perfect blend of style and comfort with our Classic Comfort Fit Joggers. These versatile black joggers feature a soft elastic waistband with an adjustable drawstring, two side pockets, and ribbed ankle cuffs for a secure fit. Made from a lightweight and durable fabric, they are ideal for both active days and relaxed lounging.",
		"category":{
			"id":55,
			"name":"Clothes",
			"slug":"clothes",
			"image":"https://i.imgur.com/QkIa5tT.jpeg",
			"creationAt":"2025-11-18T13:43:31.000Z",
			"updatedAt":"2025-11-18T13:43:31.000Z"
		},
		"images":["https://i.imgur.com/ZKGofuB.jpeg","https://i.imgur.com/GJi73H0.jpeg","https://i.imgur.com/633Fqrz.jpeg"],
		"creationAt":"2025-11-18T13:43:32.000Z",
		"updatedAt":"2025-11-18T13:43:32.000Z"
	}
]
</script>

<template>
	<h1>Список товаров</h1>
	<ul>
		<Product 
			v-for="product in products"
			:key="product.id"
			:title="product.title"
			:price="product.price"
			:images="product.images"
			/>
	</ul>

</template>

<style scoped>

</style>

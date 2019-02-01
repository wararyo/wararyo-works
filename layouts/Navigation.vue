<!-- 作品のカテゴリを横に並べる -->
<template>
	<ul class="navigation">
		<li v-for="category in categories" :key="category.fields.slug">
			<nuxt-link :to="makeLink(category.fields.slug)">{{category.fields.name}}</nuxt-link>
		</li>
	</ul>
</template>

<script>
export default {
	props: ['categories'],

	methods: {
		makeLink: function(category) {
			if(category === process.env.defaultCategorySlug)
				category = '';
			return '/'+category;
		}
	}
}
</script>

<style lang="scss">
.navigation {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;

	a {
		line-height: 48px;
		padding: 0 48px;
		color: #555;
		text-decoration: none;
	}
}
</style>
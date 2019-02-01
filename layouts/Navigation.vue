<!-- 作品のカテゴリを横に並べる -->
<template>
	<ul>
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
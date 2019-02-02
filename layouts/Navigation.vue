<!-- 作品のカテゴリを横に並べる -->
<template>
	<div class="navigation">
		<ul>
			<li v-for="category in categories" :key="category.fields.slug">
				<nuxt-link :to="makeLink(category.fields.slug)">{{category.fields.name}}</nuxt-link>
			</li>
		</ul>
		<canvas id="navigation-canvas"></canvas>
	</div>
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
	},

	mounted () {
		init();
	}
}
</script>

<style lang="scss">
.navigation {
	position: relative;
	height: 200px;
	margin-bottom: -72px;

	ul {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
	}

	a {
		margin: 0 16px;
		display:block;
		line-height: 48px;
		padding: 0 48px;
		color: #555;
		text-decoration: none;
		background-color: rgba(255,255,255,.7);
		border: 1px solid #596347;
		transition: all .2s;

		&.nuxt-link-exact-active {
			background-color: #596347;
			color: #FFFFFF;
		}
	}
	canvas {
		position: absolute;
		z-index: -1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
}
</style>
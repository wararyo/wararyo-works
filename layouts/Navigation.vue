<!-- 作品のカテゴリを横に並べる -->
<template>
	<div class="navigation">
		<canvas :class="{'hidden':$route.params.work !== void 0}" id="navigation-canvas"></canvas>
		<ul id="navigation">
			<li v-for="category in categories"
				:key="category.fields.slug"
				@click="scroll()" >
				<nuxt-link 
				:to="makeLink(category.fields.slug)"
				:class="{emphasized: category.fields.emphasized }" >{{category.fields.name}}</nuxt-link>
			</li>
		</ul>
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
		},
		scroll () {
			console.log("hoge");
			this.$SmoothScroll(
				document.querySelector('#navigation'),
				800,
				null,
				null,
				'y'
			);
	    }
	},

	mounted () {
		init();//Canvas
	}
}
</script>

<style lang="scss">
.navigation {
	position: relative;
	margin-bottom: 94px;

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
		color: $blue-gray;
		text-decoration: none;
		background-color: rgba(255,255,255,.7);
		border: 1px solid $blue-gray;
		transition: all .2s;
		&.emphasized {
			font-weight: bolder;
			font-style: italic;
		}
		&:not(.emphasized) {
			font-family: 'Noto Sans JP';
		}
		&.nuxt-link-exact-active {
			background-color: $blue-gray;
			color: $white;
		}
	}
	canvas {
		position: absolute;
		z-index: -1;
		top: 0;
		left: 0;
		width: 100%;
		height: 200px;
		transition: all 1s ease-in-out 1s;

		&.hidden {
			opacity: 0;
			visibility: hidden;
			//display: none;
		}
	}
}
@include mq(sp){
	.navigation {
		pointer-events: none;
		margin-top: -80px;
		margin-bottom: 0;
		canvas {
			position: relative;
		}
		ul {
			pointer-events: auto;
		}
	}
}
</style>
<!-- 作品のカテゴリを横に並べる -->
<template>
	<div class="navigation-mobile" :class="{'is-open':isOpen}">
		<ul>
			<li @click="isOpen = !isOpen"><a :class="{emphasized: categoryObject.fields.emphasized }">{{categoryObject.fields.name}}</a></li>
			<li v-for="category in categories"
				:key="category.fields.slug"
				@click="scroll();isOpen = false;" v-if="categoryObject.fields.slug !== category.fields.slug">
				<nuxt-link 
				:to="makeLink(category.fields.slug)"
				:class="{emphasized: category.fields.emphasized }" >{{category.fields.name}}</nuxt-link>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	props: ['categories','categoryObject'],
	data: function () {
		return {
			isOpen: false
		}
	},

	methods: {
		makeLink: function(category) {
			if(category === process.env.defaultCategorySlug)
				category = '';
			return '/'+category;
		},
		scroll () {
			this.$SmoothScroll(
				document.querySelector('#navigation-mobile'),
				800,
				null,
				null,
				'y'
			);
	    }
	},
}
</script>

<style lang="scss">
.navigation-mobile {
	display: none;
}
@include mq(sp){
.navigation-mobile {
	display: block;
	height: 56px;
	overflow: hidden;
	position: sticky;
	top: 0;
	color: $white;
	background-color: $blue-gray;
	box-shadow: 0px 2px 4px rgba($black,.2);
	transition: height .5s cubic-bezier(0.04, 0.83, 0.29, 1);

	&.is-open {
		height: 296px;
		&:before{
			opacity: 0;
		}
	}

	&:before {
		content: "";
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 56px;
		height: 56px;
		background-image: url('~assets/hamburger.svg');
		background-position: center;
		opacity: 0.6;
		transition: opacity .5s;
	}

	ul {
	}

	li {
		width: 100%;
		text-align: center;
		line-height: 48px;
		&:first-child{
			line-height: 56px;
		}
	}

	a {
		color: $white;
		display:block;
		position: relative;
		text-decoration: none;
		transition: all .2s;
		&.emphasized {
			font-weight: bolder;
			font-style: italic;
		}
		&:not(.emphasized) {
			font-family: 'Noto Sans JP';
		}
	}
}
}
</style>
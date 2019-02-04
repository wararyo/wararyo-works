<template>
	<nuxt-link v-if="post !== void 0" :to="makeLink($route.params.category,post.fields.slug)" class="work-card">
		<img :src="post.fields.eyecatch.fields.file.url+'?w=320'"
			:srcset="post.fields.eyecatch.fields.file.url+'?w=320 1x, '+
			post.fields.eyecatch.fields.file.url+'?w=640 2x'"
			alt="">
		<h3>{{post.fields.title}}</h3>
		<div class="work-card-detail">
			<tag-view :tags="post.fields.tags" />
			<time :datetime="post.fields.createdAt" class="createdAt">{{post.fields.createdAt}}</time>
		</div>
	</nuxt-link>
	<div v-else class="word-card">
		
	</div>
</template>

<script>
import TagView from '~/components/TagView.vue'
export default {
	props:['post'],
	components: {
		TagView,
	},
	methods: {
		makeLink: function(category,work) {
			if(category === void 0)
				category = process.env.defaultCategorySlug;
			return '/'+category+'/'+work;
		}
	}
}
</script>

<style lang="scss">
.work-card {
	display: block;
	text-decoration: none;
	width: 100%;
	border-radius: 4px;
	box-shadow: 0 3px 6px rgba(0,0,0,.2);
	transition: all .1s ease-out;
	color: #333;
	background-color: #FFF;
	&:hover {
		transform: translateY(-1px);
		box-shadow: 0 5px 10px rgba(0,0,0,.16);
	}
	img {
		border-radius: 4px 4px 0 0;
		width: 100%;
	}
	h3 {
		padding: 8px;
	}

	.tag-view {
		flex: 1;
		margin: 0;
		font-size: 0.8em;
	}
	time {
		color: #666;
		text-align: right;
	}
}
.work-card-detail {
	padding: 4px 16px 16px;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	overflow: hidden;
}
</style>
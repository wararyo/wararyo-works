<template>
	<nuxt-link v-if="post !== void 0" :to="makeLink($route.params.category,post.fields.slug)" class="work-card" :class="{'is-big' : isBig}">

		<!-- サムネ -->
		<img v-if="isBig" :src="post.fields.eyecatch.fields.file.url+'?w=640&fm=jpg'"
			:srcset="post.fields.eyecatch.fields.file.url+'?w=640&fm=jpg 1x, '+
			post.fields.eyecatch.fields.file.url+'?w=1280&fm=jpg 2x'"
			alt="サムネイル">
		<img v-else :src="post.fields.eyecatch.fields.file.url+'?w=320&fm=jpg'"
			:srcset="post.fields.eyecatch.fields.file.url+'?w=320&fm=jpg 1x, '+
			post.fields.eyecatch.fields.file.url+'?w=640&fm=jpg 2x'"
			alt="サムネイル">

		<h3>{{post.fields.title}}</h3>
		<div class="work-card-detail">
			<category-view v-if="isBig" :categories="categoriesWithoutDefault" />
			<tag-view :tags="post.fields.tags" />
			<time :datetime="post.fields.createdAt" class="createdAt">{{post.fields.createdAt}}</time>
		</div>
		<p v-if="isBig" class="work-excerpt">{{post.fields.excerpt}}</p>
	</nuxt-link>
	<div v-else class="word-card">
		
	</div>
</template>

<script>
import TagView from '~/components/TagView.vue'
import CategoryView from '~/components/CategoryView.vue'

export default {
	props:['post','isBig'],
	components: {
		TagView,
		CategoryView
	},
	methods: {
		makeLink: function(category,work) {
			if(category === void 0)
				category = process.env.defaultCategorySlug;
			return '/'+category+'/'+work;
		}
	},
	computed: {
		//Pick-Upを除いたカテゴリたち
		categoriesWithoutDefault () {
			return this.post.fields.categories.filter(x => {
				return x.fields.slug != process.env.defaultCategorySlug;
			});
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
		min-height: 180px;
		background-color: #DDD;
	}
	h3 {
		padding: 8px;
		overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    color: #333;
	}

	.tag-view {
		flex: 1;
		margin: 0;
		font-size: 0.8em;
	}
	time {
		color: #999;
		font-size: 0.8em;
		text-align: right;
	}
    &.is-big {
    	h3 {
			font-size: 1.4em;
			padding: 12px 8px;
		}
	}
}
.work-card-detail {
	padding: 4px 16px 16px;
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-end;
	align-items: center;
	align-content: center;
	overflow: hidden;
}
.work-excerpt {
	padding: 4px 24px 16px;
	text-align: left;
	font-size: 0.9em;
	white-space: pre-wrap;
	word-wrap: break-word;
	color: #666;
}
@include mq(sp){
	.work-card {
		img {
			min-height: 160px;
		}
		&.is-big {
			h3 {
				font-size: 1.2em;
			}
		}
	}
}
</style>
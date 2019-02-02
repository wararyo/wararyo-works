<template>
	<transition name="modal" appear>
	<div class="modal-wrapper" v-if="work !== void 0">
		<nuxt-link :to="makeLink($route.params.category)"
			class="modal-mask" />
		<div class="modal-content">
			<vue-markdown v-if="work.fields.eyecatchEmbed !== void 0" class="eyecatch-embed" :source="work.fields.eyecatchEmbed" />
			<img v-else class="eyecatch" :src="work.fields.eyecatch.fields.file.url" :alt="work.fields.title">
			<h1>{{work.fields.title}}</h1>
			<time :datetime="work.fields.createdAt" class="createdAt">{{work.fields.createdAt}}</time>
			<category-view :categories="work.fields.categories" />
			<tag-view :tags="work.fields.tags" />
			<vue-markdown class="work-content" :source="work.fields.content" />
		</div>
	</div>
	</transition>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import TagView from '~/components/TagView.vue'
import CategoryView from '~/components/CategoryView.vue'

export default {
	props: ['work'],
	components: {
		VueMarkdown,
		TagView,
		CategoryView
	},
	watch: {
		work: function (val) {
			if(val === void 0) {
				if(!canvasIsPlaying) {
					canvasIsPlaying = true;
					requestAnimationFrame(loop);
				}
			}
			else {
				canvasIsPlaying = false;
			}
		}
	},
	methods: {
		makeLink: function(category) {
			if(category === void 0)
				category = '';
			else if(category == process.env.defaultCategorySlug)
				category = '';
			return '/'+category;
		}
	}
}
</script>

<style lang="scss">
.modal-wrapper {
	position: fixed;
	z-index: 10;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.modal-mask {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,.4);

	&-enter-active {
		transition: all .6s cubic-bezier(0.04, 0.83, 0.29, 1);
	}
	&-leave-active {
		transition: all .4s cubic-bezier(0.04, 0.83, 0.29, 1) .6s;
	}
	&-enter {
		opacity: 0;
	}
	&-leave-to {
		opacity: 0;
	}
}
.modal-content {
	max-width: 800px;
	width: calc(100% - 64px);
	max-height: calc(100% - 64px);
	padding: 24px;
	position: relative;
	overflow-x: hidden;
	overflow-y: scroll;
	text-align: left;
	border-radius: 8px;
	background-color: #FAFAFA;
	box-shadow: 0 4px 8px rgba(0,0,0,.2);

	h1 {
		font-size: 1.8em;
		margin: 16px 0 0;
	}

	time {
		display: block;
		color: #666;
		text-align: right;
	}

	.category-view, .tag-view {
		display: inline-flex;
	}

	.eyecatch {
		width: 100%;
		border-radius: 2px;
		box-shadow: 0 2px 4px rgba(0,0,0,.2);
	}
	.eyecatch-embed iframe {
		width: 100%;
		height: 420px;
		background-color: rgba(0,0,0,.1);
		box-shadow: 0 2px 4px rgba(0,0,0,.2);
	}
	.work-content {
		margin-top: 16px;
	}
}
.modal {
	&-enter-active {
		transition: all .6s cubic-bezier(0.04, 0.83, 0.29, 1);
		.modal-mask {
			transition: all 1s cubic-bezier(0.04, 0.83, 0.29, 1);
		}
		.modal-content {
			transition: all .5s cubic-bezier(0.04, 0.83, 0.29, 1) .2s;
		}
	}
	&-leave-active {
		transition: all .0s cubic-bezier(0.04, 0.83, 0.29, 1) .6s;
		.modal-mask {
			transition: all .6s cubic-bezier(0.5, 0.0, 0.1, 1);
		}
		.modal-content {
			transition: all .4s cubic-bezier(0.04, 0.83, 0.29, 1);
		}
	}
	&-enter {
		.modal-mask {
			opacity: 0;
		}
		.modal-content {
			opacity: 0;
			transform: scale(0.9);
		}
	}
	&-leave-to {
		.modal-mask {
			opacity: 0;
		}
		.modal-content {
			opacity: 0;
			transform: scale(1.1);
		}
	}
}
</style>
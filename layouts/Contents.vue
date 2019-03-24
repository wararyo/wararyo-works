<!-- 作品たちを並べて表示する -->
<template>
	<transition-group
		v-if="posts.length > 0"
		tag="div"
		appear
		mode="out-in"
		class="contents"
		v-scroll="onScroll"
		@before-enter="beforeEnter"
		@after-enter="afterEnter"
		@enter-cancelled="afterEnter">
		<div class="contents-item" :class="{'is-big' : isBig}" v-if="visible || $isIE" v-for="(post,index) in posts" :key="post.fields.slug" :data-index="index">
			<work-card :post="post" :is-big="isBig"/>
		</div>
	</transition-group>
	<div v-else class="contents">
		<p class="contents-loading">Loading...</p>
	</div>
</template>

<script>
import WorkCard from '~/components/WorkCard.vue'

export default {
	components: {
		WorkCard
	},
	props: ['posts','isBig'],
	data: function(){
		return {
			visible: false
		};
	},
	methods: {
		// カードが時間差で出る
	    beforeEnter(el) {
			el.style.transitionDelay = 50 * parseInt(el.dataset.index, 10) + 'ms'
	    },
	    afterEnter(el) {
	    	el.style.transitionDelay = ''
	    },
	    onScroll: function(evt,el) {
	    	if(window.scrollY > 240) {
	    		this.visible = true;
	    	}
	    	else if(window.scrollY < 8) {
	    		this.visible = false;
	    	}
	    }
	}
}
</script>

<style lang="scss">
.contents {
	max-width: 1032px;
	min-height: calc(100vh - 226px);
	margin: 16px auto;
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	align-content: flex-start;
	flex-wrap: wrap;
}
.contents-item {
	width: 320px;
	margin: 12px;
	&.is-big {
		width: 492px;
		margin: 36px 12px;
		&:nth-of-type(2n+3) {
			margin-top: -256+36*2px;
		}
		&:nth-of-type(2) {
			margin-top: 256px;
		}
	}
}
.contents-loading {
	margin: 64px 0;
	animation: fadein 2s ease-in-out;
}

@keyframes fadein {
	0% {opacity: 0;}
	100% {opacity: 1;}
}

.v {

	&-enter-active {
		transition: opacity .5s ease-out, transform .5s cubic-bezier(0.04, 0.83, 0.29, 1);
	}

	&-leave-active {

	}

	&-enter {
		opacity: 0;
		transform: translateY(32px);
	}

	&-leave-to {
		opacity: 0;
	}

	&-move {
		transition: all .5s cubic-bezier(0.04, 0.83, 0.29, 1);
	}
}

@include mq(pc-narrow) {
	.contents {
		max-width: 1016px;
	}
	.contents-item {
		margin: 8px;
	}
	&.is-big {
		width: 492px;
		&:nth-of-type(2n+3) {
			margin-top: -216px;
		}
		&:nth-of-type(2) {
			margin-top: 240px;
		}
	}
}

@include mq(tl){
	.contents {
		justify-content: center;
	}
	.contents-item {
		&.is-big {
			&:nth-of-type(2n+3) {
				margin-top: 12px;
			}
			&:nth-of-type(2) {
				margin-top: 12px;
			}
		}
	}
}

@include mq(sp){
	.contents {
		justify-content: center;
		min-height: calc(100vh - 140px);
	}
	.contents-item {
		&.is-big {
			width: 320px;
			&:nth-of-type(2n+3) {
				margin-top: 12px;
			}
			&:nth-of-type(2) {
				margin-top: 12px;
			}
		}
	}
}
</style>
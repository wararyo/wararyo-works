<!-- 作品たちを並べて表示する -->
<template>
	<transition-group
		tag="div"
		appear
		mode="out-in"
		class="contents"
		v-scroll="onScroll"
		@before-enter="beforeEnter"
		@after-enter="afterEnter"
		@enter-cancelled="afterEnter">
		<p :key="'loading'" class="contents-loading" :class="{'is-loading': (posts.length == 0)}">Loading...</p>
		<div class="contents-item" :class="{'is-big' : isBig}" v-if="visible || $isIE" v-for="(post,index) in posts" :key="post.fields.slug" :data-index="index">
			<work-card :post="post" :is-big="isBig"/>
		</div>
	</transition-group>
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
			el.style.transitionDelay = (this.isBig?100:50) * parseInt(el.dataset.index, 10) + 'ms'
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
		position: relative;

		&:nth-of-type(2) {
			margin-top: 256px;
		}
		&:nth-of-type(2n+4) {
			margin-top: 96px;
		}
		&:nth-of-type(2n+3) {
			margin-top: -128px;
		}

		// Bigな作品の間に入る点
		&:nth-of-type(n+2):before {
			content: "";
			display: block;
			position: absolute;
			left: 50%;
			transform: translate(-50%,-50%);
		}
		&:nth-of-type(2):before {
			background-image: url('~assets/icon-black.svg');
			background-size: contain;
			left: calc(50% - 24px);
			top: -118-24px;
			width: 48px;
			height: 48px;
			opacity: 0.3;
			animation: rotate-icon 30s linear infinite;
		}
		&:nth-of-type(n+3):before {
			top: -64px;
			width: 4px;
			height: 4px;
			background-color: rgba($blue-gray,.3);
			border-radius: 50%;
		}
	}
}
.contents-loading {
	position: absolute;
	top: 96px;
	left: 50%;
	transform: translateX(-50%);
	text-align: center;
	opacity: 0;
	&.is-loading {
		opacity: 1;
		transition: opacity 2s 1s;
	}
}

@keyframes rotate-icon {
	0% {transform: rotate(0deg);}
	100%{transform: rotate(359deg);}
}

.v {

	&-enter-active {
		transition: opacity .5s ease-out, transform .5s cubic-bezier(0.04, 0.83, 0.29, 1);
	}

	&-leave-active {
		transition: opacity .1s ease-out;
	}

	&-enter {
		opacity: 0;
		transform: translateY(32px);
	}

	&-leave-to {
		opacity: 0;
	}

	// &-move {
	// 	transition: all .5s cubic-bezier(0.04, 0.83, 0.29, 1);
	// }
}

@include mq(pc-narrow) {
	.contents-item {
		margin: 8px;
		&.is-big {
			margin: 36px 8px;
			width: calc(50% - 16px);
		}
	}
}

@include mq(tl){
	.contents {
		flex: 1;
		justify-content: center;
	}
	.contents-item {
		&.is-big {
			margin: 24px 12px !important;
			&:before {
				display: none !important;
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
			margin: 24px 12px !important;
			&:before {
				display: none !important;
			}
		}
	}
}
</style>
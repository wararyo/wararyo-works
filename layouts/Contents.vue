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
		<div class="contents-item" v-if="visible" v-for="(post,index) in posts" :key="post.fields.slug" :data-index="index">
			<work-card :post="post"/>
		</div>
	</transition-group>
	<div v-else class="contents">
		&nbsp;
	</div>
</template>

<script>
import WorkCard from '~/components/WorkCard.vue'

export default {
	components: {
		WorkCard
	},
	props: ['posts'],
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
	    }
	}
}
</script>

<style lang="scss">
.contents {
	max-width: 1032px;
	min-height: calc(100vh - 240px);
	margin: 16px auto;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
}
.contents-item {
	width: 320px;
	margin: 12px;
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
</style>
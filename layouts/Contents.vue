<!-- 作品たちを並べて表示する -->
<template>
	<transition-group tag="div" appear mode="out-in" class="contents">
		<div class="contents-item" v-for="post in posts" :key="post.fields.slug">
			<work-card :post="post"/>
		</div>
	</transition-group>
</template>

<script>
import WorkCard from '~/components/WorkCard.vue'

export default {
	components: {
		WorkCard
	},
	props: ['posts']
}
</script>

<style lang="scss">
.contents {
	max-width: 1032px;
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
		transition: all .5s cubic-bezier(0.04, 0.83, 0.29, 1);
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
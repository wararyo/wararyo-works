<!-- 作品たちを並べて表示する -->
<template>
	<div class="contents">
		<div class="contents-item" v-for="post in posts" :key="post.fields.slug">
			<work-card :post="post"/>
		</div>
	</div>
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
</style>
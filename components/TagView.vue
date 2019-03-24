<template>
	<ul class="tag-view" v-if="tags !== void 0">
		<li v-for="tag in tags" :key="tag">{{tag}}</li>
	</ul>
</template>

<script>
export default {
	props: ['tags']
}
</script>

<style lang="scss">
.tag-view {
	margin: 8px 0;
	display: flex;
	//flex-wrap: wrap;
	justify-content: flex-start;

	li {
		margin-right: 4px;
		padding: 2px 6px;
		border-radius: 4px;
		color: rgba(0,0,0,.4);
		border: 1px solid rgba(0,0,0,.4);
		font-size: 0.8em;
	}
}
</style>
<template>
	<ul class="category-view" v-if="categories !== void 0">
		<li v-for="c in categories" :key="c">{{c.fields.name}}</li>
	</ul>
</template>

<script>
export default {
	props: ['categories']
}
</script>

<style lang="scss">
.category-view {
	margin: 8px 0;
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;

	li {
		margin-right: 4px;
		padding: 2px 6px;
		border-radius: 4px;
		color: #FFFFFF;
		border: 1px solid #444;
		background-color: #444;
		font-size: 0.8em;
	}
}
</style>
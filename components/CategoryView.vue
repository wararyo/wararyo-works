<template>
	<ul class="category-view" v-if="categories !== void 0">
		<li v-for="c in categories" :key="c.fields.slug"><span :style="{backgroundColor: c.fields.color}">{{c.fields.name}}</span></li>
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

	li span {
		display: block;
		margin-right: 4px;
		padding: 2px 8px;
		border-radius: 4px;
		color: #FFFFFF;
		background-color: #444;
		font-size: 0.8em;
		text-shadow: 0 1px 2px rgba($black,.4);
		box-shadow: 0 2px 4px rgba($black,.2);
	}
}
</style>
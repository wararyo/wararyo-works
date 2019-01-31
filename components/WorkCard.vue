<template>
	<div class="work-card">
		<img :src="post.fields.eyecatch.fields.file.url" alt="">
		<h3>{{post.fields.title}}</h3>
	</div>
</template>

<script>
	export default {
		props:['post']
	}
</script>

<style lang="scss">
.work-card {
	width: 100%;
	img {
		width: 100%;
	}
}
</style>
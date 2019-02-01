<template>
	<div class="work-card">
		<img :src="post.fields.eyecatch.fields.file.url" alt="">
		<h3>{{post.fields.title}}</h3>
		<div class="work-card-detail">

		</div>
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
	border-radius: 4px;
	box-shadow: 0 3px 6px rgba(0,0,0,.2);
	img {
		border-radius: 4px 4px 0 0;
		width: 100%;
	}
	h3 {
		padding: 8px;
	}
}
.work-card-detail {
	padding: 16px;
}
</style>
<template>
	<transition name="modal" appear>
	<div class="modal-wrapper" v-if="work !== void 0">
		<nuxt-link :to="makeLink($route.params.category)"
			class="modal-mask" />
		<div class="modal-content">
			<h3>{{work.fields.title}}</h3>
		</div>
	</div>
	</transition>
</template>

<script>
export default {
	props: ['work'],

	methods: {
		makeLink: function(category) {
			if(category === void 0)
				category = '';
			return '/'+category;
		}
	}
}
</script>

<style lang="scss">
.modal-wrapper {
	position: fixed;
	z-index: 10;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.modal-mask {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,.4);

	&-enter-active {
		transition: all .6s cubic-bezier(0.04, 0.83, 0.29, 1);
	}
	&-leave-active {
		transition: all .4s cubic-bezier(0.04, 0.83, 0.29, 1) .6s;
	}
	&-enter {
		opacity: 0;
	}
	&-leave-to {
		opacity: 0;
	}
}
.modal-content {
	max-width: 800px;
	width: calc(100% - 64px);
	max-height: calc(100% - 64px);
	padding: 24px;
	position: relative;
	overflow-x: hidden;
	overflow-y: scroll;
	border-radius: 4px;
	background-color: #FAFAFA;
	box-shadow: 0 4px 8px rgba(0,0,0,.2);
}
.modal {
	&-enter-active {
		transition: all .6s cubic-bezier(0.04, 0.83, 0.29, 1);
		.modal-mask {
			transition: all 1s cubic-bezier(0.04, 0.83, 0.29, 1);
		}
		.modal-content {
			transition: all .5s cubic-bezier(0.04, 0.83, 0.29, 1) .2s;
		}
	}
	&-leave-active {
		transition: all .0s cubic-bezier(0.04, 0.83, 0.29, 1) .8s;
		.modal-mask {
			transition: all .8s cubic-bezier(0.5, 0.0, 0.1, 1);
		}
		.modal-content {
			transition: all .4s cubic-bezier(0.04, 0.83, 0.29, 1);
		}
	}
	&-enter {
		.modal-mask {
			opacity: 0;
		}
		.modal-content {
			opacity: 0;
			transform: scale(0.9);
		}
	}
	&-leave-to {
		.modal-mask {
			opacity: 0;
		}
		.modal-content {
			opacity: 0;
			transform: scale(1.1);
		}
	}
}
</style>
import Vue from 'vue';

function isIE() {
	let userAgent = window.navigator.userAgent.toLowerCase();
	return (userAgent.indexOf('msie') != -1 ||
		userAgent.indexOf('trident') != -1);
}

Vue.prototype.$isIE = isIE();
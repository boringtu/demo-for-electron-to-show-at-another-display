<template lang="pug">
.root
	el-button(type="primary" @click="handleOpenNewPage('about')") 打开 About
	el-button(type="primary" @click="handleOpenNewPage('baidu')") 打开 百度
</template>

<script>
export default {
	mounted() {
	},
	beforeDestroy() {
	},
    methods: {
		handleOpenNewPage(type) {
			let url;
			if (type === 'about') {
				url = new URL(location.href);
				url.hash = '#/about';
				url = url.href;
			} else if (type === 'baidu') {
				url = 'https://www.baidu.com';
			}
			window.openUrl(url);
		},
    },
};
</script>

<style lang="sass" scoped>
.root
	height: 100vh
	display: flex
	justify-content: center
	align-items: center
</style>

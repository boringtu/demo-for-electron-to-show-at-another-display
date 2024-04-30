const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
	publicPath: './',
	transpileDependencies: true,
	// productionSourceMap: false,
	// configureWebpack: {
	// 	externals: {
	// 		electron: 'require("electron")',
	// 	},
	// },
});

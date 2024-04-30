import Vue from 'vue';

import ElementUI from 'element-ui';
Vue.use(ElementUI);
// import '@/assets/styles/element-ui/index.css';
import 'element-ui/lib/theme-chalk/index.css';
import elementUIInit from '@/assets/js/element-ui-init';
elementUIInit();

import '@/assets/styles/reset.css';

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
moment.updateLocale('zh-cn', {
	week: {
		dow: 1, // First day of week is Monday
		doy: 7, // First week of year must contain 1 January (7 + 1 - 1)
	},
});

import App from './App';
import router from './router';
import { sleep } from '@/libs/utils';

Vue.config.productionTip = false;

// router.beforeEach(async (to, from, next) => {
// 	// 错开同步的执行栈，保证 App.vue 组件实例已创建
// 	await sleep();
// 	// 加载下一页内容
// 	next();
// });

new Vue({
	router,
	render: (h) => h(App),
	beforeCreate() {
		Vue.prototype.$bus = this;
	},
}).$mount('#app');

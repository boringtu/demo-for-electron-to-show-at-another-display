import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '@/views/home';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		component: HomeView,
	},
	{
		path: '/about',
		component: () => import('@/views/about'),
	},
];

const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes,
});

export default router;

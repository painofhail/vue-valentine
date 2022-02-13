import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './routes';
import firebase from 'firebase/app';

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

router.beforeEach((to, from, next) => {
	const currentUser = firebase.auth().currentUser;	// проверяем, есть ли пользователь
	const requireAuth = to.matched.some(record => record.meta.auth); // есть в ли массиве роутов поле auth

	if (requireAuth && !currentUser) {
		next('/auth?message=login')
	} else {
		next();
	}
})

export default router;

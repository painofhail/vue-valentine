export const routes = [
	// ==================== AUTH =======================
	{
		path: '/auth',
		name: 'auth',
		meta: { layout: 'auth' },
		component: () => import('../views/Auth.vue')
	},
	// {
	// 	path: '/register',
	// 	name: 'register',
	// 	meta: { layout: 'auth' },
	// 	component: () => import('../views/Register.vue')
	// },
	// ==================== MAIN =======================
	{
		path: '/',
		name: 'valentine',
		meta: { layout: 'main', auth: true },
		component: () => import('../views/Valentine.vue')
	},
];

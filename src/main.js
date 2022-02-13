// ======================= Libraries ==========================
import Vue from 'vue';
import 'materialize-css/dist/js/materialize';

// ======================= Sources ============================
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';

// ================== Custom Components =======================
import loader from '@/components/Loader';
import Heart from '@/components/Heart';

Vue.component('Loader', loader);
Vue.component('Heart', Heart);

// ======================= Plugins ============================
import Vuelidate from 'vuelidate';
import VueMeta from 'vue-meta'
import messagePlugin from '@/utils/message.plugin';

Vue.use(Vuelidate);
Vue.use(VueMeta)
Vue.use(messagePlugin);

// ======================= Firebase ===========================
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// Your web app's Firebase configuration
firebase.initializeApp({
  apiKey: "AIzaSyA3INRb8AkA9wNYo0c8E1jm5mCn5hEybrs",
  authDomain: "vue-valentine.firebaseapp.com",
  databaseURL: "https://vue-valentine-default-rtdb.firebaseio.com",
  projectId: "vue-valentine",
  storageBucket: "vue-valentine.appspot.com",
  messagingSenderId: "443764134385",
  appId: "1:443764134385:web:ddae6582fe495c91993450"
});


let app;

// If firebase find local user data, initialize Vue App
firebase.auth().onAuthStateChanged(() => {
	// check if already initizlized
	if (!app) {
		app = new Vue({
			router,
			store,
			render: h => h(App)
		}).$mount('#app') // mount to div#app
	}
});

Vue.config.productionTip = false;

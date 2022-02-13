import firebase from "@firebase/app";

export default {
	state: {
		userInfo: {}
	},
	mutations: {
		setUserInfo (state, info) {
			state.userInfo = info;
		},
		clearUserInfo (state) {
			state.userInfo = {}
		}
	},
	actions: {
		async fetchUserInfo ({dispatch, commit}) {
			try {
				const uid = await dispatch('getUserId');
				const data = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val();
				commit('setUserInfo', data);
			} catch (e) {
				commit('setError', e);
				throw(e);
			}
		},
	},
	getters: {
		userInfo: s => s.userInfo
	}
}

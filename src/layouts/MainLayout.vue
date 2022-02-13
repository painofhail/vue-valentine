<template>
	<div>			
		<Loader v-if="loading" />
		<Heart v-else />
	</div>
</template>

<script>
	import messages from '@/utils/messages';

	export default {
		name: 'MainLayout',
		data () {
			return {
				loading: true
			}
		},			
		computed: {
			error () {
				return this.$store.getters.error;
			},
			userName () {
				return this.$store.getters.userInfo.name ? this.$store.getters.userInfo.name : null;
			}
		},
		watch: {
			error (firebaseError) {
				this.$error(messages[firebaseError.code] || 'Что-то пошло не так...');
			}
		},
		async mounted () {
			if (!Object.keys(this.$store.getters.userInfo).length) {
				await this.$store.dispatch('fetchUserInfo');
			}

			this.loading = false;
		}
	}
</script>

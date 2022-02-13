<template>
	<div>
		<Loader v-if="loading" />
	</div>
</template>

<script>
	export default {
		name: 'Valentine',
		metaInfo () {
			return {
				title: this.$title('Valentine')
			}
		},
		data: () => ({
			loading: true
		}),
	}
</script>

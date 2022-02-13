<template>
	<div class="heart-container">
		<h1 class="heart-label">Тыкни в сырдечко ^_^</h1>
		<div class="heart" :class="heartClass" @click="heartStatus = !heartStatus"></div>
		<h2 class="heart-after-label" :class="showText">С Днём Святого Валентина!</h2>
	</div>	
</template>

<script>
	export default {
		name: 'Heart',
		data() {
			return {
				heartStatus: false
			}
		},
		computed: {
			heartClass() {
				return !this.heartStatus ? "no-animation" : "start-animation";
			},
			showText() {
				return !this.heartStatus ? null : "show";
			}
		}
	}

</script>

<template>
<div>
	<div class="ta-c mt-10">
		<h1 class="fz-60">{{ name }}</h1>
		<div class="fz-25 mt-5">
			Deploy on the platform made for {{ name }}
		</div>
	</div>
</div>
</template>

<script>
export default {
	data() {
		return {
		}
	},
	computed: {
		name() {
			return this.$route.params.name
		},
	},
}
</script>
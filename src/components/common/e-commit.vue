<template>
<a v-if="href && info" :href="href" target="_blank" class="b">
	{{ info.message }}
</a>
</template>

<script>
export default {
	props: {
		info: Object,
	},
	computed: {
		projInfo() {
			return this.$store.state.projectInfo
		},
		href() {
			const { namespace, name } = this.projInfo.repo || {}
			if(!name) return null
			return `https://github.com/${namespace}/${name}/commit/${this.info.hash}`
		},
	},
}
</script>
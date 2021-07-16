<template>
<div class="d-flex al-c">
	<v-icon size="18">mdi-github</v-icon>
	<a v-if="branch" :href="href" class="ml-2 b u" target="_blank">
		{{ branch }}
	</a>
</div>
</template>

<script>
export default {
	props: {
		info: Object,
	},
	computed: {
		projInfo() {
			return this.info || this.$store.state.projectInfo
		},
		branch() {
			const config = this.info ? this.info.buildConfig : this.projInfo.config
			return config.currentBranch
		},
		href() {
			const { namespace, name } = this.projInfo.repo
			return `https://github.com/${namespace}/${name}/tree/${this.branch}`
		},
	}
}
</script>
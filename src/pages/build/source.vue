<template>
<v-card outlined>
	<div class="pd-20">
		<v-treeview :items="dirList" />
	</div>
</v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
	data() {
		const { taskId } = this.$route.params
		return {
			taskId,
			dirList: [],
		}
	},
	computed: {
		...mapState({
			projInfo: s => s.projectInfo,
		}),
	},
	mounted() {
		this.getOutput()
	},
	methods: {
		async getOutput() {
			const { data } = await this.$http.get(`/artifact/deployment/${this.taskId}/output`, {
				params: {
					// rootPath,
				},
			})
			console.log(data)
		},
	}
}
</script>
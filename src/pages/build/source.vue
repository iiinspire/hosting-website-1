<template>
<v-card outlined>
	<div class="pd-20">
		<v-skeleton-loader type="article" v-if="!dirList.length" />
		<v-treeview :load-children="getFiles"
			dense :items="dirList" v-else />
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
		this.getFiles()
	},
	methods: {
		async getFiles(item) {
			const params = {}
			if(item) {
				params.cid = item.hash
			}
			const { data } = await this.$http.get(`/artifact/deployment/${this.taskId}/output`, {
				params,
			})
			data.forEach(it => {
				it.id = it.hash
				if(it.type == 'Directory') {
					it.type = 'dir'
					it.children = []
				}
			})
			if(item) {
				item.children.push(...data)
			} else {
				this.dirList = data
			}
		},
	}
}
</script>
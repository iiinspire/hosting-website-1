<template>
<v-card outlined>
	<div class="pd-20">
		<v-row>
			<v-col cols="12" md="5">
				<v-skeleton-loader type="article" v-if="!dirList.length" />
				<v-treeview :load-children="getFiles"
					@update:active="onActive"
					activatable hoverable open-on-click
					dense :items="dirList" v-else>
					<template v-slot:prepend="{ item, open }">
						<v-icon v-if="item.type == 'dir'">
							{{ open ? 'mdi-folder-open' : 'mdi-folder' }}
						</v-icon>
						<v-icon v-else>
							{{ files[item.ftype] || 'mdi-file' }}
						</v-icon>
					</template>
				</v-treeview>
			</v-col>
			<v-col cols="12" md="7" v-if="openCid">
				<v-skeleton-loader type="article" v-if="loading" />
				<div v-else class="fz-14 lh-2 ov-a" style="max-height: 80vh;">
					{{ result }}
				</div>
			</v-col>
		</v-row>
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
			files: {
				html: 'mdi-language-html5',
				js: 'mdi-nodejs',
				css: 'mdi-language-css3',
				json: 'mdi-code-json',
				md: 'mdi-language-markdown',
				pdf: 'mdi-file-pdf',
				ico: 'mdi-file-image',
				png: 'mdi-file-image',
				svg: 'mdi-file-image',
				txt: 'mdi-file-document-outline',
				xls: 'mdi-file-excel',
			},
			result: null,
			loading: false,
			openCid: null,
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
		async onActive(it) {
			const [hash, name] = it[0].split(',')
			try {
				this.openCid = hash
				this.loading = true
				this.result = ''
				const { data } = await this.$http.get(`/artifact/deployment/${hash}/file/${name}`)
				// console.log(data)
				this.result = data
			} catch (error) {
				console.log(error)
			}
			this.loading = false
		},
		async getFiles(item) {
			const params = {}
			if(item) {
				params.cid = item.hash
			}
			const { data } = await this.$http.get(`/artifact/deployment/${this.taskId}/output`, {
				params,
			})
			data.forEach(it => {
				it.id = it.hash + ',' + it.name
				if(it.type == 'Directory') {
					it.type = 'dir'
					it.children = []
				} else {
					it.ftype = /\.(\w+)$/.exec(it.name)[1]
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
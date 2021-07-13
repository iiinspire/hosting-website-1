<style lang="scss">
.logs-wrap {
	div {
		padding: 6px 20px;
		&:hover {
			background: #eee;
		}
	}
}
</style>
<template>
<div>
	<v-card outlined>
		<div class="pd-20" v-if="!logs.length">
			<v-skeleton-loader type="card" />
		</div>
		<div class="pd-20" v-else>
			<v-row class="pos-r">
				<v-col cols="12" md="4">
					<div class="bd-1 bdrs-5 pd-20">
						<h2>Building</h2>
						<div class="fz-12 gray mt-2 mb-5">
							<p>todo</p>
						</div>
						<v-btn outlined block color="#888" @click="scrollToLog">View Logs</v-btn>
					</div>

					<div class="mt-5">
						<div class="d-flex">
							<v-btn color="error" class="flex-1 mr-5" v-if="['SUCCESS', 'FAIL'].indexOf(state) > -1"
								:loading="deploying"
								@click="onDeploy">
								Redeploy
							</v-btn>
							<v-btn color="primary" class="flex-1">Visit</v-btn>
						</div>
					</div>
				</v-col>
				<v-col cols="12" md="8">

				</v-col>
			</v-row>

			<v-divider class="mt-5 mb-5"></v-divider>
			<div class="d-flex al-c">
				<span>Build Logs</span>
				<v-btn class="ml-auto" outlined color="#888"
					v-if="logs.length"
					v-clipboard="logs.join('\n')" @success="onCopied">
					<v-icon size="14" class="mr-2">mdi-content-copy</v-icon>
					<span class="fz-13">Copy to Clipboard</span>
				</v-btn>
			</div>
			
			<div class="bd-1 bdrs-5 bg-f5 mt-5 fz-13 gray-6 ov-a" ref="con"
				style="max-height: 72vh;">
				<div class="mt-5 mb-5 logs-wrap">
					<div v-for="(it, i) in logs" :key="i">
						{{ it }}
					</div>
				</div>
			</div>
		</div>
	</v-card>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	computed: {
		...mapState({
			projInfo: s => s.projectInfo,
			buildInfo: s => s.buildInfo,
		}),
		asMobile() {
			return this.$vuetify.breakpoint.smAndDown
		},
		projId() {
			return this.$route.params.projId
		},
		taskId() {
			return this.$route.params.taskId
		},
	},
	data() {
		return {
			logs: [],
			deploying: false,
			state: null,
		}
	},
	watch: {
		taskId() {
			this.getLog()
			this.getProjectInfo()
		},
		buildInfo({ data }) {
			if(data.taskId == this.taskId) {
				// console.log(name)
			}
			this.state = data.state
			const last = this.logs[this.logs.length - 1]
			if(last != data.content) {
				this.logs.push(data.content)
				this.goLogEnd()
			}
		},
	},
	mounted() {
		this.getLog()
		if(this.projInfo.id != this.projId) {
			this.getProjectInfo()
		}
	},
	methods: {
		async getProjectInfo() {
			const data = await this.$store.dispatch('getProjectInfo', this.projId)
			this.state = data.lastBuild.state
		},
		onCopied() {
			this.$notice('copied')
		},
		async onDeploy() {
			try {
				let html = 'You are about to create a new Deployment with the same source code as your current Deployment, but with the newest configuration from your Project Settings.'
				// html += '<p class="mt-3">The following Domains will point to your new Deployment:</p>'
				await this.$confirm(html, 'Redeploy to Production', {
					confirmText: 'Redeploy',
				})
				this.deploying = true
				const { data } = await this.$http.post(`/project/${this.projId}/build`)
				this.$router.replace(`/build/${this.projId}/${data.taskId}/overview`)
			} catch (error) {
				console.log(error, 'build err')
			}
			this.deploying = false
		},
		async getLog() {
			try {
				this.logs = []
				const { data } = await this.$http.get(`/project/${this.taskId}/deployment/log`)
				console.log(data)
				let lines = []
				for(const it of data) {
					it.content.split(/\n/).forEach(line => {
						lines.push(line)
					})
				}
				this.logs = lines
				this.goLogEnd()
			} catch (error) {
				console.log(error, 'log')
			}
		},
		goLogEnd() {
			this.$nextTick(() => {
				const el = this.$refs.con
				if(el) el.scrollTo(0, el.scrollHeight)
			})
		},
		scrollToLog() {
			const el = this.$refs.con
			if(el) window.scrollTo(0, el.offsetTop)
			this.goLogEnd()
		},
	}
}
</script>
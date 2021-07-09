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
		<div class="pd-20">
			<v-row class="pos-r">
				<v-col cols="12" md="4">
					<div class="bd-1 bdrs-5 pd-20">
						<h2>Build Failed</h2>
						<div class="fz-12 gray mt-2 mb-5">
							<p>Local:   http://localhost:8080/</p>
							<p>DONE  Compiled successfully in 324ms</p>
							<p>DONE  Compiled successfully in 324ms</p>
						</div>
						<v-btn outlined block color="#888" @click="scrollToLog">View Logs</v-btn>
					</div>

					<div class="mt-5">
						<div class="d-flex">
							<v-btn color="error" class="flex-1" :loading="deploying"
								>
								Redeploy
							</v-btn>
							<v-btn color="primary" class="ml-5 flex-1">Visit</v-btn>
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
			<v-skeleton-loader v-if="!logs.length" type="article" />
			<div class="bd-1 bdrs-5 bg-f5 mt-5 fz-13 gray-6 ov-a" v-else ref="con"
				style="max-height: 70vh;">
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
export default {
	computed: {
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
		}
	},
	watch: {
		taskId() {
			this.getLog()
		},
	},
	mounted() {
		this.getLog()
	},
	methods: {
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
				el.scrollTo(0, el.scrollHeight)
			})
		},
		scrollToLog() {
			const el = this.$refs.con
			window.scrollTo(0, el.offsetTop)
			this.goLogEnd()
		},
	}
}
</script>
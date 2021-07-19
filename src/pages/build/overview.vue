<style lang="scss">
.logs-wrap {
	div {
		padding: 6px 20px;
		&:hover {
			background: #eee;
		}
	}
}
@media screen and (min-width: 960px) {
	.v-application .build-btn-wrap {
		position: absolute;
		display: block!important;
		width: 150px;
		top: 0;
		right: 0;
		padding: 15px;
		button {
			width: 100%;
			margin-bottom: 20px;
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
					<div class="bd-1 bdrs-5 pos-r">
						<v-img src="img/proj-bg-def.png" height="220px"></v-img>
						<v-progress-circular class="pos-center" v-if="isRunning"
							:size="50"
							color="#f3a536"
							indeterminate
							></v-progress-circular>
					</div>

					<div class="mt-5">
						<div class="d-flex build-btn-wrap">
							<!-- :disabled="isRunning" -->
							<v-btn color="error" class="flex-1 mr-5" 
								:loading="deploying"
								@click="onDeploy">
								Redeploy
							</v-btn>
							<v-btn :disabled="!isSuccess" color="primary" class="flex-1" @click="onVisit">
								Visit
							</v-btn>
						</div>
					</div>
				</v-col>
				<v-col cols="12" md="6">
					<div class="pd-20" v-if="!info.taskId">
						<v-skeleton-loader type="article" />
					</div>
					<div class="fz-14" v-else>
						<div class="d-flex">
							<div class="flex-1">
								<div class="label-1">Status</div>
								<e-status :val="state"></e-status>
							</div>
							<div class="flex-1">
								<div class="label-1">Environment</div>
								<div>Production</div>
							</div>
							<div class="flex-1">
								<div class="label-1">Duration</div>
								<div>
									<e-time :endAt="info.endAt || nowDate">{{ info.createAt }}</e-time>
								</div>
							</div>
							<div class="flex-1">
								<div class="label-1">Created</div>
								<div>
									<e-time>{{ info.createAt }}</e-time>
								</div>
							</div>
						</div>

						<div class="label-1 mt-6">Domains</div>
						<div>
							<e-domain :val="info.domain" :disabled="!isSuccess"></e-domain>
						</div>

						<div class="label-1 mt-6">
							Branch
						</div>
						<e-branch :info="info"></e-branch>
						
						<div class="mt-2">
							<e-commit :info="info.commits"></e-commit>
						</div>
					</div>
				</v-col>
			</v-row>

			<v-divider class="mt-5 mb-5"></v-divider>
			<div class="d-flex al-c">
				<span class="fz-20">Build Logs</span>
				<v-btn class="ml-auto" outlined color="#888"
					v-if="logs.length"
					v-clipboard="logs.join('\n')" @success="onCopied">
					<v-icon size="14" class="mr-2">mdi-content-copy</v-icon>
					<span class="fz-13">Copy to Clipboard</span>
				</v-btn>
			</div>
			
			<div class="pd-20" v-if="!logs.length">
				<v-skeleton-loader type="card" />
			</div>
			<div v-else class="bd-1 bdrs-5 bg-f5 mt-5 fz-13 gray-6 ov-a" ref="con"
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
			nowDate: s => s.nowDate,
		}),
		asMobile() {
			return this.$vuetify.breakpoint.smAndDown
		},
		projName() {
			return this.$route.params.projName
		},
		taskId() {
			return this.$route.params.taskId
		},
		isRunning() {
			return this.state == 'running'
		},
		isSuccess() {
			return this.state == 'success'
		},
	},
	data() {
		return {
			info: {},
			logs: [],
			deploying: false,
			state: '',
		}
	},
	watch: {
		taskId() {
			this.initData()
		},
		buildInfo({ name, data }) {
			if(data.taskId == this.taskId) {
				console.log(this.taskId, name)
				this.state = data.state.toLowerCase()
				const last = this.logs[this.logs.length - 1]
				if(name == 'log' && last != data.content) {
					this.logs.push(data.content)
					this.goLogEnd()
				}
			}
		},
	},
	mounted() {
		this.initData()
	},
	methods: {
		onVisit() {
			const { domain } = this.info
			if(domain) window.open('//' + domain)
		},
		async initData() {
			try {
				const { data } = await this.$http.get(`/project/task/object/${this.taskId}`)
				this.info = data.task
				this.state = data.task.state.toLowerCase()
				let lines = []
				for(const it of data.log) {
					it.content.split(/\n/).forEach(line => {
						lines.push(line)
					})
				}
				this.logs = lines
				this.goLogEnd()
				// if(this.info.projectId != this.projInfo.id) {
				// 	await this.$store.dispatch('getProjectInfo', this.info.projectId)
				// }
			} catch (error) {
				console.log(error)
			}
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
				const { data } = await this.$http.post(`/project/${this.info.projectId}/build`)
				this.$router.replace(`/build/${this.projName}/${data.taskId}/overview`)
			} catch (error) {
				console.log(error, 'build err')
			}
			this.deploying = false
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
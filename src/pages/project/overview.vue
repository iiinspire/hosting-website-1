<style>
</style>

<template>
<div>
	<v-card outlined>
		<e-card-head-1 :title="info.name || '--'">
			<div class="">
				<v-icon color="#fff" size="16">mdi-github</v-icon>
				<span class="ml-1">{{ info.repo ? info.repo.pathPre : '--' }}</span>
			</div>
			<template #right>
				<v-btn small depressed color="primary" @click="onVisit"
					v-if="info.id">
					Visit
				</v-btn>
			</template>
		</e-card-head-1>
		
		<div class="pd-20">
			<div class="d-flex al-c flex-wrap">
				<div class="mr-auto">
					<div class="fz-18">Production Deploymen</div>
					<div class="fz-13 mt-1 gray">The deployment that is available to your visitors</div>
				</div>
				<div v-if="info.id" class="d-flex al-c" :class="{
					'mt-4': $vuetify.breakpoint.mobile,
				}">
					<v-btn small class="mr-5" 
						@click="onView('log')">
						View Build Logs
					</v-btn>
					<v-btn small 
						@click="onView('domain')">
						View Domains
					</v-btn>
				</div>
			</div>

			<div class="mt-5" :class="asMobile ? 'bdt-1 pt-5' : 'bd-1 pd-15'">
				<v-row>
					<v-col cols="12" md="6">
						<v-img src="img/proj-bg-def.png" :height="asMobile ? 160 : 300"></v-img>
					</v-col>
					<v-col cols="12" md="6" class="fz-14">
						<template v-if="info.id">
							<div class="label-1">
								Deployment
							</div>
							<div v-if="info.latest" class="line-1">
								<e-domain :val="info.latest.domain"></e-domain>
							</div>

							<div class="label-1 mt-6">
								Domains
							</div>
							<div v-for="(it, i) in info.domains" :key="i">
								<e-domain :val="info.domains[i].domain"></e-domain>
							</div>

							<div class="d-flex mt-6">
								<div class="flex-1">
									<div class="label-1">State</div>
									<e-status :val="state"></e-status>
								</div>
								<div class="flex-1">
									<div class="label-1">Created</div>
									<div>
										<e-time>{{ info.repo.updateAt }}</e-time>
									</div>
								</div>
							</div>

							<div class="label-1 mt-6">
								Branch
							</div>
							<e-branch></e-branch>
							
							<div class="mt-2">
								<e-commit :info="info.latest.commits"></e-commit>
							</div>
						</template>
						<v-skeleton-loader v-else type="article" />
					</v-col>
				</v-row>
			</div>
		</div>

	</v-card>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	data() {
		const { id } = this.$route.params
		return {
			id,
		}
	},
	computed: {
		...mapState({
			userInfo: s => s.userInfo,
			info: s => s.projectInfo,
		}),
		asMobile() {
			return this.$vuetify.breakpoint.smAndDown
		},
		domain() {
			return `${this.info.name}.4everland.app`
		},
		state() {
			const { state='Wait' } = this.info.latest || {}
			return state.toLowerCase()
		},
	},
	methods: {
		onVisit() {
			const { domain } = this.info.latest
			if(domain) window.open('//' + domain)
		},
		onView(name) {
			const { latest } = this.info
			let link
			if(name == 'log') {
				link = `/build/${this.info.name}/${latest.taskId}/overview`
			} 
			else if(name == 'domain') {
				link = `/project/${this.id}/settings?tab=1`
			}
			this.$router.push(link)
		},
	}
}
</script>
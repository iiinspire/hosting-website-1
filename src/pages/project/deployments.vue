<template>
<div>
	<v-card outlined>
		<e-card-head-1 title="Deployments">
			<div>
				A list of deployments in <span class="white-0">{{ info.framework }}</span>
			</div>
		</e-card-head-1>
		
		<div class="pd-20 fz-14">
			<div class="bd-1 bdrs-5">
				<v-skeleton-loader v-if="!list" type="article" />

				<div class="ta-c pd-20 gray fz-14" v-else-if="!list.length">
					empty
				</div>

				<div class="pd-20" :class="{
					'bdb-1': i < list.length - 1,
					'd-flex al-c flex-wrap': !asMobile,
				}"
					v-for="(it, i) in list" :key="i">
					<div class="d-flex" 
						:style="asMobile ? 'margin-bottom: 10px;' : 'width: 300px; margin-right: 30px;'">
						<div class="flex-1">
							<div>{{ it.buildConfig.name }}</div>
							<div class="gray mt-1 fz-13">
								Production
								<!-- (Current) -->
							</div>
						</div>
						<div class="ml-5">
							<e-status :val="it.state"></e-status>
							<div class="mt-1">
								<e-time :endAt="it.endAt">{{ it.createAt }}</e-time>
							</div>
						</div>
					</div>
					<div class="d-flex al-c flex-1">
						<div class="flex-1 mr-5 shrink-1"
							v-if="it.commits">
							<div class="line-1" style="max-width: 250px;">
								<e-commit :info="it.commits"></e-commit>
							</div>
							<div class="fz-14 mt-1">
								<e-branch :info="it"></e-branch>
							</div>
						</div>
						<span class="fl-r gray fz-13 shrink-0" v-show="!asMobile">
							<e-time :value="it.createAt" :sub="'by '+userInfo.username"></e-time>
						</span>
						<v-menu>
							<template v-slot:activator="{ attrs, on }">
								<v-btn icon
									v-bind="attrs"
									v-on="on">
									<v-icon>mdi-dots-vertical</v-icon>
								</v-btn>
							</template>
							<v-list>
								<v-list-item link
									@click="onOpt(opt, it)"
									v-for="(opt, i) in optList" :key="i">
									<v-list-item-title>
										<v-icon size="16">mdi-{{opt.icon}}</v-icon>
										<span class="fz-15 ml-2">{{opt.text}}</span>
									</v-list-item-title>
								</v-list-item>
							</v-list>
						</v-menu>
						
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
			info: s => s.projectInfo,
			userInfo: s => s.userInfo,
		}),
		asMobile() {
			return this.$vuetify.breakpoint.smAndDown
		},
	},
	data() {
		const { id } = this.$route.params
		return {
			id,
			optList: [
				{
					text: 'Redeploy',
					name: 'deploy',
					icon: 'send',
				},
				{
					text: 'Inspect Deployment',
					link: '/build/{projName}/{taskId}/overview',
					icon: 'card-search-outline',
				},
				{
					text: 'View Source',
					link: '/build/{projName}/{taskId}/source',
					icon: 'xml',
				},
				{
					text: 'Copy URL',
					name: 'copy',
					icon: 'link-variant',
				},
			],
			list: null,
		}
	},
	mounted() {
		this.getList()
	},
	methods: {
		onOpt(opt, it) {
			let { name, link } = opt
			if(link) {
				link = link.replace('{taskId}', it.taskId).replace('{projName}', it.buildConfig.name)
				this.$router.push(link)
			}
			else console.log(name)
		},
		async getList() {
			try {
				const { data } = await this.$http.get(`/project/task/${this.id}/all`)
				this.list = data
			} catch (error) {
				console.log(error)
			}

		}
	}
}
</script>
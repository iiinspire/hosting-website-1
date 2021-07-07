<template>
<div>
	<div class="bg-white shadow-1 pos-s z-100" style="top: 0;">
		<div class="con-1">
			<v-tabs :color="$color1" v-model="tabIdx">
				<v-tab replace :to="`/project/${id}/${it.path}`"
					v-for="(it, i) in tabs" :key="i">
					{{ it.title }}
				</v-tab>
			</v-tabs>
		</div>
	</div>
	<div class="wrap-1">
		<div class="con-2">
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</div>
	</div>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	computed: {
		...mapState({
			projectMap: s => s.projectMap,
			noticeMsg: s => s.noticeMsg,
		}),
	},
	data() {
		const { id } = this.$route.params
		return {
			id,
			tabIdx: null,
			tabs: [
				{
					title: 'Overview',
					path: 'overview',
				},
				{
					title: 'Deployments',
					path: 'deployments',
				},
				{
					title: 'Settings',
					path: 'settings',
				},
			]
		}
	},
	watch: {
		noticeMsg({ name }) {
			if(name == 'updateProject') this.getInfo()
		},
	},
	mounted() {
		this.getInfo()
	},
	methods: {
		async getInfo() {
			try {
				if(!this.info) this.$loading()
				const res = await this.$http.get('/project/' + this.id)
				const { repo={} } = res.data
				repo.pathPre = `${repo.namespace}/${repo.name}`
				const { data } = await this.$http.get('/project/config/' + this.id)
				data.repo = repo
				this.$loading.close()
				this.info = data
				this.$setState({
					projectInfo: data,
				})
			} catch (error) {
				this.$alert(error.message).then(() => {
					this.getInfo()
				})
			}
		},
	},
}
</script>
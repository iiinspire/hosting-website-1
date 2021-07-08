<template>
<div>
	<div class="bd-1">
		<div class="pd-20">
			<h3>Connected Fit Repository</h3>
			<div class="gray mt-1 fz-14">
				Seamlessly creat Deployments for any commits pushed to your Git repository.
			</div>
			<div class="pd-15-20 mt-5 bd-1 d-flex al-c">
				<v-icon color="#4A96FA" size="32">mdi-github</v-icon>
				<div class="ml-5">
					<h3 class="color-1">{{ info.repo.pathPre }}</h3>
					<div class="gray fz-13">
						Connected at {{ new Date(info.repo.updateAt).toNiceTime(nowDate) }}
					</div>
					<v-btn class="mt-2" @click="setConnect"
						:loading="savingConnect"
						outlined color="#888" small v-if="asMobile">Disconnect</v-btn>
				</div>
				<v-btn class="ml-auto" @click="setConnect"
					:loading="savingConnect"
					outlined color="#888" small v-if="!asMobile">Disconnect</v-btn>
			</div>
		</div>
		<div class="pd-15-20 bdt-1 bg-f8">
			<div class="gray fz-12">
				Learn more about <a href="" target="_blank">4everland for Git</a>
			</div>
		</div>
	</div>

	<div class="bd-1 mt-5">
		<div class="pd-20">
			<h3>Production Branch</h3>
			<div class="gray mt-1 fz-14">
				By default,every commit pushed to the <span class="color-1">`main`</span> branch will trigger a Production Deployment instead of the usual Preview Deployment. You can switch to a different branch here.
			</div>
			<div class="mt-3">
				<v-select v-model="currentBranch"
					:items="branches"
					label="Select Branch">
				</v-select>
			</div>
		</div>
		<div class="pd-10-20 bdt-1 bg-f8 d-flex al-c">
			<div class="gray fz-12">
				Learn more about <a href="" target="_blank">Production Branch</a>
			</div>
			<v-btn :disabled="currentBranch == info.currentBranch"
				:loading="savingBranch" @click="setBranch"
				color="primary" small class="ml-auto">Save</v-btn>
		</div>
	</div>

	<div class="bd-1 mt-5">
		<div class="pd-20">
			<h3>Deploy Hooks</h3>
			<div class="gray mt-1 fz-14">
				Deploy hooks are unique URLs that allow you to trigger a deployment of a given branch.
				This project does not have any deploy hooks.
			</div>
			<div class="mt-3">
				<h3></h3>
			</div>
		</div>
		<div class="pd-15-20 bdt-1 bg-f8">
			<div class="gray fz-12">
				Learn more about <a href="" target="_blank">Deploy Hooks</a>
			</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
	props: {
		info: Object,
	},
	data() {
		const { currentBranch, repo: { name } } = this.info
		return {
			savingConnect: false,
			currentBranch,
			branches: [],
			repoName: name,
			savingBranch: false,
		}
	},
	computed: {
		asMobile() {
			return this.$vuetify.breakpoint.smAndDown
		},
		nowDate() {
			return this.$store.state.nowDate
		},
	},
	mounted() {
		this.getBranch()
	},
	methods: {
		async getBranch() {
			const { repo: {name} } = this.info
			if(!name) return
			try {
				const { data } = await this.$http.get(`/project/branch/${name}`)
				console.log(data)
				this.branches = [data.current, ...(data.other || [])]
			} catch (error) {
				console.log(error)
			}
		},
		async setConnect() {
			try {
				const { projectId: id, repoId } = this.info
				let url = `/project/repo/${id}/${repoId}`
				let method = 'put'
				if(this.repoName) {
					url = '/project/repo/' + id
					method = 'delete'
				}
				this.savingConnect = true
				await this.$http[method](url)
			} catch (error) {
				// 
			}
			this.savingConnect = false
		},
		async setBranch() {
			try {
				this.savingBranch = true
				await this.$http.put('/project/branch/git/' + this.info.projectId, {
					name: this.currentBranch,
				})
				this.$notice('Updated Production Branch successfully.')
			} catch (error) {
				// 
			}
			this.savingBranch = false
		},
	},
}
</script>
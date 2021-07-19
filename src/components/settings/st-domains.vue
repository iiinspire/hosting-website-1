<template>
<div>
	<h3>Domains</h3>
	<div class="gray mt-1 fz-14">
		These domains are assigned to your Production Deployments.Optionally, a different Git branch or a redirection to another domain can be configured for each one.
	</div>
	<div class="mt-5 d-flex">
		<v-text-field outlined dense v-model="domain" placeholder="mywebsite.com">
		</v-text-field>
		<v-btn @click="onAdd" :disabled="!domain"
			color="primary" class="ml-4" style="margin-top: 2px;">
			Save
		</v-btn>
	</div>
	<div class="bd-1 mt-1">
		<div class="pd-20">
			<div class="d-flex al-c">
				<h3>4everland.com</h3>
				<v-chip small color="success" class="ml-3">production</v-chip>
			</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
	data() {
		return {
			domain: '',
		}
	},
	computed: {
		info() {
			return this.$store.state.projectInfo
		},
	},
	mounted() {
		this.getList()
	},
	methods: {
		async getList() {
			try {
				const { data } = await this.$http.get('/domain/list', {
					params: {
						projectId: this.info.id,
					},
				})
				console.log(data)
			} catch (error) {
				console.log(error)
			}
		},
		async onAdd() {
			try {
				if(!/(\w+\.)+\w{2,10}/.test(this.domain)) {
					return this.$alert('invalid domain')
				}
				const { data } = await this.$http.post('/domain', {
					domain: this.domain,
					projectId: this.info.id,
				})
				console.log(data)
			} catch (error) {
				console.log(error)
			}
		},
	}
}
</script>
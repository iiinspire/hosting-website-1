<template>
<div>
	<v-card outlined>
		<e-card-head-1 title="Domains">
			<div>
				Manage the domains you can use within 4everland
			</div>
		</e-card-head-1>
		<div class="pd-20">
			<div class="mb-5 ta-r">
				<v-btn small @click="onAdd">Add</v-btn>
				<v-btn small class="ml-5">Delete</v-btn>
			</div>
			<v-data-table class="-elevation-1" :headers="headers" :items="list"></v-data-table>
		</div>
	</v-card>
</div>
</template>

<script>
export default {
	data() {
		return {
			headers: [
				{ text: 'Domain', value: 'domain' },
				{ text: 'Nameservers', value: 'server' },
				{ text: 'Age', value: 'age' },
			],
			list: [
				{
					domain: 'test.4verland.com',
					server: 'main',
					age: '1d',
				}
			],
		}
	},
	mounted() {
		this.getList()
	},
	methods: {
		async onAdd() {
			try {
				const { data } = await this.$http.post('/domain', {
					// domain,
				})
				console.log(data)
			} catch (error) {
				console.log(error)
			}
		},
		async getList() {
			try {
				const { data } = await this.$http.get('/domain/list', {
					params: {
						page: 1,
						size: 10,
					},
				})
				console.log(data)
			} catch (error) {
				console.log(error)
			}
		}
	},
}
</script>
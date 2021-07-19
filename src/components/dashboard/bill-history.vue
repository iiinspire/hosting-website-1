<template>
<div>
	<v-data-table class="bd-1" :headers="headers" :items="list"></v-data-table>
</div>
</template>

<script>
export default {
	props: {
		active: Boolean,
	},
	data() {
		return {
			headers: [
				{ text: 'N', value: 'num' },
				// { text: 'Account', value: 'account' },
				{ text: 'Storage', value: 'storage' },
				{ text: 'Amount', value: 'amount' },
				{ text: 'Pay', value: 'pay' },
				{ text: 'Date', value: 'date' },
			],
			list: [],
		}
	},
	watch: {
		active(val) {
			if(val) {
				this.$loading()
				this.getList()
			}
		},
	},
	mounted() {
		this.getList()
	},
	methods: {
		async getList() {
			try {
				this.$loading()
				const { data } = await this.$http.get('/bill/history')
				this.list = data.content
			} catch (error) {
				console.log(error)
			}
			this.$loading.close()
		}
	}
}
</script>
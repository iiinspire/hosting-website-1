<template>
<div>
	<div class="pd-20 bd-1">
		<div class="d-flex al-c">
			<h3>My Resource</h3>
		</div>

		<div class="mt-6">
			<div class="d-flex al-c">
				<v-progress-linear value="15"></v-progress-linear>
				<div class="gray fz-13 ml-2">
					{{ info.left }}GB/{{ info.total }}GB
				</div>
			</div>
			<v-list>
				<template v-for="(it, i) in storList">
					<v-list-item :key="i">
						<v-list-item-content>
							<v-list-item-title v-text="it.label"></v-list-item-title>
						</v-list-item-content>
						<v-list-item-action>
							<div class="fz-14">
								<span>{{ it.value }}</span>
								<span class="gray ml-2">GB</span>
							</div>
						</v-list-item-action>
					</v-list-item>
					<v-divider :key="'d' + i" ></v-divider>
				</template>
			</v-list>
		</div>
	</div>

	<div class="pd-20 bd-1 mt-5">
		<e-choose title="Storage" btn-txt="40GB" class="mb-5"></e-choose>
		<e-choose title="Network" btn-txt="Free"></e-choose>
		<v-divider class="mt-5 mb-5"></v-divider>
		<div class="d-flex">
			<b class="ml-auto mr-3">Total coast:</b>
			<div class="ta-r mr-8">
				<div class="red-1 fw-b">0 USDT</div>
				<p class="gray fz-12">
					<del>50 USDT</del>
				</p>
			</div>
			<v-btn color="error" width="90" @click="onPay"
				:loading="paying">
				PAY
			</v-btn>
		</div>

	</div>
</div>
</template>

<script>
export default {
	computed: {
		storList() {
			return ['total', 'used', 'left'].map(key => {
				return {
					label: key.capitalize(),
					value: this.info[key] || 0,
				}
			})
		},
		leftPerc() {
			const { total, left } = this.info
			if(!total) return 0
			return Math.floor(left/total)*100
		}
	},
	data() {
		return {
			info: {
				total: 0,
				left: 0,
			},
			paying: false,
		}
	},
	
	mounted() {
		this.getInfo()
	},
	methods: {
		async getInfo() {
			try {
				const { data } = await this.$http.get('/bill/storagespace')
				this.info = data
			} catch (error) {
				console.log(error)
			}
		},
		async onPay() {
			try {
				this.paying = true
				await this.$http.post('/bill/pay', {
					storage: 40,
					amount: 50,
					pay: 0,
				})
				await this.getInfo()
				this.$confirm('You have purchased storage successfully, and you can deploy projects right now.', 			  
				'Congratulations!', {
					confirmText: 'Develope Now',
					cancelText: 'Later',
				}).then(() => {
					location.href = 'index.html'
				}).catch(() => {
					this.$router.replace('/dashboard/billing?tab=1')
				})
			} catch (error) {
				console.log(error)
			}
			this.paying = false
		},
	}
}
</script>
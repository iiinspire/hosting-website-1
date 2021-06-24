<template>
<div>
	<v-dialog v-model="showLoading" max-width="260px" :persistent="!alertInfo.maskClick">
		<v-card>
			<div class="ta-c pd-30">
				<v-progress-circular
					:size="50"
					color="primary"
					indeterminate
					></v-progress-circular>
				<div class="mt-5" v-if="alertInfo.title">
					{{ alertInfo.title }}
				</div>
			</div>
		</v-card>
	</v-dialog>

	<v-dialog v-model="showAlert" max-width="460" :persistent="alertInfo.showCancel">
		<v-card>
			<v-card-title>
				{{ alertInfo.title || 'Tip' }}
			</v-card-title>
			<v-card-text>
				<div class="fz-16">{{ alertInfo.content }}</div>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn text color="#666" v-if="alertInfo.showCancel"
					@click="hideAlert(0)">
					{{ alertInfo.cancelText || 'Cancel' }}
				</v-btn>
				<v-btn color="primary" text
					@click="hideAlert(1)">
					{{ alertInfo.confirmText || 'OK' }}
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</div>

</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'

export default {
	computed: {
		...mapState({
			alertInfo: s => s.alertInfo,
		})
	},
	data() {
		return {
			showAlert: false,
			showLoading: false,
		}
	},
	watch: {
		alertInfo(info) {
			if(info.type == 'loading') {
				this.showLoading = info.isLoading
			}
			else this.showAlert = true
		},
	},
	created() {
		const showModal = config => {
			return new Promise((resolve, reject) => {
				this.$setState({
					alertInfo: {
						...config,
						success() {
							resolve()
						},
						fail() {
							reject()
						},
					},
				})
			})
		}
		Vue.prototype.$loading = (title, opts={}) => {
			return showModal({
				title,
				...opts,
				type: 'loading',
				isLoading: true,
			})
		}
		Vue.prototype.$loading.close = () => {
			return showModal({
				type: 'loading',
				isLoading: false,
			})
		}

		Vue.prototype.$alert = (content, title, opts={}) => {
			return showModal({
				title,
				content,
				...opts,
			})
		}
		Vue.prototype.$confirm = (content, title, opts={}) => {
			return showModal({
				title,
				content,
				showCancel: true,
				...opts,
			})
		}
	},
	methods: {
		hideAlert(isOk) {
			this.showAlert = false
			const { success, fail } = this.alertInfo
			if(isOk) {
				if(success) success()
			} else {
				if(fail) fail()
			}
		},
	}
}
</script>
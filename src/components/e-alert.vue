<template>
<v-dialog v-model="showAlert" max-width="500" persistent>
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
				{{ alertInfo.confirmText || 'Ok' }}
			</v-btn>
		</v-card-actions>
	</v-card>
</v-dialog>
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
		}
	},
	watch: {
		alertInfo() {
			this.showAlert = true
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
<template>
<div class="wrap-1">
	<div class="con-1">
		<div class="ta-c mt-5">
			<h1>Login to Hosting</h1>
			<div class="mt-5">
				<v-btn color="#24292e" large @click="onLogin">
					<v-icon color="white">mdi-github</v-icon>
					<span class="white-0">Continue with Github</span>
				</v-btn>
			</div>
		</div>
		<!-- <v-btn to="/dashboard/projects">dashbaord</v-btn>
		<v-btn to="/project/overview" class="ml-5">project</v-btn> -->
	</div>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	computed: {
		...mapState({
			isTouch: s => s.isTouch,
			isFocus: s => s.isFocus,
			token: s => s.token,
		}),
	},
	watch: {
		isFocus(val) {
			if(val && this.isOpen) {
				this.isOpen = false
				console.log('on focus')
				this.onInit()
			}
		},
	},
	mounted() {
		this.onInit()
	},
	methods: {
		async onInit() {
			const { token } = this.$route.query
			if(token) {
				localStorage.token = token
				localStorage.refreshAt = Date.now()
				if(!this.isTouch) {
					window.close()
					return
				}
			}
			if(localStorage.token) {
				if(this.token != localStorage.token) {
					this.$setState({
						token: localStorage.token,
					})
				}
				this.$router.replace('/dashboard/projects')
			}
		},
		async onLogin() {
			try {
				this.$loading('loading', {
					maskClick: true,
				})
				const { data } = await this.$http.get('/githubapp/url')
				this.$loading.close()
				// console.log(data)
				this.isOpen = true
				this.$openWindow(data.url)
			} catch (error) {
				console.log(error)
			}
		}
	}
}
</script>

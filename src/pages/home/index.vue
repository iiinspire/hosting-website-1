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
export default {
	mounted() {
		const { token } = this.$route.query
		if(token) {
			localStorage.token = token
		}
		if(localStorage.token) {
			this.$router.replace('/dashboard/projects')
		}
	},
	methods: {
		async onLogin() {
			try {
				this.$loading('loading', {
					maskClick: true,
				})
				const { data } = await this.$http.get('/githubapp/url')
				this.$loading.close()
				console.log(data)
				location.href = data.url
			} catch (error) {
				console.log(error)
			}
		}
	}
}
</script>

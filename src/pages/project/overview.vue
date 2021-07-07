<style>
</style>

<template>
<div>
	<v-card outlined>
		<e-card-head-1 :title="info.name || '*'">
			<div class="">
				<v-icon color="#fff" size="16">mdi-github</v-icon>
				<span class="ml-1">{{ info.repo ? info.repo.pathPre : '*' }}</span>
			</div>
			<template #right>
				<v-btn small depressed color="primary">Visit</v-btn>
			</template>
		</e-card-head-1>
		
		<div class="pd-20">
			<div class="d-flex al-c flex-wrap">
				<div class="mr-auto">
					<div class="fz-18">Production Deploymen</div>
					<div class="fz-13 mt-1 gray">The deployment that is available to your visitors</div>
				</div>
				<div class="d-flex al-c" :class="{
					'mt-4': $vuetify.breakpoint.mobile,
				}">
					<v-btn small class="mr-5">View Build Logs</v-btn>
					<v-btn small>View Domains</v-btn>
				</div>
			</div>
		</div>
	</v-card>
</div>
</template>

<script>
export default {
	data() {
		return {

		}
	},
	computed: {
		userInfo() {
			return this.$store.state.userInfo
		},
		info() {
			return this.$store.state.projectInfo
		},
	},
}
</script>
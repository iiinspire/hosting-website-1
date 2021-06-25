<style lang="scss">
.logs-wrap {
	div {
		padding: 6px 20px;
	}
}
</style>
<template>
<div>
	<v-card outlined>
		<div class="pd-20">
			<v-row class="pos-r">
				<v-col cols="12" md="4">
					<div class="bd-1 bdrs-5 pd-20">
						<h2>Build Failed</h2>
						<div class="fz-12 gray mt-2 mb-5">
							<p>Local:   http://localhost:8080/</p>
							<p>DONE  Compiled successfully in 324ms</p>
							<p>DONE  Compiled successfully in 324ms</p>
						</div>
						<v-btn outlined block color="#888">View Logs</v-btn>
					</div>

					<div class="mt-5">
						<div class="d-flex">
							<v-btn color="error" class="flex-1">Redeploy</v-btn>
							<v-btn color="primary" class="ml-5 flex-1">Visit</v-btn>
						</div>
					</div>
				</v-col>
				<v-col cols="12" md="8">

				</v-col>
			</v-row>

			<v-divider class="mt-5 mb-5"></v-divider>
			<div class="d-flex al-c">
				<span>Build Logs</span>
				<v-btn class="ml-auto" outlined color="#888">
					<v-icon size="14" class="mr-2">mdi-content-copy</v-icon>
					<span class="fz-13">Copy to Clipboard</span>
				</v-btn>
			</div>
			<div class="bd-1 bdrs-5 bg-f5 mt-5 fz-13 gray-6">
				<div class="mt-5 mb-5 logs-wrap">
					<div>DONE  Compiled successfully in 324ms</div>
					<div>DONE  Compiled successfully in 324ms</div>
				</div>
			</div>
		</div>
	</v-card>
</div>
</template>

<script>
export default {
	computed: {
		asMobile() {
			return this.$vuetify.breakpoint.smAndDown
		},
	},
}
</script>
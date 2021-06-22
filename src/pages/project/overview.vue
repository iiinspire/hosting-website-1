<style>
.o-bg-h1 {
	height: 120px;
	background: linear-gradient(135deg, #0d217d, #071156 70%, #080d3a);
}
</style>

<template>
<div>
	<v-card outlined>
		<div class="pos-r o-bg-h1">
			<div class="y-center w100p d-flex al-c pd-20">
				<div class="white-0">
					<div class="fz-18">demo-app</div>
					<div class="mt-1 d-flex al-c">
						<v-icon color="#fff">mdi-github</v-icon>
						<span class="op-5 ml-1">demo/demo-app</span>
					</div>
				</div>
				<div class="ml-auto">
					<v-btn small depressed color="primary">Visit</v-btn>
				</div>
			</div>
		</div>
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
<template>
<div>
	<div class="bg-white shadow-1 pos-s z-100" style="top: 0;">
		<div class="con-1">
			<v-tabs :color="$color1" v-model="tabIdx">
				<v-tab replace :to="`/project/${id}/${it.path}`"
					v-for="(it, i) in tabs" :key="i">
					{{ it.title }}
				</v-tab>
			</v-tabs>
		</div>
	</div>
	<div class="wrap-1">
		<div class="con-2">
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</div>
	</div>
</div>
</template>

<script>
export default {
	data() {
		const { id } = this.$route.params
		return {
			id,
			tabIdx: null,
			tabs: [
				{
					title: 'Overview',
					path: 'overview',
				},
				{
					title: 'Deployments',
					path: 'deployments',
				},
				{
					title: 'Settings',
					path: 'settings',
				},
			]
		}
	},
}
</script>
<template>
<div>
	<div class="bg-white shadow-1 pos-s z-1" style="top: 0;">
		<div class="con-1">
			<v-tabs :color="$color1" v-model="tabIdx">
				<v-tab replace :to="'/project/'+item.path"
					v-for="(item, i) in tabs" :key="i">
					{{ item.title }}
				</v-tab>
			</v-tabs>
		</div>
	</div>
	<div class="wrap-1">
		<div class="con-2">
			<router-view></router-view>
		</div>
	</div>
</div>
</template>

<script>
export default {
	data() {
		return {
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
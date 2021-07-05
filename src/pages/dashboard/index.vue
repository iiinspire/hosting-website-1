<template>
<div>
	<div class="bg-white shadow-1 pos-s z-100" style="top: 0;">
		<div class="con-1">
			<v-tabs :color="$color1" v-model="tabIdx">
				<v-tab replace :to="'/dashboard/'+item.path"
					v-for="(item, i) in tabs" :key="i">
					{{ item.title }}
				</v-tab>
			</v-tabs>
		</div>
	</div>
	<div class="wrap-1">
		<div class="con-2" style="min-height: 50vh;">
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
		return {
			tabIdx: null,
			tabs: [
				{
					title: 'Projects',
					path: 'projects',
				},
				{
					title: 'Domains',
					path: 'domains',
				},
				{
					title: 'Statistics',
					path: 'statistics',
				},
				{
					title: 'Billing',
					path: 'billing',
				},
			]
		}
	},
}
</script>
<template>
<div>
	<v-card outlined>
		<e-side-menus :list="menus" :info="info"></e-side-menus>
	</v-card>
</div>
</template>

<script>
export default {
	data() {
		return {
			info: {
				id: true,
			},
			menus: [
				{
					text: 'My Resource',
					comp: 'bill-resource',
				},
				{
					text: 'Purchase History',
					comp: 'bill-history',
				},
			],
		}
	},
}
</script>
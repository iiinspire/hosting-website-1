<template>
<div>
	<v-card outlined>
		<e-card-head-1 title="Project Settings">
			<div>
				Update the settings of demo1
			</div>
		</e-card-head-1>
		<e-side-menus :list="menus"></e-side-menus>
	</v-card>
</div>
</template>

<script>
export default {
	data() {
		return {
			menus: [
				{
					text: 'General',
					comp: 'st-general',
				},
				{
					text: 'Domains',
					comp: 'st-domains',
				},
				{
					text: 'Git',
					comp: 'st-git',
				},
				{
					text: 'Environment Variables',
					comp: 'st-env-var',
				},
				{
					text: 'Advanced',
					comp: 'st-advanced',
				},
			]
		}
	},
	
}
</script>
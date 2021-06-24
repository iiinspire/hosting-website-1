<template>
<div>
	<v-card outlined>
		<div class="pos-r bg-proj-1">
			<div class="y-center w100p d-flex al-c pd-20">
				<div class="white-0">
					<div class="fz-18">Project Settings</div>
					<div class="mt-1 white-5 fz-14">
						Update the settings of demo
					</div>
				</div>
			</div>
		</div>
		<div class="" :class="{
			'd-flex': !asMobile,
		}">
			<div :class="{
				'bdr-1': !asMobile,
			}">
				<v-list flat class="mt-3">
					<!-- <v-subheader></v-subheader> -->
					<v-list-item-group
						v-model="curIdx"
						color="primary">
						<v-list-item
							v-for="(item, i) in menus" :key="i">
							<!-- <v-list-item-icon>
								<v-icon v-text="item.icon"></v-icon>
							</v-list-item-icon> -->
							<v-list-item-content>
								<v-list-item-title v-text="item.text"></v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-list-item-group>
				</v-list>
			</div>
		</div>
	</v-card>
</div>
</template>

<script>
export default {
	data() {
		return {
			curIdx: 0,
			menus: [
				{
					text: 'General',
				},
				{
					text: 'Domains',
				},
				{
					text: 'Git',
				},
				{
					text: 'Environment Variables',
				},
				{
					text: 'Advanced',
				},
			]
		}
	},
	computed: {
		asMobile() {
			return this.$vuetify.breakpoint.smAndDown
		},
	}
}
</script>
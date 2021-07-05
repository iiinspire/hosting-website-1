<template>
<div v-if="asMobile">
	<v-expansion-panels accordion>
		<v-expansion-panel v-for="(it, i) in list" :key="i">
			<v-expansion-panel-header>
				{{ it.text }}
			</v-expansion-panel-header>
			<v-expansion-panel-content>
				<component :is="it.comp" v-if="it.comp"></component>
			</v-expansion-panel-content>
		</v-expansion-panel>
	</v-expansion-panels>
</div>
<div class="d-flex" v-else>
	<div class="bdr-1">
		<v-list flat class="mt-3">
			<v-list-item-group
				v-model="curIdx"
				color="primary">
				<v-list-item
					v-for="(it, i) in list" :key="i">
					<!-- <v-list-item-icon>
						<v-icon v-text="item.icon"></v-icon>
					</v-list-item-icon> -->
					<v-list-item-content>
						<v-list-item-title v-text="it.text"></v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list-item-group>
		</v-list>
	</div>
	<div class="flex-1 pd-15">
		<component :is="curItem.comp" v-if="curItem.comp"></component>
	</div>
</div>
</template>

<script>
export default {
	props: {
		list: Array,
	},
	data() {
		return {
			curIdx: 0,
		}
	},
	computed: {
		asMobile() {
			return this.$vuetify.breakpoint.smAndDown
		},
		curItem() {
			return this.list[this.curIdx]
		},
	},
}
</script>
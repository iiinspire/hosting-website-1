<template>
<div>
	<div class="bg-white shadow-1 pos-s z-1 top-0">
		<div class="con-1">
			<v-tabs :color="$color1" v-model="tabIdx">
				<v-tab replace :to="'/build/'+item.path"
					v-for="(item, i) in tabs" :key="i">
					{{ item.title }}
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
		return {
			tabIdx: null,
			tabs: [
				{
					title: 'Overview',
					path: 'overview',
				},
				{
					title: 'Source',
					path: 'source',
				},
			]
		}
	},
}
</script>
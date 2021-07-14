<style>
.e-footer {
	color: #7F8489;
}
</style>

<template>
<div class="e-footer wrap-0">
	<div class="con-1 d-flex flex-wrap">
		<div class="mb-10 ml-2" :class="{
			'mr-10': !$vuetify.breakpoint.mobile,
		}">
			<img src="img/icon.svg" style="height: 30px" />
			<!-- <e-logo class="d-b"></e-logo> -->
			<div class="mt-10">
				<v-btn icon :href="item.link" target="_blank" class="mr-2"
					v-for="(item, i) in links" :key="i">
					<v-icon>{{ item.icon }}</v-icon>
				</v-btn>
			</div>
		</div>
		
		<div class="flex-grow-1">
			<v-row>
				<v-col cols="6" lg="3" md="3"
					v-for="(item, i) in menus" :key="i">
					<div class="ml-3 mb-5 fz-14">{{ item.title }}</div>
					<div v-for="(sub, j) in item.subs" :key="j">
						<v-btn text small color="#BBC2C9" @click="onClick(sub)">
							{{ sub.label }}
						</v-btn>
					</div>
				</v-col>
			</v-row>
		</div>

		<div class="fz-12 mt-10">
			Copyright © 2021 4everland Inc. All rights reserved
		</div>
	</div>
</div>
</template>

<script>
import mixin from './e-footer'

export default {
	mixins: [mixin],
	methods: {
		onClick(it) {
			const { link } = it
			console.log(link)
			if(/^http/.test(link)) window.open(link)
			else if(link) this.$router.push(link)
		},
	}
}
</script>
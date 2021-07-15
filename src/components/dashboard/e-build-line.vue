<template>
<div class="d-flex al-c mt-2 fz-13" v-if="info && info.taskId">
	<span class="dot-1 mr-1" :class="info.state.toLowerCase()"></span>
	<span class="line-1 shrink-1">
		{{ domain }}
	</span>
	<span class="bd-1 bg-f8 ml-3 mr-3 pl-2 pr-2 bdrs-5 fz-12">
		{{ type }}
	</span>
	<span class="gray shrink-0">
		<e-time>{{ info.updateAt }}</e-time>
	</span>
</div>
</template>

<script>
export default {
	props: {
		name: String,
		type: String,
		info: Object,
	},
	computed: {
		domain() {
			let mid = ''
			if(this.type == 'Latest') {
				mid = '-' + this.info.taskId
			}
			return `${this.name}${mid}.4everland.app`
		},
	},
}
</script>
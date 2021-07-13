<template>
<div class="d-flex al-c mt-3 fz-14" v-if="info && info.taskId">
	<span class="circle"></span>
	<span class="line-1 shrink-1">
		{{ domain }}
	</span>
	<span class="bd-1 bg-f8 ml-3 mr-3 pl-2 pr-2 bdrs-5 fz-12">
		{{ type }}
	</span>
	<span class="gray shrink-0">
		{{ new Date(info.updateAt).toNiceTime(nowDate) }}
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
		nowDate() {
			return this.$store.state.nowDate
		},
		domain() {
			let mid = ''
			if(this.type == 'Latest') {
				mid = '-' + this.info.taskId
			}
			return `${this.name}${mid}.4everland.com`
		},
	},
}
</script>
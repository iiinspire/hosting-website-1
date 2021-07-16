<template>
<div class="d-flex al-c mt-2 fz-13"
	v-if="info && info.domain">
	<span class="dot-1 mr-1" :class="(info.state || 'wait').toLowerCase()"></span>
	<template v-if="type == 'Production' && !info.state">
		<span class="gray">No Production Deployment</span>
	</template>
	<div class="d-flex al-c shrink-1" v-ripple @click.prevent="onClick" v-else>
		<span class="line-1 shrink-1">
			{{ info.domain }}
		</span>
		<span class="bd-1 bg-f8 ml-3 mr-3 pl-2 pr-2 bdrs-5 fz-12">
			{{ type }}
		</span>
		<span class="gray shrink-0">
			<e-time>{{ info.updateAt }}</e-time>
		</span>
	</div>
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
		
	},
	methods: {
		onClick() {
			const { taskId } = this.info
			if(taskId) this.$router.push(`/build/${this.name}/${taskId}/overview`)
		},
	},
}
</script>
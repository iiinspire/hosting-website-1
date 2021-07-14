<template>
<v-tooltip v-if="date" top>
	<template v-slot:activator="{ on, attrs }">
		<span v-bind="attrs" v-on="on">
			{{ date.toNiceTime(nowDate) }}
		</span>
	</template>
	<span>
		{{ date.format() }}
	</span>
</v-tooltip>
</template>

<script>
export default {
	props: {
		value: null,
	},
	computed: {
		nowDate() {
			return this.$store.state.nowDate
		},
		date() {
			let val = this.value
			if(!val) {
				const [el] = this.$slots.default || []
				if(el) {
					val = el.text.trim()
					if(val > 0) val *= 1
					// console.log(val)
				}
			}
			if(!val) return
			return new Date(val)
		},
	},
}
</script>
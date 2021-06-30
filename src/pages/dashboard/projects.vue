<style>
.hover-c1:hover {
	box-shadow: 0 2px 10px #a2cae7;
	border-color: #a2cae7;
	cursor: pointer;
}
</style>

<template>
<div>
	<div class="ta-r mb-5">
		<v-btn small depressed color="primary" @click="addNew">New Project</v-btn>
	</div>
	<div v-if="!list">
		<v-skeleton-loader
			max-width="450"
			type="card"
			></v-skeleton-loader>
	</div>
	<div v-else-if="!list.length" class="ta-c bg-white bdrs-5" style="padding: 50px 0;">
		<v-img src="img/proj-empty.svg" max-width="220" class="m-auto"></v-img>
		<div class="gray mt-10">No deployments.</div>
		<div class="mt-6">
			<v-btn outlined color="primary" @click="addNew" :loading="loading">Get Start Deployed</v-btn>
		</div>
	</div>
	<v-row v-else>
		<v-col cols="12" :md="6"
			v-for="(it, i) in list" :key="i">
			<v-card outlined class="hover-c1 trans-200" :to="`/project/${it.id}/overview`">
				<v-img src="img/proj-bg-def.png" height="120"></v-img>
				<v-card-title>
					<span>{{ it.name }}</span>
					<div class="ml-auto">
						<v-btn small depressed color="primary" @click.prevent="onVisit">Visit</v-btn>
					</div>
				</v-card-title>
				<v-card-subtitle>
					<div>
						{{ it.namespace }}
						<span class="ml-3 gray">2d ago</span>
					</div>
				</v-card-subtitle>

				<v-divider></v-divider>

				<v-card-subtitle>
					<v-icon :color="$color1">mdi-github</v-icon>
					<span class="ml-2">{{ it.namespace }}/{{ it.name }}</span>
					<span class="fl-r gray">
						Updated 20min ago
						<!-- {{ new Date(it.updateAt).toNiceTime(nowDate) }} -->
					</span>
				</v-card-subtitle>
			</v-card>
		</v-col>
	</v-row>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	data() {
		return {
			list: null,
			loading: false,
		}
	},
	computed: {
		...mapState({
			nowDate: s => s.nowDate,
			isFocus: s => s.isFocus,
		}),
	},
	watch: {
		
	},
	mounted() {
		this.getList()
	},
	methods: {
		addNew() {
			this.$router.push('/new')
		},
		onVisit() {
			this.$alert('develop')
		},
		async getList() {
			try {
				this.loading = true
				const { data } = await this.$http.get('/project')
				this.list = data
				console.log(data)
			} catch (error) {
				// 
			}
			this.loading = false
		},
	},
}
</script>
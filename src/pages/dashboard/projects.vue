<style>
.hover-c1:hover {
	box-shadow: 0 2px 10px #a2cae7;
	border-color: #a2cae7;
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
			<v-card outlined class="hover-c1 trans-200">
				<a :href="`#/project/${it.id}/overview`">
					<v-img src="img/proj-bg-def.png" height="160"></v-img>
				</a>
				<v-card-title>
					<a :href="`#/project/${it.id}/overview`" class="mr-auto b">{{ it.name }}</a>
					<v-btn class="mr-3" icon @click.prevent="onChart(it)">
						<v-icon :color="$color1">mdi-file-chart-outline</v-icon>
					</v-btn>
					<v-btn small depressed color="primary" :disabled="!it.production.state"
						@click.prevent="onVisit(it)">
						Visit
					</v-btn>
				</v-card-title>
				<v-card-subtitle>
					<div class="mt-5" style="min-height: 60px">
						<e-build-line type="Production" :name="it.name" :info="it.production"></e-build-line>
						<e-build-line type="Latest" :name="it.name" :info="it.latest"></e-build-line>
					</div>
				</v-card-subtitle>

				<v-divider></v-divider>

				<a :href="`https://github.com/${it.repo.namespace}/${it.name}`" target="_blank"
					class="pd-12-15 fz-14 d-flex al-c b" v-if="it.repo">
					<v-icon :color="$color1" size="18">mdi-github</v-icon>
					<span class="ml-1 line-1">{{ it.repo.namespace }}/{{ it.name }}</span>
					<span class="ml-auto gray shrink-0">
						<e-time pre="Updated">{{ it.repo.updateAt }}</e-time>
					</span>
				</a>
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
		onChart() {
			this.$notice('chart')
		},
		onVisit(it) {
			const { domain } = it.production
			window.open('//' + domain)
		},
		async getList() {
			try {
				this.loading = true
				const { data } = await this.$http.get('/project')
				this.list = data
				// console.log(data)
			} catch (error) {
				// 
			}
			this.loading = false
		},
	},
}
</script>
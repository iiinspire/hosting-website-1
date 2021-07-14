<template>
<div class="wrap-1">
	<v-dialog v-model="showSelect" max-width="600">
		<e-deploy :value="showSelect" :importItem="importItem" @close="showSelect = false"></e-deploy>
	</v-dialog>

	<div class="con-1">
		<v-row>
			<v-col cols="12" md="6">
				<v-card outlined min-height="442">
					<div class="pd-20">
						<div class="fz-20 fw-b mr-10">Import Git Repositor</div>
						<div class="d-flex al-c mb-5 mt-1">
							<v-btn color="primary" class="mr-4" @click="addNew" :loading="loading" small>Add Github</v-btn>
							<v-text-field prepend-icon="mdi-magnify" style="margin-top: 14px;"
								placeholder="Search" dense></v-text-field>
						</div>

						<v-skeleton-loader v-if="!list" type="article" />

						<div class="bd-1 bg-f5 bdrs-5 pa-10 d-flex flex-center al-c" 
							style="min-height: 250px" 
							v-else-if="!list.length">
							<div>
								<div>No Git Repositories Found</div>
								<div class="gray fz-14 mt-3">
									Try selecting a different Git account or creating repositories.
								</div>
							</div>
						</div>
						<div class="bd-1" v-else>
							<div v-for="(it, i) in list" :key="i">
								<div class="pd-20 d-flex al-c">
									<!-- <v-icon class="mr-5">mdi-wallet</v-icon> -->
									<img :src="it.fwImg" style="width: 25px" class="mr-2">
									<span class="fz-17 line-1">{{ it.name }}</span>
									<v-icon color="#999" size="16" class="ml-1" :class="{
										'op-0': !it.private,
									}">mdi-lock-outline</v-icon>
									<span class="ml-2 mr-3 gray fz-13 shrink-0">
										<e-time>{{ it.updateAt }}</e-time>
									</span>
									<v-btn class="ml-auto" color="primary" small @click="onImport(it)">Import</v-btn>
								</div>
							</div>
						</div>
					</div>
				</v-card>
			</v-col>
			<v-col cols="12" md="6">
				<v-card outlined min-height="400">
					<div class="pd-20">
						<div class="fz-20 fw-b mr-10">Clone Template</div>
						<div class="mt-3 gray fz-14">Alternatively, get started with a template</div>
						<v-row class="mt-2">
							<v-col cols="6" v-for="(it, i) in tplList" :key="i">
								<div class="bd-1">
									<v-img :src="it.img" height="100"></v-img>
									<div class="pd-10 d-flex al-c">
										<img :src="it.logo" style="width: 20px;"/>
										<div class="ml-2">{{ it.title }}</div>
									</div>
								</div>
							</v-col>
						</v-row>
					</div>
				</v-card>
			</v-col>
		</v-row>
	</div>

	
</div>
</template>

<script>
import { mapState } from 'vuex'
import eDeploy from './e-deploy.vue'

export default {
	components: {
		eDeploy,
	},
	data() {
		return {
			list: null,
			loading: false,
			showSelect: false,
			importItem: null,
			tplList: [
				{
					img: 'img/new/nextjs.png',
					logo: 'img/new/next.svg',
					title: 'Next.js',
				},
				{
					img: 'img/new/nuxtjs.png',
					logo: 'img/new/nuxt.svg',
					title: 'Next.js',
				},
				{
					img: 'img/new/gatsbyjs.png',
					logo: 'img/new/gatsby.svg',
					title: 'Gatsby.js',
				},
			]
		}
	},
	computed: {
		...mapState({
			isFocus: s => s.isFocus,
		})
	},
	watch: {
		isFocus(val) {
			if(val && this.isAddClick) {
				this.isAddClick = false
				this.loading = true
				this.getList()
			}
		},
	},
	mounted() {
		this.getList()
	},
	methods: {
		onImport(it) {
			this.importItem = it
			this.showSelect = true
		},
		addNew() {
			this.isAddClick = true
			this.$openWindow('https://github.com/apps/foreverlandxyz/installations/new')
		},
		async getList() {
			try {
				const { data } = await this.$http.get('/repo/list')
				this.list = data.map(it => {
					it.fwImg = this.$getFramework(it.frameworkAdvice).logo
					return it
				})
			} catch (error) {
				// 
			}
			this.loading = false
		}
	}
}
</script>
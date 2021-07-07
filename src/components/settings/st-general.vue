<template>
<div>
	<div class="bd-1 pd-20 pb-0">
		<h3>Project Name</h3>
		<div class="gray mt-1 fz-14">
			Used to identify your Project on the Dashboard, 4everland CLI, and in the URL of your Deployments.
		</div>
		<div class="mt-8 d-flex">
			<v-text-field outlined dense v-model="name">
				<template #prepend v-if="!asMobile">
					<span class="mt-1 fz-14 color-1">4everland.com/{{ userInfo.username}}/</span>
				</template>
			</v-text-field>
			<v-btn color="primary" :loading="savingName" @click="onSaveName"
				:disabled="info.name == name || !name"
				class="ml-4" style="margin-top: 2px;">
				Save
			</v-btn>
		</div>
	</div>

	<div class="bd-1 pd-20 mt-5">
		<h3>Build & Development Settings</h3>
		<div class="gray mt-1 fz-14">
			When using a framework for a new project, it will be automatically detected. As a result, several project settings are automatically configured to achieve the best result. You can override them below.
		</div>
		<div class="mt-5">
			<v-select v-model="form.framework" @input="onFramework"
				:items="frameworks"
				item-text="name"
				item-value="slug"
				label="Framework Preset">
				<template #prepend v-if="chooseFramework">
					<img :src="chooseFramework.logo" style="width: 20px">
				</template>
			</v-select>
			<div class="d-flex al-c">
				<v-text-field persistent-placeholder v-model="form.buildCommand"
					label="Build command" :disabled="!isOverBuild"
					:placeholder="buildCommandHint"/>
				<v-switch v-model="isOverBuild" label="Override" class="ml-5"></v-switch>
			</div>
			<div class="d-flex al-c">
				<v-text-field persistent-placeholder v-model="form.outputDirectory"
					label="Output Directory" :disabled="!isOverOutput"
					placeholder="`public` if it exists, or `. `"/>
				<v-switch v-model="isOverOutput" label="Override" class="ml-5"></v-switch>
			</div>
			<div class="ta-r mt-3">
				<v-btn color="primary" small>Save</v-btn>
			</div>
		</div>
	</div>

	<div class="bd-1 pd-20 pb-0 mt-5">
		<h3>Root Directory</h3>
		<div class="gray mt-1 fz-14">
			The directory within your project, in which your code is located. Leave this field empty if your code is not located in a subdirectory. A new Deployment is required for your changes to take effect.
		</div>
		<div class="mt-5 d-flex">
			<v-text-field outlined dense v-model="rootDirectory">

			</v-text-field>
			<v-btn color="primary" :disabled="rootDirectory == info.rootDirectory"
				class="ml-4" style="margin-top: 2px;">Save</v-btn>
		</div>
	</div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import frameworks from '../../assets/frameworks.json'

export default {
	props: {
		info: Object,
	},
	computed: {
		...mapState({
			userInfo: s => s.userInfo,
		}),
		asMobile() {
			return this.$vuetify.breakpoint.smAndDown
		},
		chooseFramework() {
			return this.frameworks.filter(it => it.slug == this.form.framework)[0]
		},
	},
	data() {
		const { name, rootDirectory } = this.info
		const form = {
			framework: '',
			buildCommand: '',
			outputDirectory: '',
		}
		for(const key in form) {
			form[key] = this.info[key]
		}
		return {
			name,
			rootDirectory,
			form,
			frameworks,
			buildCommandHint: '',
			isOverBuild: false,
			isOverOutput: false,
			savingName: false,
			savingBuild: false,
			savingRoot: false,
		}
	},
	mounted() {
		
	},
	methods: {
		async saveProject(body) {
			return this.$http.put('/project/config/' + this.info.projectId, body)
		},
		async onSaveName() {
			try {
				await this.$confirm(`Your Project will be renamed to "${this.name}".`)
				this.savingName = true
				await this.saveProject({
					name: this.name,
				})
				this.$notice('Project renamed successfully')
			} catch (error) {
				// 
			}
			this.savingName = false
		},
		onFramework(val) {
			const item = this.frameworks.filter(it => it.slug == val)[0]
			const { buildCommand } = item.settings
			this.form.buildCommand = buildCommand.value || ''
			this.buildCommandHint = buildCommand.placeholder || ''
		},
	}
}
</script>
<template>
<div>
	<div class="bd-1 pd-20 pb-0">
		<h3>Project Name</h3>
		<div class="gray mt-1 fz-14">
			Used to identify your Project on the Dashboard,4everland CLI,and in the URL of your Deployments.
		</div>
		<div class="mt-8 d-flex">
			<v-text-field outlined dense v-model="form.name">
				<template #prepend v-if="!asMobile">
					<span class="mt-1 fz-14 color-1">4everland.com/demo/</span>
				</template>
			</v-text-field>
			<v-btn color="primary" class="ml-4" style="margin-top: 2px;">Save</v-btn>
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
		</div>
	</div>

	<div class="bd-1 pd-20 pb-0 mt-5">
		<h3>Root Directory</h3>
		<div class="gray mt-1 fz-14">
			The directory within your project, in which your code is located. Leave this field empty if your code is not located in a subdirectory. A new Deployment is required for your changes to take effect.
		</div>
		<div class="mt-5 d-flex">
			<v-text-field outlined dense v-model="form.rootDirectory">

			</v-text-field>
			<v-btn color="primary" class="ml-4" style="margin-top: 2px;">Save</v-btn>
		</div>
	</div>
</div>
</template>

<script>
import frameworks from '../../assets/frameworks.json'

export default {
	computed: {
		asMobile() {
			return this.$vuetify.breakpoint.smAndDown
		},
		chooseFramework() {
			return this.frameworks.filter(it => it.slug == this.form.framework)[0]
		},
	},
	data() {
		return {
			frameworks,
			form: {
				name: 'demo',
				framework: 'vue',
				buildCommand: '',
				outputDirectory: '',
				rootDirectory: './',
			},
			buildCommandHint: '',
			isOverBuild: false,
			isOverOutput: false,
		}
	},
	methods: {
		onFramework(val) {
			const item = this.frameworks.filter(it => it.slug == val)[0]
			const { buildCommand } = item.settings
			this.form.buildCommand = buildCommand.value || ''
			this.buildCommandHint = buildCommand.placeholder || ''
		},
	}
}
</script>
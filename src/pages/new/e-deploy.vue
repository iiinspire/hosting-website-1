<style>
.theme--light.v-messages {
	display: none;
	/* v-treeview底部 无内容 */
}
</style>
<template>
<v-card v-if="importItem">
	<v-card-title>
		Select 4everland Scope
	</v-card-title>
	<v-card-text>
		<div class="d-flex al-c">
			<span>importing</span>
			<v-icon size="16" class="ml-5">mdi-github</v-icon>
			<span class="ml-2">{{ importItem.name }}</span>
			<v-icon size="16" class="ml-5">mdi-source-branch</v-icon>
			<span class="ml-2">{{ importItem.defaultBranch }}</span>
		</div>
	</v-card-text>
	<div class="pd-20 ov-a" style="max-height: 55vh;" :class="{
		'bdt-1': curStep > 0,
	}">
		<v-window v-model="curStep">
			<v-window-item :value="0">
				<div class="mb-8">
					<div class="bd-1 pd-20 d-flex al-c">
						<img :src="userInfo.avatar" style="width: 40px; height: 40px;" class="bdrs-100 bg-f8"/>
						<span class="fz-18 ml-5">{{ importItem.namespace }}</span>
						<v-btn color="primary" class="ml-auto" small @click="onSelect" :loading="selecting">Select</v-btn>
					</div>
					<!-- <div class="fz-14 gray mt-5">
						Now that you've selected a Git repository to import, you can either create a new 4everland Team and deploy theGit repository to it, or deploy it your existing Personal Account.
					</div> -->
				</div>
			</v-window-item>

			<v-window-item :value="1">
				<div class="fz-14 gray">
					Please select the directory within Git repository that contains your project's source code
				</div>
				<v-radio-group v-model="srcDir">
					<v-treeview dense :open="[initSrcDir]"
						:load-children="getRepoDir"
						:items="dirList">
						<template v-slot:prepend="{item}">
							<v-radio v-if="item.type == 'dir'" :value="item.id"></v-radio>
						</template>
					</v-treeview>
				</v-radio-group>
			</v-window-item>

			<v-window-item :value="2">
				<v-form class="mt-5 ml-3 mr-3 mb-4">
					<v-text-field label="Project Name" v-model="form.name"/>
					<div class="d-flex al-c">
						<v-text-field label="Root Dorectory" :value="srcDir" disabled/>
						<v-btn color="primary" class="ml-5" small @click="curStep = 1">Edit</v-btn>
					</div>
					<v-select v-model="form.framework" @input="onFramework"
						:items="frameworks"
						item-text="name"
						item-value="slug"
						label="Framework Preset">
						<template #prepend v-if="chooseFramework">
							<img :src="chooseFramework.logo" style="width: 20px">
						</template>
					</v-select>
					<v-expansion-panels>
						<v-expansion-panel>
							<v-expansion-panel-header>
								Build and Output Settings
							</v-expansion-panel-header>
							<v-expansion-panel-content>
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
							</v-expansion-panel-content>
						</v-expansion-panel>
					</v-expansion-panels>

					<v-expansion-panels class="mt-5">
						<v-expansion-panel>
							<v-expansion-panel-header>
								Environment Variables
							</v-expansion-panel-header>
							<v-expansion-panel-content>
								<div class="d-flex al-c">
									<v-text-field persistent-placeholder v-model="envForm.name"
										label="Name" placeholder="Variable_Name"/>
									<v-text-field persistent-placeholder v-model="envForm.value"
										label="Value( Will Be Encrypted )" 
										placeholder="i9ju23nf39" class="ml-5"/>
									<v-btn small color="primary" class="ml-5" @click="addEnv">Add</v-btn>
								</div>
								<v-data-table :headers="envHeaders" :items="envList2" 
									hide-default-footer
									v-show="envList.length"></v-data-table>
							</v-expansion-panel-content>
						</v-expansion-panel>
					</v-expansion-panels>

				</v-form>
			</v-window-item>
		</v-window>
	</div>
	
	
	<div class="pd-20 bdt-1 d-flex al-c">
		<v-btn small @click="onBack">Back</v-btn>
		<v-btn small color="primary" class="ml-auto" v-if="curStep" :loading="creating"
			@click="onDeploy">
			Deploy
		</v-btn>
	</div>
</v-card>
</template>

<script>
import frameworks from '../../assets/frameworks.json'
const srcDir = './'
// console.log(frameworks)

export default {
	props: {
		importItem: Object,
		value: Boolean,
	},
	data() {
		return {
			selecting: false,
			curStep: 0,
			dirList: [],
			srcDir,
			initSrcDir: srcDir,
			frameworks,
			presetList: ['vue', 'React'],
			isOverBuild: true,
			isOverOutput: true,
			buildCommandHint: '`npm run build`',
			form: {
				name: '',
				framework: '',
				buildCommand: '',
				outputDirectory: '',
			},
			envHeaders: [
				{ text: 'Name', value: 'name' },
				{ text: 'Value', value: 'enc' },
			],
			envList: [],
			envForm: {
				name: '',
				value: ''
			},
			creating: false,
		}
	},
	computed: {
		userInfo() {
			return this.$store.state.userInfo
		},
		envList2() {
			return this.envList.map(it => {
				return {
					...it,
					enc: 'Encrypt',
				}
			})
		},
		chooseFramework() {
			return this.frameworks.filter(it => it.slug == this.form.framework)[0]
		},
	},
	watch: {
		value() {
			this.curStep = 0
		},
		isOverBuild() {
			this.form.buildCommand = ''
		},
		isOverOutput() {
			this.form.outputDirectory = ''
		},
	},
	methods: {
		onFramework(val) {
			const item = this.frameworks.filter(it => it.slug == val)[0]
			const { buildCommand } = item.settings
			this.form.buildCommand = buildCommand.value || ''
			this.buildCommandHint = buildCommand.placeholder || ''
		},
		addEnv() {
			const { name } = this.envForm
			if(!name) return this.$alert('invalid name')
			this.envList.push(this.envForm)
			this.envForm = {
				name: '',
				value: '',
			}
		},
		async onDeploy() {
			if(this.curStep < 2) {
				this.curStep += 1
				return
			}
			const { id: repoId } = this.importItem
			const body = {
				repoId,
				rootDirectory: this.srcDir,
				...this.form,
				env: this.envList,
			}
			if(!body.buildCommand) {
				if(this.buildCommandHint) {
					const arr = this.buildCommandHint.split(' or ')
					body.buildCommand = arr.length > 1 ? arr[0].trim() : this.buildCommandHint
				}
				else body.buildCommand = 'npm run build'
			}
			body.buildCommand = body.buildCommand.replace(/`/g, '')
			console.log(body)
			try {
				this.creating = true
				const { data } = await this.$http.post('/project', body)
				const projId = data.projectId
				const { data: {taskId} } = await this.$http.post(`/project/${projId}/build`)
				// await this.$alert('Project created successfully')
				this.$router.replace(`/build/${projId}/${taskId}/overview`)
			} catch (error) {
				// 
			}
			this.creating = false
		},
		async onSelect() {
			this.form.name = this.importItem.name
			this.form.framework = 'vue'
			try {
				this.selecting = true
				await this.getRepoDir()
				this.curStep = 1
			} catch (error) {
				console.log(error)
				this.curStep = 2
			}
			this.selecting = false
		},
		async getRepoDir(item) {
			const params = {}
			if(item) {
				params.rootPath = item.id
			}
			let { data } = await this.$http.get('/repo/dir/' + this.importItem.name, {
				params,
			})
			data = data.map(it => {
				it.id = it.fullPath
				if(it.type == 'dir') it.children = []
				return it
			}).sort((a) => {
				return a.type == 'dir' ? -1 : 1
			})
			if(item) {
				item.children = data
			} else {
				this.dirList = [
					{
						name: this.importItem.name,
						id: srcDir,
						type: 'dir',
						children: data,
					},
				]
			}
		},
		onBack() {
			if(this.curStep > 0) this.curStep -= 1
			else this.$emit('close')
		},
	},
}
</script>
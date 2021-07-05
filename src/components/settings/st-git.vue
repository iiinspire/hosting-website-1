<template>
<div>
	<div class="bd-1">
		<div class="pd-20">
			<h3>Connected Fit Repository</h3>
			<div class="gray mt-1 fz-14">
				Seamlessly creat Deployments for any commits pushed to your Git repository.
			</div>
			<div class="pd-15-20 mt-5 bd-1 d-flex al-c">
				<v-icon color="#4A96FA" size="32">mdi-github</v-icon>
				<div class="ml-5">
					<h3 class="color-1">demo/demo</h3>
					<div class="gray fz-13">
						Connected 2d ago
					</div>
				</div>
				<v-btn class="ml-auto" outlined color="#888">Disconnect</v-btn>
			</div>
		</div>
		<div class="pd-15-20 bdt-1 bg-f8">
			<div class="gray fz-12">
				Learn more about <a href="" target="_blank">4everland for Git</a>
			</div>
		</div>
	</div>

	<div class="bd-1 mt-5">
		<div class="pd-20">
			<h3>Production Branch</h3>
			<div class="gray mt-1 fz-14">
				By default,every commit pushed to the 'main' branch will trigger a Production Deployment instead of the usual Preview Deployment. You can switch to a different branch here.
			</div>
			<div class="mt-3">
				<v-select v-model="form.branch"
					:items="branches"
					label="Select Branch">
				</v-select>
			</div>
		</div>
		<div class="pd-15-20 bdt-1 bg-f8">
			<div class="gray fz-12">
				Learn more about <a href="" target="_blank">Production Branch</a>
			</div>
		</div>
	</div>

	<div class="bd-1 mt-5">
		<div class="pd-20">
			<h3>Deploy Hooks</h3>
			<div class="gray mt-1 fz-14">
				Deploy hooks are unique URLs that allow you to trigger a deployment of a given branch.
				This project does not have any deploy hooks.
			</div>
			<div class="mt-3">
				<h3></h3>
			</div>
		</div>
		<div class="pd-15-20 bdt-1 bg-f8">
			<div class="gray fz-12">
				Learn more about <a href="" target="_blank">Deploy Hooks</a>
			</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
	data() {
		return {
			form: {
				branch: '',
			},
			branches: ['main', 'test']
		}
	}
}
</script>
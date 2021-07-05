<template>
<div>
	<div class="bd-1">
		<div class="pd-20">
			<h3>Directory Listing</h3>
			<div class="gray mt-1 fz-14">
				If no index file is present within a directory, the directory contents will be displayed.
			</div>
			<div class="mt-3">
				<v-switch v-model="isListing" :label="isListing ? 'Enabled' : 'Disabled'"></v-switch>
			</div>
		</div>
		<div class="pd-15-20 bdt-1 bg-f8">
			<div class="gray fz-12">
				Learn more about <a href="" target="_blank">Directory Listing</a>
			</div>
		</div>
	</div>

	<div class="bd-1 pd-20 mt-5 d-flex al-c">
		<div class="mr-8">
			<h3>Your Statistics</h3>
			<div class="gray mt-1 fz-14">
				We will display  your DApps Statistics on website. If you don't want to open it, close the button and we will hide your  information.
			</div>
		</div>
		<v-switch class="ml-auto" v-model="isStatis"></v-switch>
	</div>

	<div class="bd-1 mt-5">
		<div class="pd-20">
			<h3>Delete Project</h3>
			<div class="gray mt-1 fz-14">
				The project will be permanently deleted,including its deployments and domains. This action is irreversible can not be undone.
			</div>
		</div>
		<div class="pd-10-20 bdt-1 bg-f8 d-flex">
			<v-btn color="error" small class="ml-auto">Delete</v-btn>
		</div>
	</div>
</div>
</template>

<script>
export default {
	data() {
		return {
			isListing: false,
			isStatis: false,
		}
	}
}
</script>
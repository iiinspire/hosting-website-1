<template>
<div>
	<h3>Domains</h3>
	<div class="gray mt-1 fz-14">
		These domains are assigned to your Production Deployments.Optionally, a different Git branch or a redirection to another domain can be configured for each one.
	</div>
	<div class="mt-5 d-flex">
		<v-text-field outlined dense v-model="form.website" placeholder="mywebsite.com">
		</v-text-field>
		<v-btn color="primary" class="ml-4" style="margin-top: 2px;">Save</v-btn>
	</div>
	<div class="bd-1 mt-1">
		<div class="pd-20">
			<div class="d-flex al-c">
				<h3>4everland.com</h3>
				<v-chip small color="success" class="ml-3">production</v-chip>
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
				website: '',
			}
		}
	}
}
</script>
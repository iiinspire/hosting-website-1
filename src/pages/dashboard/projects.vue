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
		<v-btn small depressed color="primary">New Project</v-btn>
	</div>
	<v-row>
		<v-col cols="12" :md="6"
			v-for="i in 4" :key="i">
			<v-card outlined class="hover-c1 trans-200" to="/project/overview">
				<v-img src="img/proj-bg-def.png"></v-img>
				<v-card-title>
					<span>demo-app</span>
					<div class="ml-auto">
						<v-btn small depressed color="primary" @click.prevent="onVisit">Visit</v-btn>
					</div>
				</v-card-title>
				<v-card-subtitle>
					<div>
						demo-app.verce
						<span class="ml-3 gray">2d ago</span>
					</div>
				</v-card-subtitle>

				<v-divider></v-divider>

				<v-card-subtitle>
					<v-icon :color="$color1">mdi-github</v-icon>
					<span class="ml-2">demo/demo-app</span>
					<span class="fl-r gray">Updated 27d ago</span>
				</v-card-subtitle>
			</v-card>
		</v-col>
	</v-row>
</div>
</template>

<script>
export default {
	methods: {
		onVisit() {
			this.$alert('develop')
		}
	}
}
</script>
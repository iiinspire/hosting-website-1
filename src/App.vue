<template>
	<v-app>
		<v-app-bar :app="false" :color="bg1" dark>
			<a href="/">
				<img src="img/icon.svg" style="height: 30px" class="d-b" />
			</a>
			<v-spacer></v-spacer>
		</v-app-bar>
		<v-main style="min-height: 70vh;">
			<router-view></router-view>
		</v-main>

		<e-alert></e-alert>

		<v-footer dark :color="bg1">
			<e-footer></e-footer>
		</v-footer>
	</v-app>
</template>

<script>

export default {
	name: 'App',
	data: () => ({
		bg1: '#1e2226',
	}),
	methods: {
		
	}
};
</script>

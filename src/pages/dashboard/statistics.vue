<style>
.bg-s0 { background: #75A6E7; }
.bg-s1 { background: #84D199; }
.bg-s2 { background: #BE80E0; }
</style>

<template>
<div>
	<v-card outlined>
		<div class="pd-20">
			<div class="mb-6">
				<v-select style="max-width: 300px;" class="ml-auto"
					v-model="appId"
					:items="['demo app']" clearable
					menu-props="auto"
					label="All Dapps"
					hide-details
					prepend-icon="mdi-apps"
					single-line
					></v-select>
			</div>
			<v-row class="mb-5">
				<v-col cols="12" md="4"
					v-for="(row, i) in cardList" :key="i">
					<div class="pd-20 bdrs-5 white-0" :class="'bg-s'+i">
						<div>{{ row.title }}</div>
						<div class="fz-14 mt-5">
							<div>
								<span class="op-7">Today</span>
								<span class="fl-r">{{ row.today }}</span>
							</div>
							<div class="mt-2">
								<span class="op-7">Yesterday</span>
								<span class="fl-r">{{ row.yesterday }}</span>
							</div>
						</div>
					</div>
				</v-col>
			</v-row>
			<v-data-table :headers="headers" :items="list"></v-data-table>
		</div>
	</v-card>
</div>
</template>

<script>
export default {
	data() {
		return {
			appId: null,
			cardList: [
				{
					title: 'New users',
					today: '+100',
					yesterday: '+200',
				},
				{
					title: 'UV',
					today: '+100',
					yesterday: '+200',
				},
				{
					title: 'PV',
					today: '+100',
					yesterday: '+200',
				},
			],
			headers: [
				{ text: 'Time', value: 'time' },
				{ text: 'New users', value: 'userNum' },
				{ text: '1day', value: 'd1' },
				{ text: '2day', value: 'd1' },
				{ text: '3day', value: 'd1' },
				{ text: '4day', value: 'd1' },
				{ text: '5day', value: 'd1' },
				{ text: '6day', value: 'd1' },
				{ text: '7day', value: 'd1' },
			],
			list: [],
		}
	}
}
</script>
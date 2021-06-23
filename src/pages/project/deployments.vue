<template>
<div>
	<v-card outlined>
		<div class="pos-r bg-proj-1">
			<div class="y-center w100p d-flex al-c pd-20">
				<div class="white-0">
					<div class="fz-18">Deployments</div>
					<div class="mt-1 white-5 fz-14">
						A list of deployments in <span class="white-0">nuxtjs</span>
					</div>
				</div>
				<!-- <div class="ml-auto"></div> -->
			</div>
		</div>
		<div class="pd-20">
			<div class="bd-1 bdrs-5">
				<div v-ripple class="bdb-1 pd-20" :class="{
					'bdb-1': i < 3,
					'd-flex al-c flex-wrap': !$vuetify.breakpoint.smAndDown,
				}"
					v-for="i in 3" :key="i">
					<div class="d-flex" 
						:style="$vuetify.breakpoint.smAndDown ? 'margin-bottom: 10px;' : 'width: 300px; margin-right: 30px;'">
						<div class="flex-1">
							<div>demo app {{$vuetify.breakpoint.smAndDown }}</div>
							<div class="gray mt-1 fz-13">Production(Current)</div>
						</div>
						<div class="ml-5">
							<div class="gray">Ready</div>
							<div class="mt-1 fz-13">54S</div>
						</div>
					</div>
					<div class="d-flex al-c flex-1">
						<div class="flex-1 mr-5">
							<div>Initial commit Created from https://xxx</div>
							<div class="fz-14 mt-1">
								<v-icon size="14">mdi-source-branch</v-icon>
								<span>master</span>
							</div>
						</div>
						<span class="fl-r gray fz-13" v-show="!$vuetify.breakpoint.smAndDown">1h ago by hqs</span>
						<v-menu>
							<template v-slot:activator="{ attrs, on }">
								<v-btn icon
									v-bind="attrs"
									v-on="on">
									<v-icon>mdi-dots-vertical</v-icon>
								</v-btn>
							</template>
							<v-list>
								<v-list-item link
									v-for="(item, i) in list" :key="i">
									<v-list-item-title>
										<v-icon size="16">mdi-{{item.icon}}</v-icon>
										<span class="fz-15 ml-2">{{item.text}}</span>
									</v-list-item-title>
								</v-list-item>
							</v-list>
						</v-menu>
						
					</div>
				</div>
			</div>
		</div>
	</v-card>
</div>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{
					text: 'Redeploy',
					icon: 'send',
				},
				{
					text: 'Inspect Deployment',
					icon: 'card-search-outline',
				},
				{
					text: 'View Source',
					icon: 'xml',
				},
				{
					text: 'Copy URL',
					icon: 'link-variant',
				},
			]
		}
	}
}
</script>
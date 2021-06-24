import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './css/style.scss'
import './components'
import './api'

Vue.prototype.$openWindow = (url) => {
	window.open(url, 'n1', 'height=600,width=900,top=50,left=200,toolbar=no,menubar=no') 
}

Vue.config.productionTip = false

Vue.prototype.$color1 = '#4A96FA'

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App),
	mounted() {
		this.onInit()
	},
	methods: {
		async onInit() {
			const now = Date.now()
			if(localStorage.token && now - localStorage.refreshAt > 2*3600e3) {
				try {
					await this.$http.get('/githubapp/refresh')
					localStorage.refreshAt = now
				} catch (error) {
					console.log(error.response)
				}
			}
		},
	},
}).$mount('#app')

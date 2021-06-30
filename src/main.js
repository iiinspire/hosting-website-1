import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './css/style.scss'
import './components'
import './api'

Vue.prototype.$openWindow = (url) => {
	if(store.state.isTouch) location.href = url
	else window.open(url, 'n1', 'height=600,width=900,top=50,left=200,toolbar=no,menubar=no') 
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
	watch: {
		'$route.path'() {
			window.scrollTo(0, 0)
		},
		token(val) {
			if(val) {
				this.getUesrInfo()
			}
		},
	},
	methods: {
		async onInit() {
			const now = Date.now()
			if(localStorage.token) {
				this.getUesrInfo()
				try {
					if(now - localStorage.refreshAt > 2*3600e3) {
						await this.$http.get('/githubapp/refresh')
						localStorage.refreshAt = now
					}
				} catch (error) {
					console.log(error.response)
				}
			}
		},
		async getUesrInfo() {
			const { data } = await this.$http.get('/user')
			this.$setState({
				userInfo: data,
			})
		},
	},
}).$mount('#app')

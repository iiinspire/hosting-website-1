import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { mapState } from 'vuex'
import vuetify from './plugins/vuetify'
import './css/style.scss'
import './components'
import './api'
import VueClipboards from 'vue-clipboards'

Vue.use(VueClipboards)

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
	computed: {
		...mapState({
			token: s => s.token,
		}),
	},
	mounted() {
		this.onInit()
	},
	watch: {
		'$route.path'() {
			window.scrollTo(0, 0)
		},
		token(val) {
			if(val) {
				this.onInit()
			}
		},
	},
	methods: {
		async onInit() {
			const now = Date.now()
			if(this.token) {
				this.initSocket()
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
		initSocket() {
			this.socket = window.io('ws.foreverland.xyz', {
				path: '/socket.io',
				query: 'token=' + this.token,
				withCredentials: false,
			})
			this.socket.on('error', (err) => {
				console.log('socket error', err, this.socket)
				this.isSocketOn = false
				// this.initSocket() // socket.io auto reconnect
			})
			this.socket.on('connect', () => {
				console.log('socket connect')
				this.isSocketOn = true
			})
			this.socket.on('PROJECT_BUILD', ({name, data}) => {
				if(name == 'log') {
					data.content = atob(data.content)
				}
				console.log(name, data)
			})
		},
		async getUesrInfo() {
			const { data } = await this.$http.get('/user')
			this.$setState({
				userInfo: data,
			})
		},
	},
}).$mount('#app')

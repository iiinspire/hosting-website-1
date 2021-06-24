import Vue from 'vue'
import Axios from 'axios'

const http = Axios.create({
	baseURL: 'https://h.foreverland.xyz',
})

http.interceptors.request.use(config => {
	const { token } = localStorage
	// config.params = config.params || {}
	if(token) {
		config.headers.common['token'] = token
	}
	return config
}, error => {
	console.log(error)
	return Promise.reject(error)
})

http.interceptors.response.use(res => {
	const data = res.data
	if(data.code != 200) {
		let msg = data.message || `${data.code} error`
		Vue.prototype.$loading.close()
		console.log(msg)
		Vue.prototype.$alert(msg)
		throw data
	}
	if('data' in data) {
		return data
	}
	return res
}, error => {
	const { data = {}, status, statusText } = error.response || {}
	// console.log(status, statusText)
	let msg = data.msg || statusText || (status ? `${status} error` : error.message)
	if(status == 401) {
		Vue.prototype.$router.replace('/')
	}
	if(msg) {
		Vue.prototype.$alert(msg)
	}
	return Promise.reject(error)
})

Vue.prototype.$http = http

export default http
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const SET_DATA = 'setData'

const store = new Vuex.Store({
	state: {
		nowDate: new Date(),
		...getWH(),
		isTouch: 'ontouchstart' in window,
		isFocus: true,
		appInfo: {
			title: '健身',
		},
		token: localStorage.token,
		loginSta: 0,
		userInfo: {},
		noticeMsg: {},
		alertInfo: {},
	},
	mutations: {
		[SET_DATA](state, data) {
			for(const key in data) {
				state[key] = data[key]
			}
		},
	},
})

export const setState = Vue.prototype.$setState = data => {
	store.commit(SET_DATA, data)
}

function getWH() {
	const { clientWidth, clientHeight } = document.documentElement
	return {
		clientWidth, clientHeight,
	}
}
window.onresize = () => {
	setState({
		...getWH(),
	})
}
window.onblur = () => {
	setState({
		isFocus: false,
	})
}
window.onfocus = () => {
	setState({
		isFocus: true,
	})
}

setInterval(() => {
	setState({
		nowDate: new Date(),
	})
}, 5e3)

export default store
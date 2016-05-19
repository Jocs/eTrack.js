/**
 * create by Jocs 2016.04.21
 */
import 'whatwg-fetch'

export const createConstants = (...constants) => constants.reduce((acc, constant) => {
	acc[constant] = constant
	return acc
}, {})

export const createReducer = (initialState, reduceMap) => (state = initialState, action) => {
	const reducer = reduceMap[action.type]
	return reducer ? reducer(state, action.payload) : state
}

export const checkHttpStatus = response => {
	if (response.status >= 200 && response.status < 300) {
		return response
	} else {
		const err = new Error(response.statusText)
		err.response = response
		throw err
	}
}

export const parseJSON = response => response.json()

export const getToken = () => localStorage.getItem('token')
export const setToken = token => localStorage.setItem('token', token)
export const removeToken = () => localStorage.removeItem('token')

// get , set 主题
export const getTheme = () => localStorage.getItem('theme') ? localStorage.getItem('theme') : ''
export const setTheme = themeName => localStorage.setItem('theme', themeName)

export const postJSON = (url, data) => {
	return fetch(url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
}

export const fetchV = (url, method, data) => {
	return new Promise((resolve, reject) => {
		const option = method === 'GET' ? {
			method: method,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'authorization': `Bearer ${getToken()}`
			}
		} : {
			method: method,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'authorization': `Bearer ${getToken()}`
			},
			body: data && JSON.stringify(data)
		}

		fetch(url, option)
		.then(checkHttpStatus)
		.then(parseJSON)
		.then(resolve)
		.catch(reject)
	})
}
// // normal fetch
// export const crosFetch = (url, method) => {
// 	return new Promise((resolve, reject) => {
// 		const xhr = new XMLHttpRequest()
// 		xhr.open(method, url, true)
// 		xhr.responseType = 'json'
// 		xhr.send()
// 		xhr.onload = function() {
// 			if (this.status >= 200 && this.status < 300) {
// 				resolve(this.response)
// 			} else {
// 				reject(this.statusText)
// 			}
// 		}
// 		xhr.onerror = function() {
// 			reject(this.statusText)
// 		}
// 	})
// }

let socket = null

export const getSocket = () => {
	if (socket) return socket
	const url = window.location.origin
	socket = io.connect(url)
	return socket
}


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




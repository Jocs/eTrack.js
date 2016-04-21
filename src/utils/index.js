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
export const setToken = toekn => localStorage.setItem('token')
export const removeToken = () => localStorage.removeItem('token')

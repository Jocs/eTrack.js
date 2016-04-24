/**
 * create by Jocs 2016.4.21
 */
import { createReducer } from '../utils'
import C from '../constants'

const initialState = {
	token: null,
	userName: '',
	email: '',
	userId: '',
	portrait: '',
	isAuthenticated: false,
	isAuthenticating: false,
	statusText: null,
	loginPanel: 'hidden'
}

export default createReducer(initialState, {
	[C.SIGNUP_SUCCESS]: (state, payload) => {
		return Object.assign({}, state, {
			isAuthenticating: false,
			isAuthenticated: true,
			token: payload.token,
			userName: payload.userName,
			email: payload.email,
			userId: payload._id,
			portrait: payload.portrait,
			statusText: 'You have been successfully logged in.'
		})
	},
	[C.TOGGLE_LOGIN_PANEL]: (state, payload) => {
		return Object.assign({}, state, {
			loginPanel: payload
		})
	},
	[C.LOGOUT]: (state, payload) => {
		return initialState
	}
})

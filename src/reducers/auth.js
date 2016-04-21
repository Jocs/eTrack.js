/**
 * create by Jocs 2016.4.21
 */
import jwtDecode from 'jwt-decode'
import { createReducer } from '../utils'
import C from '../constants'

const initialState = {
	token: null,
	userName: null,
	isAuthenticated: false,
	isAuthenticating: false,
	statusText: null,
	loginPanel: false
}

export default createReducer(initialState, {
	[C.LOGIN_USER_SUCCESS]: (state, payload) => {
		return Object.assign({}, state, {
			isAuthenticating: false,
			isAuthenticated: true,
			token: payload.token,
			userName: jwtDecode(payload.token).userName,
			statusText: 'You have been successfully logged in.'
		})
	},
	[C.SHOW_LOGIN_PANEL]: (state, payload) => {
		return Object.assign({}, state, {
			loginPanel: true
		})
	}
})

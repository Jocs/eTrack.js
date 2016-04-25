/**
 * create by Jocs 2016.4.21
 */

import C from '../constants'
import { setToken, removeToken, fetchV } from '../utils'
import { getAppList } from './applist'

export const getMe = token => {
	return (dispatch, getState) => {
		fetchV('/api/user/getMe', 'GET')
		.then(response => {
			dispatch(singupSuccess(response.data))
			dispatch(getAppList(response.data._id))
		})
		.catch(error => {
			console.log(error)
			removeToken()
		})
	}
}

export const singupSuccess = profile => {
	setToken(profile.token)
	return {
		type: C.SIGNUP_SUCCESS,
		payload: profile
	}
}

export const toggleLoginPanel = msg => ({
	type: C.TOGGLE_LOGIN_PANEL,
	payload: msg
})

export const logout = () => {
	removeToken()
	return {
		type: C.LOGOUT
	}
}



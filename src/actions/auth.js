/**
 * create by Jocs 2016.4.21
 */

import C from '../constants'

export const loginUserSuccess = token => ({
	type: C.LOGIN_USER_SUCCESS,
	payload: token
})

export const toggleLoginPanel = msg => ({
	type: C.TOGGLE_LOGIN_PANEL,
	payload: msg
})



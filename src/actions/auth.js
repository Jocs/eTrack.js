/**
 * create by Jocs 2016.4.21
 */

import { LOGIN_USER_SUCCESS } from './constants'

export const loginUserSuccess = token => ({
	type: LOGIN_USER_SUCCESS,
	payload: token
})

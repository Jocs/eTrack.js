/**
 * create by Jocs 2016.04.24
 */

import C from '../constants'
import { createReducer } from '../utils'

const initialState = {
	consoleLeftNav: true,
	isSocketConnect: false,
	hasSubscribe: false
}

export default createReducer(initialState, {
	[C.TOOGLE_CONSOLE_LEFTNAV]: (state, payload) => {
		return Object.assign({}, state, {
			consoleLeftNav: !state.consoleLeftNav
		})
	},
	[C.SOCKET_CONNECT]: (state, payload) => {
		return Object.assign({}, state, {
			isSocketConnect: true
		})
	},
	[C.SUBSCRIBE]: (state, payload) => {
		return Object.assign({}, state, {hasSubscribe: true})
	}
})

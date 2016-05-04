/**
 * create by Jocs 2016.05.03
 */

import C from '../constants'
import { createReducer } from '../utils'

const initialState = {
	currentApp: null,
	unReadCount: 0,
	currentErrorList: [],
	autoRefresh: false
}

export default createReducer(initialState, {
	[C.SELECT_CURRENT_APP]: (state, payload) => {
		return Object.assign({}, state, {currentApp: payload})
	},
	[C.UPDATE_CURRENT_ERROR_LIST]: (state, payload) => {
		return Object.assign({}, state, {unReadCount: 0, currentErrorList: payload})
	},
	[C.INCREASE_UNREAD_COUNT]: (state, payload) => {
		const { unReadCount } = state
		return Object.assign({}, state, {unReadCount: unReadCount + payload})
	},
	[C.TOGGLE_AUTO_REFRESH]: (state, payload) => {
		return Object.assign({}, state, {autoRefresh: payload})
	}
})

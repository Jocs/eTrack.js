/**
 * create by Jocs 2016.04.25
 */

import C from '../constants'
import { createReducer } from '../utils'

const initialState = []

export default createReducer(initialState, {
	[C.UNDATE_APP_LIST]: (state, payload) => payload,
	[C.ADD_APP_TO_STATE]: (state, payload) => {
		console.log(payload)
		return [payload, ...state]
	}
})


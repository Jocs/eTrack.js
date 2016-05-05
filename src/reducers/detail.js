/**
 * create by jocs 2016.05.04
 */

import C from '../constants'
import { createReducer } from '../utils'

const initialState = {
	_id: null,
	environment: null,
	userAgentInfo: null
}

export default createReducer(initialState, {
	[C.UPDATE_DETAIL_ERROR]: (state, payload) => payload
})

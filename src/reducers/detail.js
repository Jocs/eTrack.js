/**
 * create by jocs 2016.05.04
 */

import C from '../constants'
import { createReducer } from '../utils'

const initialState = {
	_id: null,
	environment: null,
	userAgentInfo: null,
	country: '中国',
	province: '',
	city: '获取城市信息...'
}

export default createReducer(initialState, {
	[C.UPDATE_DETAIL_ERROR]: (state, payload) => Object.assign({}, state, payload),
	[C.RESET_DETAIL_ERROR]: (state, payload) => initialState,
	[C.UPDATE_CITY]: (state, payload) => Object.assign({}, state, {
		province: payload.province,
		city: payload.city
	})
})

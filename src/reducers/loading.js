/**
 * create by Jocs 2016.4.21
 */
import { createReducer } from '../utils'
import C from '../constants'

const initialState = 'hide'

export default createReducer(initialState, {
	[C.TOGGLE_LOADING]: (state, payload) => payload
})

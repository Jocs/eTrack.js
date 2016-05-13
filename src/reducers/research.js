/**
 * create by Jocs 2016.05.13
 */
import C from '../constants'
import { createReducer } from '../utils'

const initialState = {
	searchResult: [],
	total: 0,
	pageNumber: 0,
	pageSize: 10
}

export default createReducer(initialState, {
	[C.UPDATE_SEARCH_RESULT]: (state, payload) => {
		const { searchResult, total, pageNumber } = payload
		return Object.assign({}, state, {searchResult, total, pageNumber})
	}
})

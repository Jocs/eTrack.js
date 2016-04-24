/**
 * create by Jocs 2016.4.25
 */
import { createReducer } from '../utils'
import C from '../constants'

const initialState = {
	snackbarMessage: '',
	snackbarDuration: 3000,
	snackbarOpen: false,
	sanckbarType: 'success'
}

export default createReducer(initialState, {
	[C.OPEN_SNACK_BAR]: (state, payload) => {
		return Object.assign({}, state, {
			snackbarMessage: payload.message,
			snackbarOpen: true,
			sanckbarType: payload.type,
			snackbarDuration: payload.duration
		})
	},
	[C.CLOSE_SNACK_BAR]: (state, payload) => initialState
})

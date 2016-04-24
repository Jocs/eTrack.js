/**
 * create by Jocs 2016.04.25
 */

import C from '../constants'

export const openSnackBar = (message, type = 'success', duration = 3000) => ({
	type: C.OPEN_SNACK_BAR,
	payload: {message, type, duration}
})

export const closeSnackBar = () => ({
	type: C.CLOSE_SNACK_BAR
})

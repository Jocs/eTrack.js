/**
 * create by Jocs 2016.4.22
 */

import C from '../constants'

export const toggleLoadingStatus = status => ({
	type: C.TOGGLE_LOADING,
	payload: status
})


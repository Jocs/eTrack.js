/**
 * create by Jocs 2016.04.24
 */

import C from '../constants'

export const toggleConsleLeftNav = () => {
	return {
		type: C.TOOGLE_CONSOLE_LEFTNAV
	}
}

export const socketConnect = () => ({
	type: C.SOCKET_CONNECT
})

export const subscribe = () => ({
	type: C.SUBSCRIBE
})

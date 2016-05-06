/**
 * create by Jocs 2016.05.04
 */

import { getSocket } from '../utils'
import { updateUnReadCount, addNewToErrorList } from './current'
import { openSnackBar } from './snackBar'
import { updateErrorLocation } from './dashboard'

const socket = getSocket()

// 用来监听errorMessage 消息，并作出反应
export const socketErrorMessageListener = () => {
	return (dispatch, getState) => {
		socket.on('errorMessage', data => {
			const { autoRefresh } = getState().current
			dispatch(openSnackBar(`${data.user} : ${data.message}`, 'danger', 5000))
			if (data.environment.location) {
				dispatch(updateErrorLocation(data))
			}
			if (autoRefresh) {
				dispatch(addNewToErrorList(data))
			} else {
				dispatch(updateUnReadCount(1))
			}
		})
	}
}

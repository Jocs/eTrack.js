/**
 * create by Jocs 2016.05.04
 */

import { getSocket } from '../utils'
import { updateUnReadCount, addNewToErrorList } from './current'
import { openSnackBar } from './snackBar'
import { updateErrorLocation } from './dashboard'
import { ipToLocation } from '../utils/fetchService'

const socket = getSocket()

// 用来监听errorMessage 消息，并作出反应
export const socketErrorMessageListener = () => {
	return (dispatch, getState) => {
		socket.on('errorMessage', data => {
			const { autoRefresh } = getState().current
			dispatch(openSnackBar(`${data.user} : ${data.message}`, 'danger', 5000))
			const { location, ip } = data.environment
			if (location) {
				dispatch(updateErrorLocation(data))
			} else if (!location && ip) {
				ipToLocation(ip)
				.then(res => {

					if (res.status === 0) {
						const { x, y } = res.content.point

						data.environment.location = JSON.stringify({
							longitude: x,
							latitude: y
						})
						dispatch(updateErrorLocation(data))
					} else if (res.status === 1 || res.status === 2) {
						dispatch(openSnackBar(res.message, 'danger', 4000))
					} else {
						dispatch(openSnackBar('无法解析ip返回信息', 'danger', 3000))
					}
				})
				.catch(err => {
					console.log(err)
					dispatch(openSnackBar('根据ip查询地理位置失败', 'danger', 3000))
				})
			}
			if (autoRefresh) {
				dispatch(addNewToErrorList(data))
			} else {
				dispatch(updateUnReadCount(1))
			}
		})
	}
}

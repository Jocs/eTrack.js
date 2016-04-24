/**
 * create by Jocs 2016.04.24
 */

import { toggleLoadingStatus } from './loading'
import { fetchV } from '../utils'
import { openSnackBar } from './snackBar'

export const createApp = data => {
	return (dispatch, getState) => {
		dispatch(toggleLoadingStatus('loading'))
		fetchV('/api/applications/createApp', 'POST', data)
		.then(response => {
			dispatch(toggleLoadingStatus('hide'))
			dispatch(openSnackBar('创建应用成功！', 'primary', 4000))
		})
		.catch(error => {
			console.log(error)
			dispatch(openSnackBar('创建应用失败！', 'warning', 4000))
			dispatch(toggleLoadingStatus('hide'))
		})
	}
}

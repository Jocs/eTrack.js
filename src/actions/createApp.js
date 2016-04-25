/**
 * create by Jocs 2016.04.24
 */
import C from '../constants'
import { toggleLoadingStatus } from './loading'
import { fetchV } from '../utils'
import { openSnackBar } from './snackBar'
import { push } from 'redux-router'

const addAppToState = response => ({
	type: C.ADD_APP_TO_STATE,
	payload: response
})


export const createApp = data => {
	return (dispatch, getState) => {
		dispatch(toggleLoadingStatus('loading'))
		fetchV('/api/applications/createApp', 'POST', data)
		.then(res => {
			dispatch(toggleLoadingStatus('hide'))
			dispatch(openSnackBar('创建应用成功！', 'success', 4000))
			res.code === 1 && dispatch(addAppToState(res.response))
			dispatch(push('/applist'))
		})
		.catch(error => {
			console.log(error)
			dispatch(openSnackBar('创建应用失败！', 'warning', 4000))
			dispatch(toggleLoadingStatus('hide'))
		})
	}
}

/**
 * create by Jocs 2016.05.04
 */

import C from '../constants'
import { fetchSingleError } from '../utils/fetchService'
import { toggleLoadingStatus } from './loading'
import { openSnackBar } from './snackBar'

export const updateDetailError = error => ({
	type: C.UPDATE_DETAIL_ERROR,
	payload: error
})

export const fetchDetailErrorIfNeeded = errorId => {
	return (dispatch, getState) => {
		const { _id } = getState().detail
		if (errorId === _id && _id) return false
		dispatch(toggleLoadingStatus('loading'))
		fetchSingleError(errorId)
		.then(data => {
			if (data.code === 1) {
				dispatch(updateDetailError(data.data))
			} else {
				dispatch(openSnackBar('数据库获取错误详情失败', 'danger', 3000))
			}
			dispatch(toggleLoadingStatus('hide'))
		})
		.catch(err => {
			console.log(err)
			dispatch(openSnackBar('获取错误详情失败', 'danger', 3000))
			dispatch(toggleLoadingStatus('hide'))
		})
	}
}

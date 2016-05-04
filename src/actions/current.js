/**
 * create by Jocs 2016.05.03
 */

import C from '../constants'
import { fetchErrorList } from '../utils/fetchService'
import { toggleLoadingStatus } from './loading'
import { openSnackBar } from './snackBar'

export const toggleAutoRefresh = value => ({
	type: C.TOGGLE_AUTO_REFRESH,
	payload: value
})

export const selectCurrentApp = app => ({
	type: C.SELECT_CURRENT_APP,
	payload: app
})

export const selectAppAndUpdateList = app => {
	return (dispatch, getState) => {
		dispatch(selectCurrentApp(app))
		dispatch(fetchCurrentErrorList(app._id))
	}
}

export const updateCurrentErrorList = data => ({
	type: C.UPDATE_CURRENT_ERROR_LIST,
	payload: data
})

export const undateUnReadCount = number => ({
	type: C.INCREASE_UNREAD_COUNT,
	payload: number
})

export const fetchCurrentErrorList = appId => {
	const pageNumber = 1
	const pageSize = 30
	return (dispatch, getState) => {
		dispatch(toggleLoadingStatus('loading'))
		fetchErrorList(appId, pageNumber, pageSize)
		.then(res => {
			if (res.code === 1) dispatch(updateCurrentErrorList(res.data))
			else if (res.code === 0) dispatch(openSnackBar('从数据库获取错误列表失败', 'error', 3000))
			dispatch(toggleLoadingStatus('hide'))
		})
		.catch(err => {
			console.log(err)
			dispatch(openSnackBar('获取实时错误列表失败', 'error', 3000))
			dispatch(toggleLoadingStatus('hide'))
		})
	}
}

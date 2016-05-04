/**
 * create by Jocs 2016.05.03
 */

import C from '../constants'
import { fetchErrorList } from '../utils/fetchService'
import { toggleLoadingStatus } from './loading'
import { openSnackBar } from './snackBar'
import { getSocket } from '../utils'

export const toggleAutoRefresh = value => ({
	type: C.TOGGLE_AUTO_REFRESH,
	payload: value
})

export const selectCurrentApp = app => {
	return {
		type: C.SELECT_CURRENT_APP,
		payload: app
	}
}

export const selectAppAndUpdateList = app => {
	const socket = getSocket()
	return (dispatch, getState) => {
		const { isSocketConnect, hasSubscribe } = getState().console
		const { _id } = getState().current.currentApp
		if (isSocketConnect && hasSubscribe && _id) {
			socket.emit('unsubscribe', _id)
			socket.emit('subscribe', app._id)
		}
		dispatch(selectCurrentApp(app))
		dispatch(fetchCurrentErrorList(app._id))
	}
}

export const updateCurrentErrorList = data => ({
	type: C.UPDATE_CURRENT_ERROR_LIST,
	payload: data
})

export const updateUnReadCount = number => ({
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

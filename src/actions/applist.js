/**
 * create by Jocs 2016.04.25
 */

import C from '../constants'
import { toggleLoadingStatus } from './loading'
import { fetchAppList, deleteApp } from '../utils/fetchService'
import { openSnackBar } from './snackBar'
import { selectCurrentApp, fetchCurrentErrorList } from './current'
import {
	fetchStatistic,
	fetchErrorLocation,
	fetchBrowsers
} from './dashboard'
import { getSocket } from '../utils'
import { subscribe } from './console'

export const updateAppList = apps => ({
	type: C.UNDATE_APP_LIST,
	payload: apps.apps
})

export const pullOneAppOutOfList = appId => ({
	type: C.PULL_ONE_APP_OUT_OF_LIST,
	payload: appId
})

export const getAppList = userId => {
	const socket = getSocket()
	return (dispatch, getState) => {
		dispatch(toggleLoadingStatus('loading'))
		fetchAppList(userId)
		.then(apps => {
			if (apps.apps.length === 0) {
				dispatch(openSnackBar('应用列表为空，请创建应用！', 'info', 4000))
			} else {
				const { isSocketConnect, hasSubscribe } = getState().console
				const appId = apps.apps[0]._id
				if (isSocketConnect && !hasSubscribe) socket.emit('subscribe', apps.apps[0]._id)
				dispatch(subscribe())
				dispatch(updateAppList(apps))
				dispatch(selectCurrentApp(apps.apps[0]))
				dispatch(fetchCurrentErrorList(appId))
				dispatch(fetchStatistic(appId))
				dispatch(fetchErrorLocation(appId))
				dispatch(fetchBrowsers(appId))
			}
			dispatch(toggleLoadingStatus('hide'))
		})
		.catch(error => {
			dispatch(openSnackBar('获取应用列表失败！', 'danger', 4000))
			console.log(error)
			dispatch(toggleLoadingStatus('hide'))
		})

	}
}

export const deleteApplication = (userId, appId) => {
	return (dispatch, getState) => {
		dispatch(toggleLoadingStatus('loading'))
		deleteApp(userId, appId)
		.then(res => {
			if (res.code === 1) {
				dispatch(openSnackBar(res.message, 'success', 4000))
				dispatch(pullOneAppOutOfList(appId))
			} else if (res.code !== 1) {
				dispatch(openSnackBar('删除应用失败', 'danger', 4000))
			}
			dispatch(toggleLoadingStatus('hide'))
		})
		.catch(err => {
			console.log(err)
			dispatch(toggleLoadingStatus('hide'))
			dispatch(openSnackBar('删除应用失败', 'danger', 4000))
		})
	}
}










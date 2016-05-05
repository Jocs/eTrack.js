/**
 * create by Jocs 2016.04.25
 */

import C from '../constants'
import { toggleLoadingStatus } from './loading'
import { fetchAppList } from '../utils/fetchService'
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

export const getAppList = userId => {
	const socket = getSocket()
	return (dispatch, getState) => {
		dispatch(toggleLoadingStatus('loading'))
		fetchAppList(userId)
		.then(apps => {
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
			dispatch(toggleLoadingStatus('hide'))
		})
		.catch(error => {
			dispatch(openSnackBar('获取应用列表失败！', 'danger', 4000))
			console.log(error)
			dispatch(toggleLoadingStatus('hide'))
		})

	}
}

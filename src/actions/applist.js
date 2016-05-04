/**
 * create by Jocs 2016.04.25
 */

import C from '../constants'
import { toggleLoadingStatus } from './loading'
import { fetchAppList } from '../utils/fetchService'
import { openSnackBar } from './snackBar'
import { selectCurrentApp, fetchCurrentErrorList } from './current'

export const updateAppList = apps => ({
	type: C.UNDATE_APP_LIST,
	payload: apps.apps
})

export const getAppList = userId => {
	return (dispatch, getState) => {
		dispatch(toggleLoadingStatus('loading'))
		fetchAppList(userId)
		.then(apps => {
			dispatch(updateAppList(apps))
			dispatch(selectCurrentApp(apps.apps[0]))
			dispatch(fetchCurrentErrorList(apps.apps[0]._id))
			dispatch(toggleLoadingStatus('hide'))
		})
		.catch(error => {
			dispatch(openSnackBar('获取应用列表失败！', 'danger', 4000))
			console.log(error)
			dispatch(toggleLoadingStatus('hide'))
		})

	}
}











/**
 * create by Jocs 2015.05.05
 */

import C from '../constants'
import { fetchBrowserPencentage, fetchErrorsWithLocation, fetchAllInOne } from '../utils/fetchService'
import { setTheme } from '../utils'
import { openSnackBar } from './snackBar'

export const updateBrowser = browsers => {
	return {
		type: C.UPDATE_BROWSERS,
		payload: browsers
	}
}

export const initErrorWithLocation = errors => {
	return {
		type: C.INIT_ERRORS_LOCATION,
		payload: errors
	}
}

export const updateStatistic = data => {
	return {
		type: C.UPDATE_STATISTIC,
		payload: data
	}
}

export const updateErrorLocation = error => {
	return {
		type: C.UPDATE_ERRORS_LOCATION,
		payload: error
	}
}

export const changeTheme = themeName => {
	setTheme(themeName)
	return {
		type: C.CHANGE_THEME,
		payload: themeName
	}
}

export const fetchStatistic = appId => {
	return (dispatch, getState) => {
		fetchAllInOne(appId)
		.then(data => {
			if (data.code === 1) dispatch(updateStatistic(data))
			else dispatch(openSnackBar('数据库查询统计信息失败', 'danger', 4000))
		})
		.catch(err => {
			console.log(err)
			dispatch(openSnackBar('获取统计信息失败', 'danger', 4000))
		})
	}
}

export const fetchErrorLocation = appId => {
	return (dispatch, getState) => {
		fetchErrorsWithLocation(appId)
		.then(data => {
			if (data.code === 1) dispatch(initErrorWithLocation(data.data))
			else dispatch(openSnackBar('数据库查询带有地理位置信息的错误列表失败', 'danger', 4000))
		})
		.catch(err => {
			console.log(err)
			dispatch(openSnackBar('获取带有地理位置信息的错误列表失败', 'danger', 4000))
		})
	}
}

export const fetchBrowsers = appId => {
	return (dispatch, getState) => {
		fetchBrowserPencentage(appId)
		.then(data => {
			if (data.code === 1) dispatch(updateBrowser(data.browsers))
			else if (data.code === 2) dispatch(openSnackBar('数据库暂无浏览器百分比数据', 'info', 4000))
		})
		.catch(err => {
			console.log(err)
			dispatch(openSnackBar('获取浏览器百分比信息失败', 'danger', 4000))
		})
	}
}


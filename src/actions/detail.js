/**
 * create by Jocs 2016.05.04
 */

import C from '../constants'
import { fetchSingleError, getCity, ipToLocation } from '../utils/fetchService'
import { toggleLoadingStatus } from './loading'
import { openSnackBar } from './snackBar'

export const updateDetailError = error => ({
	type: C.UPDATE_DETAIL_ERROR,
	payload: error
})

export const resetDetailError = () => ({
	type: C.RESET_DETAIL_ERROR
})

export const updateCity = (province, city) => ({
	type: [C.UPDATE_CITY],
	payload: {province, city}
})

export const fetchDetailErrorIfNeeded = errorId => {
	return (dispatch, getState) => {
		const { _id } = getState().detail
		if (errorId === _id && _id) return false
		dispatch(toggleLoadingStatus('loading'))
		dispatch(resetDetailError())
		fetchSingleError(errorId)
		.then(data => {
			if (data.code === 1) {
				dispatch(updateDetailError(data.data))
				const { location, ip } = data.data.environment
				const geo = JSON.parse(location)
				if (geo) {
					getCity(geo.longitude, geo.latitude)
					.then(p => {
						console.log(p)
						dispatch(updateCity(p.province, p.city))
					})
				} else if (ip) {
					ipToLocation(ip)
					.then(p => {
						if (p.status === 0) {
							const { province, city } = p.content.address_detail
							dispatch(updateCity(province, city))
						} else dispatch(openSnackBar(p.message ? p.message : '无法解析ip地址', 'danger', 3000))
					})
					.catch(err => {
						console.error(err)
						dispatch(openSnackBar('ip地址获取地址详情失败', 'danger', 4000))
					})
				}
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

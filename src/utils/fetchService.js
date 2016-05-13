/**
 * create by Jocs 2015.04.25
 */

import { fetchV } from './index'

export const fetchAppList = userId => {
	const APP_LIST_URL = '/api/applications/getAll'
	return fetchV(APP_LIST_URL, 'POST', {userId})
}

export const fetchErrorList = (appId, pageNumber, pageSize) => {
	const ERROR_LIST_URL = `/api/error/errors/${appId}/${pageNumber}/${pageSize}`
	return fetchV(ERROR_LIST_URL, 'GET')
}

export const fetchSingleError = errorId => {
	const url = `/api/error/singleError/${errorId}`
	return fetchV(url, 'GET')
}

export const fetchErrorsWithLocation = appId => {
	const url = `/api/error/errorsWithLocation/${appId}`
	return fetchV(url, 'GET')
}

export const fetchBrowserPencentage = appId => {
	const url = `/api/browser/percentage/${appId}`
	return fetchV(url, 'GET')
}

export const fetchAllInOne = appId => {
	const url = `/api/statistic/allInOne/${appId}`
	return fetchV(url, 'GET')
}

export const fetchSimpleSearch = search => {
	const { appId, pageNumber, pageSize, message } = search
	const url = `/api/error/simpleSearch/${appId}/${pageNumber}/${pageSize}/${message}`
	return fetchV(url, 'GET')
}

export const fetchComplexSearch = search => {
	const { appId, pageNumber, pageSize, include, type, start, end, browser, user } = search
	const url = `/api/error/complexSearch/${appId}/${pageNumber}/${pageSize}/${include}/${type}/${start}/${end}/${browser}/${user}`
	return fetchV(url, 'GET')
}

export const fetchSearch = type => search => {
	switch (type) {
		case 'simple': return fetchSimpleSearch(search)
		case 'complex': return fetchComplexSearch(search)
	}
}

export const getCity = (lot, lat) => {
	return new Promise((resolve, reject) => {
		// const map = new BMap.Map('allmap')
		const point = new BMap.Point(lot, lat)
		const gc = new BMap.Geocoder()
		gc.getLocation(point, function(rs) {
			const addComp = rs.addressComponents
			resolve(addComp)
			// alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber)
		})
	})

}

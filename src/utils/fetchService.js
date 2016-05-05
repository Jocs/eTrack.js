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


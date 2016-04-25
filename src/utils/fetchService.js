/**
 * create by Jocs 2015.04.25
 */

import { fetchV } from './index'

export const fetchAppList = userId => {
	const APP_LIST_URL = '/api/applications/getAll'
	return fetchV(APP_LIST_URL, 'POST', {userId})
}

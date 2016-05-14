/**
 * create by Jocs 2016.05.13
 */

import C from '../constants'
import { fetchSearch } from '../utils/fetchService'
import { toggleLoadingStatus } from './loading'
import { openSnackBar } from './snackBar'

export const updateResult = (searchResult, pageNumber, total) => {
	return {
		type: C.UPDATE_SEARCH_RESULT,
		payload: {
			searchResult,
			pageNumber,
			total
		}
	}
}

export const searchError = (type, search) => {
	return (dispatch, getState) => {
		if (!search.appId) return dispatch(openSnackBar('还没创建应用，暂不能查询！', 'danger', 5000))
		dispatch(toggleLoadingStatus('loading'))
		fetchSearch(type)(search)
		.then(data => {
			if (data.code === 1) {
				dispatch(updateResult(data.data, data.pageNumber, data.total))
				dispatch(toggleLoadingStatus('hide'))
			} else {
				dispatch(openSnackBar('数据库查询错误列表失败', 'danger', 40000))
				dispatch(toggleLoadingStatus('hide'))
			}
		})
		.catch(err => {
			console.log(err)
			dispatch(openSnackBar('查询错误列表失败', 'danger', 40000))
			dispatch(toggleLoadingStatus('hide'))
		})
	}
}


/**
 * create by Jocs 2015.05.05
 */
import C from '../constants'
import { createReducer } from '../utils'

const initialState = {
	totalDay: 0,
	yesterdayJs: 0,
	yesterdayJsCompare: 0,
	yesterdayAjax: 0,
	yesterdayAjaxCompare: 0,
	date: [],
	js: [],
	ajax: [],
	browsers: [],
	errorsWithLocation: []
}

export default createReducer(initialState, {

	[C.UPDATE_BROWSERS]: (state, payload) => {
		return Object.assign({}, state, {browsers: payload.reduce((acc, b) => {
			return [...acc, {value: b.quatity, name: b.nameVersion}]
		}, [])})
	},

	[C.UPDATE_STATISTIC]: (state, payload) => {
		const { totalDay, yesterdayJs, yesterdayJsCompare, yesterdayAjax, yesterdayAjaxCompare } = payload
		const { date, js, ajax } = payload.errorPerDay.reduce((acc, d) => ({
			date: [...acc.date, d.date],
			js: [...acc.js, d.js],
			ajax: [...acc.ajax, d.ajax]
		}), {
			date: [],
			js: [],
			ajax: []
		})
		return Object.assign({}, state, {
			totalDay,
			yesterdayJs,
			yesterdayAjax,
			yesterdayJsCompare,
			yesterdayAjaxCompare,
			date,
			js,
			ajax
		})
	},

	[C.INIT_ERRORS_LOCATION]: (state, payload) => {
		return Object.assign({}, state, {errorsWithLocation: payload})
	},

	[C.UPDATE_ERRORS_LOCATION]: (state, payload) => {
		return Object.assign({}, state, {
			errorsWithLocation: [payload, ...state.errorsWithLocation].slice(0, 100)
		})
	}
})

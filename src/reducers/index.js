/**
 * create by Jocs 2016.04.21
 */
import { combineReducers } from 'redux'
import { routerStateReducer } from 'redux-router'
import auth from './auth'
import loadStatus from './loading'
import consolo from './console'

export default combineReducers({
	auth,
	loadStatus,
	console: consolo,
	router: routerStateReducer
})


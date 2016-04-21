/**
 * create by Jocs 2016.04.21
 */
import { combineReducers } from 'redux'
import { routerStateReducer } from 'redux-router'
import auth from './auth'
import loadStatus from './loading'

export default combineReducers({
	auth,
	loadStatus,
	router: routerStateReducer
})

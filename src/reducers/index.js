/**
 * create by Jocs 2016.04.21
 */
import { combineReducer } from 'redux'
import { routerStateReducer } from 'redux-router'
import auth from './auth'

export default combineReducer({
	auth,
	router: routerStateReducer
})

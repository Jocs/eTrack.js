/**
 * create by Jocs 2016.04.21
 */
import { combineReducers } from 'redux'
import { routerStateReducer } from 'redux-router'
import auth from './auth'
import loadStatus from './loading'
import consolo from './console'
import snackbar from './snackBar'
import appList from './appList'
import current from './current'
import detail from './detail'
import dashboard from './dashboard'
import research from './research'

export default combineReducers({
	auth,
	loadStatus,
	console: consolo,
	snackbar,
	appList,
	current,
	detail,
	dashboard,
	research,
	router: routerStateReducer
})


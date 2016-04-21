/**
 * create by Jocs 2016.04.21
 */

import rootReducer from '../reducers'
import thunk from 'redux-thunk'
import routes from '../routes'
import { reduxReactRouter } from 'redux-router'
import createHistory from 'history/lib/createBrowserHistory'
import {
	applyMiddleware,
	compose,
	createStore
} from 'redux'
import createLogger from 'redux-logger'

export default function configureStore(initialState) {
	const logger = createLogger()
	const middleware = applyMiddleware(thunk, logger)
	const createStoreWithMiddleware = compose(middleware, reduxReactRouter(routes, createHistory))
	const store = createStoreWithMiddleware(createStore)(rootReducer, initialState)

	if (module.hot) {
		module.hot.accept('../reduces', () => {
			const nextRootReducer = require('../reducers/index')
			store.replaceReducer(nextRootReducer)
		})
	}

	return store
}


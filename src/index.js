import React from 'react'
import { render } from 'react-dom'
import { Root } from './containers'
import configureStore from './store/configureStore'
import { loginUserSuccess } from './actions'
import { getToken } from './utils'

const rootElement = document.querySelector('#root')
const store = configureStore(window.__INITIAL_STATE__)

const node = (<Root store={store} />)

const token = getToken()
token && store.dispatch(loginUserSuccess(token))

render(node, rootElement)

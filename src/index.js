import React from 'react'
import { render } from 'react-dom'
import { Root } from './containers'
import configureStore from './store/configureStore'
import { getMe } from './actions/auth'
import { getToken, getSocket } from './utils'
import { socketConnect } from './actions/console'
import { socketErrorMessageListener } from './actions/socket'

import './index.scss'

const rootElement = document.querySelector('#root')
const store = configureStore(window.__INITIAL_STATE__)
const socket = getSocket()

socket.on('preSubscribe', function(data) {
	if (data === 'connect') store.dispatch(socketConnect())
})

store.dispatch(socketErrorMessageListener())

const node = (<Root store={store} />)

const token = getToken()
token && store.dispatch(getMe(token))

render(node, rootElement)

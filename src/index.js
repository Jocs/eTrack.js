import React from 'react'
import { render } from 'react-dom'
import { Root } from './containers'
import configureStore from './store/configureStore'
import { getMe } from './actions/auth'
import { getToken } from './utils'

import './index.scss'

const rootElement = document.querySelector('#root')
const store = configureStore(window.__INITIAL_STATE__)

const node = (<Root store={store} />)

const token = getToken()
token && store.dispatch(getMe(token))

render(node, rootElement)

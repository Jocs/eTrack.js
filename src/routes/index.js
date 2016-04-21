/**
 * create by Jocs 2016.04.21
 */

import React from 'react'
import {
	Route,
	IndexRedirect,
	IndexRoute
} from 'react-router'

import App from '../containers/App.js'
// import { Home, Console, Dashboard, Current, Detail } from '../components'
import { getToken } from '../utils'

// 判断是否登陆
const token = getToken()


export default (
	<Route path='/' component={App}>
		{/* {token ? <IndexRedirect to='dashboard'/> : <IndexRoute component={Home}/>}
		<Route path='console' component={Console}>
			<Route path='/dashboard' component={Dashboard}/>
			<Route path='/current' component={Current}/>
			<Route path='/detail/:id' component={Detail}/>
		</Route> */}
	</Route>
)



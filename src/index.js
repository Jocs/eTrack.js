import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import {
	Router,
	Route,
	IndexRoute,
	browserHistory
} from 'react-router'

import Nav from './navbar'
import Home from './home'
import Console from './console'

class App extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				<Nav/>
				{this.props.children}
			</div>
		)
	}
}

render(
	(<Router history={browserHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Home}/>
			<Route path="console" component={Console}>
			</Route>
		</Route>
	</Router>),
	document.querySelector('#root')
)

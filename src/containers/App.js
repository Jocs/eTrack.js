import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'redux-router'

import { NavBar, Login } from '../components'
import * as actionCreators from '../actions/auth'
import * as loadActionCreators from '../actions/loading'
import * as consoleActionCreators from '../actions/console'

class App extends Component {
	static propTypes = {
		isAuthenticated: PropTypes.bool.isRequired,
		children: PropTypes.object.isRequired
	}
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<div className='mainContainer'>
				<NavBar {...this.props}/>
				<Login {...this.props}/>
				{ this.props.children }
			</div>
		)
	}
}

const mapStateToProps = state => {
	const {
		isAuthenticated,
		userName,
		isAuthenticating,
		loginPanel,
		portrait
	} = state.auth
	const { loadStatus } = state
	const { router } = state
	return { isAuthenticated, userName, isAuthenticating, loginPanel, loadStatus, portrait, router }
}

const mapDispatchToProps = dispatch => {
	return {dispatch, push, ...bindActionCreators(Object.assign({}, actionCreators, loadActionCreators, consoleActionCreators), dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

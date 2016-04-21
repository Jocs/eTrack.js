import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { NavBar, Login } from '../components'
import * as actionCreators from '../actions/auth'

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
	const { isAuthenticated, userName, isAuthenticating, loginPanel } = state.auth
	return { isAuthenticated, userName, isAuthenticating, loginPanel }
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

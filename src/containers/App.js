import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'redux-router'
import Snackbar from 'material-ui/lib/snackbar'

import { NavBar, Login } from '../components'
import * as actionCreators from '../actions/auth'
import * as loadActionCreators from '../actions/loading'
import * as consoleActionCreators from '../actions/console'
import * as snackbarActionCreators from '../actions/snackBar.js'
import * as appListActionsCreator from '../actions/applist'

import './app.scss'

class App extends Component {
	static propTypes = {
		isAuthenticated: PropTypes.bool.isRequired,
		children: PropTypes.object.isRequired,
		snackbarMessage: PropTypes.string.isRequired,
		snackbarDuration: PropTypes.number.isRequired,
		sanckbarType: PropTypes.string.isRequired,
		snackbarOpen: PropTypes.bool.isRequired,
		closeSnackBar: PropTypes.func.isRequired
	}

	constructor(props) {
		super(props)
	}

	render() {
		const {
			snackbarOpen,
			snackbarMessage,
			snackbarDuration,
			sanckbarType,
			closeSnackBar
		} = this.props

		let style = null
		switch (sanckbarType) {
			case 'primary': {
				style = {background: 'rgb(51, 122, 183)'}
				break
			}
			case 'success': {
				style = {background: 'rgb(223, 240, 216)'}
				break
			}
			case 'info': {
				style = {background: 'rgb(217, 237, 247)'}
				break
			}
			case 'warning': {
				style = {background: 'rgb(252, 248, 227)'}
				break
			}
			case 'danger': {
				style = {background: 'rgb(255, 64, 129)'}
				break
			}
			default: style = {background: 'rgb(223, 240, 216)'}
		}
		style = Object.assign({}, style, {color: '#333', textAlign: 'center'})
		return (
			<div className='mainContainer'>
				<NavBar {...this.props}/>
				<Login {...this.props}/>
				{ this.props.children }
				<Snackbar
					autoHideDuration={snackbarDuration}
					message={snackbarMessage}
					open={snackbarOpen}
					bodyStyle={style}
					onRequestClose={closeSnackBar}
					className='app-snackbar'
				/>
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
	const {
		snackbarMessage,
		snackbarDuration,
		sanckbarType,
		snackbarOpen
	} = state.snackbar
	return {
		isAuthenticated,
		userName,
		isAuthenticating,
		loginPanel,
		loadStatus,
		portrait,
		router,
		snackbarMessage,
		snackbarDuration,
		sanckbarType,
		snackbarOpen
	}
}

const mapDispatchToProps = dispatch => {
	return {
		dispatch,
		push,
		...bindActionCreators(Object.assign({},
			actionCreators,
			loadActionCreators,
			consoleActionCreators,
			snackbarActionCreators,
			appListActionsCreator), dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

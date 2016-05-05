import React, { Component, PropTypes } from 'react'
import { push } from 'redux-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as dashboardActionCreator from '../../actions/dashboard'

import './index.scss'

class Dashboard extends Component {
	constructor(props) {
		super(props)
	}

	static propTypes = {
		consoleLeftNav: PropTypes.bool.isRequired
	}

	render() {
		const { consoleLeftNav } = this.props
		const dashboardStyle = consoleLeftNav ? {marginLeft: 120} : {marginLeft: 0}
		return (
			<div className='dashboard' style={dashboardStyle}>
				hello
			</div>
		)
	}
}

const mapStateToProps = state => {
	const { consoleLeftNav } = state.console
	return { consoleLeftNav }
}

const mapDispatchToProps = dispatch => {
	return {push, dispatch, ...bindActionCreators(Object.assign({}, dashboardActionCreator), dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

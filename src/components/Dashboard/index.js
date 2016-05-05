import React, { Component, PropTypes } from 'react'
import { push } from 'redux-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Pie from '../Pie'

import * as dashboardActionCreator from '../../actions/dashboard'

import './index.scss'

(function() {
	const throttle = function(type, name, obj = window) {
		let running = false
		const func = function() {
			if (running) { return }
			running = true
			requestAnimationFrame(function() {
				obj.dispatchEvent(new CustomEvent(name))
				running = false
			})
		}
		obj.addEventListener(type, func)
	}

    /* init - you can init any event */
	throttle('resize', 'optimizedResize')
})()

class Dashboard extends Component {
	constructor(props) {
		super(props)
		this.state = {
			pieWidth: 0,
			pieHeight: 0
		}
	}

	static propTypes = {
		consoleLeftNav: PropTypes.bool.isRequired,
		browsers: PropTypes.array
	}

	componentDidMount() {
		const that = this
		window.addEventListener('optimizedResize', () => {
			const { offsetWidth, offsetHeight } = that.refs.pie
			that.setState({
				pieHeight: offsetHeight,
				pieWidth: offsetWidth
			})
		})
	}

	render() {
		const { consoleLeftNav, browsers } = this.props
		const dashboardStyle = consoleLeftNav ? {marginLeft: 120} : {marginLeft: 0}
		return (
			<div className='dashboard' style={dashboardStyle}>
				<div className='header'>

				</div>
				<div className='line-chart'>

				</div>
				<div ref='pie' className='pie-chart'>
					<Pie browsers={browsers}
						height={this.state.pieHeight}
						width={this.state.pieWidth}
					/>
				</div>
				<div className='map-chart'>

				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	const { consoleLeftNav } = state.console
	const {
		totalDay,
		yesterdayJs,
		yesterdayJsCompare,
		yesterdayAjax,
		yesterdayAjaxCompare,
		date,
		js,
		ajax,
		browsers,
		errorsWithLocation
	} = state.dashboard
	return {
		consoleLeftNav,
		totalDay,
		yesterdayJs,
		yesterdayJsCompare,
		yesterdayAjax,
		yesterdayAjaxCompare,
		date,
		js,
		ajax,
		browsers,
		errorsWithLocation
	}
}

const mapDispatchToProps = dispatch => {
	return {push, dispatch, ...bindActionCreators(Object.assign({}, dashboardActionCreator), dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

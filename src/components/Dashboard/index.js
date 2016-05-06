import React, { Component, PropTypes } from 'react'
import { push } from 'redux-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Pie from '../Pie'
import Line from '../Line'
import Map from '../Map'

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
			pieHeight: 0,
			lineHeight: 0,
			lineWidth: 0,
			mapWidth: 0,
			mapHeight: 0
		}
	}

	static propTypes = {
		consoleLeftNav: PropTypes.bool.isRequired,
		browsers: PropTypes.array,
		date: PropTypes.array,
		js: PropTypes.array,
		ajax: PropTypes.array,
		errorsWithLocation: PropTypes.array
	}

	componentDidMount() {

		window.addEventListener('optimizedResize', () => {

			['pie', 'line', 'map'].forEach(i => {
				if (this.refs[i]) {
					const { offsetWidth, offsetHeight } = this.refs[i]
					this.setState({
						[`${i}Height`]: offsetHeight,
						[`${i}Width`]: offsetWidth
					})
				}
			})

		}, false)

	}

	render() {
		const { consoleLeftNav, browsers, date, js, ajax, errorsWithLocation } = this.props
		const dashboardStyle = consoleLeftNav ? {marginLeft: 120} : {marginLeft: 0}
		return (
			<div className='dashboard' style={dashboardStyle}>
				<div className='header'>

				</div>
				<div ref='line' className='line-chart'>
					<Line
						date={date}
						js={js}
						ajax={ajax}
						height={this.state.lineHeight}
						width={this.state.lineWidth}
					/>
				</div>
				<div ref='pie' className='pie-chart'>
					<Pie browsers={browsers}
						height={this.state.pieHeight}
						width={this.state.pieWidth}
					/>
				</div>
				<div ref='map' className='map-chart'>
					<Map
						errors={errorsWithLocation}
						height={this.state.mapHeight}
						width={this.state.mapWidth}
					/>
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

import React, { Component, PropTypes } from 'react'
import { push } from 'redux-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LeftNav from 'material-ui/lib/left-nav'
import IconButton from 'material-ui/lib/icon-button'
import Close from 'material-ui/lib/svg-icons/navigation/close'
import Paper from 'material-ui/lib/paper'
import Title from 'material-ui/lib/svg-icons/av/web-asset'
import Up from 'material-ui/lib/svg-icons/action/trending-up'
import Down from 'material-ui/lib/svg-icons/action/trending-down'


import Pie from '../Pie'
import Line from '../Line'
import Map from '../Map'

import * as dashboardActionCreator from '../../actions/dashboard'
import * as detailActionCreator from '../../actions/detail'

import style from './style'

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
		this.handleClose = this.handleClose.bind(this)
		this.state = {
			pieWidth: 0,
			pieHeight: 0,
			lineHeight: 0,
			lineWidth: 0,
			mapWidth: 0,
			mapHeight: 0,
			rightTheme: false,
			zDepth: [1, 1, 1, 1, 1, 1]
		}
	}

	static propTypes = {
		consoleLeftNav: PropTypes.bool.isRequired,
		browsers: PropTypes.array,
		date: PropTypes.array,
		js: PropTypes.array,
		ajax: PropTypes.array,
		errorsWithLocation: PropTypes.array,
		fetchDetailErrorIfNeeded: PropTypes.func,
		push: PropTypes.func,
		dispatch: PropTypes.func,
		currentApp: PropTypes.object,
		total: PropTypes.number,
		totalDay: PropTypes.number,
		yesterdayJs: PropTypes.number,
		yesterdayAjax: PropTypes.number,
		yesterdayJsCompare: PropTypes.number,
		yesterdayAjaxCompare: PropTypes.number
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

	handleClose() {
		this.setState({
			rightTheme: !this.state.rightTheme
		})
	}

	render() {
		const {
			consoleLeftNav,
			browsers,
			date,
			js,
			ajax,
			errorsWithLocation,
			fetchDetailErrorIfNeeded,
			push,
			dispatch,
			currentApp,
			totalDay,
			total,
			yesterdayJs,
			yesterdayAjax,
			yesterdayJsCompare,
			yesterdayAjaxCompare
		} = this.props
		const dashboardStyle = consoleLeftNav ? {marginLeft: 120} : {marginLeft: 0}

		const images = ['infographic', 'roma', 'shine', 'dark', 'vintage', 'macarons'].map((t, i) => {
			return (
				<Paper
					className={`image ${i % 2 === 0 ? 'odd' : ''} img${i}`}
					zDepth={this.state.zDepth[i]}
					key={i}
				>
					<img src={`src/assets/images/${t}.png`}/>
					<div className='title'>{t.toUpperCase()}</div>
				</Paper>
			)
		})

		const totalStr = total.toString().split('').reduceRight((acc, d, i) => {
			return i % 3 === 1 && i !== 0 ? acc = `,${d}${acc}` : `${d}${acc}`
		}, '')

		return (
			<div className='dashboard' style={dashboardStyle}>
				<div className='header'>
					<h2>
						<Title
							style={{verticalAlign: 'sub'}}
						/> 应用名称：{currentApp.name}
					</h2>
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
						dispatch={dispatch}
						fetchDetail={fetchDetailErrorIfNeeded}
						push={push}
					/>
				</div>
				<div className='statistic-bar'>
					<div className='protect-days statistic'>
						<p>eTrack.Js已监测您的应用</p>
						<p>共<span className='total-day'>{totalDay}</span>天</p>
					</div>
					<div className='total-errors statistic'>
						<p>应用出现错误</p>
						<p>共<span className='total-day'>{totalStr}</span>次</p>
					</div>
					<div className='yesterday statistic last'>
						<div>昨日错误量</div>
						<p>
							<span className='text'>JavaScript:</span>
							<span className='total-time'>{yesterdayJs}</span>
							<span className='text'>次</span>
							{' '}
							{yesterdayJsCompare >= 0 ? <Up color={'red'}/> : <Down color={'green'}/>}
							{' '}
							<span className={
								yesterdayJsCompare >= 0 ? 'text up' : 'text down'
							}>{`${yesterdayJsCompare.toFixed(4) * 100}%`}</span>
						</p>
						<p>
							<span className='text'>Ajax:</span>
							<span className='total-time'>{yesterdayAjax}</span>
							<span className='text'>次</span>
							{' '}
							{yesterdayAjaxCompare >= 0 ? <Up color={'red'}/> : <Down color={'green'}/>}
							{' '}
							<span className={
								yesterdayAjaxCompare >= 0 ? 'text up' : 'text down'
							}>{`${yesterdayAjaxCompare.toFixed(4) * 100}%`}</span>
						</p>
					</div>
				</div>
				<LeftNav
					width={500}
					openRight={true}
					open={this.state.rightTheme}
					style={style.rightBar}
				>
					<IconButton
						onClick={this.handleClose}
					>
						<Close/>
					</IconButton>
					<div className='images-wrapper'>
						{images}
					</div>
				</LeftNav>
			</div>
		)
	}
}

const mapStateToProps = state => {
	const { consoleLeftNav } = state.console
	const {
		total,
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
	const { currentApp } = state.current
	return {
		currentApp,
		total,
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
	return {push, dispatch, ...bindActionCreators(Object.assign({}, dashboardActionCreator, detailActionCreator), dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

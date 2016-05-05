/**
 * crete by Jocs 2016.04.22
 */
import React, { Component, PropTypes } from 'react'
import { push } from 'redux-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as detailActionCreator from '../../actions/detail'
import Board from '../DetailBoard'
import Track from '../Track'

// import style from './style'

import './index.scss'

class Detail extends Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
		this.state = {
			show: true
		}
	}

	static propTypes = {
		consoleLeftNav: PropTypes.bool.isRequired,
		params: PropTypes.object,
		fetchDetailErrorIfNeeded: PropTypes.func.isRequired,
		detail: PropTypes.object.isRequired
	}

	componentWillMount() {
		const { fetchDetailErrorIfNeeded } = this.props
		const { id } = this.props.params
		fetchDetailErrorIfNeeded(id)
	}

	handleClick(event) {
		event.target.textContent === '用户行为追踪'
		? this.setState({show: true}) : this.setState({show: false})
		const parent = event.target.parentNode
		const lis = parent.querySelectorAll('li')
		Array.prototype.forEach.call(lis, li => {
			if (li.classList.contains('border')) li.classList.remove('border')
		})
		event.target.classList.add('border')
	}

	render() {
		const { consoleLeftNav } = this.props
		const { environment } = this.props.detail
		const detailStyle = consoleLeftNav ? {marginLeft: 170} : {marginLeft: 0}
		return (
			<div className='detail' style={detailStyle}>
				<div className='tab'>
					<ul onClick={this.handleClick}>
						<li className='border'>用户行为追踪</li>
						<li>错误追溯栈</li>
					</ul>
					{this.state.show ? <Track
							{...this.props}
						/> : <div>track</div>}
				</div>
				<div className='right-board'>
					{ environment && <Board
						{...this.props}
					/>}
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	const { consoleLeftNav } = state.console
	const { detail } = state
	return { consoleLeftNav, detail }
	// const {
	// 	errorType,
	// 	fileName,
	// 	lineNumber,
	// 	columnNumber,
	// 	logger,
	// 	message,
	// 	stack,
	// 	time,
	// 	user
	// } = state.detail

	// const {
	// 	dependencies,
	// 	loadOn,
	// 	location,
	// 	runTime,
	// 	url,
	// 	version,
	// 	viewportHeight,
	// 	viewportWidth
	// } = state.detail.environment

	// const { browser, os } = state.detail.userAgentInfo

	// return {
	// 	consoleLeftNav,
	// 	errorType,
	// 	fileName,
	// 	lineNumber,
	// 	columnNumber,
	// 	logger,
	// 	message,
	// 	stack,
	// 	time,
	// 	user,
	// 	dependencies,
	// 	loadOn,
	// 	location,
	// 	runTime,
	// 	url,
	// 	version,
	// 	viewportHeight,
	// 	viewportWidth,
	// 	browser,
	// 	os
	// }
}

const mapDispatchToProps = dispatch => {
	return {push, dispatch, ...bindActionCreators(Object.assign({}, detailActionCreator), dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)

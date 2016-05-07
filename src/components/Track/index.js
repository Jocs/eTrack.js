/**
 * create by Jocs 2016.05.04
 */

import React, { Component, PropTypes } from 'react'
import Time from 'material-ui/lib/svg-icons/device/access-time'
import Http from 'material-ui/lib/svg-icons/social/public'
import People from 'material-ui/lib/svg-icons/social/people'
import Code from 'material-ui/lib/svg-icons/action/settings-ethernet'
import All from 'material-ui/lib/svg-icons/action/spellcheck'
import Colors from 'material-ui/lib/styles/colors'
import TrackError from 'material-ui/lib/svg-icons/alert/error-outline'

import './index.scss'
import style from './style'

export default class Track extends Component {
	constructor(props) {
		super(props)
		this.handClick = this.handClick.bind(this)
	}

	static propTypes = {
		detail: PropTypes.object.isRequired
	}

	handClick(event) {
		event.preventDefault()
		const target = event.target.parentNode
		target.classList.contains('nowrap') ? target.classList.remove('nowrap') : target.classList.add('nowrap')
	}

	render() {
		const { logger, message, time, errorType, user } = this.props.detail
		const loggers = typeof logger === 'string' && JSON.parse(logger) || []
		const total = loggers.reduce((acc, l) => {
			if (acc[l.catigory]) acc[l.catigory] ++
			else acc[l.catigory] = 1
			return acc
		}, {
			console: 0,
			ajax: 0,
			visitor: 0
		})

		const errTime = getTime(time)

		const logs = loggers.map((log, index) => {
			switch (log.catigory) {
				case 'visitor': return <Visitor key={index} {...log}/>
				case 'console': return <DetailCnsole key={index} {...log}/>
				case 'ajax': return <Ajax key={index} {...log}/>
			}
		})

		return (
			<div className='track'>
				<div className='track-header'>
					<div className='time'>
						<Time color={Colors.orange500}
							style={style.svg}
						/>
					</div>
					<div className='all total'>
						<All
							color={'#eb606b'}
							style={style.svg}
						/>&nbsp;<span>{loggers.length}</span>
					</div>
					<div className='http total'>
						<Http color={'rgb(76, 175, 80)'}
							style={style.svg}
						/>&nbsp;<span>{total.ajax}</span>
					</div>
					<div className='people total'>
						<People color={Colors.lime500}
							style={style.svg}
						/>&nbsp;<span>{total.visitor}</span>
					</div>
					<div className='code total'>
						<Code color={Colors.blue500}
							style={style.svg}
						/>&nbsp;<span>{total.console}</span>
					</div>
				</div>
				<div className='time-line'></div>
				<div className='track-logger'>
					{logs}
					<div className='log-wrapper'>
						<div className='log-content error-log final-error'>
							<h3 className='error-title'>
								<TrackError
									color={Colors.red500}
									style={{verticalAlign: 'middle'}}
								/>
								{user}产生的{errorType && errorType.split('@')[0]}错误
							</h3>
							<div className='log-body-wrapper'>
								<div className='log-hide'>
									<span
										onClick={this.handClick}
									>错误信息：</span>{message}
								</div>
							</div>
							<div className='timeStamp'>{errTime}</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

class Visitor extends Component {
	constructor(props) {
		super(props)
		this.handClick = this.handClick.bind(this)
	}
	static propTypes = {
		catigory: PropTypes.string.isRequired,
		value: PropTypes.object.isRequired
	}

	handClick(event) {
		event.preventDefault()
		const target = event.target.parentNode
		target.classList.contains('nowrap') ? target.classList.remove('nowrap') : target.classList.add('nowrap')
	}

	render() {
		const { action, element, timeStamp } = this.props.value
		const { tag, attributes, value, cssSelector } = element
		const time = getTime(timeStamp)
		const attrs = Object.keys(attributes).map((key, index) => {
			return (
				<p key={index}>
					<span className='attr-key'>{key}</span>
					<span className='bracket'>='</span>
					<span className='attr-value'>{attributes[key]}</span>
					<span className='bracket'>'</span>
				</p>
			)
		})
		return (
			<div className='log-wrapper'>
				<div className='visitor-log log-content'>
					<People color={Colors.lime500}
						style={{verticalAlign: 'middle'}}
					/>
					{' '}
					<span className='log-title'>{
						action === 'click' ? `用户点击<${tag}>元素` : `用户<${tag}>输入`
					}</span>
					<div className='log-body-wrapper'>
						<div className='element'>
							<p className='element-name'>元素：</p>
							<p>
								<span className='bracket'>&lt;</span>
								<span className='ele-tag'>{tag}</span>
							</p>
								{attrs}
							<p>
								<span className='bracket'>&gt;</span>
								{action === 'click' ? value : ''}
								<span className='bracket'>&lt;/</span>
								<span className='ele-tag'>{tag}</span>
								<span className='bracket'>&gt;</span>
							</p>
						</div>
						{action === 'input' && <div className='log-value'>用户输入值：{value}</div>}
						<div className='log-hide'
						><span
							onClick={this.handClick}
						>CSS选择器：</span>{cssSelector}</div>
					</div>
					<div className='timeStamp'>{time}</div>
				</div>
			</div>
		)
	}
}

class DetailCnsole extends Component {
	constructor(props) {
		super(props)
		this.handClick = this.handClick.bind(this)
	}

	static propTypes = {
		value: PropTypes.object.isRequired
	}

	handClick(event) {
		event.preventDefault()
		const target = event.target.parentNode
		target.classList.contains('nowrap') ? target.classList.remove('nowrap') : target.classList.add('nowrap')
	}

	render() {
		const { message, severity, timeStamp } = this.props.value
		const time = getTime(timeStamp)
		return (
			<div className='log-wrapper'>
				<div className='console-log log-content'>
					<Code
						color={Colors.blue500}
						style={{verticalAlign: 'middle'}}
					/>
					{' '}
					<span className='log-title'>控制台"console.{severity}()"打印内容</span>
					<div className='log-body-wrapper'>
						<div className='log-hide'>
							<span
								onClick={this.handClick}
							>Message:
							</span>
							{message}
						</div>
					</div>
					<div className='timeStamp'>{time}</div>
				</div>
			</div>
		)
	}
}

class Ajax extends Component {
	constructor(props) {
		super(props)
		this.handClick = this.handClick.bind(this)
	}
	static propTypes = {
		value: PropTypes.object.isRequired
	}

	handClick(event) {
		event.preventDefault()
		const target = event.target.parentNode
		target.classList.contains('nowrap') ? target.classList.remove('nowrap') : target.classList.add('nowrap')
	}

	render() {
		const { startedOn, endOn, method, responseText, statusCode, url } = this.props.value
		const time = getTime(startedOn)
		const duration = endOn ? (endOn - startedOn) : null
		return (
			<div className='log-wrapper'>
				<div className='ajax-log log-content'>
					<Http
						color={Colors.green500}
						style={{verticalAlign: 'middle'}}
					/>
					{' '}
					<span className='log-title'>用户发送"{method.toUpperCase()}"请求(StatusCode：{statusCode})</span>
					<div className='log-body-wrapper'>
						<div className='log-body'>请求持续时间：{duration ? `耗时${duration} ms` : '请求未收到响应'}</div>
						<div className='log-body'>请求URL：{url}</div>
						<div className='log-hide'>
							<span
								onClick={this.handClick}
							>ResponseText：
							</span>
							{responseText}
						</div>
					</div>
					<div className='timeStamp'>{time}</div>
				</div>
			</div>
		)
	}
}

function getTime(string) {
	return new Date(Number(string)).toString().split(' ')[4]
}

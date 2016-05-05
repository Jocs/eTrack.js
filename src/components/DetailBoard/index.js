/**
 * create by Jocs 2016.05.04
 */

import React, { Component, PropTypes } from 'react'
import Paper from 'material-ui/lib/paper'
import './index.scss'

export default class Board extends Component {
	constructor(props) {
		super(props)

	}
	static propTypes = {
		detail: PropTypes.object
	}
	render() {
		const { dependencies, location, viewportWidth, viewportHeight, loadOn, runTime } = this.props.detail.environment
		const dependenciesObj = JSON.parse(dependencies)
		const dps = Object.keys(dependenciesObj).map(k => {
			return (
				<div className='body'>
					<span className='lib-name'>{k}{'~'}</span>
					<span className='lib-version'>{dependenciesObj[k]}</span>
				</div>
			)
		})

		const { browser, os } = this.props.detail.userAgentInfo
		const browserObj = JSON.parse(browser)
		const osObj = JSON.parse(os)
		const locationObj = JSON.parse(location)
		const dateObj = new Date(Number(loadOn))
		const time = `${dateObj.toLocaleDateString()} ${dateObj.toString().split(' ')[4]}`
		return (
			<Paper className='board'
				zDepth='1'
			>
				<div className='lib section'>
					<div className='title'>您的应用共依赖{dps.length}个JavaScript库</div>
					{dps}
				</div>
				<div className='browser section'>
					<div className='title'>产生错误时使用的浏览器和操作系统</div>
					<div className='body'>{browserObj.name + '~' + browserObj.version}</div>
					{osObj && <div className='body'>{osObj.name + '~' + osObj.version}</div>}
				</div>
				{locationObj && <div className='section'>
					<div className='title'>错误所在设备地理位置</div>
					<div className='body'>
						<span>Lat: {locationObj.latitude}</span>
					</div>
					<div className='body'>
						<span>Lot: {locationObj.longitude}</span>
					</div>
				</div>}
				<div className='section'>
					<div className='title'>浏览器视图尺寸</div>
					<div className='body'>{['宽度:' + viewportWidth + 'px * 长度:' + viewportHeight + 'px']}</div>
				</div>
				<div className='section'>
					<div className='title'>应用启动时间及运行时长</div>
					<div className='body'>{time}</div>
					<div className='body'>运行时长：{runTime / 1000 + 's'}</div>
				</div>
				<div className='section'>
					<div className='title'>eTrack 版本号</div>
					<div className='body'>Version: 1.0.0</div>
				</div>
			</Paper>
		)
	}
}

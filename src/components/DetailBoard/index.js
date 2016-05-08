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
		detail: PropTypes.object,
		province: PropTypes.string,
		city: PropTypes.string,
		country: PropTypes.string
	}
	render() {
		const { dependencies, location, viewportWidth, viewportHeight, loadOn, runTime } = this.props.detail.environment
		const dependenciesObj = JSON.parse(dependencies)
		const dps = Object.keys(dependenciesObj).map((k, index) => {
			return (
				<div className='body' key={index}>
					<span className='lib-name'>库名：{k}{' '}</span>
					<span className='lib-version'>版本：{dependenciesObj[k]}</span>
				</div>
			)
		})

		const { browser, os } = this.props.detail.userAgentInfo
		const browserObj = JSON.parse(browser)
		const osObj = JSON.parse(os)
		const locationObj = JSON.parse(location)
		const dateObj = new Date(Number(loadOn))
		const time = `${dateObj.toLocaleDateString()} ${dateObj.toString().split(' ')[4]}`
		const { country, province, city } = this.props.detail
		return (
			<Paper
				className='board'
				zDepth={1}
			>
				<div className='lib section'>
					<div className='title'>依赖{dps.length}个JavaScript库</div>
					{dps}
				</div>
				<div className='browser section'>
					<div className='title'>浏览器和操作系统</div>
					<div className='body'>浏览器：{browserObj.name + ' 版本：' + browserObj.version}</div>
					{osObj && <div className='body'>操作系统：{osObj.name + ' 版本：' + osObj.version}</div>}
				</div>
				{locationObj && <div className='section'>
					<div className='title'>地理位置及城市</div>
					<div className='body'>
						<span>经纬度：[{locationObj.latitude.toFixed(3)}, &nbsp;{locationObj.longitude.toFixed(3)}]</span>
					</div>
					<div className='body'>
						<span>城市：{`${country} ${province} ${city}`}</span>
					</div>
				</div>}
				<div className='section'>
					<div className='title'>浏览器视图尺寸</div>
					<div className='body'>{'[宽度:' + viewportWidth + 'px * 长度:' + viewportHeight + 'px]'}</div>
				</div>
				<div className='section'>
					<div className='title'>启动时间及运行时长</div>
					<div className='body'>启动时间：{time}</div>
					<div className='body'>运行时长：{runTime / 1000 + 's'}</div>
				</div>
				<div className='section'>
					<div className='title'>eTrack 版本号</div>
					<div className='body'>版本: Beta版</div>
				</div>
			</Paper>
		)
	}
}

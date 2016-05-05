/**
 * create by Jocs 2016.05.06
 */

import React, { Component, PropTypes } from 'react'
import echarts from 'echarts'


export default class Pie extends Component {
	constructor(props) {
		super(props)
	}

	static propTypes = {
		browsers: PropTypes.array.isRequired,
		width: PropTypes.number,
		height: PropTypes.number
	}

	componentDidMount() {
		this.drawChart()
	}

	componentDidUpdate() {
		this.drawChart()
	}

	componentWillReceiveProps() {
		this.drawChart()
	}

	componentWillUnmount() {
		this.chart.dispose()
	}

	drawChart() {
		const { browsers } = this.props
		const names = browsers.map(b => b.name)
		const node = this.refs.chart
		const options = {
			title: {
				text: '用户浏览器分布',
				subtext: '面积模式',
				x: 'center'
			},
			tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b} : {c} ({d}%)'
			},
			legend: {
				x: 'center',
				y: 'bottom',
				data: names
			},
			toolbox: {
				show: true,
				feature: {
					mark: {show: true},
					dataView: {show: true, readOnly: false},
					magicType: {
						show: true,
						type: ['pie', 'funnel']
					},
					restore: {show: true},
					saveAsImage: {show: true}
				}
			},
			calculable: true,
			series: [
				{
					name: '浏览器－主版本号',
					type: 'pie',
					radius: [10, 110],
					center: ['50%', '50%'],
					roseType: 'radius',
					label: {
						normal: {
							show: true
						},
						emphasis: {
							show: true
						}
					},
					lableLine: {
						normal: {
							show: true
						},
						emphasis: {
							show: true
						}
					},
					data: browsers
				}
			]
		}
		this.chart = echarts.init(node)
		this.chart.setOption(options)

	}

	render() {
		const { width, height } = this.props
		return (
			<div
				ref='chart'
				style={{
					width: width || '100%',
					height: height || '100%'
				}}
			></div>
		)
	}
}
